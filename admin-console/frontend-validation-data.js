(function (global) {
  "use strict";

  const admin = global.ADMIN_DATA;
  if (!admin || !admin.datasets) return;

  const datasets = admin.datasets;
  const ymin = global.YMIN || {};

  function cleanId(value) {
    return String(value || "")
      .trim()
      .replace(/[^A-Za-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "ITEM";
  }

  function mergeRecords(name, incoming, replace) {
    const current = replace ? [] : (datasets[name] || []);
    const records = new Map(current.map(function (item) { return [item.id, item]; }));
    (incoming || []).forEach(function (item) {
      if (!item || !item.id) return;
      records.set(item.id, Object.assign({}, records.get(item.id) || {}, item));
    });
    datasets[name] = Array.from(records.values());
  }

  function normalizeProductLine(value) {
    const aliases = {
      "双电层超级电容": "双电层超级电容器",
      "混合型超级电容（锂离子电容）": "混合型超级电容（锂离子电容器）"
    };
    return aliases[value] || value || "液态铝电解电容器";
  }

  function firstNumber(value) {
    const match = String(value || "").replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
    return match ? match[0] : "";
  }

  function temperatureRange(value) {
    const numbers = String(value || "").match(/-?\d+(?:\.\d+)?/g) || [];
    return { min: numbers[0] || "", max: numbers[1] || "" };
  }

  function sizeFields(value) {
    const text = String(value || "");
    const numbers = text.match(/\d+(?:\.\d+)?/g) || [];
    if (/[Øφ]/i.test(text)) {
      return { diameter: numbers[0] || "", length: numbers[1] || "", width: "", height: "", thickness: "" };
    }
    return { diameter: "", length: numbers[1] || "", width: numbers[0] || "", height: numbers[2] || "", thickness: numbers[2] || "" };
  }

  function publishedLifecycle(value) {
    if (String(value || "").includes("新品")) return "新品";
    if (String(value || "").includes("不推荐")) return "新项目不推荐";
    return "量产品";
  }

  function currentApplicationPages() {
    const base = ymin.applicationCollected && ymin.applicationCollected.pages;
    if (!base) return [];
    return Object.keys(base).map(function (pageKey) {
      const page = base[pageKey];
      const supplemental = ymin.applicationSupplemental && ymin.applicationSupplemental[pageKey];
      const removals = (supplemental && supplemental.removeSubApps) || [];
      const baseTabs = (page.tabs || []).map(function (tab) {
        const subApps = (tab.subApps || []).filter(function (subApp) {
          return !removals.some(function (rule) { return rule.tab === tab.name && rule.name === subApp.name; });
        });
        return Object.assign({}, tab, { subApps: subApps });
      });
      return {
        key: pageKey,
        page: page,
        tabs: baseTabs.concat((supplemental && supplemental.tabs) || [])
      };
    });
  }

  const applicationFieldNames = {
    automotive: "汽车电子",
    "ai-server": "AI服务器与数据中心",
    robotics: "机器人",
    drone: "无人机",
    motor: "新型电机驱动",
    consumer: "消费类电子",
    power: "第三代半导体电源（GaN&SiC）",
    instrument: "仪器仪表",
    "energy-storage": "光储充"
  };

  const applicationStableIds = {
    automotive: "APP-01",
    "ai-server": "APP-02",
    instrument: "APP-03",
    motor: "APP-04",
    power: "APP-05",
    robotics: "APP-06",
    drone: "APP-07",
    "energy-storage": "APP-08",
    consumer: "APP-09"
  };

  const knownTerminalIds = {
    "automotive|电机控制器-MCU": "TERM-AUTO-MCU",
    "automotive|电子门锁应急解锁": "TERM-AUTO-CPM",
    "automotive|重卡4G智联锂电一键强启": "TERM-AUTO-PARK",
    "ai-server|BBU备用电源": "TERM-AI-BBU",
    "ai-server|RAID磁盘阵列": "TERM-AI-RAID"
  };

  const terminals = [];
  const terminalProducts = [];
  const productSpecs = new Map();

  currentApplicationPages().forEach(function (pageEntry) {
    const field = applicationFieldNames[pageEntry.key] || pageEntry.page.sheet || pageEntry.key;
    const applicationId = applicationStableIds[pageEntry.key] || "APP-FRONT-" + cleanId(pageEntry.key);
    pageEntry.tabs.forEach(function (tab, tabIndex) {
      const moduleId = applicationId + "-MOD-" + String(tabIndex + 1).padStart(2, "0");
      (tab.subApps || []).forEach(function (subApp, subIndex) {
        const templateKey = subApp.template || tab.template || "electrolytic";
        const terminalKey = pageEntry.key + "|" + subApp.name;
        const terminalId = knownTerminalIds[terminalKey] || "TERM-FRONT-" + cleanId(pageEntry.key + "-" + tab.key + "-" + (tabIndex + 1) + "-" + (subIndex + 1) + "-" + subApp.name);
        const moduleSpecs = (subApp.modules || []).reduce(function (all, module) { return all.concat(module.specs || []); }, []);
        const specs = (subApp.specs || []).concat(moduleSpecs);
        const uniquePartNumbers = new Set();
        specs.forEach(function (spec, specIndex) {
          const itemNo = String(spec.pn || spec.itemNo || "").trim();
          // 应用表中偶有“系列+规格+说明”的占位文字，不能当成完整料号建立关联。
          if (!itemNo || /\s|[\u00b5μ℃*]/.test(itemNo) || uniquePartNumbers.has(itemNo)) return;
          uniquePartNumbers.add(itemNo);
          const existing = productSpecs.get(itemNo) || {};
          productSpecs.set(itemNo, Object.assign({}, existing, spec, {
            series: spec.series || existing.series || "",
            productLine: existing.productLine || ""
          }));
          terminalProducts.push({
            id: "APR-FRONT-" + cleanId(terminalId + "-" + itemNo),
            terminal: subApp.name,
            terminalId: terminalId,
            itemNo: itemNo,
            series: spec.series || "",
            priority: uniquePartNumbers.size,
            source: "前端应用中心数据",
            status: "已发布"
          });
        });
        terminals.push({
          id: terminalId,
          applicationId: applicationId,
          moduleId: moduleId,
          field: field,
          tab: tab.name,
          name: subApp.name,
          template: templateKey === "supercapacitor" ? "超级电容模板" : "电解电容模板",
          topology: templateKey === "supercapacitor" ? "应用实物图" : "功能拓扑图",
          image: templateKey === "supercapacitor" ? "assets/application-collected/supercapacitor-heavy-truck-4g-bms.png" : "assets/application-collected/electrolytic-topology-demo.png",
          advantage: (subApp.modules || []).map(function (module) { return module.desc || ""; }).filter(Boolean).join("\n"),
          recommended: uniquePartNumbers.size,
          news: 0,
          status: "已发布"
        });
      });
    });
  });

  mergeRecords("terminals", terminals, true);
  mergeRecords("appProducts", terminalProducts, true);

  const seriesRows = ymin.seriesTable && ymin.seriesTable.getAll ? ymin.seriesTable.getAll() : [];
  const seriesLineMap = new Map();
  const seriesImages = (global.YMIN_SERIES_IMAGES && global.YMIN_SERIES_IMAGES.images) || {};
  const seriesFiles = (global.YMIN_SERIES_DATASHEETS && global.YMIN_SERIES_DATASHEETS.files) || {};
  const seriesRecords = seriesRows.map(function (row) {
    const productLine = normalizeProductLine(row.productLine);
    seriesLineMap.set(row.series, productLine);
    const lineImages = seriesImages[row.productLine] || seriesImages[productLine] || {};
    return {
      id: "SER-FRONT-" + cleanId(row.series),
      code: row.series,
      name: row.series + "系列",
      productLine: productLine,
      package: row.pkg || "",
      voltageRange: row.voltage || "",
      capacitanceRange: row.cap || "",
      temperatureRange: row.temp || "",
      lifetimeRange: row.life || "",
      image: lineImages[row.series] || "",
      pdf: seriesFiles[row.series] || row.pdf || "",
      codingRule: "",
      dimensionImage: "",
      rippleImage: "",
      tags: [row.feature, row.esr, row.aec ? "AEC-Q200" : "", row.rohs ? "RoHS" : ""].filter(Boolean).join(", ")
    };
  });
  mergeRecords("series", seriesRecords, true);

  const indexedProducts = global.YMIN_APPLICATION_PRODUCT_INDEX && global.YMIN_APPLICATION_PRODUCT_INDEX.products
    ? Object.values(global.YMIN_APPLICATION_PRODUCT_INDEX.products)
    : [];
  const productPool = new Map();
  indexedProducts.forEach(function (product) {
    if (product && product.pn) productPool.set(product.pn, product);
  });
  productSpecs.forEach(function (spec, itemNo) {
    productPool.set(itemNo, Object.assign({}, productPool.get(itemNo) || {}, spec, { pn: itemNo }));
  });

  const productRecords = Array.from(productPool.values()).map(function (product) {
    const itemNo = product.pn;
    const spec = productSpecs.get(itemNo) || {};
    const productLine = normalizeProductLine(product.category || product.productLine || seriesLineMap.get(product.series));
    const temperature = temperatureRange(spec.temperature || product.temperature);
    if (!temperature.max && spec.life) {
      const ratedTemperature = String(spec.life).match(/(-?\d+(?:\.\d+)?)\s*℃/);
      if (ratedTemperature) temperature.max = ratedTemperature[1];
    }
    const dimensions = sizeFields(spec.size || product.size);
    return Object.assign({
      id: "P-FRONT-" + cleanId(itemNo),
      itemNo: itemNo,
      productLine: productLine,
      series: product.series || spec.series || "",
      package: product.package || "",
      lifecycle: publishedLifecycle(product.status),
      polarity: "",
      voltage: firstNumber(spec.voltage || product.voltage),
      capacitance: firstNumber(spec.cap || product.cap),
      tolerance: "",
      temperatureMin: temperature.min,
      temperatureMax: temperature.max,
      ratedLife: firstNumber(spec.life || product.life),
      esr: firstNumber(spec.esr || product.esr),
      ratedRipple: firstNumber(spec.ripple || product.ripple),
      leakage: "",
      aecQ200: "",
      rohs: "",
      minimumPack: "",
      remarks: spec.note || "",
      updatedAt: "前端验证数据"
    }, dimensions);
  });
  mergeRecords("products", productRecords, false);

  const keywordRecords = productRecords.map(function (product) {
    return {
      id: "AIKW-FRONT-" + cleanId(product.itemNo),
      itemNo: product.itemNo,
      productLine: product.productLine,
      series: product.series,
      aiKeywords: "",
      updatedAt: ""
    };
  });
  mergeRecords("productAiKeywords", keywordRecords, false);

  const downloadSource = global.YMIN_DOWNLOAD_LIBRARY || [];
  const downloadRecords = downloadSource.map(function (item) {
    return {
      id: "DL-FRONT-" + cleanId(item.id),
      title: item.title,
      summary: item.keywords || "",
      type: item.typeLabel || item.type,
      productLine: item.productLine || (item.productCategories || []).join("、") || "全部",
      package: (item.packageTypes || []).join("、") || "全部",
      application: item.application || "全部",
      language: item.language === "CN" ? "简体中文" : "English",
      version: item.version || item.updated || "",
      file: item.href || "",
      whereUsed: 0,
      downloads: 0,
      status: "已发布",
      updatedAt: item.updated || ""
    };
  });
  mergeRecords("downloads", downloadRecords, false);

  const complianceSource = ymin.complianceCertificates || {};
  const systemCertificates = (complianceSource.systemCertifications || []).map(function (item) {
    return {
      id: "CERT-SYS-" + cleanId(item.id),
      productLine: "公司体系",
      type: item.name,
      reportNo: item.certificateNo || "",
      agency: item.issuer || "",
      reportDate: item.issuedDate || "",
      file: item.fileUrl || "",
      status: item.status || "已取得"
    };
  });
  const productCertificates = (complianceSource.productCertificationDocuments || []).map(function (item) {
    return {
      id: "CERT-PROD-" + cleanId(item.id),
      productLine: normalizeProductLine(item.productLine),
      type: item.documentType,
      reportNo: item.reportNo || "",
      agency: item.issuer || "",
      reportDate: item.reportDate || "",
      file: item.fileUrl || "",
      status: item.fileUrl ? "CRM已同步" : "CRM待补充"
    };
  });
  mergeRecords("compliance", systemCertificates.concat(productCertificates), true);

  const cadSource = global.YMIN_CAD_MODELS || [];
  const categoryMap = {
    "液态铝电解": "液态铝电解电容器",
    "大型液态铝电解": "液态铝电解电容器",
    "固态铝电解": "高分子固态铝电解电容器",
    "超级电容": "双电层超级电容器",
    "叠层电容": "叠层高分子固态铝电解电容器"
  };
  const cadRecords = cadSource.map(function (item) {
    return {
      id: item.id,
      name: item.fileName || item.model,
      productLine: categoryMap[item.category] || normalizeProductLine(item.category),
      package: item.package || "",
      dimensions: item.nominal || item.model || "",
      format: /\.igs$/i.test(item.fileName || "") ? "IGES" : "STEP",
      version: "前端现有文件",
      file: item.step || item.fileName || "",
      downloads: 0,
      status: "已发布",
      updatedAt: item.modified || ""
    };
  });
  mergeRecords("cadModels", cadRecords, true);

  const cadMappings = [];
  cadSource.forEach(function (model) {
    (model.itemNos || []).slice(0, 2).forEach(function (itemNo, index) {
      cadMappings.push({
        id: "CADMAP-FRONT-" + cleanId(model.id + "-" + itemNo),
        cadId: model.id,
        itemNo: itemNo,
        source: "前端现有CAD覆盖数据",
        matchBasis: model.match || "规格与几何尺寸匹配",
        confidence: index === 0 ? "高" : "待复核",
        status: "已发布",
        updatedAt: model.modified || ""
      });
    });
  });
  mergeRecords("cadMappings", cadMappings, true);

  const about = global.YMIN_ABOUT_DATA || {};
  mergeRecords("honors", (about.honors || []).map(function (item, index) {
    return {
      id: "HONOR-FRONT-" + (index + 1),
      title: item.title || item.name || "",
      category: item.category || "企业荣誉",
      issuer: item.issuer || "",
      date: item.date || "",
      image: item.image || "",
      sort: index + 1,
      status: "已发布"
    };
  }), true);
  mergeRecords("dealers", (about.distributors || []).map(function (item, index) {
    const row = Array.isArray(item) ? { company: item[0], authorizationDate: item[1] } : item;
    return {
      id: "DEALER-FRONT-" + (index + 1),
      company: row.company || row.name || "",
      authorizationDate: row.authorizationDate || row.date || ""
    };
  }), true);
  mergeRecords("jobs", (about.jobs || []).map(function (item, index) {
    return {
      id: "JOB-FRONT-" + (index + 1),
      title: item.title,
      department: item.category || "",
      location: item.location || "",
      experience: (item.requirements || []).join("\n"),
      responsibilities: (item.responsibilities || []).join("\n"),
      qualifications: (item.requirements || []).concat(item.preferred || []).join("\n"),
      contact: item.contactPhone ? (item.contactPhone + " " + (item.contactName || "")) : "021-33617848-8412 招聘专员",
      publishDate: "",
      status: "招聘中"
    };
  }), true);

  const articleSamples = [
    { id: "1439", title: "PCB空间极度受限？永铭φ7/φ12/φ13/φ14.5mm非常规直径铝电解电容——无需改板，兼顾高纹波、长寿命与低成本", publishAt: "2026-06-18", applications: "汽车电子,第三代半导体电源（GaN&SiC）,新型电机驱动", productLines: "液态铝电解电容器", series: "LKM,LKG,LKF,KCM" },
    { id: "1436", title: "永铭牛角铝电解电容：让充电桩滤波方案从“能用”变成“全生命周期降本”", publishAt: "2026-06-06", applications: "光储充", productLines: "液态铝电解电容器", series: "CW3H,CW6H" },
    { id: "1435", title: "超小直径破局者：永铭SLX系列混合型超级电容", publishAt: "2026-06-06", applications: "消费类电子,仪器仪表", productLines: "混合型超级电容（锂离子电容器）", series: "SLX" },
    { id: "1434", title: "从电气参数到物理承载：永铭LKE系列系统性解决无人机电调输入端过热熔断与震动断针问题", publishAt: "2026-06-06", applications: "无人机", productLines: "液态铝电解电容器", series: "LKE" },
    { id: "1433", title: "从功耗达标到TCO领先：永铭VHU系列助力车载DCDC降低待机功耗风险", publishAt: "2026-06-05", applications: "汽车电子", productLines: "高分子混合动力铝电解电容器", series: "VHU" },
    { id: "1432", title: "从“能启动”到“稳定启动”：永铭超级电容如何帮助重卡降低停机风险", publishAt: "2026-05-30", applications: "汽车电子", productLines: "双电层超级电容器", series: "SDB" },
    { id: "1431", title: "专为汽车电子水泵打造：永铭VHT/VHU/VHR系列固液混合电容", publishAt: "2026-05-28", applications: "汽车电子", productLines: "高分子混合动力铝电解电容器", series: "VHT,VHU,VHR" },
    { id: "1430", title: "吸尘器/扫地机器人电机驱动板上的电容总坏？永铭低ESR铝电解电容解决发热、震动、空间难题", publishAt: "2026-05-28", applications: "消费类电子", productLines: "液态铝电解电容器", series: "LMM,LK,NPX" }
  ].map(function (item) {
    return Object.assign({
      id: "ART-FRONT-" + item.id,
      contentId: "CONTENT-FRONT-" + item.id,
      type: "技术文章",
      channels: "新闻资讯",
      summary: "来自当前前端知识库文章数据，用于验证新闻、FAQ、产品与应用的关联展示。",
      body: "<p>完整正文使用前端 support-articles.json 中的审核稿。</p>",
      cover: "",
      tags: item.series,
      relations: 0,
      language: "简体中文",
      status: "已发布",
      updatedAt: item.publishAt
    }, item);
  });
  mergeRecords("articles", articleSamples, false);

  const faqSamples = [
    ["F001", "1439", "PCB空间有限标准尺寸电容装不下，有什么合适的电容解决方案？", "选用φ7/φ12/φ13/φ14.5mm非常规直径液态铝电解电容，可直接适配预留空间并满足纹波与寿命要求。", "汽车电子", "液态铝电解电容器"],
    ["F002", "1439", "永铭的非标电容最小起订量高吗？交货周期稳定吗？", "永铭具备稳定的非标尺寸量产能力，并针对不同应用提供灵活起订量方案。", "汽车电子", "液态铝电解电容器"],
    ["F003", "1439", "非标准直径的电容会不会在纹波电流和寿命方面缩水？", "通过强化电解液配方和优化电极箔工艺，缩小直径的同时保障电气性能。", "汽车电子", "液态铝电解电容器"],
    ["F004", "1424", "机器人关节驱动器PCB面积受限，有无更好的电容方案？", "可使用低ESR、高纹波的LKZ系列代替大量并联器件，同时降低空间与成本压力。", "机器人", "液态铝电解电容器"],
    ["F006", "1433", "DCDC上并联的电容待机功耗总是超标，有没有解决方案？", "选用低漏电的VHU系列，多颗并联时仍可控制整机待机功耗。", "汽车电子", "高分子混合动力铝电解电容器"],
    ["F029", "1412", "有没有8F/11V左右、可掉电自动上线的RAID缓存保护超级电容模块？", "推荐SDM 8.0F/13.5V模块，具备掉电自动上线功能，适配RAID缓存回写窗口。", "AI服务器与数据中心", "双电层超级电容器"],
    ["F032", "1413", "E1.S/E3.S SSD限高2.05mm，能否提供1.9mm以下的钽电容？", "可选TQD19和TQW19系列，高度均为1.9mm，适配超薄企业级SSD。", "AI服务器与数据中心", "导电高分子钽电解电容器"],
    ["F038", "1422", "800V平台OBC的DC-Link如何在体积、耐纹波和成本之间平衡？", "永铭CW3H系列可在缩小体积的同时提升耐纹波能力，成本低于金属化聚丙烯薄膜电容方案。", "汽车电子", "液态铝电解电容器"],
    ["F045", "1429", "GPU负载阶跃时母线电压下陷和过冲，有什么超级电容方案？", "推荐SDF 3.0V 330F方形超级电容，低ESR可抑制母线电压下陷与过冲。", "AI服务器与数据中心", "双电层超级电容器"],
    ["F051", "1436", "夏季充电桩内部温度高，电容容易衰减快、寿命短，如何解决？", "CW3H、CW6H系列工作温度覆盖-40~105℃，可满足充电桩长期使用要求。", "光储充", "液态铝电解电容器"]
  ].map(function (item) {
    const article = articleSamples.find(function (candidate) { return candidate.contentId === "CONTENT-FRONT-" + item[1]; });
    return {
      id: "FAQ-FRONT-" + item[0],
      contentId: "FAQ-CONTENT-FRONT-" + item[0],
      question: item[2],
      answer: item[3],
      type: "应用与选型",
      application: item[4],
      productLine: item[5],
      sourceArticleId: "CONTENT-FRONT-" + item[1],
      sourceArticleTitle: article ? article.title : "前端知识库文章",
      source: "从前端文章FAQ数据提取",
      aiConfidence: "人工已确认",
      relations: 2,
      language: "简体中文",
      status: "已发布",
      updatedAt: "2026-07-03"
    };
  });
  mergeRecords("faqs", faqSamples, false);

  const relationSamples = [];
  articleSamples.forEach(function (article, index) {
    String(article.applications || "").split(",").filter(Boolean).forEach(function (application, appIndex) {
      relationSamples.push({
        id: "REL-FRONT-ARTICLE-APP-" + article.contentId + "-" + (appIndex + 1),
        sourceType: "文章",
        sourceId: article.contentId,
        sourceName: article.title,
        relationType: "推荐新闻",
        targetType: "应用领域",
        targetId: application,
        targetName: application,
        scope: "应用中心",
        effectCount: 1,
        validation: "前端已展示",
        priority: index + appIndex + 1,
        source: "support-articles.json",
        status: "已发布"
      });
    });
    String(article.series || "").split(",").filter(Boolean).forEach(function (series, seriesIndex) {
      relationSamples.push({
        id: "REL-FRONT-ARTICLE-SERIES-" + article.contentId + "-" + (seriesIndex + 1),
        sourceType: "文章",
        sourceId: article.contentId,
        sourceName: article.title,
        relationType: "推荐新闻",
        targetType: "产品系列",
        targetId: series,
        targetName: series + "系列",
        scope: "系列下CRM当前同步料号",
        effectCount: 0,
        validation: "前端已展示",
        priority: seriesIndex + 1,
        source: "support-articles.json",
        status: "已发布"
      });
    });
  });
  faqSamples.forEach(function (faq) {
    relationSamples.push({
      id: "REL-FRONT-FAQ-SOURCE-" + faq.id,
      sourceType: "FAQ",
      sourceId: faq.contentId,
      sourceName: faq.question,
      relationType: "来源文章",
      targetType: "文章",
      targetId: faq.sourceArticleId,
      targetName: faq.sourceArticleTitle,
      scope: "仅当前FAQ",
      effectCount: 1,
      validation: "校验通过",
      priority: 1,
      source: "FAQ发布时建立",
      status: "已发布"
    });
  });
  mergeRecords("relations", relationSamples, false);

  admin.frontendValidation = {
    source: "当前前端数据文件",
    generatedAt: "2026-08-19",
    counts: {
      products: productRecords.length,
      series: seriesRecords.length,
      terminals: terminals.length,
      terminalProducts: terminalProducts.length,
      downloads: downloadRecords.length,
      compliance: systemCertificates.length + productCertificates.length,
      cadModels: cadRecords.length,
      cadMappings: cadMappings.length,
      articles: articleSamples.length,
      faqs: faqSamples.length,
      honors: (about.honors || []).length,
      dealers: (about.distributors || []).length,
      jobs: (about.jobs || []).length
    }
  };
})(window);
