(function () {
  "use strict";

  const seed = window.ADMIN_DATA;
  const storageKey = "ymin-admin-console-v1";
  const roleStorageKey = "ymin-admin-console-role-view-v1";
  const state = {
    current: "dashboard",
    database: loadDatabase(),
    roleView: loadRoleView(),
    search: "",
    status: "",
    category: "",
    page: 1,
    pageSize: 12,
    trafficPeriod: 14,
    selectedArticleId: "ART-001",
    editing: null,
    drawerMode: "edit"
  };

  const els = {
    sideNav: document.getElementById("sideNav"),
    sidebar: document.getElementById("sidebar"),
    main: document.getElementById("mainContent"),
    breadcrumb: document.getElementById("breadcrumb"),
    mobileNavButton: document.getElementById("mobileNavButton"),
    navSearchTrigger: document.getElementById("navSearchTrigger"),
    commandPalette: document.getElementById("commandPalette"),
    commandInput: document.getElementById("commandInput"),
    commandResults: document.getElementById("commandResults"),
    drawer: document.getElementById("editorDrawer"),
    drawerBackdrop: document.getElementById("drawerBackdrop"),
    drawerBody: document.getElementById("drawerBody"),
    drawerTitle: document.getElementById("drawerTitle"),
    drawerEyebrow: document.getElementById("drawerEyebrow"),
    drawerClose: document.getElementById("drawerClose"),
    drawerCancel: document.getElementById("drawerCancel"),
    editorForm: document.getElementById("editorForm"),
    saveDraftButton: document.getElementById("saveDraftButton"),
    drawerSubmitButton: document.querySelector('#editorForm button[type="submit"]'),
    modalBackdrop: document.getElementById("modalBackdrop"),
    modalTitle: document.getElementById("modalTitle"),
    modalEyebrow: document.getElementById("modalEyebrow"),
    modalBody: document.getElementById("modalBody"),
    modalFooter: document.getElementById("modalFooter"),
    modalClose: document.getElementById("modalClose"),
    toastRegion: document.getElementById("toastRegion"),
    importFileInput: document.getElementById("importFileInput"),
    previewSiteButton: document.getElementById("previewSiteButton"),
    roleViewSelect: document.getElementById("roleViewSelect"),
    siteScopeChip: document.getElementById("siteScopeChip"),
    currentUserName: document.getElementById("currentUserName"),
    currentUserRole: document.getElementById("currentUserRole")
  };

  function loadRoleView() {
    const value = localStorage.getItem(roleStorageKey);
    return seed.roleProfiles && seed.roleProfiles[value] ? value : "zh";
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadDatabase() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const database = Object.assign(clone(seed.datasets), parsed);

        function mergeSeedRecords(datasetName) {
          const defaults = seed.datasets[datasetName] || [];
          const saved = Array.isArray(parsed[datasetName]) ? parsed[datasetName] : [];
          const defaultIds = new Set(defaults.map(function (record) { return record.id; }));
          const mergedDefaults = defaults.map(function (record) {
            const savedRecord = saved.find(function (item) { return item.id === record.id; });
            return Object.assign({}, record, savedRecord || {});
          });
          return mergedDefaults.concat(saved.filter(function (record) { return !defaultIds.has(record.id); }));
        }

        database.banners = mergeSeedRecords("banners").map(function (record) {
          const defaultRecord = seed.datasets.banners.find(function (item) { return item.id === record.id; });
          return Object.assign({}, record, {
            leftPanel: record.leftPanel || (defaultRecord && defaultRecord.leftPanel) || "隐藏"
          });
        });
        database.homepageStats = mergeSeedRecords("homepageStats");
        database.homepageProductCards = mergeSeedRecords("homepageProductCards");
        database.homepageApplicationCards = mergeSeedRecords("homepageApplicationCards");
        database.navigation = mergeSeedRecords("navigation").filter(function (record) {
          return !/^NAV-\d+$/.test(record.id || "");
        });
        database.footers = mergeSeedRecords("footers").map(function (record) {
          delete record.status;
          return record;
        });
        database.applicationOverview = mergeSeedRecords("applicationOverview").map(function (record) {
          delete record.status;
          return record;
        });
        database.applications = mergeSeedRecords("applications");
        database.applicationHighlights = mergeSeedRecords("applicationHighlights");
        database.applicationToolHighlights = mergeSeedRecords("applicationToolHighlights");
        database.terminals = mergeSeedRecords("terminals");
        database.appProducts = mergeSeedRecords("appProducts");
        database.designOverview = mergeSeedRecords("designOverview");
        database.supportOverview = mergeSeedRecords("supportOverview");
        database.supportOverviewCards = mergeSeedRecords("supportOverviewCards");
        database.aboutOverview = mergeSeedRecords("aboutOverview");
        database.aboutOverviewCards = mergeSeedRecords("aboutOverviewCards");
        database.aboutPageBackgrounds = mergeSeedRecords("aboutPageBackgrounds");
        delete database.homepageFeaturedArticles;
        database.newsFeaturedArticles = mergeSeedRecords("newsFeaturedArticles");
        database.frontendChanges = mergeSeedRecords("frontendChanges");
        database.articles = mergeSeedRecords("articles").map(function (article) {
          article.channels = "新闻资讯";
          if (article.draft) article.draft.channels = "新闻资讯";
          return article;
        });
        database.faqs = mergeSeedRecords("faqs");
        database.downloads = mergeSeedRecords("downloads");
        database.compliance = mergeSeedRecords("compliance");
        database.aboutContent = mergeSeedRecords("aboutContent");
        database.honors = mergeSeedRecords("honors");
        database.dealerPage = mergeSeedRecords("dealerPage");
        database.dealers = mergeSeedRecords("dealers").map(function (record) {
          return { id: record.id, company: record.company || "", authorizationDate: record.authorizationDate || "" };
        });
        database.jobs = mergeSeedRecords("jobs");
        database.procurementPage = mergeSeedRecords("procurementPage");
        database.procurementPrinciples = mergeSeedRecords("procurementPrinciples");
        database.procurementCooperations = mergeSeedRecords("procurementCooperations");
        database.procurementSteps = mergeSeedRecords("procurementSteps");
        database.procurement = mergeSeedRecords("procurement");
        database.languagePacks = mergeSeedRecords("languagePacks");
        database.permissions = mergeSeedRecords("permissions").filter(function (record) { return ["ROLE-ZH-OPS", "ROLE-INTL-OPS"].includes(record.id); });
        database.relations = mergeSeedRecords("relations");
        database.products = mergeSeedRecords("products");
        database.series = mergeSeedRecords("series");
        database.productAiKeywords = mergeSeedRecords("productAiKeywords");
        database.shopLinks = mergeSeedRecords("shopLinks");
        database.cadModels = mergeSeedRecords("cadModels");
        database.cadMappings = mergeSeedRecords("cadMappings");
        // 早期原型中为了撑起空页而手写的少量示例数据，在引入当前前端数据后不再保留。
        const obsoletePrototypeIds = {
          appProducts: ["APR-001", "APR-002", "APR-003"],
          compliance: ["CERT-LIQ-ROHS", "CERT-LIQ-REACH", "CERT-LIQ-HF", "CERT-ISO9001"],
          series: ["SER-SDA", "SER-VMM", "SER-LKM"],
          cadModels: ["CAD-001", "CAD-002"],
          cadMappings: ["CADMAP-001", "CADMAP-002"],
          honors: ["HONOR-001", "HONOR-002"],
          dealers: ["DEALER-001", "DEALER-002"],
          jobs: ["JOB-QUALITY-MGR", "JOB-BD"]
        };
        Object.keys(obsoletePrototypeIds).forEach(function (datasetName) {
          const removedIds = obsoletePrototypeIds[datasetName];
          database[datasetName] = (database[datasetName] || []).filter(function (record) { return !removedIds.includes(record.id); });
        });
        database.tools = mergeSeedRecords("tools").map(function (tool) {
          if (tool.id === "TOOL-CAD") tool.records = 299;
          if (tool.id === "TOOL-SPICE" || tool.id === "TOOL-REL") tool.records = 0;
          if (/会员/.test(String(tool.access || ""))) tool.access = "基本信息验证";
          return tool;
        });
        const obsoleteDemoSpiceIds = ["SPICE-001", "SPICE-002"];
        const obsoleteDemoReliabilityIds = ["RELTEST-001", "RELTEST-002"];
        database.spiceModels = (database.spiceModels || []).filter(function (record) { return !obsoleteDemoSpiceIds.includes(record.id); });
        database.reliability = (database.reliability || []).filter(function (record) { return !obsoleteDemoReliabilityIds.includes(record.id); });
        database.products.forEach(function (product) {
          if (database.productAiKeywords.some(function (item) { return item.itemNo === product.itemNo; })) return;
          database.productAiKeywords.push({ id: "AIKW-" + product.id, itemNo: product.itemNo, productLine: product.productLine, series: product.series, aiKeywords: "", updatedAt: "" });
        });
        return normalizeDatabase(database);
      }
    } catch (error) {
      console.warn("无法读取本地后台数据", error);
    }
    return normalizeDatabase(clone(seed.datasets));
  }

  function normalizeDatabase(database) {
    delete database.workflows;

    // 仅迁移旧版原型中由演示文案生成的默认值。已被运营人员改写的内容不会被覆盖。
    function seedRecord(datasetName, id) {
      return (seed.datasets[datasetName] || []).find(function (record) { return record.id === id; });
    }
    function replaceIfStale(record, key, staleValues, currentValue) {
      if (!record || !staleValues.includes(record[key])) return;
      record[key] = currentValue;
    }
    function applyFrontendBaselineMigrations() {
      (database.applicationOverview || []).forEach(function (record) {
        const current = seedRecord("applicationOverview", record.id);
        if (!current) return;
        replaceIfStale(record, "introduction", [
          "从汽车电子到AI数据中心，从工业设备到消费电子，探索永铭电容在各关键应用领域的电路拓扑与推荐产品。",
          "Explore YMIN capacitor solutions, application structures and recommended products across key industries."
        ], current.introduction);
        replaceIfStale(record, "featuredResourceId", ["RES-CATALOG-ALL", "RES-CATALOG-ALL-EN"], current.featuredResourceId);
        delete record.heroImage;
        delete record.toolsSectionTitle;
        delete record.featuredSummary;
      });

      (database.applications || []).forEach(function (record) {
        const current = seedRecord("applications", record.id);
        if (!current) return;
        replaceIfStale(record, "summaryZh", [
          "覆盖电驱、电控、电源、安全部件、热管理、智能座舱、智能驾驶与车灯等汽车电子应用。",
          "覆盖GPU加速卡、服务器电源、BBU备用电源、RAID磁盘阵列与PLP存储等应用。",
          "面向精密测量仪器、工业自动化仪表和检测设备的电容应用。",
          "面向变频器、伺服驱动器及工业电机控制系统的电容应用。",
          "面向GaN与SiC高频、高压和高功率密度电源的电容应用。",
          "面向机器人关节、感知系统及电源模块的电容应用。",
          "面向无人机电子调速器、飞控及电源系统的电容应用。",
          "面向光伏、储能系统和充电设备的电容应用。",
          "面向笔记本电脑、智能家居、PD快充及LED照明的电容应用。"
        ], current.summaryZh);
        if (String(record.summaryEn || "").indexOf("YMIN capacitor application solutions for ") === 0) record.summaryEn = current.summaryEn;
        if (record.tagsEn === "High reliability, optimized selection") record.tagsEn = current.tagsEn;
        if (record.updatedAt === "2026-08-10" && !record.cardNoteZh) record.cardNoteZh = current.cardNoteZh;
        if (record.updatedAt === "2026-08-10" && !record.cardNoteEn) record.cardNoteEn = current.cardNoteEn;
        delete record.coverZh;
        delete record.coverEn;
      });

      (database.applicationToolHighlights || []).forEach(function (record) {
        const current = seedRecord("applicationToolHighlights", record.id);
        if (!current) return;
        const staleToolById = {
          "APP-TOOL-ZH-02": "TOOL-CAD", "APP-TOOL-ZH-03": "TOOL-SPICE",
          "APP-TOOL-EN-02": "TOOL-CAD", "APP-TOOL-EN-03": "TOOL-SPICE"
        };
        if (staleToolById[record.id] && record.toolId === staleToolById[record.id]) record.toolId = current.toolId;
        if (!record.displayName) record.displayName = current.displayName;
        if (!record.shortText) record.shortText = current.shortText;
      });
      (database.applicationHighlights || []).forEach(function (record) { delete record.image; });

      (database.designOverview || []).forEach(function (record) {
        const current = seedRecord("designOverview", record.id);
        if (!current) return;
        replaceIfStale(record, "introduction", [
          "为工程师提供从模型、寿命推算到可靠性数据的设计支持。",
          "Engineering resources covering models, lifetime estimation and reliability data."
        ], current.introduction);
        replaceIfStale(record, "workflowText", [
          "选型 → 使用寿命推算工具验证 → 下载3D-CAD进行布局 → 使用SPICE模型仿真 → 查阅可靠性实验数据",
          "Select products → Estimate lifetime → Download 3D-CAD → Run SPICE simulation → Review reliability data"
        ], current.workflowText);
        delete record.heroImage;
        delete record.cardsSectionTitle;
      });

      (database.supportOverview || []).forEach(function (record) {
        const current = seedRecord("supportOverview", record.id);
        if (!current) return;
        replaceIfStale(record, "introduction", ["A unified entry to technical articles, FAQs, downloads and compliance documents."], current.introduction);
        delete record.heroImage;
        delete record.cardsSectionTitle;
      });

      (database.supportOverviewCards || []).forEach(function (record) {
        const current = seedRecord("supportOverviewCards", record.id);
        if (!current) return;
        const staleSummaries = [
          "阅读产品动态、应用方案和完整技术文章。",
          "搜索常见问题并继续查看相关技术文章和资料。",
          "获取产品目录册、应用选型手册和公开技术资料。",
          "Read product news, application solutions and technical articles.",
          "Search common questions and related technical resources.",
          "Access product catalogs, selection guides and public documents.",
          "Review product compliance and management-system certificates."
        ];
        replaceIfStale(record, "summary", staleSummaries, current.summary);
        delete record.image;
      });

      (database.aboutOverview || []).forEach(function (record) {
        const current = seedRecord("aboutOverview", record.id);
        if (!current) return;
        const staleValues = {
          heroTitle: ["Focused on Capacitor Development, Manufacturing and Applications"],
          heroText: ["YMIN develops, manufactures and supports capacitor products for diverse application requirements."],
          overviewText: ["Explore company development, technical capabilities and official business information."],
          capabilityText: [
            "围绕汽车电子、AI服务器与数据中心、工业电源、新能源和消费电子等应用场景，提供覆盖多种材料体系和封装形态的电容器产品。",
            "Capacitor solutions for automotive electronics, AI data centers, industrial power, new energy and consumer electronics."
          ],
          capabilityItems: [
            "研发｜围绕材料、结构、工艺与应用需求持续开展产品开发\n制造｜以稳定制造和过程控制支撑产品一致性与交付\n应用｜针对不同整机系统提供参数选型与应用协同\n质量｜按适用体系和产品要求持续维护质量与合规资料",
            "R&D｜Product development around materials, structures, processes and applications\nManufacturing｜Stable process control for consistent product delivery\nApplications｜Selection and engineering support for end systems\nQuality｜Quality and compliance management for applicable requirements"
          ],
          productText: ["Products, application selection and technical resources organized by product line."],
          ctaTitle: ["Need Selection or Project Support?"],
          ctaText: ["Share your application, target parameters or complete part number with YMIN."]
        };
        Object.keys(staleValues).forEach(function (key) { replaceIfStale(record, key, staleValues[key], current[key]); });
        if (typeof record.capabilitySecondaryText === "undefined") record.capabilitySecondaryText = current.capabilitySecondaryText;
        if (typeof record.capabilityBullets === "undefined") record.capabilityBullets = current.capabilityBullets;
      });

      (database.aboutOverviewCards || []).forEach(function (record) {
        const current = seedRecord("aboutOverviewCards", record.id);
        if (!current) return;
        const staleSummaries = [
          "查看企业资质、知识产权与技术成果。",
          "获取国内、海外业务及产品服务热线。",
          "了解招聘方向、工作地点和最新公开职位。",
          "了解采购原则、供应商要求和准入流程。",
          "Company overview, milestones, products and manufacturing.",
          "Company qualifications, intellectual property and achievements.",
          "Find publicly authorized YMIN distributors.",
          "Contact YMIN for global business and product support."
        ];
        replaceIfStale(record, "summary", staleSummaries, current.summary);
        delete record.image;
      });

      (database.tools || []).forEach(function (record) {
        const current = seedRecord("tools", record.id);
        if (!current) return;
        const stale = {
          "TOOL-LIFE": {
            name: ["寿命推算工具"], displayNameZh: ["寿命推算工具"], displayNameEn: ["Lifetime Estimation Tool"],
            summaryZh: ["输入工作温度、电压和纹波等参数进行寿命推算。"], summaryEn: ["Estimate capacitor lifetime from operating conditions."],
            tagsZh: ["在线推算, 工况对比"], tagsEn: ["Online estimation, Condition comparison"], sort: [1]
          },
          "TOOL-CAD": {
            displayNameZh: ["3D-CAD模型"], summaryZh: ["按完整料号查询或申请STEP格式的产品三维模型。"], summaryEn: ["Find or request STEP-format product models by complete part number."],
            tagsZh: ["STEP, 按料号查询"], tagsEn: ["STEP, Part-number search"], sort: [2]
          },
          "TOOL-SPICE": {
            name: ["SPICE模型"], displayNameZh: ["SPICE模型"], summaryZh: ["查询和下载产品电路仿真模型。"], summaryEn: ["Find product circuit-simulation models."],
            tagsZh: ["电路仿真"], tagsEn: ["Circuit simulation"], sort: [3]
          },
          "TOOL-REL": {
            summaryZh: ["按系列查询高温负荷、耐湿和温度循环等实测数据。"], summaryEn: ["Review reliability test data by product series."],
            tagsEn: ["Load life, Temperature cycling"], sort: [4]
          }
        };
        Object.keys(stale[record.id] || {}).forEach(function (key) { replaceIfStale(record, key, stale[record.id][key], current[key]); });
        delete record.cardImageZh;
        delete record.cardImageEn;
      });
    }

    applyFrontendBaselineMigrations();
    Object.keys(database).forEach(function (datasetName) {
      if (!Array.isArray(database[datasetName])) return;
      database[datasetName].forEach(function (record) {
        if (record.status === "待审核") {
          if (["cadRequests", "leads"].includes(datasetName)) record.status = "待处理";
          else if (datasetName === "procurement") record.status = "处理中";
          else record.status = "草稿";
        }
        if (record.draftStatus === "待审核") record.draftStatus = "草稿";
        if (["cadRequests", "leads"].includes(datasetName) && record.status === "已发布") record.status = "已完成";
        if (datasetName === "procurement" && record.status === "已发布") record.status = "处理中";
      });
    });
    (database.articles || []).forEach(function (article) {
      article.contentId = article.id.replace(/-EN$/, "");
      if (!article.language) article.language = "简体中文";
    });
    (database.faqs || []).forEach(function (faq) {
      if (!faq.language) faq.language = "简体中文";
      if (!faq.contentId) faq.contentId = faq.id.replace(/-EN$/, "");
      if (faq.sourceArticleId === "CONTENT-001") faq.sourceArticleId = "ART-001";
    });
    (database.products || []).forEach(function (product) { delete product.source; delete product.status; });
    (database.productAiKeywords || []).forEach(function (record) { delete record.source; delete record.status; });
    (database.series || []).forEach(function (record) { delete record.status; delete record.products; });
    ["applicationOverview", "homepageStats", "homepageProductCards", "applications", "supportOverview", "supportOverviewCards", "designOverview", "aboutContent", "aboutOverview", "aboutOverviewCards", "honors"].forEach(function (datasetName) {
      (database[datasetName] || []).forEach(function (record) { delete record.status; });
    });
    (database.homepage || []).forEach(function (record) {
      if (record.status === "已发布") record.status = "当前版本";
      else if (record.status === "已下架") record.status = "历史版本";
      else if (!["编辑中", "当前版本", "历史版本"].includes(record.status)) record.status = "编辑中";
    });
    (database.navigation || []).forEach(function (record) {
      if (!["显示", "隐藏"].includes(record.status)) record.status = record.status === "已发布" ? "显示" : "隐藏";
    });
    (database.frontendChanges || []).forEach(function (record) {
      if (!["待开发", "处理中", "已完成"].includes(record.status)) record.status = record.status === "已发布" ? "已完成" : "待开发";
    });
    (database.replacements || []).forEach(function (record) {
      if (!["待确认", "有效", "停用"].includes(record.status)) record.status = record.status === "已发布" ? "有效" : (record.status === "已下架" ? "停用" : "待确认");
    });
    (database.jobs || []).forEach(function (record) {
      if (!["招聘中", "已结束"].includes(record.status)) record.status = record.status === "已下架" ? "已结束" : "招聘中";
    });
    (database.agreements || []).forEach(function (record) {
      if (!["当前生效", "历史版本"].includes(record.status)) record.status = record.status === "已发布" ? "当前生效" : "历史版本";
    });
    return database;
  }

  function saveDatabase() {
    localStorage.setItem(storageKey, JSON.stringify(state.database));
  }

  function currentProfile() {
    return seed.roleProfiles[state.roleView] || seed.roleProfiles.zh;
  }

  function canAccessModule(id) {
    const allowed = seed.roleModuleAccess[state.roleView] || [];
    return allowed.includes(id);
  }

  function isLocalizedDataset(dataset) {
    return (seed.localizedDatasets || []).includes(dataset);
  }

  function recordVisibleForRole(dataset, record) {
    if (state.roleView === "admin") return true;
    const profile = currentProfile();
    if (isLocalizedDataset(dataset)) return String(record.language || "简体中文") === profile.language;
    if (dataset === "leads") {
      return state.roleView === "international" ? record.type === "国际应用咨询" : record.type !== "国际应用咨询";
    }
    return true;
  }

  function scopedDataset(dataset) {
    return (state.database[dataset] || []).filter(function (record) { return recordVisibleForRole(dataset, record); });
  }

  function relationSourceId(article) {
    return article && (article.contentId || article.id);
  }

  function moduleScope(id) {
    const declared = seed.moduleScopes[id];
    if (declared) return declared;
    return "全站共享";
  }

  function scopeTone(scope) {
    if (/中文专属/.test(scope)) return "scope-zh";
    if (/英文|国际|英文版生成/.test(scope)) return "scope-international";
    if (/IT/.test(scope)) return "scope-it";
    return "scope-shared";
  }

  function updateRoleIdentity() {
    const profile = currentProfile();
    els.roleViewSelect.value = state.roleView;
    els.siteScopeChip.textContent = profile.site;
    els.currentUserRole.textContent = profile.name;
    els.currentUserName.textContent = state.roleView === "international" ? "国际官网运营" : "中文官网运营";
    els.previewSiteButton.innerHTML = '<span>↗</span> 预览' + profile.site.replace(" / English Base", "");
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function todayTime() {
    const date = new Date();
    const pad = function (value) { return String(value).padStart(2, "0"); };
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function statusClass(value) {
    const text = String(value || "");
    if (/已发布|已完成|当前版本|当前生效|正常|成功|已关联|有效|招聘中|显示|已覆盖|校验通过/.test(text)) return "status-published";
    if (/草稿|编辑中|待开发|待处理|处理中|待.*确认/.test(text)) return "status-pending";
    if (/下架|禁用|停用|隐藏|历史版本|已结束|已到期|失效|失败|过期/.test(text)) return "status-disabled";
    return "status-default";
  }

  function statusPill(value) {
    return '<span class="status ' + statusClass(value) + '">' + escapeHtml(value || "—") + "</span>";
  }

  function toast(message, type) {
    const item = document.createElement("div");
    item.className = "toast" + (type === "error" ? " error" : "");
    item.textContent = message;
    els.toastRegion.appendChild(item);
    setTimeout(function () { item.remove(); }, 3200);
  }

  function moduleCount(id) {
    const config = seed.moduleConfigs[id];
    if (!config || !config.dataset || !state.database[config.dataset]) return "";
    const length = scopedDataset(config.dataset).length;
    return length > 0 ? String(length) : "";
  }

  function renderNavigation() {
    let previousArea = "";
    els.sideNav.innerHTML = seed.navGroups.map(function (group) {
      const visibleItems = group.items.filter(function (item) { return canAccessModule(item[0]); });
      if (!visibleItems.length) return "";
      const areaHeading = group.area && group.area !== previousArea
        ? '<div class="nav-area-heading"><span></span>' + escapeHtml(group.area) + '</div>'
        : "";
      previousArea = group.area || previousArea;
      const containsCurrent = visibleItems.some(function (item) { return item[0] === state.current; });
      const itemHtml = visibleItems.map(function (item) {
        const id = item[0];
        const count = moduleCount(id);
        return '<button type="button" class="nav-item' + (id === state.current ? " is-active" : "") + '" data-route="' + id + '">' +
          '<span>' + escapeHtml(item[1]) + '</span>' + (count ? '<b class="nav-count">' + count + "</b>" : "") + "</button>";
      }).join("");
      return areaHeading + '<section class="nav-group' + (containsCurrent || group.label === "工作台" ? " is-open" : "") + '" data-nav-group>' +
        '<button class="nav-group-toggle" type="button" data-nav-toggle><span>' + escapeHtml(group.icon) + '</span><strong>' + escapeHtml(group.label) + '</strong><span class="nav-chevron">›</span></button>' +
        '<div class="nav-items">' + itemHtml + "</div></section>";
    }).join("");

    els.sideNav.querySelectorAll("[data-nav-toggle]").forEach(function (button) {
      button.addEventListener("click", function () { button.closest("[data-nav-group]").classList.toggle("is-open"); });
    });
    els.sideNav.querySelectorAll("[data-route]").forEach(function (button) {
      button.addEventListener("click", function () {
        navigate(button.dataset.route);
        els.sidebar.classList.remove("is-open");
      });
    });
  }

  function navigate(route) {
    if (!seed.moduleConfigs[route] || !canAccessModule(route)) route = "dashboard";
    if (location.hash !== "#" + route) location.hash = route;
    else setRoute(route);
  }

  function setRoute(route) {
    state.current = seed.moduleConfigs[route] && canAccessModule(route) ? route : "dashboard";
    state.search = "";
    state.status = "";
    state.category = "";
    state.page = 1;
    renderNavigation();
    renderPage();
    els.main.focus({ preventScroll: true });
  }

  function permissionContextHtml(config) {
    const profile = currentProfile();
    const scope = moduleScope(state.current);
    let rule = "该模块使用一套全站共享数据，中英文页面不用重复建立产品、应用或资料关联。";
    if (scope === "中英文分别维护") rule = state.roleView === "admin" ? "当前同时查看中文与英文版本；两种正文归到同一篇内容下，产品和应用的关联只需维护一次，其他语言不逐条维护。" : "当前只显示并维护“" + profile.language + "”版本；同一内容的中文与英文版本归到一起，产品和应用的关联只需维护一次。";
    if (scope === "中文专属") rule = "该页面仅在中文官网展示，国际官网运营账号不可见。";
    if (scope === "按账号范围") rule = state.roleView === "international" ? "当前仅显示国际版官网咨询；中文工具登记与国内表单不在此账号范围内。" : "当前仅显示中文官网表单；国际版咨询由国际官网运营账号处理。";
    if (scope === "由英文版生成") rule = "除中英文外的语言不逐条维护，系统读取已确认的英文内容与国际版结构生成；此处仅查看同步和抽检状态。";
    if (scope === "仅IT可见") rule = "该模块只对IT/全站管理员开放，用于页面定位、代码维护或系统配置，不进入日常运营菜单。";
    return '<section class="permission-context"><div><small>当前CRM账号视角</small><strong>' + escapeHtml(profile.name) + '</strong></div><div><small>当前维护站点</small><strong>' + escapeHtml(profile.site) + '</strong><p>' + escapeHtml(rule) + '</p></div><span class="scope-badge ' + scopeTone(scope) + '">' + escapeHtml(scope) + '</span></section>';
  }

  function pageHeader(config, actions) {
    const actionHtml = actions || "";
    const descriptionHtml = config.description ? '<p>' + escapeHtml(config.description) + '</p>' : "";
    return '<header class="page-header"><div><span class="eyebrow">' + escapeHtml(config.group || "官网运营") + '</span><h1>' + escapeHtml(config.title) + '</h1>' + descriptionHtml + '</div><div class="header-actions">' + actionHtml + "</div></header>" + (config.showPermissionContext ? permissionContextHtml(config) : "");
  }

  function renderPage() {
    if (!canAccessModule(state.current)) state.current = "dashboard";
    const config = seed.moduleConfigs[state.current];
    els.breadcrumb.innerHTML = escapeHtml(config.group || "工作台") + (config.title !== config.group ? " / <b>" + escapeHtml(config.title) + "</b>" : "");
    document.title = config.title + "｜永铭新官网运营后台";
    if (config.kind === "dashboard") return renderDashboard(config);
    if (config.kind === "traffic-module") return renderTrafficModule(config);
    if (config.kind === "product-master") return renderProductMaster(config);
    if (config.kind === "application-tree") return renderApplicationTree(config);
    if (config.kind === "footer-manager") return renderFooterManager(config);
    if (config.kind === "table") return renderTablePage(config);
    if (config.kind === "resources") return renderResources(config);
    if (config.kind === "article-workbench") return renderArticleWorkbench(config);
    if (config.kind === "guide-links") return renderGuideLinks(config);
    if (config.kind === "ai-keywords") return renderAiKeywordManager(config);
    if (config.kind === "app-products") return renderAppProductLinks(config);
    if (config.kind === "cad-library") return renderCadLibrary(config);
    if (config.kind === "about-page-backgrounds") return renderAboutPageBackgrounds(config);
    if (config.kind === "procurement-page") return renderProcurementPage(config);
    if (config.kind === "dealer-network") return renderDealerNetwork(config);
    if (config.kind === "import") return renderImport(config);
    els.main.innerHTML = pageHeader(config) + '<div class="panel"><div class="panel-body">该模块正在配置。</div></div>';
  }

  function renderDashboard(config) {
    const pendingArticles = (state.database.articles || []).filter(function (item) { return item.status !== "已发布"; }).length;
    const pendingFaqs = (state.database.faqs || []).filter(function (item) { return item.status !== "已发布"; }).length;
    const incompleteSeries = (state.database.series || []).filter(function (item) { return !item.pdf || !item.image; }).length;
    const pendingRelations = (state.database.relations || []).filter(function (item) { return item.status !== "已发布" || item.validation !== "校验通过"; }).length;
    const pendingCad = (state.database.cadRequests || []).filter(function (item) { return item.crmStatus !== "已完成"; }).length;
    const pendingLeads = (state.database.leads || []).filter(function (item) { return item.crmStatus === "待跟进"; }).length;
    const pendingForms = pendingCad + pendingLeads + (state.database.jobApplications || []).filter(function (item) { return item.crmStatus !== "已完成"; }).length + (state.database.procurement || []).filter(function (item) { return item.crmStatus !== "已完成"; }).length;
    const pendingContent = pendingArticles + pendingFaqs;
    const maintenanceItems = incompleteSeries + pendingRelations + pendingContent;
    els.main.innerHTML = pageHeader(config) +
      '<section class="workbench-kpi-grid">' +
        workbenchKpi("待维护内容", maintenanceItems, "资料、文章、FAQ与关联关系", "articles", maintenanceItems ? "warning" : "good") +
        workbenchKpi("待发布内容", pendingContent, "新闻文章与FAQ知识", "articles", pendingContent ? "warning" : "good") +
        workbenchKpi("待补系列主资料", incompleteSeries, "系列PDF或产品图片", "series", incompleteSeries ? "warning" : "good") +
        workbenchKpi("待跟进申请", pendingForms, "CRM中的咨询、CAD、招聘与采购", "cadRequests", pendingForms ? "warning" : "good") +
      '</section>' +
      '<div class="workbench-layout"><div class="workbench-main">' +
        '<section class="panel"><header class="panel-header"><div><h2>当前账号待办</h2></div></header><div class="task-list">' +
          taskItem("链", pendingRelations + "条内容关系待确认", "在文章或FAQ发布页确认产品与应用关联", "articles") +
          taskItem("档", incompleteSeries + "个系列主资料待补充", "补充系列PDF或产品图后由同系列当前产品自动调用", "series") +
          taskItem("文", pendingContent + "篇内容待发布", "检查正文、FAQ和关联后发布", "articles") +
          (pendingCad ? taskItem("申", pendingCad + "条3D-CAD申请正在CRM跟进", "查看当前处理进度", "cadRequests") : "") +
        '</div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>近期内容维护</h2></div></header><div class="workbench-activity-list">' + dashboardRecentContent() + '</div></section>' +
      '</div><aside class="workbench-side">' +
        '<section class="panel"><header class="panel-header"><div><h2>数据与资料状态</h2></div></header><div class="panel-body health-list">' +
          healthRow("CRM产品同步", state.database.products.length + "个料号已同步", 100, "good") +
          healthRow("系列公共资料", state.database.series.length + "个系列，" + incompleteSeries + "个待补", incompleteSeries ? 74 : 100, incompleteSeries ? "warning" : "good") +
          healthRow("内容关联关系", state.database.relations.length + "条关系，" + pendingRelations + "条待确认", pendingRelations ? 82 : 100, pendingRelations ? "warning" : "good") +
          healthRow("应用终端与料号", state.database.terminals.length + "个终端，" + state.database.appProducts.length + "条推荐", 100, "good") +
        '</div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>常用维护入口</h2></div></header><div class="panel-body module-grid compact-grid">' +
          moduleCard("articles", "文章发布", "发布新闻并建立关联") +
          moduleCard("series", "系列资料", "维护图片与PDF") +
          moduleCard("terminals", "应用终端", "维护终端内容") +
          moduleCard("downloads", "下载中心", "统一维护文件") +
          moduleCard("faqs", "FAQ知识库", "确认并发布FAQ") +
          moduleCard("cadRequests", "3D-CAD申请", "查看CRM跟进记录") +
        '</div></section>' +
      '</aside></div>';
    bindGlobalPageActions();
  }

  function dashboardRecentContent() {
    const rows = scopedDataset("articles").concat(scopedDataset("faqs")).slice().sort(function (a, b) {
      return String(b.updatedAt || b.publishAt || "").localeCompare(String(a.updatedAt || a.publishAt || ""));
    }).slice(0, 5);
    return rows.map(function (item) {
      const isFaq = Boolean(item.question);
      const title = item.title || item.question;
      return '<div class="workbench-activity"><span>' + (isFaq ? "FAQ" : "文章") + '</span><div><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml((item.language || "简体中文") + "｜" + (item.updatedAt || item.publishAt || "")) + '</small></div>' + statusPill(item.status) + '</div>';
    }).join("") || '<div class="empty-state compact">暂无内容维护记录</div>';
  }

  function renderTrafficModule(config) {
    const view = config.analyticsView || "overview";
    const renderers = {
      overview: renderTrafficOverviewBody,
      value: renderPageValueBody,
      sources: renderTrafficSourcesBody,
      ai: renderAiTrafficBody,
      keywords: renderKeywordInsightsBody,
      actions: renderTrafficActionsBody
    };
    els.main.innerHTML = pageHeader(config, analyticsPeriodActions()) + (renderers[view] || renderTrafficOverviewBody)();
    bindTrafficAnalyticsActions();
  }

  function analyticsPeriodActions() {
    return '<div class="period-switch" aria-label="分析周期"><button type="button" data-traffic-period="7" class="' + (state.trafficPeriod === 7 ? "active" : "") + '">近7日</button><button type="button" data-traffic-period="14" class="' + (state.trafficPeriod === 14 ? "active" : "") + '">近14日</button></div>';
  }

  function analyticsTable(headers, rows, emptyText, extraClass) {
    const head = headers.map(function (item) { return '<th>' + escapeHtml(item) + '</th>'; }).join("");
    const body = rows || '<tr><td colspan="' + headers.length + '" class="empty-state">' + escapeHtml(emptyText || "暂无数据") + '</td></tr>';
    return '<div class="table-scroll"><table class="data-table analytics-table ' + escapeHtml(extraClass || "") + '"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';
  }

  function renderTrafficOverviewBody() {
    const trend = trafficTrendRows();
    const pages = visibleTrafficRows("trafficPages").slice().sort(function (a, b) { return Number(b.valueScore || 0) - Number(a.valueScore || 0); });
    const channels = (state.database.trafficChannels || []).slice();
    const alerts = visibleTrafficRows("trafficAlerts").filter(function (item) { return item.status !== "已解决"; });
    const aiSources = visibleTrafficRows("trafficAiSources");
    const aiCrawlers = visibleTrafficRows("trafficAiCrawlers");
    const pv = sumTrafficMetric(trend, "pv");
    const uv = sumTrafficMetric(trend, "uv");
    const actions = trend.reduce(function (sum, item) { return sum + Number(item.actions || 0); }, 0);
    const errors = trend.reduce(function (sum, item) { return sum + Number(item.errors || 0); }, 0);
    const aiVisits = aiSources.reduce(function (sum, item) { return sum + Number(item.visits || 0); }, 0);
    const crawlerHits = aiCrawlers.reduce(function (sum, item) { return sum + Number(item.hits || 0); }, 0);
    const maxChannel = Math.max.apply(null, channels.map(function (item) { return trafficChannelUsers(item); }).concat([1]));
    const channelBars = channels.map(function (item) { return analyticsBar(item.name, trafficChannelUsers(item), maxChannel, item.quality + "｜" + item.note); }).join("");
    const moduleTotals = {};
    pages.forEach(function (item) { moduleTotals[item.module] = (moduleTotals[item.module] || 0) + Number(item.valueScore || 0); });
    const moduleValues = Object.keys(moduleTotals).sort(function (a, b) { return moduleTotals[b] - moduleTotals[a]; });
    const maxModule = Math.max.apply(null, moduleValues.map(function (name) { return moduleTotals[name]; }).concat([1]));
    const moduleBars = moduleValues.map(function (name) { return analyticsBar(name, moduleTotals[name], maxModule, "该模块页面价值分合计"); }).join("");
    const topPage = pages[0] || {};
    const topChannel = channels.slice().sort(function (a, b) { return trafficChannelUsers(b) - trafficChannelUsers(a); })[0] || {};
    const insights = [
      "当前价值最高的页面类型为“" + (topPage.pageType || "暂无") + "”，属于" + (topPage.module || "暂无") + "。",
      "主要获客渠道为“" + (topChannel.name || "暂无") + "”，当前周期访问用户 " + numberText(trafficChannelUsers(topChannel)) + "。",
      "AI平台带来 " + numberText(aiVisits) + " 次访问，大模型爬虫抓取 " + numberText(crawlerHits) + " 次。",
      alerts.length ? "当前有 " + alerts.length + " 项未解决预警，已集中到“运营机会与预警”。" : "当前没有未解决的页面异常。"
    ].map(function (text) { return '<div class="analytics-insight"><span>判断</span><p>' + escapeHtml(text) + '</p></div>'; }).join("");
    return '<section class="analytics-kpi-grid">' +
      trafficKpi("页面浏览量", numberText(pv), "PV", "") +
      trafficKpi("访问用户", numberText(uv), "UV", "") +
      trafficKpi("高价值行为", numberText(actions), "下载、计算、CAD与表单", "good") +
      trafficKpi("AI来源访问", numberText(aiVisits), "来自AI平台的真实点击", "ai") +
      trafficKpi("AI爬虫抓取", numberText(crawlerHits), "大模型抓取官网内容", "ai") +
      trafficKpi("错误请求", numberText(errors), "404、资源与接口异常", errors ? "danger" : "good") +
    '</section>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>浏览量 / 访客数趋势</h2></div><span class="data-time">更新至 2026-08-19 15:00</span></header><div class="panel-body">' + trafficLineChart(trend, false) + '</div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>渠道占比</h2></div></header><div class="analytics-bar-list">' + channelBars + '</div></section></div>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>页面类型贡献</h2></div></header><div class="analytics-bar-list">' + moduleBars + '</div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>本周期判断</h2></div></header><div class="analytics-insight-list">' + insights + '</div></section></div>';
  }

  function renderPageValueBody() {
    const pages = visibleTrafficRows("trafficPages").slice().sort(function (a, b) { return Number(b.valueScore || 0) - Number(a.valueScore || 0); });
    const scores = pages.map(function (item) { return Number(item.valueScore || 0); });
    const average = scores.length ? Math.round(scores.reduce(function (sum, value) { return sum + value; }, 0) / scores.length) : 0;
    const high = pages.filter(function (item) { return Number(item.valueScore || 0) >= 85; }).length;
    const medium = pages.filter(function (item) { return Number(item.valueScore || 0) >= 70 && Number(item.valueScore || 0) < 85; }).length;
    const improve = pages.length - high - medium;
    const opportunityCounts = {};
    (state.database.trafficOpportunities || []).forEach(function (item) { opportunityCounts[item.type] = (opportunityCounts[item.type] || 0) + 1; });
    const maxOpportunity = Math.max.apply(null, Object.keys(opportunityCounts).map(function (key) { return opportunityCounts[key]; }).concat([1]));
    const opportunityBars = Object.keys(opportunityCounts).map(function (key) { return analyticsBar(key, opportunityCounts[key], maxOpportunity, "当前识别的运营机会"); }).join("");
    const rows = pages.map(function (item) {
      const grade = Number(item.valueScore || 0) >= 85 ? "高价值" : Number(item.valueScore || 0) >= 70 ? "稳定" : "待提升";
      return '<tr><td><strong>' + escapeHtml(item.pageType) + '</strong><small>' + escapeHtml(item.page) + '</small></td><td>' + escapeHtml(item.module) + '<small>' + escapeHtml(item.site) + '</small></td><td>' + numberText(item.pv) + '</td><td>' + numberText(item.uv) + '</td><td>' + numberText(item.actions) + '<small>' + escapeHtml(item.actionRate) + '</small></td><td>' + numberText(item.errors) + '</td><td><strong>' + numberText(item.valueScore) + '</strong></td><td>' + statusPill(grade) + '</td></tr>';
    }).join("");
    return '<section class="analytics-kpi-grid analytics-kpi-four">' +
      trafficKpi("纳入分析页面", numberText(pages.length), "新官网页面与动态详情规则", "") +
      trafficKpi("平均页面价值", numberText(average), "综合相对评分", "") +
      trafficKpi("高价值页面", numberText(high), "价值分不低于85", "good") +
      trafficKpi("待提升页面", numberText(improve), "需补内容或修复体验", improve ? "warning" : "good") +
    '</section>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>价值等级</h2></div></header><div class="analytics-bar-list">' + analyticsBar("高价值", high, Math.max(1, pages.length), "85分及以上") + analyticsBar("稳定", medium, Math.max(1, pages.length), "70至84分") + analyticsBar("待提升", improve, Math.max(1, pages.length), "70分以下") + '</div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>机会标签分布</h2></div></header><div class="analytics-bar-list">' + opportunityBars + '</div></section></div>' +
    '<section class="panel"><header class="panel-header"><div><h2>页面价值榜</h2></div><span class="tag">按价值分排序</span></header>' + analyticsTable(["页面", "模块/站点", "PV", "UV", "高价值行为", "错误", "价值分", "等级"], rows, "暂无页面价值数据") + '</section>' +
    contentAnalyticsHtml();
  }

  function renderTrafficSourcesBody() {
    const channels = (state.database.trafficChannels || []).slice();
    const devices = visibleTrafficRows("trafficDevices");
    const regions = visibleTrafficRows("trafficRegions");
    const statusCodes = state.database.trafficStatusCodes || [];
    const pages = visibleTrafficRows("trafficPages").slice().sort(function (a, b) { return Number(b.uv || 0) - Number(a.uv || 0); });
    const channelTotal = channels.reduce(function (sum, item) { return sum + trafficChannelUsers(item); }, 0);
    const organic = channels.filter(function (item) { return item.id === "CHANNEL-ORGANIC"; }).reduce(function (sum, item) { return sum + trafficChannelUsers(item); }, 0);
    const referral = channels.filter(function (item) { return item.id === "CHANNEL-REFERRAL"; }).reduce(function (sum, item) { return sum + trafficChannelUsers(item); }, 0);
    const maxChannel = Math.max.apply(null, channels.map(function (item) { return trafficChannelUsers(item); }).concat([1]));
    const maxDevice = Math.max.apply(null, devices.map(function (item) { return Number(item.users || 0); }).concat([1]));
    const maxRegion = Math.max.apply(null, regions.map(function (item) { return Number(item.users || 0); }).concat([1]));
    const maxStatus = Math.max.apply(null, statusCodes.map(function (item) { return Number(item.count || 0); }).concat([1]));
    const landingRows = pages.slice(0, 8).map(function (item) { return '<tr><td><strong>' + escapeHtml(item.pageType) + '</strong><small>' + escapeHtml(item.page) + '</small></td><td>' + escapeHtml(item.module) + '</td><td>' + numberText(item.uv) + '</td><td>' + numberText(item.actions) + '</td><td>' + escapeHtml(item.actionRate) + '</td></tr>'; }).join("");
    const domains = [
      ["baidu.com", organic, "自然搜索"], ["google.com", Math.round(organic * .44), "自然搜索"], ["chatgpt.com", 318, "AI来源"], ["行业媒体与合作伙伴", referral, "外部引用"]
    ];
    const domainRows = domains.map(function (item) { return '<tr><td><strong>' + escapeHtml(item[0]) + '</strong></td><td>' + escapeHtml(item[2]) + '</td><td>' + numberText(item[1]) + '</td></tr>'; }).join("");
    return '<section class="analytics-kpi-grid analytics-kpi-four">' +
      trafficKpi("渠道访问用户", numberText(channelTotal), "外部获客渠道合计", "") +
      trafficKpi("自然搜索用户", numberText(organic), "搜索引擎进入", "good") +
      trafficKpi("外部引用用户", numberText(referral), "媒体、伙伴与商城", "") +
      trafficKpi("正常访问率", statusCodes[0] ? statusCodes[0].share : "--", "HTTP 200", "good") +
    '</section>' +
    '<div class="analytics-three-grid"><section class="panel"><header class="panel-header"><div><h2>渠道构成</h2></div></header><div class="analytics-bar-list">' + channels.map(function (item) { return analyticsBar(item.name, trafficChannelUsers(item), maxChannel, item.quality + "｜" + item.note); }).join("") + '</div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>设备分布</h2></div></header><div class="analytics-bar-list">' + devices.map(function (item) { return analyticsBar(item.name, item.users, maxDevice, "占比 " + item.share); }).join("") + '</div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>HTTP状态</h2></div></header><div class="analytics-bar-list">' + statusCodes.map(function (item) { return analyticsBar(item.code + " " + item.name, item.count, maxStatus, "占比 " + item.share); }).join("") + '</div></section></div>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>来源域名排行</h2></div></header>' + analyticsTable(["来源域名", "渠道", "访问"], domainRows, "暂无来源域名数据") + '</section>' +
      '<section class="panel"><header class="panel-header"><div><h2>访问地区</h2></div></header><div class="analytics-bar-list">' + regions.map(function (item) { return analyticsBar(item.name, item.users, maxRegion, "占比 " + item.share); }).join("") + '</div></section></div>' +
    '<section class="panel"><header class="panel-header"><div><h2>渠道落地页</h2></div></header>' + analyticsTable(["落地页", "模块", "UV", "高价值行为", "行为率"], landingRows, "暂无渠道落地页数据") + '</section>';
  }

  function renderAiTrafficBody() {
    const sources = visibleTrafficRows("trafficAiSources");
    const crawlers = visibleTrafficRows("trafficAiCrawlers");
    const pages = visibleTrafficRows("trafficPages").slice().sort(function (a, b) { return Number(b.valueScore || 0) - Number(a.valueScore || 0); });
    const sourceUsers = sources.reduce(function (sum, item) { return sum + Number(item.users || 0); }, 0);
    const sourceVisits = sources.reduce(function (sum, item) { return sum + Number(item.visits || 0); }, 0);
    const sourceActions = sources.reduce(function (sum, item) { return sum + Number(item.actions || 0); }, 0);
    const crawlerHits = crawlers.reduce(function (sum, item) { return sum + Number(item.hits || 0); }, 0);
    const sourceRows = sources.map(function (item) { return '<tr><td><strong>' + escapeHtml(item.name) + '</strong><small>' + escapeHtml(item.site) + '</small></td><td>' + numberText(item.users) + '</td><td>' + numberText(item.visits) + '</td><td>' + numberText(item.actions) + '</td><td>' + escapeHtml(item.conversionRate) + '</td></tr>'; }).join("");
    const crawlerRows = crawlers.map(function (item) { return '<tr><td><strong>' + escapeHtml(item.name) + '</strong></td><td>' + numberText(item.hits) + '</td><td>' + numberText(item.pages) + '</td><td>' + escapeHtml(item.lastSeen) + '</td></tr>'; }).join("");
    const referralRows = pages.slice(0, 6).map(function (item) { return '<tr><td><strong>' + escapeHtml(item.pageType) + '</strong><small>' + escapeHtml(item.page) + '</small></td><td>' + escapeHtml(item.module) + '</td><td>' + numberText(Math.max(1, Math.round(Number(item.uv || 0) * .05))) + '</td><td>' + numberText(Math.max(1, Math.round(Number(item.actions || 0) * .08))) + '</td></tr>'; }).join("");
    const crawlerPageRows = pages.slice().sort(function (a, b) { return Number(b.valueScore || 0) - Number(a.valueScore || 0); }).slice(0, 6).map(function (item) { return '<tr><td><strong>' + escapeHtml(item.pageType) + '</strong><small>' + escapeHtml(item.page) + '</small></td><td>' + numberText(Number(item.valueScore || 0) * 4) + '</td><td>' + numberText(item.uv) + '</td><td>' + (Number(item.uv || 0) < 350 ? statusPill("可优化") : statusPill("稳定")) + '</td></tr>'; }).join("");
    return '<section class="analytics-kpi-grid analytics-kpi-four">' +
      trafficKpi("AI来源用户", numberText(sourceUsers), "从AI平台真实进入官网", "ai") +
      trafficKpi("AI来源访问", numberText(sourceVisits), "真实点击访问次数", "ai") +
      trafficKpi("AI来源高价值行为", numberText(sourceActions), "下载、选型与咨询", "good") +
      trafficKpi("AI爬虫抓取", numberText(crawlerHits), "模型抓取次数", "ai") +
    '</section>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>AI来源访问</h2><p>用户从AI平台点击进入官网</p></div></header>' + analyticsTable(["AI平台", "用户", "访问", "高价值行为", "行为率"], sourceRows, "暂无AI来源数据") + '</section>' +
      '<section class="panel"><header class="panel-header"><div><h2>AI爬虫抓取</h2><p>大模型爬虫访问服务器日志</p></div></header>' + analyticsTable(["爬虫", "抓取次数", "页面数", "最近抓取"], crawlerRows, "暂无AI爬虫数据") + '</section></div>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>AI已带来访问的页面</h2></div></header>' + analyticsTable(["页面", "模块", "AI访问", "高价值行为"], referralRows, "暂无AI落地页数据") + '</section>' +
      '<section class="panel"><header class="panel-header"><div><h2>AI抓取机会页</h2></div></header>' + analyticsTable(["页面", "抓取热度", "UV", "状态"], crawlerPageRows, "暂无AI抓取机会") + '</section></div>';
  }

  function renderKeywordInsightsBody() {
    const keywords = visibleTrafficRows("trafficKeywords");
    const totalUsers = keywords.reduce(function (sum, item) { return sum + Number(item.users || 0); }, 0);
    const totalClicks = keywords.reduce(function (sum, item) { return sum + Number(item.clicks || 0); }, 0);
    const domains = {}, intents = {};
    keywords.forEach(function (item) {
      domains[item.domain || "其他"] = (domains[item.domain || "其他"] || 0) + Number(item.users || 0);
      intents[item.intent || "其他"] = (intents[item.intent || "其他"] || 0) + Number(item.users || 0);
    });
    const maxDomain = Math.max.apply(null, Object.keys(domains).map(function (key) { return domains[key]; }).concat([1]));
    const maxIntent = Math.max.apply(null, Object.keys(intents).map(function (key) { return intents[key]; }).concat([1]));
    const rows = keywords.slice().sort(function (a, b) { return Number(b.users || 0) - Number(a.users || 0); }).map(function (item) { return '<tr><td><strong>' + escapeHtml(item.keyword) + '</strong><small>' + escapeHtml(item.site) + '</small></td><td>' + escapeHtml(item.domain) + '</td><td>' + escapeHtml(item.intent) + '</td><td>' + numberText(item.users) + '</td><td>' + numberText(item.clicks) + '</td><td>' + escapeHtml(item.conversionRate) + '</td><td>' + escapeHtml(item.landingPage) + '</td></tr>'; }).join("");
    return '<section class="analytics-kpi-grid analytics-kpi-four">' +
      trafficKpi("已识别关键词", numberText(keywords.length), "站内及外部搜索", "") +
      trafficKpi("搜索用户", numberText(totalUsers), "产生明确搜索需求", "") +
      trafficKpi("落地点击", numberText(totalClicks), "进入产品、应用与工具页", "good") +
      trafficKpi("点击率", totalUsers ? Math.round(totalClicks / totalUsers * 100) + "%" : "--", "搜索到落地页", "good") +
    '</section>' +
    '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>应用领域关键词</h2></div></header><div class="analytics-bar-list">' + Object.keys(domains).sort(function (a, b) { return domains[b] - domains[a]; }).map(function (key) { return analyticsBar(key, domains[key], maxDomain, "搜索用户"); }).join("") + '</div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>搜索意图分布</h2></div></header><div class="analytics-bar-list">' + Object.keys(intents).sort(function (a, b) { return intents[b] - intents[a]; }).map(function (key) { return analyticsBar(key, intents[key], maxIntent, "搜索用户"); }).join("") + '</div></section></div>' +
    '<section class="panel"><header class="panel-header"><div><h2>关键词明细</h2></div></header>' + analyticsTable(["关键词", "应用领域", "搜索意图", "用户", "点击", "转化率", "落地页"], rows, "暂无关键词数据") + '</section>';
  }

  function renderTrafficActionsBody() {
    const opportunities = state.database.trafficOpportunities || [];
    const alerts = visibleTrafficRows("trafficAlerts");
    const foundations = state.database.trafficFoundation || [];
    const activeAlerts = alerts.filter(function (item) { return item.status !== "已解决"; });
    const highItems = opportunities.filter(function (item) { return item.level === "高"; }).length + activeAlerts.filter(function (item) { return item.level === "高"; }).length;
    const opportunityRows = opportunities.map(function (item) { return '<tr><td><span class="severity severity-' + severityClass(item.level) + '">' + escapeHtml(item.level) + '</span></td><td><strong>' + escapeHtml(item.type) + '</strong></td><td><strong>' + escapeHtml(item.page) + '</strong><small>' + escapeHtml(item.reason) + '</small></td><td>' + escapeHtml(item.action) + '</td><td>' + escapeHtml(item.owner) + '</td></tr>'; }).join("");
    const alertRows = alerts.map(function (item) { return '<tr><td><span class="severity severity-' + severityClass(item.level) + '">' + escapeHtml(item.level) + '</span></td><td><strong>' + escapeHtml(item.type) + '</strong><small>' + escapeHtml(item.site) + '</small></td><td><strong>' + escapeHtml(item.url) + '</strong><small>来源：' + escapeHtml(item.sourcePage) + '</small></td><td>' + numberText(item.hits) + '</td><td>' + escapeHtml(item.lastSeen) + '</td><td>' + escapeHtml(item.owner) + '</td><td>' + escapeHtml(item.suggestion) + '</td><td>' + statusPill(item.status) + '</td></tr>'; }).join("");
    const foundationCards = foundations.map(function (item) { return '<article class="foundation-card"><span>' + escapeHtml(item.layer) + '</span><strong>' + escapeHtml(item.current) + '</strong><p>' + escapeHtml(item.key) + '</p><small>' + escapeHtml(item.source + "｜" + item.status) + '</small></article>'; }).join("");
    return '<section class="analytics-kpi-grid analytics-kpi-four">' +
      trafficKpi("高优先级事项", numberText(highItems), "机会与异常合计", highItems ? "danger" : "good") +
      trafficKpi("运营机会", numberText(opportunities.length), "内容、搜索、AI与页面价值", "warning") +
      trafficKpi("未解决预警", numberText(activeAlerts.length), "404、资源与接口异常", activeAlerts.length ? "danger" : "good") +
      trafficKpi("数据基座层", numberText(foundations.length), "页面、对象、事件、来源与周期", "good") +
    '</section>' +
    '<section class="panel"><header class="panel-header"><div><h2>优先处理建议</h2></div></header>' + analyticsTable(["级别", "机会类型", "页面与原因", "建议动作", "负责人"], opportunityRows, "暂无运营机会") + '</section>' +
    '<section class="panel"><header class="panel-header"><div><h2>系统预警</h2></div></header>' + analyticsTable(["级别", "类型/站点", "异常URL与来源", "次数", "最近发生", "负责人", "建议", "状态"], alertRows, "暂无系统预警") + '</section>' +
    '<section class="panel"><header class="panel-header"><div><h2>新官网数据基座</h2></div></header><div class="foundation-grid">' + foundationCards + '</div></section>';
  }

  function renderTrafficAnalytics(config) {
    const trend = trafficTrendRows();
    const pages = visibleTrafficRows("trafficPages").sort(function (a, b) { return Number(b.valueScore || 0) - Number(a.valueScore || 0); });
    const alerts = visibleTrafficRows("trafficAlerts");
    const channels = state.database.trafficChannels || [];
    const events = state.database.trafficEvents || [];
    const keywords = visibleTrafficRows("trafficKeywords");
    const devices = visibleTrafficRows("trafficDevices");
    const regions = visibleTrafficRows("trafficRegions");
    const visitors = visibleTrafficRows("trafficVisitors");
    const pv = sumTrafficMetric(trend, "pv");
    const uv = sumTrafficMetric(trend, "uv");
    const actions = trend.reduce(function (sum, item) { return sum + Number(item.actions || 0); }, 0);
    const errors = trend.reduce(function (sum, item) { return sum + Number(item.errors || 0); }, 0);
    const activeAlerts = alerts.filter(function (item) { return item.status !== "已解决"; }).length;
    const aiUsers = channels.filter(function (item) { return item.id === "CHANNEL-AI"; }).reduce(function (sum, item) { return sum + trafficChannelUsers(item); }, 0);
    const periodActions = '<div class="period-switch" aria-label="分析周期"><button type="button" data-traffic-period="7" class="' + (state.trafficPeriod === 7 ? "active" : "") + '">近7日</button><button type="button" data-traffic-period="14" class="' + (state.trafficPeriod === 14 ? "active" : "") + '">近14日</button></div>';
    const pageRows = pages.slice(0, 8).map(function (item) {
      return '<tr><td><strong>' + escapeHtml(item.module) + '</strong><small>' + escapeHtml(item.site) + '</small></td><td><strong>' + escapeHtml(item.pageType) + '</strong><small>' + escapeHtml(item.page) + '</small></td><td>' + numberText(item.pv) + '</td><td>' + numberText(item.uv) + '</td><td>' + numberText(item.actions) + '<small>' + escapeHtml(item.actionRate) + '</small></td><td>' + numberText(item.errors) + '</td><td><strong>' + escapeHtml(item.valueScore) + '</strong></td></tr>';
    }).join("");
    const maxChannel = Math.max.apply(null, channels.map(function (item) { return trafficChannelUsers(item); }).concat([1]));
    const channelRows = channels.map(function (item) { return analyticsBar(item.name, trafficChannelUsers(item), maxChannel, item.quality + "｜" + item.note); }).join("");
    const maxEvent = Math.max.apply(null, events.map(function (item) { return Number(item.count || 0); }).concat([1]));
    const eventRows = events.map(function (item) { return analyticsBar(item.name, item.count, maxEvent, item.module + "｜" + item.valueLevel + (item.crmLink !== "否" ? "｜CRM " + item.crmLink : "")); }).join("");
    const maxKeyword = Math.max.apply(null, keywords.map(function (item) { return Number(item.users || 0); }).concat([1]));
    const keywordRows = keywords.map(function (item) { return analyticsBar(item.keyword, item.users, maxKeyword, item.landingPage + "｜点击 " + item.clicks + "｜转化 " + item.conversionRate); }).join("");
    const maxDevice = Math.max.apply(null, devices.map(function (item) { return Number(item.users || 0); }).concat([1]));
    const deviceRows = devices.map(function (item) { return analyticsBar(item.name, item.users, maxDevice, "占比 " + item.share); }).join("");
    const maxRegion = Math.max.apply(null, regions.map(function (item) { return Number(item.users || 0); }).concat([1]));
    const regionRows = regions.map(function (item) { return analyticsBar(item.name, item.users, maxRegion, "占比 " + item.share); }).join("");
    const maxVisitor = Math.max.apply(null, visitors.map(function (item) { return Number(item.users || 0); }).concat([1]));
    const visitorRows = visitors.map(function (item) { return analyticsBar(item.name, item.users, maxVisitor, "占比 " + item.share + "｜行为率 " + item.actionRate); }).join("");
    const alertRows = alerts.map(function (item) {
      return '<tr><td><span class="severity severity-' + severityClass(item.level) + '">' + escapeHtml(item.level) + '</span></td><td><strong>' + escapeHtml(item.type) + '</strong><small>' + escapeHtml(item.site) + '</small></td><td><strong>' + escapeHtml(item.url) + '</strong><small>来源：' + escapeHtml(item.sourcePage) + '</small></td><td>' + numberText(item.hits) + '</td><td>' + escapeHtml(item.lastSeen) + '</td><td>' + escapeHtml(item.owner) + '</td><td>' + escapeHtml(item.suggestion) + '</td><td>' + statusPill(item.status) + '</td></tr>';
    }).join("");
    const foundationCards = (state.database.trafficFoundation || []).map(function (item) {
      return '<article class="foundation-card"><span>' + escapeHtml(item.layer) + '</span><strong>' + escapeHtml(item.current) + '</strong><p>' + escapeHtml(item.key) + '</p><small>' + escapeHtml(item.source + "｜" + item.status) + '</small></article>';
    }).join("");
    els.main.innerHTML = pageHeader(config, periodActions) +
      '<section class="analytics-kpi-grid">' +
        trafficKpi("页面浏览量", numberText(pv), "PV", "") +
        trafficKpi("访问用户", numberText(uv), "UV", "") +
        trafficKpi("高价值行为", numberText(actions), "下载/计算/CAD/表单", "good") +
        trafficKpi("AI推荐用户", numberText(aiUsers), "真实点击进入官网", "ai") +
        trafficKpi("错误请求", numberText(errors), "404、资源和接口异常", errors ? "danger" : "good") +
        trafficKpi("未解决预警", numberText(activeAlerts), "工作台同步显示摘要", activeAlerts ? "warning" : "good") +
      '</section>' +
      '<div class="analytics-layout"><section class="panel analytics-trend-panel"><header class="panel-header"><div><h2>访问趋势</h2><p>按当前账号显示中文站、国际站或全站数据</p></div><span class="data-time">更新至 2026-08-19 15:00</span></header><div class="panel-body">' + trafficLineChart(trend, false) + '</div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>流量来源</h2><p>判断访问质量，而不只看数量</p></div></header><div class="analytics-bar-list">' + channelRows + '</div></section></div>' +
      '<section class="panel"><header class="panel-header"><div><h2>新官网页面价值</h2><p>按照新官网页面、产品、应用和文章统计访问效果</p></div><span class="tag">页面价值为相对比较指标</span></header><div class="table-scroll"><table class="data-table analytics-table"><thead><tr><th>模块/站点</th><th>页面类型与地址规则</th><th>PV</th><th>UV</th><th>高价值行为</th><th>错误</th><th>价值分</th></tr></thead><tbody>' + pageRows + '</tbody></table></div></section>' +
      '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>关键行为与转化</h2><p>用于判断用户是否真正完成选型、下载、计算或咨询</p></div></header><div class="analytics-bar-list">' + eventRows + '</div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>多语言访问</h2><p>中文和确认英文页面分别统计，其他语言按语言包标识</p></div></header><div class="language-performance">' + visibleLanguageRows().map(function (item) { return '<div><strong>' + escapeHtml(item.language) + '</strong><span>' + numberText(item.users) + ' 用户</span><span>' + numberText(item.actions) + ' 行为</span><b>' + escapeHtml(item.conversionRate) + '</b></div>'; }).join("") + '</div></section></div>' +
      '<div class="analytics-layout"><section class="panel"><header class="panel-header"><div><h2>站内与自然搜索词</h2><p>查看用户需求及对应落地页</p></div></header><div class="analytics-bar-list">' + keywordRows + '</div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>设备与访客类型</h2><p>识别移动端适配和回访质量</p></div></header><div class="analytics-split-list"><div class="analytics-bar-list">' + deviceRows + '</div><div class="analytics-bar-list">' + visitorRows + '</div></div></section></div>' +
      '<section class="panel"><header class="panel-header"><div><h2>访问地区</h2><p>按当前账号查看中文站或国际站地区分布</p></div></header><div class="analytics-bar-list analytics-bar-grid">' + regionRows + '</div></section>' +
      contentAnalyticsHtml() +
      '<section class="panel"><header class="panel-header"><div><h2>网站异常与404明细</h2><p>完整URL、来源、次数、负责人和修复建议</p></div></header><div class="table-scroll"><table class="data-table analytics-table"><thead><tr><th>级别</th><th>类型/站点</th><th>异常URL与来源</th><th>次数</th><th>最近发生</th><th>负责人</th><th>建议</th><th>状态</th></tr></thead><tbody>' + alertRows + '</tbody></table></div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>新官网数据基座</h2><p>页面、业务对象、行为事件、CRM回传与网站监控</p></div></header><div class="foundation-grid">' + foundationCards + '</div></section>';
    bindTrafficAnalyticsActions();
  }

  function contentAnalyticsHtml() {
    const rows = visibleTrafficRows("contentMetrics").slice().sort(function (a, b) { return Number(b.pv || 0) - Number(a.pv || 0); });
    const articleRows = rows.filter(function (item) { return item.type === "文章" || item.type === "Article"; });
    const faqRows = rows.filter(function (item) { return item.type === "FAQ"; });
    const totalPv = rows.reduce(function (sum, item) { return sum + Number(item.pv || 0); }, 0);
    const searchEntrances = rows.reduce(function (sum, item) { return sum + Number(item.searchEntrances || 0); }, 0);
    const relatedClicks = rows.reduce(function (sum, item) { return sum + Number(item.relatedClicks || 0); }, 0);
    function contentTable(list) {
      const body = list.map(function (item) {
        return '<tr><td><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.site) + '</small></td><td>' + numberText(item.pv) + '</td><td>' + numberText(item.uv) + '</td><td>' + escapeHtml(item.avgDuration) + '</td><td>' + numberText(item.searchEntrances) + '</td><td>' + numberText(item.relatedClicks) + '</td><td>' + escapeHtml(item.helpfulRate) + '</td></tr>';
      }).join("") || '<tr><td colspan="7" class="empty-state">暂无数据</td></tr>';
      return '<div class="table-scroll"><table class="data-table analytics-table"><thead><tr><th>内容</th><th>PV</th><th>UV</th><th>平均停留</th><th>搜索进入</th><th>关联点击</th><th>有帮助</th></tr></thead><tbody>' + body + '</tbody></table></div>';
    }
    return '<section class="panel"><header class="panel-header"><div><h2>文章与FAQ表现</h2><p>集中查看内容访问、搜索进入、关联点击和用户反馈</p></div></header><div class="panel-body"><section class="analytics-kpi-grid">' + trafficKpi("内容浏览", numberText(totalPv), "文章与FAQ", "") + trafficKpi("搜索进入", numberText(searchEntrances), "站内及外部搜索", "ai") + trafficKpi("关联点击", numberText(relatedClicks), "产品与应用入口", "good") + trafficKpi("已统计内容", numberText(rows.length), "已发布内容", "") + '</section></div></section>' +
      '<section class="panel"><header class="panel-header"><div><h2>文章表现</h2><p>查看文章访问和跳转到产品、应用页面的效果</p></div></header>' + contentTable(articleRows) + '</section>' +
      '<section class="panel"><header class="panel-header"><div><h2>FAQ表现</h2><p>查看搜索进入、停留和有帮助反馈</p></div></header>' + contentTable(faqRows) + '</section>';
  }

  function trafficSiteMatches(site) {
    if (state.roleView === "admin" || site === "全站" || !site) return true;
    return state.roleView === "international" ? site === "国际站" : site === "中文站";
  }

  function visibleTrafficRows(dataset) {
    return (state.database[dataset] || []).filter(function (item) { return trafficSiteMatches(item.site); });
  }

  function visibleLanguageRows() {
    const rows = state.database.trafficLanguages || [];
    if (state.roleView === "admin") return rows;
    if (state.roleView === "zh") return rows.filter(function (item) { return item.language === "简体中文"; });
    return rows.filter(function (item) { return item.language !== "简体中文"; });
  }

  function trafficTrendRows() {
    return (state.database.trafficTrend || []).slice(-Math.max(1, Number(state.trafficPeriod || 14)));
  }

  function trafficMetric(item, metric) {
    if (metric === "pv") return state.roleView === "admin" ? Number(item.zhPv || 0) + Number(item.intlPv || 0) : state.roleView === "international" ? Number(item.intlPv || 0) : Number(item.zhPv || 0);
    if (metric === "uv") return state.roleView === "admin" ? Number(item.zhUv || 0) + Number(item.intlUv || 0) : state.roleView === "international" ? Number(item.intlUv || 0) : Number(item.zhUv || 0);
    return Number(item[metric] || 0);
  }

  function sumTrafficMetric(rows, metric) {
    return rows.reduce(function (sum, item) { return sum + trafficMetric(item, metric); }, 0);
  }

  function trafficChannelUsers(item) {
    return state.roleView === "admin" ? Number(item.zhUsers || 0) + Number(item.intlUsers || 0) : state.roleView === "international" ? Number(item.intlUsers || 0) : Number(item.zhUsers || 0);
  }

  function numberText(value) { return Number(value || 0).toLocaleString("zh-CN"); }
  function signedPercent(value) { return (Number(value) >= 0 ? "+" : "") + Number(value || 0) + "%"; }
  function severityClass(level) { return level === "高" ? "high" : level === "中" ? "medium" : "low"; }

  function workbenchKpi(label, value, note, route, tone) {
    return '<button class="workbench-kpi ' + escapeHtml(tone || "") + '" type="button" data-route-action="' + escapeHtml(route) + '"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(note) + '</small><b>查看 →</b></button>';
  }

  function trafficKpi(label, value, note, tone) {
    return '<article class="traffic-kpi ' + escapeHtml(tone || "") + '"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(note) + '</small></article>';
  }

  function trafficLineChart(rows, compact) {
    const width = 760, height = compact ? 160 : 230, padX = 34, padY = 24;
    const values = rows.reduce(function (list, item) { list.push(trafficMetric(item, "pv"), trafficMetric(item, "uv")); return list; }, []);
    const max = Math.max.apply(null, values.concat([1]));
    const step = rows.length > 1 ? (width - padX * 2) / (rows.length - 1) : 0;
    function points(metric) { return rows.map(function (item, index) { return (padX + index * step).toFixed(1) + "," + (height - padY - trafficMetric(item, metric) / max * (height - padY * 2)).toFixed(1); }).join(" "); }
    const labels = rows.map(function (item, index) { if (compact && index % 2) return ""; return '<text x="' + (padX + index * step).toFixed(1) + '" y="' + (height - 3) + '" text-anchor="middle">' + escapeHtml(item.date) + '</text>'; }).join("");
    return '<div class="traffic-chart"><div class="traffic-chart-legend"><span><i class="pv"></i>页面浏览量</span><span><i class="uv"></i>访问用户</span></div><svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="访问趋势"><line x1="' + padX + '" y1="' + (height - padY) + '" x2="' + (width - padX) + '" y2="' + (height - padY) + '" class="axis"></line><polyline points="' + points("pv") + '" class="line-pv"></polyline><polyline points="' + points("uv") + '" class="line-uv"></polyline>' + labels + '</svg></div>';
  }

  function analyticsBar(label, value, max, note) {
    const width = Math.max(3, Math.round(Number(value || 0) / Math.max(1, max) * 100));
    return '<div class="analytics-bar"><div><strong>' + escapeHtml(label) + '</strong><span>' + numberText(value) + '</span></div><i><b style="width:' + width + '%"></b></i><small>' + escapeHtml(note) + '</small></div>';
  }

  function bindTrafficAnalyticsActions() {
    document.querySelectorAll("[data-traffic-period]").forEach(function (button) {
      button.addEventListener("click", function () { state.trafficPeriod = Number(button.dataset.trafficPeriod); renderPage(); });
    });
  }

  function statCard(label, value, note, icon) {
    return '<article class="stat-card"><div class="stat-card-top"><span>' + escapeHtml(label) + '</span><span class="stat-card-icon">' + escapeHtml(icon) + '</span></div><strong>' + escapeHtml(value) + '</strong><small>' + note + "</small></article>";
  }

  function taskItem(icon, title, note, route) {
    return '<div class="task-item"><span class="task-icon">' + icon + '</span><div><strong>' + escapeHtml(title) + '</strong><small>' + escapeHtml(note) + '</small></div><button class="text-button" data-route-action="' + route + '">处理</button></div>';
  }

  function flowCard(title, note) {
    return '<div class="flow-card"><strong>' + escapeHtml(title) + '</strong><span>' + escapeHtml(note) + "</span></div>";
  }

  function healthRow(title, value, percent, tone) {
    return '<div class="health-row"><strong>' + escapeHtml(title) + '</strong><span>' + escapeHtml(value) + '</span><div class="progress ' + tone + '"><i style="width:' + percent + '%"></i></div></div>';
  }

  function moduleCard(route, title, note) {
    if (!canAccessModule(route)) return "";
    return '<button class="module-card" type="button" data-route-action="' + route + '"><strong>' + escapeHtml(title) + '</strong><span>' + escapeHtml(note) + "</span></button>";
  }

  function rowsForConfig(config) {
    let rows = scopedDataset(config.dataset);
    if (config.selectionList) rows = rows.filter(function (row) { return row.status !== "已下架"; });
    if (config.dataset === "applications") {
      rows = rows.map(function (row) {
        const terminals = state.database.terminals.filter(function (terminal) { return terminal.field === row.name && terminal.status === "已发布"; });
        const tabs = new Set(terminals.map(function (terminal) { return terminal.tab; }).filter(Boolean)).size;
        const guides = state.database.relations.filter(function (relation) {
          return relation.relationType === "指南下载" && relation.targetName === row.name && relation.status === "已发布";
        }).length;
        return Object.assign({}, row, { tabs: tabs, terminals: terminals.length, guides: guides });
      });
    }
    if (config.dataset === "series") {
      rows = rows.map(function (row) {
        const count = crmProductCountForSeries(row.code);
        return Object.assign({}, row, { crmProducts: count, callStatus: count ? "正常调用" : "暂不调用" });
      });
    }
    if (config.dataset === "productAiKeywords") {
      const currentItemNos = new Set(state.database.products.map(function (product) { return product.itemNo; }));
      rows = rows.map(function (row) {
        return Object.assign({}, row, { callStatus: currentItemNos.has(row.itemNo) ? "正常调用" : "暂不调用" });
      });
    }
    const query = state.search.trim().toLowerCase();
    return rows.filter(function (row) {
      const searchMatch = !query || Object.keys(row).some(function (key) {
        return String(row[key] == null ? "" : row[key]).toLowerCase().includes(query);
      });
      const statusMatch = !state.status || String(row.status || row.result || "") === state.status;
      const categoryMatch = !state.category || Object.keys(row).some(function (key) { return String(row[key]) === state.category; });
      return searchMatch && statusMatch && categoryMatch;
    });
  }

  function crmProductCountForSeries(seriesCode) {
    return state.database.products.filter(function (product) { return product.series === seriesCode; }).length;
  }

  function renderTablePage(config) {
    const rows = rowsForConfig(config);
    const actions = config.readonly ? '<button class="button button-secondary" type="button" data-action="export">' + escapeHtml(config.exportLabel || "导出") + '</button>' : (config.fixedPage ? "" : '<button class="button button-secondary" type="button" data-action="import">批量导入</button><button class="button button-primary" type="button" data-action="create">' + escapeHtml(config.createLabel || "新建") + '</button>');
    if (config.dataset === "articles") {
      const articleActions = '<button class="button button-secondary" type="button" data-action="download-article-relation-template">下载关联模板</button><button class="button button-secondary" type="button" data-action="import-article-relations">导入关联</button><button class="button button-secondary" type="button" data-action="export-article-relations">导出关联</button><button class="button button-primary" type="button" data-action="create">' + escapeHtml(config.createLabel || "发布文章") + '</button>';
      els.main.innerHTML = pageHeader(config, articleActions) + '<div class="notice-strip"><span class="notice-icon">i</span><div>日常发布时直接选择文章要展示到哪些产品和应用页面；只有大量历史数据或集中调整时才使用关联导入、导出。</div></div>' + toolbarHtml(config) + tableHtml(config, rows, function (row) { return '<button class="text-button" type="button" data-article-faq-manager="' + escapeHtml(row.id) + '">FAQ</button>'; });
      bindTableActions(config);
      document.querySelectorAll("[data-article-faq-manager]").forEach(function (button) { button.addEventListener("click", function () { openArticleFaqManager(button.dataset.articleFaqManager); }); });
      return;
    }
    if (config.dataset === "newsFeaturedArticles") {
      const languages = state.roleView === "admin" ? seed.maintainedLanguages : [currentProfile().language];
      const languageCounts = languages.map(function (language) {
        const count = scopedDataset("newsFeaturedArticles").filter(function (item) { return item.language === language && item.status === "已发布"; }).length;
        return count ? '<span class="tag">' + escapeHtml(language) + ' ' + count + '/3</span>' : "";
      }).filter(Boolean).join("");
      els.main.innerHTML = pageHeader(config, actions) + '<div class="notice-strip"><span class="notice-icon">i</span><div><strong>每种语言最多三篇：</strong>前端按1、2、3的顺序轮播。文章内容发生更新时，轮播同步读取最新已发布版本，不需要再次编辑此处。<div class="inline-tags">' + languageCounts + '</div></div></div>' + toolbarHtml(config) + tableHtml(config, rows, selectionRemoveAction("移出轮播"));
      bindTableActions(config);
      bindSelectionRemoval(config, "已移出新闻中心重点轮播");
      return;
    }
    const isOverviewSelection = config.selectionList;
    const overviewSelectionAction = isOverviewSelection ? selectionRemoveAction("移出总览") : null;
    els.main.innerHTML = pageHeader(config, actions) + toolbarHtml(config) + tableHtml(config, rows, overviewSelectionAction);
    bindTableActions(config);
    if (isOverviewSelection) bindSelectionRemoval(config, "已移出应用中心总览页");
  }

  function renderApplicationTree(config) {
    const allRows = scopedDataset(config.dataset);
    const applications = [];
    allRows.forEach(function (row) {
      let application = applications.find(function (item) { return item.id === row.applicationId; });
      if (!application) {
        application = { id: row.applicationId || row.field, name: row.field, modules: [] };
        applications.push(application);
      }
      let module = application.modules.find(function (item) { return item.id === row.moduleId; });
      if (!module) {
        module = { id: row.moduleId || application.id + "-" + row.tab, name: row.tab, count: 0 };
        application.modules.push(module);
      }
      module.count += 1;
    });
    const tree = applications.map(function (application) {
      const modules = application.modules.map(function (module) {
        return '<button type="button" class="application-tree-node module' + (state.category === module.id ? ' active' : '') + '" data-application-tree-filter="' + escapeHtml(module.id) + '"><span>' + escapeHtml(module.name) + '</span><small>' + module.count + '</small></button>';
      }).join("");
      const appCount = application.modules.reduce(function (sum, module) { return sum + module.count; }, 0);
      return '<section class="application-tree-group"><button type="button" class="application-tree-node application' + (state.category === application.id ? ' active' : '') + '" data-application-tree-filter="' + escapeHtml(application.id) + '"><strong>' + escapeHtml(application.name) + '</strong><small>' + escapeHtml(application.id) + '｜' + appCount + '</small></button><div>' + modules + '</div></section>';
    }).join("");
    const rows = rowsForConfig(config);
    const actions = '<button class="button button-secondary" type="button" data-action="import">批量导入</button><button class="button button-primary" type="button" data-action="create">新增终端</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="application-tree-layout"><aside class="application-tree-panel"><header><h2>应用层级</h2><button type="button" class="text-button" data-application-tree-filter="">全部终端</button></header>' + tree + '</aside><div class="application-tree-content">' + toolbarHtml(config) + tableHtml(config, rows) + '</div></div>';
    bindTableActions(config);
    document.querySelectorAll("[data-application-tree-filter]").forEach(function (button) {
      button.addEventListener("click", function () { state.category = button.dataset.applicationTreeFilter || ""; state.page = 1; renderPage(); });
    });
  }

  function footerLinks(value) {
    return String(value || "").split(/\n+/).map(function (line) {
      const parts = line.split(/[｜|]/);
      return { label: parts[0] || "", url: parts.slice(1).join("｜") || "" };
    }).filter(function (item) { return item.label; });
  }

  function footerColumn(title, value) {
    return '<div class="footer-preview-column"><strong>' + escapeHtml(title || "") + '</strong>' + footerLinks(value).slice(0, 6).map(function (item) { return '<span>' + escapeHtml(item.label) + '</span>'; }).join("") + '</div>';
  }

  function footerAssetUrl(value) {
    if (!value) return "";
    if (/^(?:https?:|data:|\.\.\/)/.test(value)) return value;
    return "../" + String(value).replace(/^\.?\//, "");
  }

  function renderFooterManager(config) {
    const rows = scopedDataset(config.dataset);
    const cards = rows.map(function (row) {
      let right = '<div class="footer-preview-contact"><strong>' + escapeHtml(row.rightTitle || "") + '</strong><span>' + escapeHtml(row.domesticEmail || "") + '</span><span>' + escapeHtml(row.internationalEmail || "") + '</span><span>' + escapeHtml(row.address || "") + '</span></div>';
      if (row.rightExtraType === "二维码") {
        right += '<div class="footer-preview-qr">' + [row.serviceQr, row.douyinQr].map(function (file) { return file ? '<img src="' + escapeHtml(footerAssetUrl(file)) + '" alt="二维码预览">' : '<span>待上传</span>'; }).join("") + '</div>';
      } else {
        right += '<div class="footer-preview-social">' + ["Facebook", "X", "YouTube", "LinkedIn"].map(function (name) { return '<span>' + name + '</span>'; }).join("") + '</div>';
      }
      return '<article class="footer-manager-card"><header><div><span class="eyebrow">' + escapeHtml(row.site) + '</span><h2>' + escapeHtml(row.language) + '页脚</h2></div><button type="button" class="button button-primary button-small" data-footer-edit="' + escapeHtml(row.id) + '">编辑页脚</button></header><div class="footer-visual-preview"><div class="footer-preview-links">' + footerColumn(row.navigationTitle, row.navigationLinks) + footerColumn(row.productTitle, row.productLinks) + footerColumn(row.aboutTitle, row.aboutLinks) + '</div><div class="footer-preview-right">' + right + '</div><div class="footer-preview-bottom"><span>' + escapeHtml(row.copyright || "") + '</span><span>' + escapeHtml(row.privacyLabel || "") + '　' + escapeHtml(row.termsLabel || "") + '</span></div></div></article>';
    }).join("") || '<div class="empty-state">当前账号没有可维护的页脚</div>';
    els.main.innerHTML = pageHeader(config, '<button class="button button-secondary" type="button" data-footer-preview>预览前台</button>') + '<div class="footer-manager-grid">' + cards + '</div>';
    document.querySelectorAll("[data-footer-edit]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(config, button.dataset.footerEdit); }); });
    document.querySelectorAll("[data-footer-preview]").forEach(function (button) { button.addEventListener("click", function () { window.open(currentProfile().preview, "_blank", "noopener"); }); });
  }

  function dealerPageEditorConfig() {
    return {
      kind: "table",
      dataset: "dealerPage",
      title: "代理商网络页面横幅",
      group: "关于永铭",
      fixedPage: true,
      directSave: true,
      fields: [
        { key: "banner", label: "页面横幅图片", type: "file", localizedAsset: true, assetKind: "image", accept: "image/png,image/jpeg,image/webp", maxSizeMB: 8, dimensionHint: "建议使用1900×370或相同比例横图", full: true }
      ]
    };
  }

  function dealerAssetUrl(value) {
    if (!value) return "";
    if (/^(?:https?:|data:|\.\.\/)/.test(value)) return value;
    return "../" + String(value).replace(/^\.?\//, "");
  }

  function renderDealerNetwork(config) {
    const page = (state.database.dealerPage || [])[0] || {};
    const bannerRows = state.roleView === "admin"
      ? [{ label: "简体中文", file: page.bannerZh }, { label: "English", file: page.bannerEn }]
      : [{ label: currentProfile().language, file: currentProfile().language === "简体中文" ? page.bannerZh : page.bannerEn }];
    const bannerHtml = bannerRows.map(function (item) {
      return '<article class="dealer-banner-preview"><span>' + escapeHtml(item.label) + '</span>' +
        (item.file ? '<img src="' + escapeHtml(dealerAssetUrl(item.file)) + '" alt="' + escapeHtml(item.label + "代理商网络横幅") + '">' : '<div class="empty-state compact">尚未上传横幅</div>') +
        '<small>' + escapeHtml(item.file || "未上传") + '</small></article>';
    }).join("");
    const actions = '<button class="button button-secondary" type="button" data-dealer-preview>预览前台页面</button><button class="button button-primary" type="button" data-dealer-create>新增代理商</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<section class="panel dealer-banner-panel"><header class="panel-header section-action-row"><div><h2>页面横幅</h2><p>中文页和国际版可分别上传横幅图片；不随代理商名录重复上传。</p></div><button class="button button-secondary button-small" type="button" data-dealer-edit-banner>替换横幅图片</button></header><div class="dealer-banner-grid">' + bannerHtml + '</div></section>' +
      '<section class="dealer-list-heading"><div><h2>授权代理商名录</h2><p>前台列表只展示代理商公司名称和授权时间。</p></div></section>' +
      toolbarHtml(config) + tableHtml(config, rowsForConfig(config));
    bindTableActions(config);
    document.querySelectorAll("[data-dealer-preview]").forEach(function (button) { button.addEventListener("click", function () { window.open("../about-distributors.html?lang=" + encodeURIComponent(currentProfile().language === "简体中文" ? "zh-CN" : "en"), "_blank", "noopener"); }); });
    document.querySelectorAll("[data-dealer-create]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(config); }); });
    document.querySelectorAll("[data-dealer-edit-banner]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(dealerPageEditorConfig(), page.id); }); });
  }

  function procurementPageEditorConfig() {
    return {
      kind: "table",
      dataset: "procurementPage",
      title: "原材料采购页面文字与背景",
      group: "关于永铭",
      fixedPage: true,
      directSave: true,
      fields: [
        { key: "title", label: "首屏标题", type: "text", required: true, full: true },
        { key: "introduction", label: "首屏介绍", type: "textarea", required: true, full: true },
        { key: "principleTitle", label: "采购原则标题", type: "text", required: true, full: true },
        { key: "principleText", label: "采购原则说明", type: "textarea", full: true },
        { key: "cooperationTitle", label: "主要合作方向标题", type: "text", required: true, full: true },
        { key: "cooperationText", label: "主要合作方向说明", type: "textarea", full: true },
        { key: "processTitle", label: "供应商准入流程标题", type: "text", required: true, full: true },
        { key: "processText", label: "供应商准入流程说明", type: "textarea", full: true },
        { key: "formTitle", label: "合作意向表单标题", type: "text", required: true, full: true },
        { key: "formText", label: "合作意向表单说明", type: "textarea", full: true }
      ]
    };
  }

  function procurementCardEditorConfig(dataset, title) {
    return {
      kind: "table",
      dataset: dataset,
      title: title,
      group: "关于永铭",
      directSave: true,
      fields: [
        { key: "title", label: "卡片标题", type: "text", required: true, full: true },
        { key: "description", label: "卡片文字", type: "textarea", required: true, full: true },
        { key: "icon", label: "图标名称", type: "text", full: true, help: "对应前端Material Symbols图标；不修改时保留现有值。" },
        { key: "sort", label: "展示顺序", type: "number", required: true, help: "数值越小越靠前" },
        { key: "visible", label: "前台显示", type: "select", required: true, options: ["显示", "隐藏"] }
      ]
    };
  }

  function procurementStepEditorConfig() {
    return {
      kind: "table",
      dataset: "procurementSteps",
      title: "供应商准入流程步骤",
      group: "关于永铭",
      directSave: true,
      fields: [
        { key: "title", label: "步骤名称", type: "text", required: true, full: true },
        { key: "description", label: "步骤说明", type: "textarea", required: true, full: true },
        { key: "sort", label: "步骤顺序", type: "number", required: true, help: "数值越小越靠前，前台序号自动生成" },
        { key: "visible", label: "前台显示", type: "select", required: true, options: ["显示", "隐藏"] }
      ]
    };
  }

  function procurementSortedRows(dataset) {
    return (state.database[dataset] || []).slice().sort(function (a, b) { return Number(a.sort || 0) - Number(b.sort || 0); });
  }

  function procurementCardsHtml(dataset, title, description, addLabel) {
    const rows = procurementSortedRows(dataset);
    const cards = rows.map(function (row) {
      return '<article class="procurement-admin-card' + (row.visible === "隐藏" ? " is-hidden" : "") + '">' +
        '<header><span class="procurement-order">' + String(row.sort || "—").padStart(2, "0") + '</span><span class="scope-badge ' + (row.visible === "隐藏" ? "scope-it" : "scope-shared") + '">' + escapeHtml(row.visible || "显示") + '</span></header>' +
        '<div class="procurement-card-icon">' + escapeHtml(row.icon || "widgets") + '</div>' +
        '<h3>' + escapeHtml(row.title) + '</h3><p>' + escapeHtml(row.description) + '</p>' +
        '<button class="text-button" type="button" data-procurement-edit-card="' + escapeHtml(row.id) + '" data-procurement-dataset="' + escapeHtml(dataset) + '">编辑文字与顺序</button>' +
      '</article>';
    }).join("") || '<div class="empty-state compact">尚未配置卡片</div>';
    return '<section class="panel procurement-section"><header class="panel-header section-action-row"><div><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(description) + '</p></div><button class="button button-secondary button-small" type="button" data-procurement-add-card="' + escapeHtml(dataset) + '">' + escapeHtml(addLabel) + '</button></header><div class="procurement-admin-grid">' + cards + '</div></section>';
  }

  function aboutPageBackgroundRecord(pageKey) {
    const rows = scopedDataset("aboutPageBackgrounds").filter(function (row) { return row.pageKey === pageKey; });
    return rows[0] || (state.database.aboutPageBackgrounds || []).find(function (row) { return row.pageKey === pageKey; }) || {};
  }

  function renderAboutPageBackgrounds(config) {
    const rows = scopedDataset(config.dataset);
    const cards = rows.map(function (row) {
      const imageUrl = row.backgroundImage ? assetPreviewUrl(row.backgroundImage) : "";
      const backgroundStyle = imageUrl ? ' style="background-image:linear-gradient(90deg,rgba(5,31,57,.72),rgba(5,31,57,.28)),url(\'' + escapeHtml(imageUrl) + '\')"' : "";
      const currentText = row.backgroundImage ? row.backgroundImage : "未上传，使用" + (row.fallback || "默认背景");
      const lang = row.language === "English" ? "en" : "zh-CN";
      return '<article class="about-background-card"><div class="about-background-preview"' + backgroundStyle + '><span>' + escapeHtml(row.language) + '</span><strong>' + escapeHtml(row.pageName) + '</strong></div><div class="about-background-meta"><div><strong>' + escapeHtml(row.pageName) + '</strong><small>' + escapeHtml(row.file) + '</small></div><p>' + escapeHtml(currentText) + '</p><div class="cell-actions"><button class="button button-primary button-small" type="button" data-about-background-edit="' + escapeHtml(row.id) + '">上传或替换背景图</button><button class="button button-secondary button-small" type="button" data-about-background-preview="' + escapeHtml(row.file) + '" data-about-background-lang="' + lang + '">预览页面</button></div></div></article>';
    }).join("") || '<div class="empty-state">当前账号没有需要维护的关于永铭页面背景。</div>';
    els.main.innerHTML = pageHeader(config) + '<div class="notice-strip"><span class="notice-icon">i</span><div>背景图按页面和中英文版本分别保存。没有上传图片时继续使用当前默认背景；代理商网络横幅仍在“代理商网络”页面维护。</div></div><section class="about-background-grid">' + cards + '</section>';
    bindGlobalPageActions();
    document.querySelectorAll("[data-about-background-edit]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(config, button.dataset.aboutBackgroundEdit); }); });
    document.querySelectorAll("[data-about-background-preview]").forEach(function (button) { button.addEventListener("click", function () { window.open("../" + button.dataset.aboutBackgroundPreview + "?lang=" + button.dataset.aboutBackgroundLang, "_blank", "noopener"); }); });
  }

  function renderProcurementPage(config) {
    const page = (state.database.procurementPage || [])[0] || {};
    const pageBackground = aboutPageBackgroundRecord("procurement");
    const steps = procurementSortedRows("procurementSteps");
    const stepHtml = steps.map(function (row) {
      return '<article class="procurement-step-admin' + (row.visible === "隐藏" ? " is-hidden" : "") + '"><strong>' + String(row.sort || "—").padStart(2, "0") + '</strong><div><h3>' + escapeHtml(row.title) + '</h3><p>' + escapeHtml(row.description) + '</p></div><span class="scope-badge ' + (row.visible === "隐藏" ? "scope-it" : "scope-shared") + '">' + escapeHtml(row.visible || "显示") + '</span><button class="text-button" type="button" data-procurement-edit-step="' + escapeHtml(row.id) + '">编辑</button></article>';
    }).join("") || '<div class="empty-state compact">尚未配置流程步骤</div>';
    const actions = '<button class="button button-secondary" type="button" data-procurement-preview>预览前台页面</button><button class="button button-primary" type="button" data-procurement-records>查看申请记录</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<section class="procurement-page-summary"><div class="procurement-hero-preview"><div><small>首屏预览</small><h2>' + escapeHtml(page.title || "原材料采购") + '</h2><p>' + escapeHtml(page.introduction || "") + '</p></div><span>背景：' + escapeHtml(pageBackground.backgroundImage || pageBackground.fallback || "默认背景") + '</span></div><div class="procurement-summary-actions"><strong>页面文字与背景</strong><p>标题和说明在本页编辑，首屏背景图在统一背景管理中上传或替换。</p><button class="button button-primary button-small" type="button" data-procurement-edit-page>编辑页面文字</button><button class="button button-secondary button-small" type="button" data-route-action="aboutPageBackgrounds">维护首屏背景</button></div></section>' +
      procurementCardsHtml("procurementPrinciples", page.principleTitle || "采购原则", page.principleText || "", "新增原则卡片") +
      procurementCardsHtml("procurementCooperations", page.cooperationTitle || "主要合作方向", page.cooperationText || "", "新增合作方向") +
      '<section class="panel procurement-section"><header class="panel-header section-action-row"><div><h2>' + escapeHtml(page.processTitle || "供应商准入流程") + '</h2><p>' + escapeHtml(page.processText || "") + '</p></div><button class="button button-secondary button-small" type="button" data-procurement-add-step>新增流程步骤</button></header><div class="procurement-step-list">' + stepHtml + '</div></section>' +
      '<section class="panel procurement-form-link"><div><span class="eyebrow">CRM表单联动</span><h2>' + escapeHtml(page.formTitle || "提交合作意向") + '</h2><p>' + escapeHtml(page.formText || "") + '</p></div><div class="procurement-crm-flow"><span>官网表单提交</span><b>→</b><span>CRM存储与分配</span><b>→</b><span>企业微信推送对应人员</span><button class="button button-secondary button-small" type="button" data-procurement-records>查看申请记录</button></div></section>';

    document.querySelectorAll("[data-procurement-edit-page]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(procurementPageEditorConfig(), page.id); }); });
    document.querySelectorAll("[data-procurement-preview]").forEach(function (button) { button.addEventListener("click", function () { window.open("../about-procurement.html?lang=zh-CN", "_blank", "noopener"); }); });
    document.querySelectorAll("[data-procurement-records]").forEach(function (button) { button.addEventListener("click", function () { navigate("procurement"); }); });
    document.querySelectorAll("[data-procurement-edit-card]").forEach(function (button) { button.addEventListener("click", function () { const dataset = button.dataset.procurementDataset; openRecordEditor(procurementCardEditorConfig(dataset, dataset === "procurementPrinciples" ? "采购原则卡片" : "主要合作方向卡片"), button.dataset.procurementEditCard); }); });
    document.querySelectorAll("[data-procurement-add-card]").forEach(function (button) { button.addEventListener("click", function () { const dataset = button.dataset.procurementAddCard; openRecordEditor(procurementCardEditorConfig(dataset, dataset === "procurementPrinciples" ? "采购原则卡片" : "主要合作方向卡片")); }); });
    document.querySelectorAll("[data-procurement-edit-step]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(procurementStepEditorConfig(), button.dataset.procurementEditStep); }); });
    document.querySelectorAll("[data-procurement-add-step]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(procurementStepEditorConfig()); }); });
  }

  function selectionRemoveAction(label) {
    return function (row) {
      return '<button class="text-button" type="button" data-remove-selection-item="' + escapeHtml(row.id) + '">' + escapeHtml(label) + '</button>';
    };
  }

  function bindSelectionRemoval(config, message) {
    document.querySelectorAll("[data-remove-selection-item]").forEach(function (button) {
      button.addEventListener("click", function () {
        const row = (state.database[config.dataset] || []).find(function (item) { return String(item.id) === String(button.dataset.removeSelectionItem); });
        if (!row) return;
        row.status = "已下架";
        row.updatedAt = todayTime();
        saveDatabase();
        renderPage();
        toast(message);
      });
    });
  }

  function productTemplateFor(config, product) {
    const templates = config.fieldTemplates || {};
    if (product.productLine === "液态铝电解电容器") {
      return /基板自立型|牛角型|螺栓型/.test(String(product.package || "")) ? (templates.liquidLarge || []) : (templates.liquidStandard || []);
    }
    if ((product.productLine === "双电层超级电容器" || product.productLine === "混合型超级电容（锂离子电容器）") && product.package === "模组型") return templates.superModule || [];
    if (product.productLine === "金属化聚丙烯薄膜电容器" && /模块|异形/.test(String(product.package || ""))) return templates.filmModule || [];
    return templates[product.productLine] || [];
  }

  function productFieldStats(config, product) {
    const template = productTemplateFor(config, product);
    const filled = template.filter(function (field) { return String(product[field.key] == null ? "" : product[field.key]).trim(); }).length;
    return { total: template.length, filled: filled, missing: Math.max(0, template.length - filled) };
  }

  function renderProductMaster(config) {
    const query = state.search.trim().toLowerCase();
    const enriched = state.database.products.map(function (product) {
      const stats = productFieldStats(config, product);
      return Object.assign({}, product, { fieldStatus: stats.filled + "/" + stats.total + "；待补充 " + stats.missing });
    }).filter(function (product) {
      const searchMatch = !query || JSON.stringify(product).toLowerCase().includes(query);
      const categoryMatch = !state.category || product.productLine === state.category;
      return searchMatch && categoryMatch;
    });
    const actions = '<button class="button button-secondary" type="button" data-product-action="export">导出全部产品数据</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div>点击“查看全部字段”可按产品线确认模板检查CRM同步结果；空值仍保留。本料号尺寸和纹波参数由产品字段直接生成。</div></div>' +
      toolbarHtml(config) + tableHtml(config, enriched);
    bindTableActions(config);
    document.querySelectorAll("[data-product-action]").forEach(function (button) { button.addEventListener("click", exportProductMaster); });
  }

  function toolbarHtml(config) {
    const categoryOptions = getCategoryOptions(config);
    const categorySelect = categoryOptions.length ? '<select class="filter-select" id="categoryFilter"><option value="">全部分类</option>' + categoryOptions.map(function (item) { return '<option value="' + escapeHtml(item) + '"' + (state.category === item ? " selected" : "") + '>' + escapeHtml(item) + "</option>"; }).join("") + "</select>" : '<select class="filter-select" disabled><option>全部分类</option></select>';
    const statusOrder = ["当前版本", "编辑中", "历史版本", "显示", "隐藏", "有效", "待确认", "停用", "招聘中", "已结束", "已发布", "草稿", "已下架", "待开发", "待处理", "处理中", "已完成", "正常", "禁用"];
    const moduleStatuses = Array.from(new Set(scopedDataset(config.dataset).map(function (row) { return row.status || row.result; }).filter(Boolean))).sort(function (a, b) {
      const aIndex = statusOrder.indexOf(a);
      const bIndex = statusOrder.indexOf(b);
      return (aIndex < 0 ? 99 : aIndex) - (bIndex < 0 ? 99 : bIndex);
    });
    const statusSelect = !config.fixedPage && !config.directSave && !config.selectionList && moduleStatuses.length ? '<select class="filter-select" id="statusFilter"><option value="">全部状态</option>' + moduleStatuses.map(function (item) { return '<option value="' + escapeHtml(item) + '"' + (state.status === item ? " selected" : "") + '>' + escapeHtml(item) + "</option>"; }).join("") + "</select>" : "";
    return '<div class="toolbar"><input class="search-field" id="tableSearch" type="search" placeholder="搜索当前模块的名称、编号或关键词" value="' + escapeHtml(state.search) + '">' + categorySelect +
      statusSelect +
      '<div class="toolbar-actions"><button class="button button-ghost button-small" type="button" data-action="reset-filter">重置</button><button class="button button-secondary button-small" type="button" data-action="export">导出</button></div></div>';
  }

  function selected(value, actual) { return value === actual ? ' value="' + value + '" selected' : ' value="' + value + '"'; }

  function getCategoryOptions(config) {
    const keys = ["productLine", "field", "type", "language", "module", "category"];
    const rows = scopedDataset(config.dataset);
    for (let i = 0; i < keys.length; i += 1) {
      const values = Array.from(new Set(rows.map(function (row) { return row[keys[i]]; }).filter(Boolean)));
      if (values.length > 1) return values;
    }
    return [];
  }

  function tableHtml(config, rows, extraAction) {
    const columns = config.columns || [];
    const start = (state.page - 1) * state.pageSize;
    const pageRows = rows.slice(start, start + state.pageSize);
    const showActions = !config.readonly || config.viewable;
    const header = '<thead><tr><th><input class="row-checkbox" type="checkbox" aria-label="选择全部"></th>' + columns.map(function (col) { return "<th>" + escapeHtml(col[1]) + "</th>"; }).join("") + (showActions ? "<th>操作</th>" : "") + "</tr></thead>";
    const body = pageRows.length ? pageRows.map(function (row) {
      const cells = columns.map(function (col, index) { return "<td>" + cellValue(resolveLookupValue(config, col[0], row[col[0]]), col[0], index) + "</td>"; }).join("");
      const actions = showActions ? '<td><div class="cell-actions">' + (extraAction ? extraAction(row) : "") + (config.readonly ? "" : '<button class="text-button" type="button" data-edit="' + escapeHtml(row.id) + '">编辑</button>') + '<button class="text-button" type="button" data-preview="' + escapeHtml(row.id) + '">' + escapeHtml(config.previewLabel || "查看") + '</button></div></td>' : "";
      return '<tr><td><input class="row-checkbox" type="checkbox" value="' + escapeHtml(row.id) + '"></td>' + cells + actions + "</tr>";
    }).join("") : '<tr><td class="empty-state" colspan="' + (columns.length + 2) + '">当前筛选条件下没有数据</td></tr>';
    const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    return '<div class="table-card"><div class="table-scroll"><table class="data-table">' + header + "<tbody>" + body + '</tbody></table></div><footer class="table-footer"><span>共 ' + rows.length + ' 条，第 ' + state.page + ' / ' + pages + ' 页</span><div class="pagination"><button class="page-button" type="button" data-page="prev">‹</button>' + paginationButtons(pages) + '<button class="page-button" type="button" data-page="next">›</button></div></footer></div>';
  }

  function renderAiKeywordManager(config) {
    const rows = rowsForConfig(config);
    const completed = state.database.productAiKeywords.filter(function (item) { return String(item.aiKeywords || "").trim(); }).length;
    const pending = state.database.productAiKeywords.length - completed;
    const coverage = state.database.productAiKeywords.length ? Math.round(completed / state.database.productAiKeywords.length * 100) : 0;
    const actions = '<button class="button button-secondary" type="button" data-ai-keyword-action="export-products">导出全部产品数据</button><button class="button button-secondary" type="button" data-ai-keyword-action="export-template">导出AI关键词模板</button><button class="button button-primary" type="button" data-ai-keyword-action="import">导入AI搜索关键词</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div>导入仅更新AI搜索关键词，不修改CRM产品数据。</div></div>' +
      '<section class="module-metric-strip" aria-label="AI关键词维护进度"><div><span>CRM同步产品</span><strong>' + numberText(state.database.products.length) + '</strong></div><div><span>已维护关键词</span><strong>' + numberText(completed) + '</strong></div><div><span>待补充</span><strong>' + numberText(pending) + '</strong></div><div><span>当前覆盖率</span><strong>' + coverage + '%</strong></div></section>' + toolbarHtml(config) + tableHtml(config, rows);
    bindTableActions(config);
    document.querySelectorAll("[data-ai-keyword-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.dataset.aiKeywordAction;
        if (action === "export-products") exportProductMaster();
        if (action === "export-template") exportAiKeywordTemplate();
        if (action === "import") { els.importFileInput.dataset.target = "productAiKeywords"; els.importFileInput.click(); }
      });
    });
  }

  function renderAppProductLinks(config) {
    const query = state.search.trim().toLowerCase();
    const allRelations = state.database.appProducts.map(function (relation) {
      const product = state.database.products.find(function (item) { return item.itemNo === relation.itemNo; });
      return Object.assign({}, relation, applicationProductSnapshot(product));
    });
    const terminalRows = state.database.terminals.map(function (terminal) {
      const relations = allRelations.filter(function (relation) { return relation.terminal === terminal.name; });
      const incomplete = relations.filter(function (relation) { return relation.productValidation !== "字段完整"; }).length;
      return Object.assign({}, terminal, {
        recommendedItems: relations.length ? relations.map(function (relation) { return relation.itemNo; }).join("、") : "尚未配置",
        recommendedCount: relations.length,
        productValidation: relations.length ? (incomplete ? incomplete + "个料号待产品中心补充" : "全部字段完整") : "待添加推荐产品"
      });
    }).filter(function (terminal) {
      const searchMatch = !query || JSON.stringify(terminal).toLowerCase().includes(query);
      const statusMatch = !state.status || terminal.status === state.status;
      const categoryMatch = !state.category || terminal.field === state.category;
      return searchMatch && statusMatch && categoryMatch;
    });
    const actions = '<button class="button button-secondary" type="button" data-app-product-action="export">导出维护表（Excel可打开）</button><button class="button button-primary" type="button" data-app-product-action="import">导入并校验</button>';
    const categoryOptions = ['<option value="">全部应用领域</option>'].concat(seed.applicationFields.map(function (field) { return '<option value="' + escapeHtml(field) + '"' + (state.category === field ? ' selected' : '') + '>' + escapeHtml(field) + '</option>'; })).join("");
    const terminalToolbar = '<div class="toolbar"><input class="search-field" id="tableSearch" type="search" placeholder="搜索应用领域、模块、终端或推荐料号" value="' + escapeHtml(state.search) + '"><select class="filter-select" id="categoryFilter">' + categoryOptions + '</select><select class="filter-select" id="statusFilter"><option value="">全部状态</option><option' + selected("已发布", state.status) + '>已发布</option><option' + selected("草稿", state.status) + '>草稿</option></select><div class="toolbar-actions"><button class="button button-ghost button-small" type="button" data-app-product-action="reset">重置</button></div></div>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div><strong>按终端集中维护：</strong>点击“维护推荐产品”，在同一个终端中使用“＋添加产品”连续加入多个完整料号。每个料号自动带出九项产品参数；也可导出已预填终端信息的维护表，一行填写一个推荐料号后回导。</div></div>' +
      terminalToolbar + terminalRecommendationTable(terminalRows) +
      '<section class="panel" style="margin-top:20px"><header class="panel-header"><div><h2>推荐料号参数联动检查</h2><p>以下九项字段全部实时读取产品中心，应用中心不保存副本</p></div></header>' + tableHtml(Object.assign({}, config, { readonly: true, viewable: false }), allRelations) + '</section>';
    bindAppProductPageActions();
  }

  function renderCadLibrary(config) {
    const query = state.search.trim().toLowerCase();
    const mappings = state.database.cadMappings || [];
    const models = state.database.cadModels.map(function (model) {
      const related = mappings.filter(function (mapping) { return mapping.cadId === model.id; });
      return Object.assign({}, model, {
        confirmedCount: related.filter(function (mapping) { return mapping.status === "已发布"; }).length,
        pendingCount: related.filter(function (mapping) { return mapping.status !== "已发布" && mapping.status !== "已下架"; }).length,
        mappedItemNos: related.map(function (mapping) { return mapping.itemNo; }).join("、")
      });
    }).filter(function (model) {
      const searchMatch = !query || JSON.stringify(model).toLowerCase().includes(query);
      const statusMatch = !state.status || model.status === state.status;
      return searchMatch && statusMatch;
    });
    const mappingRows = mappings.map(function (mapping) {
      const model = state.database.cadModels.find(function (item) { return item.id === mapping.cadId; });
      const product = state.database.products.find(function (item) { return item.itemNo === mapping.itemNo; });
      return Object.assign({}, mapping, {
        modelName: model ? model.name : "模型不存在",
        modelFile: model ? model.file : "—",
        productLine: product ? product.productLine : "料号不存在",
        productValidation: product ? "校验通过" : "产品不可用"
      });
    }).filter(function (mapping) { return !query || JSON.stringify(mapping).toLowerCase().includes(query); });
    const actions = '<button class="button button-secondary" type="button" data-cad-action="export">导出映射维护表</button><button class="button button-secondary" type="button" data-cad-action="import">导入AI匹配结果</button><button class="button button-secondary" type="button" data-cad-action="batch-upload">批量上传STEP</button><button class="button button-primary" type="button" data-cad-action="new">新增单个STEP</button>';
    const toolbar = '<div class="toolbar"><input class="search-field" id="cadSearch" type="search" placeholder="搜索模型ID、文件名、结构尺寸或料号" value="' + escapeHtml(state.search) + '"><select class="filter-select" id="cadStatusFilter"><option value="">全部模型状态</option><option' + selected("已发布", state.status) + '>已发布</option><option' + selected("草稿", state.status) + '>草稿</option></select><div class="toolbar-actions"><button class="button button-ghost button-small" type="button" data-cad-action="reset">重置</button></div></div>';
    const modelBody = models.length ? models.map(function (model) {
      return '<tr><td><strong>' + escapeHtml(model.name) + '</strong><small class="cell-subtext">' + escapeHtml(model.id) + '</small></td><td>' + escapeHtml(model.productLine) + '</td><td>' + escapeHtml(model.package) + '</td><td>' + escapeHtml(model.dimensions) + '</td><td><strong>' + escapeHtml(model.file) + '</strong><small class="cell-subtext">' + escapeHtml(model.format + "｜V" + model.version) + '</small></td><td><strong>' + model.confirmedCount + '个已确认</strong><small class="cell-subtext">' + (model.pendingCount ? model.pendingCount + '个待确认' : '无待确认映射') + '</small></td><td>' + statusPill(model.status) + '</td><td><div class="cell-actions"><button class="text-button" type="button" data-cad-map="' + escapeHtml(model.id) + '">维护适用料号</button><button class="text-button" type="button" data-cad-edit="' + escapeHtml(model.id) + '">编辑文件</button></div></td></tr>';
    }).join("") : '<tr><td colspan="8" class="empty-state">当前条件下没有CAD模型</td></tr>';
    const mappingBody = mappingRows.length ? mappingRows.map(function (mapping) {
      return '<tr><td><strong>' + escapeHtml(mapping.modelName) + '</strong><small class="cell-subtext">' + escapeHtml(mapping.cadId + "｜" + mapping.modelFile) + '</small></td><td><strong>' + escapeHtml(mapping.itemNo) + '</strong><small class="cell-subtext">' + escapeHtml(mapping.productLine) + '</small></td><td>' + escapeHtml(mapping.source || "后台维护") + '</td><td>' + escapeHtml(mapping.matchBasis || "人工指定") + '</td><td>' + escapeHtml(mapping.confidence || "—") + '</td><td>' + statusPill(mapping.productValidation) + '</td><td>' + statusPill(mapping.status) + '</td><td><div class="cell-actions">' + (mapping.status === "已发布" ? '' : '<button class="text-button" type="button" data-cad-confirm="' + escapeHtml(mapping.id) + '">确认</button>') + '<button class="text-button" type="button" data-cad-delete="' + escapeHtml(mapping.id) + '">删除</button></div></td></tr>';
    }).join("") : '<tr><td colspan="8" class="empty-state">尚无料号映射</td></tr>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div><strong>文件与料号分开维护：</strong>STEP模型可单个或批量上传；每个模型只保存一份文件，一个模型可以明确关联数百或数千个完整料号。AI匹配结果先导入关系表，只有产品校验通过且状态为“已发布”的映射才供前台下载。</div></div><input id="cadBatchFileInput" type="file" accept=".step,.stp" multiple hidden>' + toolbar +
      '<div class="table-card"><div class="table-scroll"><table class="data-table"><thead><tr><th>CAD模型</th><th>产品线</th><th>封装形式</th><th>结构尺寸</th><th>模型文件</th><th>适用料号</th><th>状态</th><th>操作</th></tr></thead><tbody>' + modelBody + '</tbody></table></div><footer class="table-footer"><span>共 ' + models.length + ' 个CAD模型文件</span><span>替换文件后，已确认的全部料号自动使用新版本</span></footer></div>' +
      '<section class="panel" style="margin-top:20px"><header class="panel-header"><div><h2>CAD与产品料号映射</h2><p>前台按完整料号查找已确认映射；无映射时进入3D-CAD申请页</p></div></header><div class="table-scroll"><table class="data-table"><thead><tr><th>CAD模型</th><th>完整料号</th><th>匹配来源</th><th>匹配依据</th><th>AI置信度</th><th>产品校验</th><th>映射状态</th><th>操作</th></tr></thead><tbody>' + mappingBody + '</tbody></table></div></section>';
    bindCadLibraryActions(config);
  }

  function bindCadLibraryActions(config) {
    const search = document.getElementById("cadSearch");
    const status = document.getElementById("cadStatusFilter");
    if (search) search.addEventListener("input", debounce(function () { state.search = search.value; renderPage(); }, 180));
    if (status) status.addEventListener("change", function () { state.status = status.value; renderPage(); });
    document.querySelectorAll("[data-cad-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.dataset.cadAction;
        if (action === "new") openRecordEditor(config, null);
        if (action === "export") exportCadMappingTable();
        if (action === "import") { els.importFileInput.dataset.target = "cadMappings"; els.importFileInput.click(); }
        if (action === "batch-upload") {
          const input = document.getElementById("cadBatchFileInput");
          if (input) input.click();
        }
        if (action === "reset") { state.search = ""; state.status = ""; renderPage(); }
      });
    });
    const batchInput = document.getElementById("cadBatchFileInput");
    if (batchInput) batchInput.addEventListener("change", function () { previewCadBatchUpload(Array.from(batchInput.files || [])); });
    document.querySelectorAll("[data-cad-edit]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(config, button.dataset.cadEdit); }); });
    document.querySelectorAll("[data-cad-map]").forEach(function (button) { button.addEventListener("click", function () { openCadMappingEditor(button.dataset.cadMap); }); });
    document.querySelectorAll("[data-cad-confirm]").forEach(function (button) { button.addEventListener("click", function () {
      const mapping = state.database.cadMappings.find(function (item) { return item.id === button.dataset.cadConfirm; });
      if (!mapping) return;
      const product = state.database.products.find(function (item) { return item.itemNo === mapping.itemNo; });
      if (!product) return toast("CRM当前同步产品中不存在该料号，不能确认", "error");
      const conflict = state.database.cadMappings.find(function (item) { return item.id !== mapping.id && item.itemNo === mapping.itemNo && item.cadId !== mapping.cadId && item.status === "已发布"; });
      if (conflict) return toast("该料号已关联其他已发布CAD模型，请先解除原映射", "error");
      mapping.status = "已发布"; mapping.updatedAt = todayTime(); saveDatabase(); renderPage(); toast("映射已确认，可供前台使用");
    }); });
    document.querySelectorAll("[data-cad-delete]").forEach(function (button) { button.addEventListener("click", function () {
      const index = state.database.cadMappings.findIndex(function (item) { return item.id === button.dataset.cadDelete; });
      if (index < 0) return;
      state.database.cadMappings.splice(index, 1); saveDatabase(); renderPage(); toast("映射已删除");
    }); });
  }

  function previewCadBatchUpload(files) {
    if (!files.length) return;
    const accepted = [];
    const rejected = [];
    const existingNames = new Set((state.database.cadModels || []).map(function (model) { return String(model.file || "").toLowerCase(); }));
    files.forEach(function (file) {
      const name = String(file.name || "");
      if (!/\.(?:step|stp)$/i.test(name)) rejected.push({ name: name, reason: "不是STEP文件" });
      else if (existingNames.has(name.toLowerCase())) rejected.push({ name: name, reason: "文件名已存在" });
      else {
        accepted.push(file);
        existingNames.add(name.toLowerCase());
      }
    });
    const acceptedRows = accepted.map(function (file) { return '<tr><td>' + escapeHtml(file.name) + '</td><td>' + escapeHtml(formatFileSize(file.size)) + '</td><td>待补充产品线、封装和尺寸</td></tr>'; }).join("");
    const rejectedRows = rejected.map(function (item) { return '<tr><td>' + escapeHtml(item.name) + '</td><td colspan="2">' + escapeHtml(item.reason) + '</td></tr>'; }).join("");
    const body = '<div class="import-result-grid"><div><strong>' + accepted.length + '</strong><span>可上传STEP文件</span></div><div class="error"><strong>' + rejected.length + '</strong><span>不可导入</span></div><div><strong>' + files.length + '</strong><span>本次选择</span></div></div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>文件名</th><th>文件大小</th><th>上传后处理</th></tr></thead><tbody>' + (acceptedRows || '<tr><td colspan="3">没有可上传文件</td></tr>') + rejectedRows + '</tbody></table></div>' +
      '<div class="impact-box"><strong>批量上传只建立模型文件记录。</strong><br>上传完成后逐项补充产品线、封装形式和结构尺寸，再导入或维护适用料号映射。</div>';
    showModal("设计工具｜3D-CAD", "批量上传STEP", body, [
      { label: "取消", tone: "secondary", action: closeModal },
      { label: "确认上传 " + accepted.length + " 个文件", tone: "primary", action: function () {
        if (!accepted.length) return toast("没有可上传的STEP文件", "error");
        const stamp = Date.now();
        accepted.forEach(function (file, index) {
          const baseName = file.name.replace(/\.(?:step|stp)$/i, "");
          state.database.cadModels.unshift({
            id: "CAD-BATCH-" + stamp + "-" + String(index + 1).padStart(3, "0"),
            name: baseName,
            productLine: "",
            package: "",
            dimensions: "",
            format: "STEP",
            version: "1.0",
            file: file.name,
            downloads: 0,
            status: "草稿",
            updatedAt: todayTime()
          });
        });
        saveDatabase(); closeModal(); renderPage(); toast("已批量上传 " + accepted.length + " 个STEP文件，请继续补充模型资料");
      } }
    ]);
  }

  function formatFileSize(bytes) {
    const size = Number(bytes || 0);
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / 1024 / 1024).toFixed(1) + " MB";
  }

  function openCadMappingEditor(cadId) {
    const model = state.database.cadModels.find(function (item) { return item.id === cadId; });
    if (!model) return;
    const mappings = (state.database.cadMappings || []).filter(function (item) { return item.cadId === cadId && item.status !== "已下架"; });
    state.editing = { dataset: "cadMappings", cadId: cadId, config: seed.moduleConfigs.cadModels };
    state.drawerMode = "cad-mappings";
    els.saveDraftButton.hidden = true;
    els.drawerSubmitButton.textContent = "保存并确认映射";
    els.drawerEyebrow.textContent = "设计工具｜3D-CAD";
    els.drawerTitle.textContent = "维护“" + model.name + "”适用料号";
    els.drawerBody.innerHTML = '<div class="impact-box"><strong>' + escapeHtml(model.id + "｜" + model.file) + '</strong><br>' + escapeHtml(model.productLine + "｜" + model.package + "｜" + model.dimensions) + '<br>可输入或粘贴完整料号；保存后本页列出的料号均作为已确认映射供前台使用。</div><section class="form-section"><div class="section-action-row"><div><h3>适用产品料号</h3><p>同一个模型可以连续添加多个完整料号。</p></div><button class="button button-secondary button-small" id="addCadMapping" type="button">＋ 添加料号</button></div><div id="cadMappingEntries">' + (mappings.length ? mappings : [{}]).map(cadMappingEntryHtml).join("") + '</div></section>';
    bindCadMappingEditor();
    openDrawer();
  }

  function cadMappingEntryHtml(mapping, index) {
    return '<article class="terminal-product-entry terminal-product-entry-simple" data-cad-mapping-row data-record-id="' + escapeHtml(mapping.id || "") + '" data-source="' + escapeHtml(mapping.source || "后台维护") + '" data-confidence="' + escapeHtml(mapping.confidence || "") + '" data-match-basis="' + escapeHtml(mapping.matchBasis || "人工指定") + '"><header><strong>适用料号 <span data-entry-number>' + (Number(index || 0) + 1) + '</span></strong><button class="text-button" type="button" data-remove-cad-mapping>移除</button></header><label class="form-field full product-item-search"><span>永铭完整料号 <em>*</em></span><input class="field-control" type="search" autocomplete="off" placeholder="输入或粘贴完整料号" value="' + escapeHtml(mapping.itemNo || "") + '" data-cad-item-no><div class="product-search-results" data-product-search-results hidden></div><small class="field-help">' + escapeHtml((mapping.source || "后台维护") + (mapping.confidence ? "｜AI置信度：" + mapping.confidence : "")) + '</small></label></article>';
  }

  function bindCadMappingEditor() {
    const addButton = document.getElementById("addCadMapping");
    if (addButton) addButton.addEventListener("click", function () {
      const container = document.getElementById("cadMappingEntries");
      container.insertAdjacentHTML("beforeend", cadMappingEntryHtml({}, container.querySelectorAll("[data-cad-mapping-row]").length));
      bindCadMappingEntryEvents(); renumberCadMappingEntries();
    });
    bindCadMappingEntryEvents();
  }

  function bindCadMappingEntryEvents() {
    document.querySelectorAll("[data-cad-mapping-row]").forEach(function (entry) {
      if (entry.dataset.bound === "true") return;
      entry.dataset.bound = "true";
      entry.querySelector("[data-remove-cad-mapping]").addEventListener("click", function () { entry.remove(); renumberCadMappingEntries(); });
      const input = entry.querySelector("[data-cad-item-no]");
      const results = entry.querySelector("[data-product-search-results]");
      const updateResults = function () {
        const query = input.value.trim().toUpperCase();
        if (query.length < 2) { results.hidden = true; results.innerHTML = ""; return; }
        const matches = state.database.products.filter(function (item) { return item.itemNo.toUpperCase().includes(query); }).sort(function (a, b) {
          return Number(!a.itemNo.toUpperCase().startsWith(query)) - Number(!b.itemNo.toUpperCase().startsWith(query)) || a.itemNo.localeCompare(b.itemNo);
        }).slice(0, 20);
        results.innerHTML = matches.length ? matches.map(function (item) { return '<button type="button" data-product-suggestion="' + escapeHtml(item.itemNo) + '"><strong>' + escapeHtml(item.itemNo) + '</strong><small>' + escapeHtml(item.productLine + "｜" + item.series) + '</small></button>'; }).join("") : '<div class="product-search-empty">未找到匹配料号</div>';
        results.hidden = false;
      };
      input.addEventListener("input", debounce(updateResults, 120));
      input.addEventListener("focus", updateResults);
      input.addEventListener("blur", function () { setTimeout(function () { results.hidden = true; }, 160); });
      results.addEventListener("click", function (event) { const button = event.target.closest("[data-product-suggestion]"); if (!button) return; input.value = button.dataset.productSuggestion; results.hidden = true; });
    });
  }

  function renumberCadMappingEntries() {
    document.querySelectorAll("[data-cad-mapping-row]").forEach(function (entry, index) { entry.querySelector("[data-entry-number]").textContent = index + 1; });
  }

  function terminalRecommendationTable(rows) {
    const body = rows.length ? rows.map(function (terminal) {
      return '<tr><td>' + escapeHtml(terminal.field) + '</td><td>' + escapeHtml(terminal.tab) + '</td><td><strong>' + escapeHtml(terminal.name) + '</strong><small class="cell-subtext">' + escapeHtml(terminal.id) + '</small></td><td>' + escapeHtml(terminal.template) + '</td><td><strong>' + terminal.recommendedCount + '个</strong><small class="cell-subtext terminal-product-list">' + escapeHtml(terminal.recommendedItems) + '</small></td><td>' + escapeHtml(terminal.productValidation) + '</td><td>' + statusPill(terminal.status) + '</td><td><button class="button button-secondary button-small" type="button" data-maintain-terminal="' + escapeHtml(terminal.id) + '">维护推荐产品</button></td></tr>';
    }).join("") : '<tr><td colspan="8" class="empty-state">当前筛选条件下没有终端</td></tr>';
    return '<div class="table-card"><div class="table-scroll"><table class="data-table"><thead><tr><th>应用领域</th><th>应用模块</th><th>终端</th><th>展示模板</th><th>推荐产品</th><th>产品中心校验</th><th>终端状态</th><th>操作</th></tr></thead><tbody>' + body + '</tbody></table></div><footer class="table-footer"><span>共 ' + rows.length + ' 个终端</span><span>每个终端可维护多个推荐料号</span></footer></div>';
  }

  function bindAppProductPageActions() {
    const search = document.getElementById("tableSearch");
    const status = document.getElementById("statusFilter");
    const category = document.getElementById("categoryFilter");
    if (search) search.addEventListener("input", debounce(function () { state.search = search.value; renderPage(); }, 180));
    if (status) status.addEventListener("change", function () { state.status = status.value; renderPage(); });
    if (category) category.addEventListener("change", function () { state.category = category.value; renderPage(); });
    document.querySelectorAll("[data-maintain-terminal]").forEach(function (button) { button.addEventListener("click", function () { openTerminalProductsEditor(button.dataset.maintainTerminal); }); });
    document.querySelectorAll("[data-app-product-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.dataset.appProductAction;
        if (action === "export") exportAppProductMaintenanceTable();
        if (action === "import") { els.importFileInput.dataset.target = "appProducts"; els.importFileInput.click(); }
        if (action === "reset") { state.search = ""; state.status = ""; state.category = ""; renderPage(); }
      });
    });
  }

  function openTerminalProductsEditor(terminalId) {
    const terminal = state.database.terminals.find(function (item) { return item.id === terminalId; });
    if (!terminal) return;
    const relations = state.database.appProducts.filter(function (item) { return item.terminal === terminal.name; }).sort(function (a, b) { return Number(a.priority || 0) - Number(b.priority || 0); });
    state.editing = { dataset: "appProducts", terminalId: terminal.id, terminalName: terminal.name, config: seed.moduleConfigs.appProducts };
    state.drawerMode = "terminal-products";
    els.drawerEyebrow.textContent = "应用中心｜" + terminal.field;
    els.drawerTitle.textContent = "维护“" + terminal.name + "”推荐产品";
    els.saveDraftButton.hidden = true;
    els.drawerSubmitButton.textContent = "保存并直接使用";
    els.drawerBody.innerHTML = '<div class="impact-box"><strong>' + escapeHtml(terminal.field + "｜" + terminal.tab + "｜" + terminal.name) + '</strong><br>可直接输入或粘贴完整料号；输入时最多显示20个产品中心匹配结果。</div><section class="form-section"><div class="section-action-row"><div><h3>推荐产品</h3><p>一项对应一个完整料号。</p></div><button class="button button-secondary button-small" id="addTerminalProduct" type="button">＋ 添加产品</button></div><div id="terminalProductEntries">' + (relations.length ? relations : [{}]).map(terminalProductEntryHtml).join("") + '</div></section>';
    bindTerminalProductEditor();
    openDrawer();
  }

  function terminalProductEntryHtml(relation, index) {
    const selectedItemNo = relation.itemNo || "";
    return '<article class="terminal-product-entry terminal-product-entry-simple" data-terminal-product-row data-record-id="' + escapeHtml(relation.id || "") + '"><header><strong>推荐产品 <span data-entry-number>' + (Number(index || 0) + 1) + '</span></strong><button class="text-button" type="button" data-remove-terminal-product>移除</button></header><label class="form-field full product-item-search"><span>永铭完整料号 <em>*</em></span><input class="field-control" type="search" autocomplete="off" placeholder="输入或粘贴完整料号" value="' + escapeHtml(selectedItemNo) + '" data-product-field="itemNo"><div class="product-search-results" data-product-search-results hidden></div><small class="field-help">输入至少2个字符显示候选；也可直接粘贴完整料号</small></label></article>';
  }

  function bindTerminalProductEditor() {
    const addButton = document.getElementById("addTerminalProduct");
    if (addButton) addButton.addEventListener("click", function () {
      const container = document.getElementById("terminalProductEntries");
      container.insertAdjacentHTML("beforeend", terminalProductEntryHtml({}, container.querySelectorAll("[data-terminal-product-row]").length));
      bindTerminalProductEntryEvents();
      renumberTerminalProductEntries();
    });
    bindTerminalProductEntryEvents();
  }

  function bindTerminalProductEntryEvents() {
    document.querySelectorAll("[data-terminal-product-row]").forEach(function (entry) {
      if (entry.dataset.bound === "true") return;
      entry.dataset.bound = "true";
      entry.querySelector("[data-remove-terminal-product]").addEventListener("click", function () { entry.remove(); renumberTerminalProductEntries(); });
      const input = entry.querySelector('[data-product-field="itemNo"]');
      const results = entry.querySelector("[data-product-search-results]");
      const updateResults = function () {
        const query = input.value.trim().toUpperCase();
        if (query.length < 2) { results.hidden = true; results.innerHTML = ""; return; }
        const matches = state.database.products.filter(function (item) { return item.itemNo.toUpperCase().includes(query); }).sort(function (a, b) {
          const aStarts = a.itemNo.toUpperCase().startsWith(query) ? 0 : 1;
          const bStarts = b.itemNo.toUpperCase().startsWith(query) ? 0 : 1;
          return aStarts - bStarts || a.itemNo.localeCompare(b.itemNo);
        }).slice(0, 20);
        results.innerHTML = matches.length ? matches.map(function (item) { return '<button type="button" data-product-suggestion="' + escapeHtml(item.itemNo) + '"><strong>' + escapeHtml(item.itemNo) + '</strong><small>' + escapeHtml(item.productLine + "｜" + item.series) + '</small></button>'; }).join("") : '<div class="product-search-empty">未找到匹配料号</div>';
        results.hidden = false;
      };
      input.addEventListener("input", debounce(updateResults, 120));
      input.addEventListener("focus", updateResults);
      input.addEventListener("blur", function () { setTimeout(function () { results.hidden = true; }, 160); });
      results.addEventListener("click", function (event) {
        const button = event.target.closest("[data-product-suggestion]");
        if (!button) return;
        input.value = button.dataset.productSuggestion;
        results.hidden = true;
      });
    });
  }

  function renumberTerminalProductEntries() {
    document.querySelectorAll("[data-terminal-product-row]").forEach(function (entry, index) { entry.querySelector("[data-entry-number]").textContent = index + 1; });
  }

  function applicationProductSnapshot(product) {
    if (!product) {
      return {
        productLine: "",
        voltageDisplay: "—",
        capacitanceDisplay: "—",
        temperatureDisplay: "—",
        lifeDisplay: "—",
        dimensionsDisplay: "—",
        esrDisplay: "—",
        rippleDisplay: "—",
        lifecycle: "—",
        productValidation: "料号不存在"
      };
    }
    const template = productTemplateFor(seed.moduleConfigs.products, product);
    const esrField = template.find(function (field) { return field.key === "esr"; });
    const rippleField = template.find(function (field) { return field.key === "ratedRipple"; });
    const voltageDisplay = valueWithUnit(product.voltage, "V");
    const capacitanceUnit = /超级电容/.test(product.productLine) ? "F" : "µF";
    const capacitanceDisplay = valueWithUnit(product.capacitance, capacitanceUnit);
    const temperatureDisplay = rangeWithUnit(product.temperatureMin, product.temperatureMax, "℃");
    const lifeDisplay = valueWithUnit(product.ratedLife, "h");
    const dimensionsDisplay = productDimensionsDisplay(product);
    const esrDisplay = valueWithUnit(product.esr, fieldUnit(esrField && esrField.label, "Ω"));
    const rippleDisplay = valueWithUnit(product.ratedRipple, fieldUnit(rippleField && rippleField.label, "mArms"));
    const required = [
      ["电压", voltageDisplay],
      ["容量", capacitanceDisplay],
      ["工作温度", temperatureDisplay],
      ["寿命", lifeDisplay],
      ["尺寸", dimensionsDisplay],
      ["ESR", esrDisplay],
      ["额定纹波电流", rippleDisplay],
      ["全生命周期状态", product.lifecycle || "—"]
    ];
    const missing = required.filter(function (item) { return item[1] === "—"; }).map(function (item) { return item[0]; });
    return {
      productLine: product.productLine,
      voltageDisplay: voltageDisplay,
      capacitanceDisplay: capacitanceDisplay,
      temperatureDisplay: temperatureDisplay,
      lifeDisplay: lifeDisplay,
      dimensionsDisplay: dimensionsDisplay,
      esrDisplay: esrDisplay,
      rippleDisplay: rippleDisplay,
      lifecycle: product.lifecycle || "—",
      productValidation: missing.length ? "待补：" + missing.join("、") : "字段完整"
    };
  }

  function valueWithUnit(value, unit) {
    const normalized = String(value == null ? "" : value).trim();
    return normalized ? normalized + (unit ? " " + unit : "") : "—";
  }

  function rangeWithUnit(minimum, maximum, unit) {
    const min = String(minimum == null ? "" : minimum).trim();
    const max = String(maximum == null ? "" : maximum).trim();
    return min && max ? min + " ~ " + max + " " + unit : "—";
  }

  function fieldUnit(label, fallback) {
    const text = String(label || "");
    if (/mΩ/i.test(text)) return "mΩ";
    if (/mArms/i.test(text)) return "mArms";
    if (/Arms/i.test(text)) return "Arms";
    if (/Ω/.test(text)) return "Ω";
    return fallback;
  }

  function productDimensionsDisplay(product) {
    const values = {
      D: String(product.diameter == null ? "" : product.diameter).trim(),
      L: String(product.length == null ? "" : product.length).trim(),
      W: String(product.width == null ? "" : product.width).trim(),
      H: String(product.height == null ? "" : product.height).trim(),
      T: String(product.thickness == null ? "" : product.thickness).trim()
    };
    let keys = [];
    if (values.D) keys = ["D", "L"];
    else if (values.L && values.W && values.H) keys = ["L", "W", "H"];
    else if (values.W && values.H && values.T) keys = ["W", "H", "T"];
    else keys = ["D", "L", "W", "H", "T"].filter(function (key) { return values[key]; });
    const valid = keys.filter(function (key) { return values[key]; });
    return valid.length ? valid.map(function (key) { return key + values[key]; }).join(" × ") + " mm" : "—";
  }

  function resolveLookupValue(config, key, value) {
    const lookup = config.lookups && config.lookups[key];
    if (!lookup) return value;
    const source = state.database[lookup.dataset] || [];
    const record = source.find(function (item) { return String(item[lookup.valueKey || "id"]) === String(value); });
    if (!record) return value;
    return (lookup.labelKeys || ["name", "title"]).map(function (labelKey) { return record[labelKey]; }).filter(Boolean).join(lookup.separator || "｜");
  }

  function paginationButtons(pages) {
    const result = [];
    for (let i = 1; i <= Math.min(pages, 5); i += 1) result.push('<button class="page-button' + (i === state.page ? " is-active" : "") + '" type="button" data-page="' + i + '">' + i + "</button>");
    return result.join("");
  }

  function cellValue(value, key, index) {
    if (key === "status" || key === "result" || key === "lifecycle" || key === "callStatus") return statusPill(value);
    if (key === "file" && /\.html(?:$|[?#])/.test(String(value || ""))) {
      return '<a class="page-file-link" href="../' + encodeURI(String(value)) + '" target="_blank" rel="noopener"><strong>' + escapeHtml(value) + '</strong><span>打开页面 ↗</span></a>';
    }
    if (Array.isArray(value)) return value.map(function (item) { return '<span class="tag">' + escapeHtml(item) + "</span>"; }).join("");
    if (index === 0) return '<div class="cell-main"><strong>' + escapeHtml(value || "—") + "</strong></div>";
    if (typeof value === "number") return '<strong>' + escapeHtml(value) + "</strong>";
    return escapeHtml(value || "—");
  }

  function bindTableActions(config) {
    bindGlobalPageActions();
    const search = document.getElementById("tableSearch");
    const status = document.getElementById("statusFilter");
    const category = document.getElementById("categoryFilter");
    if (search) search.addEventListener("input", debounce(function () { state.search = search.value; state.page = 1; renderPage(); }, 180));
    if (status) status.addEventListener("change", function () { state.status = status.value; state.page = 1; renderPage(); });
    if (category) category.addEventListener("change", function () { state.category = category.value; state.page = 1; renderPage(); });
    document.querySelectorAll("[data-edit]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(config, button.dataset.edit); }); });
    document.querySelectorAll("[data-preview]").forEach(function (button) { button.addEventListener("click", function () { previewRecord(config, button.dataset.preview); }); });
    document.querySelectorAll("[data-page]").forEach(function (button) {
      button.addEventListener("click", function () {
        const rows = rowsForConfig(config);
        const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
        if (button.dataset.page === "prev") state.page = Math.max(1, state.page - 1);
        else if (button.dataset.page === "next") state.page = Math.min(pages, state.page + 1);
        else state.page = Number(button.dataset.page);
        renderPage();
      });
    });
  }

  function bindGlobalPageActions() {
    document.querySelectorAll("[data-route-action]").forEach(function (button) { button.addEventListener("click", function () { navigate(button.dataset.routeAction); }); });
    document.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.dataset.action;
        const config = seed.moduleConfigs[state.current];
        if (action === "create") openRecordEditor(config);
        if (action === "import") { els.importFileInput.dataset.target = config.dataset || ""; els.importFileInput.click(); }
        if (action === "export") exportDataset(config.dataset || state.current);
        if (action === "download-article-relation-template") downloadArticleRelationTemplate();
        if (action === "import-article-relations") { els.importFileInput.dataset.target = "articleRelations"; els.importFileInput.click(); }
        if (action === "export-article-relations") exportArticleRelations();
        if (action === "export-all") exportAll();
        if (action === "reset-filter") { state.search = ""; state.status = ""; state.category = ""; state.page = 1; renderPage(); }
        if (action === "create-relation") openRelationEditor();
        if (action === "create-guide") openGuideEditor();
        if (action === "create-resource") openRecordEditor(resourceEditorConfig());
      });
    });
  }

  function articleBodyHtml(value) {
    const body = String(value || "").trim();
    if (!body) return "<p>请在此输入文章正文……</p>";
    if (/<[a-z][\s\S]*>/i.test(body)) return body;
    return "<p>" + escapeHtml(body).replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + "</p>";
  }

  function deriveArticleSummary(body, maxLength) {
    const container = document.createElement("div");
    container.innerHTML = String(body || "");
    const firstParagraph = container.querySelector("p");
    const text = String(firstParagraph ? firstParagraph.textContent : container.textContent || "").replace(/\s+/g, " ").trim();
    const limit = Number(maxLength || 150);
    return text.length > limit ? text.slice(0, limit).replace(/[，、；：,.!?！？\s]+$/, "") + "……" : text;
  }

  function articleCheckboxes(name, options, selectedValues) {
    const selectedSet = new Set(String(selectedValues || "").split(/[、,，]/).map(function (item) { return item.trim(); }).filter(Boolean));
    return options.map(function (option) {
      return '<label class="choice-chip"><input type="checkbox" name="' + escapeHtml(name) + '" value="' + escapeHtml(option) + '"' + (selectedSet.has(option) ? " checked" : "") + '><span>' + escapeHtml(option) + '</span></label>';
    }).join("");
  }

  function articleProductRelationEditor(relations) {
    const rows = relations.map(articleProductRelationEntry).join("");
    return '<div class="article-product-linker"><div class="article-link-inputs"><label class="form-field"><span>关联范围</span><select class="field-control" id="articleProductTargetType"><option>完整料号</option><option>产品系列</option><option>产品线</option></select></label><label class="form-field full"><span>搜索并添加</span><div class="inline-field"><input class="field-control" id="articleProductTargetInput" list="articleProductTargetOptions" placeholder="输入完整料号搜索"><button class="button button-secondary" type="button" id="addArticleProductTarget">添加</button></div><datalist id="articleProductTargetOptions"></datalist></label></div><div class="article-linked-products" id="articleLinkedProducts">' + (rows || '<div class="empty-state compact" data-empty-product-links>暂未关联产品详情页</div>') + '</div><small class="field-help">一般文章优先关联系列或完整料号；只有真正适用于整条产品线的通用文章才选择产品线。</small></div>';
  }

  function articleProductRelationEntry(relation) {
    return '<div class="article-linked-product" data-article-product-link data-target-type="' + escapeHtml(relation.targetType) + '" data-target-id="' + escapeHtml(relation.targetId) + '" data-target-name="' + escapeHtml(relation.targetName) + '"><span class="tag">' + escapeHtml(relation.targetType) + '</span><strong>' + escapeHtml(relation.targetName) + '</strong><small>' + escapeHtml(relation.targetId) + '</small><button type="button" aria-label="移除关联">×</button></div>';
  }

  function articleProductCandidates(targetType) {
    if (targetType === "完整料号") return state.database.products.map(function (item) { return { id: item.itemNo, name: item.itemNo, search: item.itemNo + " " + item.series + " " + item.productLine }; });
    if (targetType === "产品系列") return state.database.series.filter(function (item) { return crmProductCountForSeries(item.code) > 0; }).map(function (item) { return { id: item.id, name: item.name, code: item.code, search: item.id + " " + item.code + " " + item.name + " " + item.productLine }; });
    return seed.productLines.map(function (name) { return { id: name, name: name, search: name }; });
  }

  function updateArticleProductSuggestions() {
    const typeSelect = document.getElementById("articleProductTargetType");
    const input = document.getElementById("articleProductTargetInput");
    const datalist = document.getElementById("articleProductTargetOptions");
    if (!typeSelect || !input || !datalist) return;
    const type = typeSelect.value;
    input.value = "";
    input.placeholder = type === "完整料号" ? "输入完整料号搜索" : type === "产品系列" ? "输入系列代码或系列名称搜索" : "输入产品线名称搜索";
    datalist.innerHTML = articleProductCandidates(type).map(function (item) { return '<option value="' + escapeHtml(item.code || item.id) + '">' + escapeHtml(item.name) + '</option>'; }).join("");
  }

  function bindArticleProductLinker() {
    const typeSelect = document.getElementById("articleProductTargetType");
    const input = document.getElementById("articleProductTargetInput");
    const addButton = document.getElementById("addArticleProductTarget");
    const list = document.getElementById("articleLinkedProducts");
    if (!typeSelect || !input || !addButton || !list) return;
    const bindRemove = function (root) {
      root.querySelectorAll("[data-article-product-link] button").forEach(function (button) { button.addEventListener("click", function () { button.closest("[data-article-product-link]").remove(); if (!list.querySelector("[data-article-product-link]")) list.innerHTML = '<div class="empty-state compact" data-empty-product-links>暂未关联产品详情页</div>'; }); });
    };
    typeSelect.addEventListener("change", updateArticleProductSuggestions);
    addButton.addEventListener("click", function () {
      const typed = input.value.trim();
      if (!typed) return toast("请输入需要关联的产品线、系列或完整料号", "error");
      const normalized = typed.split("｜")[0].trim().toLowerCase();
      const candidates = articleProductCandidates(typeSelect.value);
      const match = candidates.find(function (item) { return item.id.toLowerCase() === normalized || String(item.code || "").toLowerCase() === normalized || item.name.toLowerCase() === normalized; });
      if (!match) return toast("没有找到对应的已发布产品数据", "error");
      const duplicate = Array.from(list.querySelectorAll("[data-article-product-link]")).some(function (item) { return item.dataset.targetType === typeSelect.value && item.dataset.targetId === match.id; });
      if (duplicate) return toast("该产品范围已经添加");
      const empty = list.querySelector("[data-empty-product-links]");
      if (empty) empty.remove();
      list.insertAdjacentHTML("beforeend", articleProductRelationEntry({ targetType: typeSelect.value, targetId: match.id, targetName: match.name }));
      bindRemove(list.lastElementChild);
      input.value = "";
    });
    input.addEventListener("keydown", function (event) { if (event.key === "Enter") { event.preventDefault(); addButton.click(); } });
    bindRemove(list);
    updateArticleProductSuggestions();
  }

  function collectArticleProductLinks() {
    return Array.from(document.querySelectorAll("[data-article-product-link]")).map(function (item) { return { targetType: item.dataset.targetType, targetId: item.dataset.targetId, targetName: item.dataset.targetName }; });
  }

  function openArticleEditor(recordId) {
    const rows = state.database.articles || [];
    const record = recordId ? rows.find(function (item) { return String(item.id) === String(recordId); }) : null;
    const defaults = { type: "技术文章", channels: "新闻资讯", language: state.roleView === "admin" ? "简体中文" : currentProfile().language, status: "草稿" };
    const editingRecord = Object.assign({}, defaults, record || {}, record && record.draft ? record.draft : {});
    const currentRelations = record ? state.database.relations.filter(function (item) { return item.sourceType === "文章" && item.sourceId === relationSourceId(record) && item.status !== "已下架"; }) : [];
    const relationDraft = record && record.relationDraft;
    const selectedApplications = relationDraft ? relationDraft.applications : (currentRelations.filter(function (item) { return item.targetType === "应用领域"; }).map(function (item) { return item.targetName; }).join("、") || editingRecord.applications);
    const linkedProducts = relationDraft ? relationDraft.products : currentRelations.filter(function (item) { return ["完整料号", "产品系列", "产品线"].includes(item.targetType); });
    state.editing = { dataset: "articles", id: record ? record.id : null, config: seed.moduleConfigs.articles };
    state.drawerMode = "article-editor";
    els.drawer.classList.add("drawer-wide");
    els.saveDraftButton.hidden = false;
    els.saveDraftButton.textContent = "保存草稿";
    els.drawerSubmitButton.textContent = "发布文章";
    els.drawerEyebrow.textContent = "服务支持｜新闻发布";
    els.drawerTitle.textContent = record ? "编辑新闻文章" : "发布新闻文章";
    els.drawerBody.innerHTML = '<div class="article-editor-layout"><main class="article-editor-main">' +
      '<section class="article-edit-card"><label class="form-field full article-title-field"><span>确认稿文章标题 <em>*</em></span><input class="field-control" name="title" type="text" value="' + escapeHtml(editingRecord.title || "") + '" placeholder="请原样填写确认稿标题" required></label><div class="fixed-channel article-source-rule"><strong>按照确认稿原文发布</strong><small>正文、标题和原稿已有摘要均不得重新改写；原稿没有摘要时，系统仅截取正文首段用于新闻列表、首页推荐和搜索结果，不在文章详情页新增导语。</small></div></section>' +
      '<section class="article-edit-card"><div class="article-section-title"><div><h3>文章正文 <em>*</em></h3><p>支持标题、段落、列表、链接及产品详情内链。</p></div><button class="button button-secondary button-small" id="previewArticleDraft" type="button">预览文章</button></div><div class="rich-toolbar" role="toolbar" aria-label="正文编辑工具"><button type="button" data-editor-command="bold"><b>B</b> 加粗</button><button type="button" data-editor-command="italic"><i>I</i> 斜体</button><button type="button" data-editor-block="H2">二级标题</button><button type="button" data-editor-block="P">正文段落</button><button type="button" data-editor-command="insertUnorderedList">项目列表</button><button type="button" data-editor-link>普通链接</button><button type="button" data-editor-product-link>产品详情内链</button><button type="button" data-editor-image>插入图片</button><button type="button" data-editor-command="removeFormat">清除格式</button></div><div class="article-rich-editor" id="articleRichEditor" contenteditable="true" role="textbox" aria-multiline="true">' + articleBodyHtml(editingRecord.body) + '</div><input id="articleInlineImage" type="file" accept="image/*" hidden></section>' +
      '<section class="article-edit-card"><div class="article-section-title"><div><h3>封面与附件</h3><p>封面用于新闻列表和首页展示；正文图片应插入到上方对应位置。</p></div></div><div class="form-grid"><label class="form-field full"><span>新闻封面图 <em>*</em></span><input class="field-control" name="coverFile" type="file" accept="image/*"><small class="field-help">' + (editingRecord.cover ? "当前封面：" + escapeHtml(editingRecord.cover) : "建议横版图片，正式系统上传后进入媒体库") + '</small></label><label class="form-field full"><span>附件</span><input class="field-control" name="attachmentFile" type="file"><small class="field-help">可选；用于白皮书、报告或补充资料，不代替正文。</small></label></div></section>' +
      '<section class="article-edit-card"><div class="article-section-title"><div><h3>展示到哪些页面</h3><p>这里的选择就是正式前台关联，不需要发布后再次维护。</p></div></div><div class="article-association-block"><strong>应用中心</strong><p>勾选后，文章将进入对应应用领域的“相关文章”。</p><div class="choice-grid">' + articleCheckboxes("articleApplicationLink", seed.applicationFields, selectedApplications) + '</div></div><div class="article-association-block"><strong>产品详情页</strong><p>可按产品线、系列或完整料号添加；同一篇文章可以关联多个范围。</p>' + articleProductRelationEditor(linkedProducts) + '</div></section>' +
      '<section class="article-edit-card"><div class="article-section-title"><div><h3>检索标签</h3><p>只用于新闻搜索和FAQ分类，不影响文章展示页面。</p></div></div><div class="taxonomy-editor"><div><strong>产品线标签</strong><div class="choice-grid">' + articleCheckboxes("articleProductLine", seed.productLines, editingRecord.productLines) + '</div></div></div><label class="form-field full"><span>文章标签/关键词</span><input class="field-control" name="tags" type="text" value="' + escapeHtml(editingRecord.tags || "") + '" placeholder="例如：汽车电子, 电容选型, 车载电源"><small class="field-help">多个标签使用逗号分隔。</small></label></section>' +
      '<section class="article-edit-card"><div class="article-section-title"><div><h3>搜索优化信息</h3><p>用于网站搜索结果和外部搜索引擎，不在正文中重复展示。</p></div></div><div class="form-grid"><label class="form-field full"><span>SEO标题</span><input class="field-control" name="seoTitle" type="text" value="' + escapeHtml(editingRecord.seoTitle || "") + '"></label><label class="form-field full"><span>SEO关键词</span><input class="field-control" name="seoKeywords" type="text" value="' + escapeHtml(editingRecord.seoKeywords || "") + '"></label><label class="form-field full"><span>SEO描述</span><textarea class="field-control" name="seoDescription" rows="3">' + escapeHtml(editingRecord.seoDescription || "") + '</textarea></label></div></section></main>' +
      '<aside class="article-editor-side"><section class="article-edit-card sticky-panel"><div class="article-section-title"><div><h3>发布设置</h3><p>官网内容统一作为永铭原创文章发布。</p></div></div><label class="form-field"><span>内容类型 <em>*</em></span><select class="field-control" name="type" required><option' + selected("技术文章", editingRecord.type) + '>技术文章</option><option' + selected("产品信息", editingRecord.type) + '>产品信息</option><option' + selected("企业动态", editingRecord.type) + '>企业动态</option></select></label><div class="form-field"><span>发布位置</span><div class="fixed-channel"><strong>新闻资讯</strong><small>FAQ将在文章发布后由AI提取并单独确认发布</small></div><input type="hidden" name="channels" value="新闻资讯"></div>' + articleLanguageControl(editingRecord.language) + '<label class="form-field"><span>计划发布时间</span><input class="field-control" name="publishAt" type="datetime-local" value="' + escapeHtml(String(editingRecord.publishAt || "").replace(" ", "T")) + '"><small class="field-help">留空表示立即发布。</small></label><label class="form-field"><span>页面地址标识</span><input class="field-control" name="slug" type="text" value="' + escapeHtml(editingRecord.slug || "") + '" placeholder="例如 automotive-capacitor"><small class="field-help">发布后保持稳定，不随标题修改。</small></label><div class="fixed-channel"><strong>内容归属</strong><small>统一归属上海永铭电子股份有限公司，前台不展示作者、编辑或文章来源字段。</small></div><div class="article-current-status"><span>当前正式状态</span>' + statusPill(record ? record.status : "尚未发布") + (record && record.draftStatus ? '<small>编辑版本：' + escapeHtml(record.draftStatus) + '</small>' : '') + '</div></section></aside></div>';
    bindArticleEditorEvents();
    openDrawer();
  }

  function articleLanguageControl(value) {
    if (state.roleView !== "admin") {
      const language = currentProfile().language;
      return '<div class="form-field"><span>内容版本</span><div class="fixed-language-field">' + escapeHtml(language) + '<small>由CRM账号权限确定</small></div><input type="hidden" name="language" value="' + escapeHtml(language) + '"></div>';
    }
    return '<label class="form-field"><span>内容版本 <em>*</em></span><select class="field-control" name="language" required>' + seed.maintainedLanguages.map(function (language) { return '<option' + selected(language, value || "简体中文") + '>' + escapeHtml(language) + '</option>'; }).join("") + '</select><small class="field-help">只维护中文与英文版本；其他语言由英文内容生成。</small></label>';
  }

  function bindArticleEditorEvents() {
    const editor = document.getElementById("articleRichEditor");
    document.querySelectorAll("[data-editor-command]").forEach(function (button) { button.addEventListener("click", function () { editor.focus(); document.execCommand(button.dataset.editorCommand, false, null); }); });
    document.querySelectorAll("[data-editor-block]").forEach(function (button) { button.addEventListener("click", function () { editor.focus(); document.execCommand("formatBlock", false, button.dataset.editorBlock); }); });
    const linkButton = document.querySelector("[data-editor-link]");
    if (linkButton) linkButton.addEventListener("click", function () { const url = window.prompt("请输入链接地址"); if (!url) return; editor.focus(); document.execCommand("createLink", false, url); });
    const productLinkButton = document.querySelector("[data-editor-product-link]");
    if (productLinkButton) productLinkButton.addEventListener("click", function () {
      const itemNo = String(window.prompt("请输入需要链接的永铭完整料号") || "").trim();
      if (!itemNo) return;
      const product = state.database.products.find(function (item) { return item.itemNo.toUpperCase() === itemNo.toUpperCase(); });
      if (!product) return toast("CRM当前同步产品中不存在该料号", "error");
      editor.focus(); document.execCommand("insertHTML", false, '<a href="product-detail.html?pn=' + encodeURIComponent(product.itemNo) + '">' + escapeHtml(product.itemNo) + '</a>');
    });
    const imageButton = document.querySelector("[data-editor-image]");
    const imageInput = document.getElementById("articleInlineImage");
    if (imageButton) imageButton.addEventListener("click", function () { imageInput.click(); });
    if (imageInput) imageInput.addEventListener("change", function () {
      const file = imageInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function () { editor.focus(); document.execCommand("insertHTML", false, '<figure><img src="' + reader.result + '" alt=""><figcaption>请输入图片说明</figcaption></figure>'); };
      reader.readAsDataURL(file);
    });
    const preview = document.getElementById("previewArticleDraft");
    if (preview) preview.addEventListener("click", function () {
      const title = els.editorForm.querySelector('[name="title"]').value.trim() || "未填写标题";
      const summary = String(state.editing && state.editing.id ? ((state.database.articles.find(function (item) { return item.id === state.editing.id; }) || {}).summary || "") : "").trim() || deriveArticleSummary(editor.innerHTML);
      showModal("文章预览", title, '<article class="article-preview"><p class="article-preview-summary">' + escapeHtml(summary) + '</p>' + editor.innerHTML + '</article>', [{ label: "关闭预览", tone: "secondary", action: closeModal }]);
    });
    bindArticleProductLinker();
  }

  function openRecordEditor(config, recordId) {
    if (!config || config.readonly) return;
    if (config.dataset === "articles") return openArticleEditor(recordId);
    const dataset = config.dataset;
    const rows = state.database[dataset] || [];
    const record = recordId ? rows.find(function (item) { return String(item.id) === String(recordId); }) : null;
    if (record && !recordVisibleForRole(dataset, record)) return toast("当前CRM账号没有该内容版本的维护权限", "error");
    state.editing = { dataset: dataset, id: record ? record.id : null, config: config };
    state.drawerMode = "edit";
    els.saveDraftButton.hidden = config.fixedPage || config.directSave || config.selectionList || ["series", "productAiKeywords", "navigation"].includes(dataset);
    els.drawerSubmitButton.textContent = "保存";
    els.drawerEyebrow.textContent = config.group || "内容维护";
    els.drawerTitle.textContent = record ? "编辑" + config.title : "新建" + config.title;
    els.drawerBody.innerHTML = formHtml(config.fields || [], record || {});
    openDrawer();
    bindFileFieldPreviews(els.drawerBody);
  }

  function fileFieldMeta(field) {
    const accept = field.accept || (field.assetKind === "image" ? "image/png,image/jpeg,image/webp" : ".pdf,.doc,.docx,.xlsx,.zip");
    const maxSizeMB = Number(field.maxSizeMB || (field.assetKind === "image" ? 5 : 30));
    const notes = ["格式：" + accept.replace(/image\//g, "").replace(/,/g, "、"), "单文件不超过 " + maxSizeMB + "MB"];
    if (field.dimensionHint) notes.push(field.dimensionHint);
    return { accept: accept, maxSizeMB: maxSizeMB, note: notes.join("；") };
  }

  function assetPreviewUrl(value) {
    if (!value) return "";
    if (/^(?:https?:|data:|blob:|\.\.\/)/.test(value)) return value;
    return "../" + String(value).replace(/^\.?\//, "");
  }

  function filePreviewHtml(field, value, inputName) {
    const current = value ? '<div class="file-current"><span>当前文件：' + escapeHtml(value) + '</span>' + (field.assetKind === "image" ? '<img src="' + escapeHtml(assetPreviewUrl(value)) + '" alt="当前图片预览">' : '') + '</div>' : '<div class="file-current empty">当前版本尚未上传</div>';
    return '<div class="file-preview-box" data-file-preview-for="' + escapeHtml(inputName) + '">' + current + '<div class="file-selected-preview" hidden></div></div>';
  }

  function bindFileFieldPreviews(root) {
    (root || document).querySelectorAll("input[type=file][data-file-preview-input]").forEach(function (input) {
      input.addEventListener("change", function () {
        const file = input.files && input.files[0];
        const preview = (root || document).querySelector('[data-file-preview-for="' + input.name + '"] .file-selected-preview');
        if (!file || !preview) return;
        const maxSizeMB = Number(input.dataset.maxSizeMb || 30);
        if (file.size > maxSizeMB * 1024 * 1024) {
          input.value = "";
          preview.hidden = false;
          preview.innerHTML = '<span class="file-error">文件超过 ' + maxSizeMB + 'MB，请重新选择</span>';
          return;
        }
        preview.hidden = false;
        preview.innerHTML = '<span>已选择：' + escapeHtml(file.name) + '（' + (file.size / 1024 / 1024).toFixed(2) + 'MB）</span>';
        if (!String(file.type || "").startsWith("image/")) return;
        const image = new Image();
        const url = URL.createObjectURL(file);
        image.onload = function () {
          preview.innerHTML = '<img src="' + url + '" alt="新图片预览"><small>' + image.naturalWidth + ' × ' + image.naturalHeight + ' px</small>';
        };
        image.src = url;
      });
    });
  }

  function formHtml(formFields, record) {
    if (!formFields.length) return '<div class="notice-strip"><span class="notice-icon">i</span><div>该模块只允许查看和导出。</div></div>';
    const recordLanguage = record.language || (state.roleView === "admin" ? "简体中文" : currentProfile().language);
    const rows = formFields.filter(function (field) {
      return !field.languages || field.languages.includes(recordLanguage);
    }).map(function (field) {
      if (field.localizedAsset || field.localizedText) return localizedFieldHtml(field, record);
      const forcedLanguage = state.roleView === "admin" ? "" : currentProfile().language;
      const value = field.key === "language" && forcedLanguage ? forcedLanguage : (record[field.key] == null ? "" : record[field.key]);
      const className = "form-field" + (field.full ? " full" : "");
      const required = field.required ? " required" : "";
      const readonly = field.readonly ? " readonly" : "";
      let control = "";
      if (field.key === "language" && state.roleView !== "admin") {
        control = '<div class="fixed-language-field">' + escapeHtml(forcedLanguage) + '<small>由CRM登录账号自动确定，不能在编辑页面切换。</small></div><input type="hidden" name="language" value="' + escapeHtml(forcedLanguage) + '">';
      } else if (field.key === "language" && state.roleView === "admin") {
        control = '<select class="field-control" name="language" required>' + seed.maintainedLanguages.map(function (language) { return '<option value="' + escapeHtml(language) + '"' + (String(value || "简体中文") === language ? " selected" : "") + '>' + escapeHtml(language) + '</option>'; }).join("") + '</select><span class="field-help">后台只人工维护中文和英文；其他语言不在此处逐条编辑。</span>';
      } else if (field.type === "textarea") {
        control = '<textarea class="field-control' + (field.readonly ? " readonly-field" : "") + '" name="' + field.key + '" rows="4"' + required + readonly + '>' + escapeHtml(value) + "</textarea>";
      } else if (field.type === "select") {
        control = '<select class="field-control" name="' + field.key + '"' + required + '><option value="">请选择</option>' + fieldOptions(field).map(function (option) {
          const optionValue = typeof option === "object" ? option.value : option;
          const optionLabel = typeof option === "object" ? option.label : option;
          return '<option value="' + escapeHtml(optionValue) + '"' + (String(value) === String(optionValue) ? " selected" : "") + '>' + escapeHtml(optionLabel) + "</option>";
        }).join("") + "</select>";
      } else if (field.type === "file") {
        const meta = fileFieldMeta(field);
        control = '<input class="field-control" name="' + field.key + '" type="file" accept="' + escapeHtml(meta.accept) + '" data-file-preview-input data-max-size-mb="' + meta.maxSizeMB + '">' + filePreviewHtml(field, value, field.key) + '<span class="field-help">' + escapeHtml(meta.note) + '</span>';
      } else {
        control = '<input class="field-control' + (field.readonly ? " readonly-field" : "") + '" name="' + field.key + '" type="' + (field.type || "text") + '" value="' + escapeHtml(value) + '"' + required + readonly + ">";
      }
      return '<label class="' + className + '"><span>' + escapeHtml(field.label) + (field.required ? " <em>*</em>" : "") + "</span>" + control + (field.help ? '<small class="field-help">' + escapeHtml(field.help) + "</small>" : "") + "</label>";
    }).join("");
    return '<section class="form-section"><h3>基本信息</h3><div class="form-grid">' + rows + '</div></section>';
  }

  function localizedFieldHtml(field, record) {
    const baseKey = field.key.replace(/Upload$|File$/, "");
    const variants = state.roleView === "admin"
      ? [{ language: "简体中文", suffix: "Zh" }, { language: "English", suffix: "En" }]
      : [{ language: currentProfile().language, suffix: currentProfile().language === "简体中文" ? "Zh" : "En" }];
    return variants.map(function (variant) {
      const dataKey = baseKey + variant.suffix;
      const value = record[dataKey] || record[baseKey] || "";
      const label = field.label + "（" + variant.language + "）";
      let control;
      if (field.localizedText) {
        control = '<textarea class="field-control" name="' + escapeHtml(dataKey) + '" rows="4">' + escapeHtml(value) + '</textarea>';
      } else {
        const meta = fileFieldMeta(field);
        const inputName = dataKey + "File";
        control = '<input class="field-control" name="' + escapeHtml(inputName) + '" type="file" accept="' + escapeHtml(meta.accept) + '" data-file-preview-input data-max-size-mb="' + meta.maxSizeMB + '">' + filePreviewHtml(field, value, inputName) + '<span class="field-help">' + escapeHtml(meta.note) + '</span>';
      }
      return '<label class="form-field full"><span>' + escapeHtml(label) + '</span>' + control + '<small class="field-help">中文与国际版可使用不同文件或文字；未单独上传时可由开发规则回退到共享版本。</small></label>';
    }).join("");
  }

  function fieldOptions(field) {
    if (!field.optionsSource) return field.options || [];
    const source = scopedDataset(field.optionsSource.dataset);
    return source.filter(function (record) {
      return (field.optionsSource.filters || []).every(function (filter) {
        const actual = String(record[filter.key] == null ? "" : record[filter.key]);
        if (Object.prototype.hasOwnProperty.call(filter, "equals")) return actual === String(filter.equals);
        if (Object.prototype.hasOwnProperty.call(filter, "includes")) return actual.includes(String(filter.includes));
        return true;
      });
    }).map(function (record) {
      return {
        value: record[field.optionsSource.valueKey || "id"],
        label: (field.optionsSource.labelKeys || ["name", "title"]).map(function (key) { return record[key]; }).filter(Boolean).join(field.optionsSource.separator || "｜")
      };
    });
  }

  function openDrawer() {
    els.drawerBackdrop.hidden = false;
    els.drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(function () { els.drawer.classList.add("is-open"); });
  }

  function closeDrawer() {
    els.drawer.classList.remove("is-open");
    setTimeout(function () { els.drawerBackdrop.hidden = true; els.drawer.setAttribute("aria-hidden", "true"); els.drawer.classList.remove("drawer-wide"); }, 190);
    state.editing = null;
    state.drawerMode = "edit";
    els.saveDraftButton.hidden = false;
    els.drawerSubmitButton.textContent = "保存";
  }

  function collectForm() {
    const data = {};
    new FormData(els.editorForm).forEach(function (value, key) {
      if (value instanceof File) {
        if (value.name) data[key.replace(/Upload$|File$/, "")] = value.name;
      } else data[key] = value;
    });
    return data;
  }

  function persistEditor(statusOverride) {
    if (!state.editing) return;
    if (state.drawerMode === "terminal-products") return persistTerminalProducts();
    if (state.drawerMode === "cad-mappings") return persistCadMappings();
    if (state.drawerMode === "article-editor") return persistArticleEditor(statusOverride);
    const data = collectForm();
    const rows = state.database[state.editing.dataset] || [];
    const existingIndex = rows.findIndex(function (item) { return String(item.id) === String(state.editing.id); });
    const existing = existingIndex >= 0 ? rows[existingIndex] : {};
    const crmLinkedSupplement = ["series", "productAiKeywords"].includes(state.editing.dataset);
    if (state.editing.config.selectionList) data.status = "已发布";
    if (isLocalizedDataset(state.editing.dataset)) data.language = state.roleView === "admin" ? (data.language || existing.language || "简体中文") : currentProfile().language;
    const uniqueKey = state.editing.config.uniqueKey;
    if (uniqueKey && data[uniqueKey] && rows.some(function (item) { return String(item.id) !== String(state.editing.id) && String(item[uniqueKey]) === String(data[uniqueKey]); })) {
      toast("该记录已存在，请直接调整现有记录");
      return;
    }
    if (state.editing.dataset === "newsFeaturedArticles") {
      const desiredStatus = statusOverride || data.status || existing.status || "草稿";
      const isActive = desiredStatus !== "已下架" && desiredStatus !== "草稿";
      const duplicateArticle = rows.some(function (item) { return String(item.id) !== String(state.editing.id) && item.language === data.language && item.articleId === data.articleId && item.status !== "已下架"; });
      if (duplicateArticle) return toast("这篇文章已在当前语言的重点轮播中", "error");
      const sortValue = Number(data.sort);
      if (!Number.isInteger(sortValue) || sortValue < 1 || sortValue > 3) return toast("轮播顺序只能填写1、2或3", "error");
      const duplicateSort = rows.some(function (item) { return String(item.id) !== String(state.editing.id) && item.language === data.language && Number(item.sort) === sortValue && item.status !== "已下架" && item.status !== "草稿"; });
      if (isActive && duplicateSort) return toast("当前语言的这个轮播顺序已经被使用", "error");
      const activeCount = rows.filter(function (item) { return String(item.id) !== String(state.editing.id) && item.language === data.language && item.status !== "已下架" && item.status !== "草稿"; }).length;
      if (isActive && activeCount >= Number(state.editing.config.maxPerLanguage || 3)) return toast("当前语言已经选择三篇重点文章，请先移出一篇现有文章", "error");
    }
    if (["applicationHighlights", "applicationToolHighlights"].includes(state.editing.dataset)) {
      const desiredStatus = statusOverride || data.status || existing.status || "草稿";
      const isActive = desiredStatus !== "已下架" && desiredStatus !== "草稿";
      const isTerminalSelection = state.editing.dataset === "applicationHighlights";
      const relationKey = isTerminalSelection ? "terminalId" : "toolId";
      const relationLabel = isTerminalSelection ? "终端" : "设计工具";
      const sortValue = Number(data.sort);
      const duplicateRelation = rows.some(function (item) {
        return String(item.id) !== String(state.editing.id) && item.language === data.language && item[relationKey] === data[relationKey] && item.status !== "已下架";
      });
      if (duplicateRelation) return toast("该" + relationLabel + "已在当前语言的总览页展示中", "error");
      if (!Number.isInteger(sortValue) || sortValue < 1) return toast("展示顺序必须填写大于0的整数", "error");
      const duplicateSort = rows.some(function (item) {
        return String(item.id) !== String(state.editing.id) && item.language === data.language && Number(item.sort) === sortValue && item.status !== "已下架" && item.status !== "草稿";
      });
      if (isActive && duplicateSort) return toast("当前语言的这个展示顺序已被使用", "error");
    }
    const idPrefix = state.editing.dataset.slice(0, 4).toUpperCase();
    const record = Object.assign({}, existing, data, {
      id: existing.id || idPrefix + "-" + Date.now(),
      updatedAt: todayTime()
    });
    if (state.editing.config.fixedPage || state.editing.config.directSave || crmLinkedSupplement) delete record.status;
    else if (state.editing.config.selectionList) record.status = "已发布";
    else if (statusOverride) record.status = statusOverride;
    else if (!record.status) record.status = "草稿";
    if (existingIndex >= 0) rows.splice(existingIndex, 1, record);
    else rows.unshift(record);
    state.database[state.editing.dataset] = rows;
    saveDatabase();
    closeDrawer();
    renderPage();
    toast(statusOverride === "草稿" ? "草稿已保存" : "内容已保存");
  }

  function persistTerminalProducts() {
    const terminal = state.database.terminals.find(function (item) { return item.id === state.editing.terminalId; });
    if (!terminal) return toast("终端不存在，请刷新后重试", "error");
    const entries = Array.from(document.querySelectorAll("[data-terminal-product-row]")).map(function (entry, index) {
      const value = function (key) { return entry.querySelector('[data-product-field="' + key + '"]').value.trim(); };
      return { id: entry.dataset.recordId || "", itemNo: value("itemNo"), priority: index + 1, status: "已发布" };
    }).filter(function (entry) { return entry.itemNo; });
    const errors = [];
    const seen = new Set();
    entries.forEach(function (entry, index) {
      const product = state.database.products.find(function (item) { return item.itemNo.toUpperCase() === entry.itemNo.toUpperCase(); });
      if (!product) errors.push("第" + (index + 1) + "项料号不在CRM当前同步产品中");
      if (product) entry.itemNo = product.itemNo;
      const normalizedItemNo = entry.itemNo.toUpperCase();
      if (seen.has(normalizedItemNo)) errors.push("完整料号重复：" + entry.itemNo);
      seen.add(normalizedItemNo);
    });
    if (errors.length) return toast(errors[0], "error");
    const oldRelations = state.database.appProducts.filter(function (item) { return item.terminal === terminal.name; });
    const oldMap = new Map(oldRelations.map(function (item) { return [item.itemNo, item]; }));
    const replacements = entries.map(function (entry, index) {
        const product = state.database.products.find(function (item) { return item.itemNo === entry.itemNo; });
      const existing = oldMap.get(entry.itemNo) || {};
      return Object.assign({}, existing, entry, {
        id: existing.id || "APR-" + Date.now() + "-" + index,
        terminal: terminal.name,
        series: product.series,
        reason: "",
        source: existing.source || "后台维护",
        updatedAt: todayTime()
      });
    });
    state.database.appProducts = state.database.appProducts.filter(function (item) { return item.terminal !== terminal.name; }).concat(replacements);
    saveDatabase();
    closeDrawer();
    renderPage();
    toast("已保存“" + terminal.name + "”的" + replacements.length + "个推荐产品，已发布关系可直接用于前台");
  }

  function persistCadMappings() {
    const model = state.database.cadModels.find(function (item) { return item.id === state.editing.cadId; });
    if (!model) return toast("CAD模型不存在，请刷新后重试", "error");
    const entries = Array.from(document.querySelectorAll("[data-cad-mapping-row]")).map(function (entry) {
      return {
        id: entry.dataset.recordId || "",
        itemNo: entry.querySelector("[data-cad-item-no]").value.trim(),
        source: entry.dataset.source || "后台维护",
        confidence: entry.dataset.confidence || "",
        matchBasis: entry.dataset.matchBasis || "人工指定"
      };
    }).filter(function (entry) { return entry.itemNo; });
    const errors = [];
    const seen = new Set();
    entries.forEach(function (entry, index) {
      const product = state.database.products.find(function (item) { return item.itemNo.toUpperCase() === entry.itemNo.toUpperCase(); });
      if (!product) errors.push("第" + (index + 1) + "项料号不在CRM当前同步产品中");
      if (product) entry.itemNo = product.itemNo;
      const key = entry.itemNo.toUpperCase();
      if (seen.has(key)) errors.push("完整料号重复：" + entry.itemNo);
      const conflict = state.database.cadMappings.find(function (item) { return item.cadId !== model.id && item.itemNo.toUpperCase() === key && item.status === "已发布"; });
      if (conflict) errors.push("料号已关联其他CAD模型：" + entry.itemNo);
      seen.add(key);
    });
    if (errors.length) return toast(errors[0], "error");
    const existingForModel = state.database.cadMappings.filter(function (item) { return item.cadId === model.id; });
    const existingMap = new Map(existingForModel.map(function (item) { return [item.itemNo.toUpperCase(), item]; }));
    const replacements = entries.map(function (entry, index) {
      const existing = existingMap.get(entry.itemNo.toUpperCase()) || {};
      return Object.assign({}, existing, entry, {
        id: existing.id || "CADMAP-" + Date.now() + "-" + index,
        cadId: model.id,
        status: "已发布",
        updatedAt: todayTime()
      });
    });
    state.database.cadMappings = state.database.cadMappings.filter(function (item) { return item.cadId !== model.id; }).concat(replacements);
    saveDatabase(); closeDrawer(); renderPage();
    toast("已确认“" + model.name + "”对应的" + replacements.length + "个产品料号");
  }

  function persistArticleEditor(statusOverride) {
    const formData = collectForm();
    if (state.roleView !== "admin") formData.language = currentProfile().language;
    const title = String(formData.title || "").trim();
    const editor = document.getElementById("articleRichEditor");
    const body = editor ? editor.innerHTML.trim() : "";
    const bodyText = editor ? editor.textContent.trim() : "";
    const productLines = Array.from(els.editorForm.querySelectorAll('[name="articleProductLine"]:checked')).map(function (input) { return input.value; });
    const applications = Array.from(els.editorForm.querySelectorAll('[name="articleApplicationLink"]:checked')).map(function (input) { return input.value; });
    const productTargets = collectArticleProductLinks();
    if (!title) return toast("请填写文章标题", "error");
    if (!bodyText || bodyText === "请在此输入文章正文……") return toast("请填写文章正文", "error");
    const rows = state.database.articles;
    const existingIndex = rows.findIndex(function (item) { return String(item.id) === String(state.editing.id); });
    const existing = existingIndex >= 0 ? rows[existingIndex] : null;
    const summary = String((existing && existing.draft && existing.draft.summary) || (existing && existing.summary) || deriveArticleSummary(body)).trim();
    const cover = formData.cover || (existing && existing.draft && existing.draft.cover) || (existing && existing.cover) || "";
    if (!cover) return toast("请上传新闻封面图", "error");
    const publishAt = String(formData.publishAt || "").replace("T", " ");
    const content = Object.assign({}, formData, {
      title: title,
      summary: summary,
      body: body,
      channels: "新闻资讯",
      author: "",
      sourceName: "上海永铭电子股份有限公司",
      sourceUrl: "",
      productLines: productLines.join("、"),
      applications: applications.join("、"),
      cover: cover,
      publishAt: publishAt,
      updatedAt: todayTime()
    });
    if (!content.slug) content.slug = existing && existing.slug ? existing.slug : "article-" + Date.now();
    if (rows.some(function (item) { return item.id !== (existing && existing.id) && item.slug && item.slug === content.slug; })) return toast("页面地址标识已被其他文章使用", "error");
    delete content.articleProductLine;
    delete content.articleApplicationLink;
    const nextStatus = statusOverride || "已发布";
    let record;
    if (existing && existing.status === "已发布" && nextStatus === "草稿") {
      record = Object.assign({}, existing, {
        draft: content,
        draftStatus: "草稿",
        draftUpdatedAt: todayTime()
      });
    } else {
      const baseId = existing ? relationSourceId(existing) : "ART-" + Date.now();
      const recordId = existing ? existing.id : baseId + (content.language === "English" ? "-EN" : "");
      record = Object.assign({}, existing || {}, content, {
        id: recordId,
        contentId: baseId,
        status: nextStatus,
        draft: null,
        draftStatus: "",
        draftUpdatedAt: ""
      });
    }
    if (existingIndex >= 0) rows.splice(existingIndex, 1, record);
    else rows.unshift(record);
    record.relationDraft = { applications: applications, products: productTargets };
    state.selectedArticleId = record.id;
    if (nextStatus === "已发布") applyArticleRelationDraft(record);
    saveDatabase(); closeDrawer(); renderPage();
    toast(nextStatus === "草稿" ? "文章草稿已保存" : "文章已发布并同步关联页面");
  }

  function applyArticleRelationDraft(article) {
    const draft = article.relationDraft;
    if (!draft) return;
    const sourceId = relationSourceId(article);
    const controlledTypes = ["完整料号", "产品系列", "产品线", "应用领域"];
    state.database.relations = state.database.relations.filter(function (item) {
      return !(item.sourceType === "文章" && item.sourceId === sourceId && controlledTypes.includes(item.targetType));
    });
    const addRelation = function (target, index) {
      let scope = "仅当前对象";
      let effectCount = 1;
      if (target.targetType === "产品系列") {
        const series = state.database.series.find(function (item) { return item.id === target.targetId; });
        scope = "系列下全部料号"; effectCount = series ? Math.max(1, crmProductCountForSeries(series.code)) : 1;
      }
      if (target.targetType === "产品线") {
        scope = "产品线下全部系列与料号";
        effectCount = state.database.products.filter(function (item) { return item.productLine === target.targetId; }).length || 1;
      }
      if (target.targetType === "应用领域") {
        scope = "应用领域下全部终端";
        effectCount = state.database.terminals.filter(function (item) { return item.field === target.targetName; }).length || 1;
      }
      state.database.relations.push({
        id: "REL-ARTICLE-" + Date.now() + "-" + index,
        sourceType: "文章", sourceId: sourceId, sourceName: article.title,
        relationType: "推荐新闻", targetType: target.targetType, targetId: target.targetId, targetName: target.targetName,
        scope: scope, effectCount: effectCount, validation: "校验通过", priority: index + 1, source: "文章发布页面", status: "已发布"
      });
    };
    const applicationTargets = (draft.applications || []).map(function (name) {
      const application = state.database.applications.find(function (item) { return item.name === name; });
      return { targetType: "应用领域", targetId: application ? application.id : name, targetName: name };
    });
    (draft.products || []).concat(applicationTargets).forEach(addRelation);
    article.relations = state.database.relations.filter(function (item) { return item.sourceType === "文章" && item.sourceId === sourceId && item.status === "已发布"; }).length;
    delete article.relationDraft;
  }

  function previewRecord(config, recordId) {
    const record = (state.database[config.dataset] || []).find(function (item) { return String(item.id) === String(recordId); });
    if (!record) return;
    if (config.kind === "product-master") return previewProductMaster(config, record);
    if (config.dataset === "articles") return previewArticleRecord(record);
    const rows = Object.keys(record).filter(function (key) { return !Array.isArray(record[key]) && typeof record[key] !== "object"; }).map(function (key) {
      return '<tr><th>' + escapeHtml(key) + '</th><td>' + escapeHtml(record[key]) + "</td></tr>";
    }).join("");
    showModal("数据详情", "查看记录", '<div class="table-scroll"><table class="data-table"><tbody>' + rows + "</tbody></table></div>", [{ label: "关闭", tone: "secondary", action: closeModal }]);
  }

  function previewArticleRecord(article) {
    const preview = article.draft ? Object.assign({}, article, article.draft) : article;
    const body = '<article class="article-preview"><div class="article-preview-meta">' + escapeHtml([preview.type, preview.channels, preview.publishAt || "未定时"].filter(Boolean).join("｜")) + '</div><p class="article-preview-summary">' + escapeHtml(preview.summary || "") + '</p>' + articleBodyHtml(preview.body) + '</article>';
    showModal(article.draft ? "编辑版本预览" : "文章预览", preview.title, body, [{ label: "关闭预览", tone: "secondary", action: closeModal }]);
  }

  function previewProductMaster(config, product) {
    const template = productTemplateFor(config, product);
    const stats = productFieldStats(config, product);
    const series = state.database.series.find(function (item) { return item.code === product.series; });
    const aiKeywords = state.database.productAiKeywords.find(function (item) { return item.itemNo === product.itemNo; });
    const cadMapping = (state.database.cadMappings || []).find(function (item) { return item.itemNo === product.itemNo && item.status === "已发布"; });
    const cad = cadMapping && state.database.cadModels.find(function (item) { return item.id === cadMapping.cadId && item.status === "已发布"; });
    const shopLinks = (state.database.shopLinks || []).filter(function (item) { return item.itemNo === product.itemNo && item.listingStatus === "上架" && item.status !== "已下架"; });
    const replacementCount = state.database.replacements.filter(function (item) { return item.yminNo === product.itemNo && item.status === "有效"; }).length;
    const applicationCount = state.database.appProducts.filter(function (item) { return item.itemNo === product.itemNo && item.status !== "已下架"; }).length;
    const contentCount = state.database.relations.filter(function (item) {
      if (item.sourceType !== "文章" || item.status === "已下架") return false;
      if (item.targetType === "完整料号") return item.targetId === product.itemNo;
      return item.targetType === "产品系列" && series && item.targetId === series.id;
    }).length;
    const groups = ["基础信息", "产品线参数"].map(function (group) {
      const rows = template.filter(function (field) { return field.group === group; }).map(function (field) {
        const value = String(product[field.key] == null ? "" : product[field.key]).trim();
        return '<tr><th>' + escapeHtml(field.label) + '</th><td>' + (value ? escapeHtml(value) : '<span class="tag">暂无数据</span>') + '</td></tr>';
      }).join("");
      return '<section class="panel" style="margin-top:16px"><header class="panel-header"><div><h2>' + escapeHtml(group) + '</h2><p>' + template.filter(function (field) { return field.group === group; }).length + ' 个确认字段</p></div></header><div class="table-scroll"><table class="data-table"><thead><tr><th>字段名称</th><th>当前值</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
    }).join("");
    const dimensionFields = template.filter(function (field) {
      return /直径|高度|长L|宽W|高H|尺寸[DLWHT]|引脚L1|间距\(mm\)/i.test(field.label);
    });
    const rippleFields = template.filter(function (field) { return /纹波|ESR/i.test(field.label); });
    const derivedPanels = renderDerivedProductPanel("本料号尺寸（单位：mm）", dimensionFields, product) +
      renderDerivedProductPanel("本料号纹波参数", rippleFields, product);
    const seriesResources = '<section class="panel" style="margin-top:16px"><header class="panel-header"><div><h2>系列公共资料</h2><p>按系列维护一次，自动供该系列全部料号使用</p></div></header><div class="panel-body"><div class="relation-summary-grid">' +
      mappingSummary("系列产品图", series && series.image ? 1 : 0, series && series.image ? 1 : 0, series && series.image ? series.image : "待补充") +
      mappingSummary("系列规格书PDF", series && series.pdf ? 1 : 0, series && series.pdf ? 1 : 0, series && series.pdf ? series.pdf : "待补充") +
      mappingSummary("产品尺寸图", series && series.dimensionImage ? 1 : 0, series && series.dimensionImage ? 1 : 0, series && series.dimensionImage ? series.dimensionImage : "待补充") +
      mappingSummary("纹波/频率条件图", series && series.rippleImage ? 1 : 0, series && series.rippleImage ? 1 : 0, series && series.rippleImage ? series.rippleImage : "待补充") +
      mappingSummary("编码规则", series && series.codingRule ? 1 : 0, series && series.codingRule ? 1 : 0, series && series.codingRule ? "已维护" : "待补充") +
      mappingSummary("特性标签", series && series.tags ? 1 : 0, series && series.tags ? 1 : 0, series && series.tags ? "已维护" : "待补充") +
    '</div></div></section>';
    const extensions = '<section class="panel" style="margin-top:16px"><header class="panel-header"><div><h2>料号资源与关联</h2><p>各模块只维护自己的数据，产品详情页按完整料号聚合展示</p></div></header><div class="panel-body"><div class="relation-summary-grid">' +
      mappingSummary("3D-CAD", cad ? 1 : 0, cad ? 1 : 0, cad ? cad.status : "未关联") +
      mappingSummary("AI搜索关键词", aiKeywords && aiKeywords.aiKeywords ? 1 : 0, aiKeywords && aiKeywords.aiKeywords ? 1 : 0, aiKeywords && aiKeywords.aiKeywords ? "已维护" : "待补充") +
      mappingSummary("商城上架链接", shopLinks.length, shopLinks.length, shopLinks.length ? shopLinks.length + "个平台已匹配" : "无上架同料号") +
      mappingSummary("寿命推算工具", 1, 1, "已上线｜使用情况见流量分析") +
      mappingSummary("SPICE模型", 0, 0, "入口保留｜暂无数据") +
      mappingSummary("可靠性实验数据", 0, 0, "入口保留｜暂无数据") +
      mappingSummary("替代料关系", replacementCount, replacementCount, replacementCount ? replacementCount + "条" : "无关系时前台隐藏") +
      mappingSummary("推荐应用", applicationCount, applicationCount, applicationCount ? applicationCount + "个终端" : "无关系时前台隐藏") +
      mappingSummary("推荐新闻/文章", contentCount, contentCount, contentCount ? contentCount + "篇" : "无关系时前台隐藏") +
    '</div></div></section>';
    const shopPanel = '<section class="panel" style="margin-top:16px"><header class="panel-header"><div><h2>网销商城同料号匹配</h2><p>来源：商城系统；只展示上架且完整料号精确相同的商品</p></div></header>' + (shopLinks.length ? '<div class="table-scroll"><table class="data-table"><thead><tr><th>商城平台</th><th>商城商品编号</th><th>商品链接</th><th>同步状态</th><th>同步时间</th></tr></thead><tbody>' + shopLinks.map(function (item) { return '<tr><td>' + escapeHtml(item.platform) + '</td><td>' + escapeHtml(item.externalSku) + '</td><td>' + escapeHtml(item.productUrl) + '</td><td>' + escapeHtml(item.syncStatus) + '</td><td>' + escapeHtml(item.updatedAt) + '</td></tr>'; }).join("") + '</tbody></table></div>' : '<div class="empty-state">商城系统当前没有该完整料号的上架商品，前台不显示网销商城模块。</div>') + '</section>';
    const body = '<div class="impact-box"><strong>' + escapeHtml(product.itemNo) + '</strong> · ' + escapeHtml(product.productLine) + ' · ' + escapeHtml(product.series) + '系列<br>确认字段 ' + stats.total + ' 个，已有值 ' + stats.filled + ' 个，暂无数据 ' + stats.missing + ' 个。</div>' + derivedPanels + seriesResources + extensions + shopPanel + groups;
    showModal("产品完整字段", product.itemNo, body, [{ label: "关闭", tone: "secondary", action: closeModal }]);
  }

  function renderDerivedProductPanel(title, productFields, product) {
    const rows = productFields.map(function (field) {
      const value = String(product[field.key] == null ? "" : product[field.key]).trim();
      return '<tr><th>' + escapeHtml(field.label) + '</th><td>' + (value ? escapeHtml(value) : '<span class="tag">暂无数据</span>') + '</td></tr>';
    }).join("");
    return '<section class="panel" style="margin-top:16px"><header class="panel-header"><div><h2>' + escapeHtml(title) + '</h2></div></header><div class="table-scroll"><table class="data-table"><thead><tr><th>页面展示项</th><th>当前值</th></tr></thead><tbody>' + (rows || '<tr><td colspan="2" class="empty-state">当前产品线确认模板中没有对应字段</td></tr>') + '</tbody></table></div></section>';
  }

  function resourceEditorConfig() {
    return {
      dataset: "downloads", title: "下载资源", group: "服务支持",
      fields: [
        { key: "title", label: "资料标题", type: "text", required: true, full: true },
        { key: "type", label: "资料类型", type: "select", required: true, options: ["综合目录册", "产品目录册", "应用选型手册", "编码规则", "使用资料"] },
        { key: "productLine", label: "产品类别", type: "select", options: ["全部"].concat(seed.productLines) },
        { key: "package", label: "封装/结构形式", type: "select", options: ["全部", "贴片型", "引线型", "基板自立型/牛角型", "螺栓型"] },
        { key: "application", label: "应用领域", type: "select", options: ["全部"].concat(seed.applicationFields) },
        { key: "language", label: "语言", type: "select", options: seed.languages },
        { key: "version", label: "版本", type: "text", required: true },
        { key: "summary", label: "前端资料说明", type: "textarea", full: true, help: "应用中心等引用该资料时，前端说明同步读取此处内容" },
        { key: "fileUpload", label: "文件", type: "file", required: true, full: true },
        { key: "keywords", label: "搜索关键词", type: "textarea", full: true },
        { key: "status", label: "状态", type: "select", options: ["草稿", "已发布", "已下架"] }
      ]
    };
  }

  function renderResources(config) {
    const tableConfig = Object.assign(resourceEditorConfig(), {
      readonly: true,
      viewable: true,
      previewLabel: "查看详情",
      columns: [["title","资料标题"],["type","资料类型"],["productLine","产品类别"],["application","应用领域"],["language","语言"],["version","版本"],["whereUsed","页面引用"],["downloads","下载"],["status","CRM状态"]]
    });
    const rows = rowsForConfig(tableConfig);
    const actions = '<button class="button button-secondary" type="button" data-action="export">导出资源清单</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div>资料文件、版本和公开状态从CRM同步；应用中心等页面继续按稳定资源ID引用。</div></div>' +
      '<div class="rule-layout"><div>' + toolbarHtml(tableConfig) + tableHtml(tableConfig, rows, function (row) {
        return '<button class="text-button" type="button" data-where-used="' + escapeHtml(row.id) + '">引用页面</button>';
      }) + '</div><aside class="rule-summary"><h3>页面联动</h3><ul><li>应用中心按资源ID引用指南</li><li>系列规格书不进入下载中心</li><li>CRM更新文件后引用页面同步更新</li><li>无有效文件时前台按钮自动隐藏</li></ul></aside></div>';
    bindTableActions(tableConfig);
    document.querySelectorAll("[data-where-used]").forEach(function (button) { button.addEventListener("click", function () { showWhereUsed(button.dataset.whereUsed); }); });
  }

  function replaceResource(id) {
    const resource = state.database.downloads.find(function (item) { return item.id === id; });
    if (!resource) return;
    const related = state.database.relations.filter(function (item) { return item.sourceId === id && item.status === "已发布"; });
    const body = '<div class="impact-box"><strong>更新影响：</strong>当前资源被 ' + related.length + ' 个前台位置引用。替换后这些页面会自动使用新文件，不需要逐页修改。</div>' +
      '<div class="form-grid" style="margin-top:16px"><label class="form-field"><span>当前版本</span><input class="field-control readonly-field" value="' + escapeHtml(resource.version) + '" readonly></label><label class="form-field"><span>新版本 <em>*</em></span><input class="field-control" id="newResourceVersion" value="' + escapeHtml(nextVersion(resource.version)) + '"></label><label class="form-field full"><span>选择新文件 <em>*</em></span><input class="field-control" id="newResourceFile" type="file" accept=".pdf,.zip,.doc,.docx,.xlsx"></label><label class="form-field full"><span>更新说明</span><textarea class="field-control" id="resourceChangeNote" placeholder="说明本次资料更新内容"></textarea></label></div>';
    showModal("文件版本", "替换“" + resource.title + "”", body, [
      { label: "取消", tone: "ghost", action: closeModal },
      { label: "保存新版本", tone: "primary", action: function () {
        const version = document.getElementById("newResourceVersion").value.trim();
        const file = document.getElementById("newResourceFile").files[0];
        if (!version || !file) return toast("请选择文件并填写版本", "error");
        resource.version = version;
        resource.file = file.name;
        resource.updatedAt = todayTime();
        resource.status = "草稿";
        saveDatabase(); closeModal(); renderPage(); toast("新版本已保存，引用关系保持不变");
      } }
    ]);
  }

  function nextVersion(version) {
    const match = String(version || "").match(/(\d+)(?!.*\d)/);
    if (!match) return "V2.0";
    return String(version).slice(0, match.index) + (Number(match[1]) + 1);
  }

  function showWhereUsed(resourceId) {
    const resource = state.database.downloads.find(function (item) { return item.id === resourceId; });
    const related = state.database.relations.filter(function (item) { return item.sourceId === resourceId; });
    const list = related.length ? '<ul class="where-used">' + related.map(function (item) { return '<li><strong>' + escapeHtml(item.targetName) + '</strong><span>' + escapeHtml(item.targetType + " · " + item.relationType + " · " + item.status) + "</span></li>"; }).join("") + "</ul>" : '<div class="empty-state">当前资源未被其他页面引用</div>';
    showModal("资源引用", resource.title, '<div class="impact-box"><strong>资源ID：</strong>' + escapeHtml(resource.id) + '<br><strong>当前版本：</strong>' + escapeHtml(resource.version) + "</div>" + list, [{ label: "关闭", tone: "secondary", action: closeModal }]);
  }

  function renderRelations(config) {
    const rows = state.database.relations.filter(function (row) {
      const query = state.search.toLowerCase();
      return (!query || JSON.stringify(row).toLowerCase().includes(query)) && (!state.status || row.status === state.status) && (!state.category || row.relationType === state.category);
    });
    const actions = '<button class="button button-secondary" type="button" data-action="import">导入映射</button><button class="button button-primary" type="button" data-action="create-relation">新增关联</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div><strong>展示原则：</strong>只有已发布内容和有效目标之间的显式关系才会展示；没有关系时，前台不显示对应推荐模块。</div></div>' +
      '<div class="rule-layout"><div><div class="toolbar"><input class="search-field" id="relationSearch" type="search" placeholder="搜索文章、料号、系列或应用" value="' + escapeHtml(state.search) + '"><select class="filter-select" id="relationType"><option value="">全部关系</option><option>推荐新闻</option><option>推荐产品</option><option>指南下载</option></select><select class="filter-select" id="relationStatus"><option value="">全部状态</option><option>已发布</option><option>草稿</option></select><div class="toolbar-actions"><button class="button button-ghost button-small" data-action="reset-filter">重置</button><button class="button button-secondary button-small" data-action="export">导出</button></div></div>' + relationTable(rows) + '</div><aside class="rule-summary"><h3>关联数据来源</h3><ul><li>推荐新闻：知识库Excel初始化，发布文章为正式数据</li><li>推荐应用：应用中心确认表中的完整料号</li><li>指南下载：下载中心稳定资源ID</li><li>同一关系双向生效，不重复维护</li><li>已下架对象由前台自动过滤</li></ul></aside></div>';
    bindGlobalPageActions();
    const relationSearch = document.getElementById("relationSearch");
    const relationType = document.getElementById("relationType");
    const relationStatus = document.getElementById("relationStatus");
    relationSearch.addEventListener("input", debounce(function () { state.search = relationSearch.value; renderPage(); }, 180));
    relationType.value = state.category; relationType.addEventListener("change", function () { state.category = relationType.value; renderPage(); });
    relationStatus.value = state.status; relationStatus.addEventListener("change", function () { state.status = relationStatus.value; renderPage(); });
    document.querySelectorAll("[data-edit-relation]").forEach(function (button) { button.addEventListener("click", function () { openRelationEditor(button.dataset.editRelation); }); });
    document.querySelectorAll("[data-delete-relation]").forEach(function (button) { button.addEventListener("click", function () { archiveRelation(button.dataset.deleteRelation); }); });
  }

  function renderArticleWorkbench(config) {
    const articles = scopedDataset("articles");
    let article = articles.find(function (item) { return item.id === state.selectedArticleId; });
    if (!article) article = articles[0];
    if (!article) {
      els.main.innerHTML = pageHeader(config, '<button class="button button-primary" data-route-action="articles">新建文章</button>') + '<div class="panel"><div class="empty-state">请先创建文章主数据</div></div>';
      bindGlobalPageActions();
      return;
    }
    state.selectedArticleId = article.id;
    const sourceId = relationSourceId(article);
    const relations = state.database.relations.filter(function (item) { return item.sourceType === "文章" && item.sourceId === sourceId && item.status !== "已下架"; });
    const articleFaqs = scopedDataset("faqs").filter(function (item) { return item.sourceArticleId === sourceId && item.status !== "已下架"; });
    const productRelations = relations.filter(function (item) { return ["完整料号", "产品系列", "产品线"].includes(item.targetType); });
    const applicationRelations = relations.filter(function (item) { return ["应用领域", "应用终端"].includes(item.targetType); });
    const contentRelations = relations.filter(function (item) { return ["文章", "FAQ"].includes(item.targetType); });
    const invalidRelations = relations.filter(function (item) { return item.validation && item.validation !== "校验通过"; });
    const effectCount = relations.reduce(function (sum, item) { return sum + Number(item.effectCount || 1); }, 0);
    const actions = '<button class="button button-secondary" type="button" data-article-action="download-template">下载关联模板</button><button class="button button-secondary" type="button" data-article-action="bulk-import">批量导入关联</button><button class="button button-primary" type="button" data-article-action="submit">发布文章及关联</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div><strong>正式发布逻辑：</strong>文章固定发布到新闻资讯。文章发布后可由AI提取FAQ候选，FAQ经人工确认后单独发布，并同步这篇文章已经确认的产品中心、应用中心关联。</div></div>' +
      '<section class="article-selector panel"><div><span class="eyebrow">当前维护文章</span><select class="field-control" id="articleSelector">' + articles.map(function (item) { return '<option value="' + escapeHtml(item.id) + '"' + (item.id === article.id ? " selected" : "") + '>' + escapeHtml(item.id + "｜" + item.title) + "</option>"; }).join("") + '</select></div><div class="article-selector-meta"><span>' + statusPill(article.status) + '</span><span>发布位置：<strong>新闻资讯</strong></span><span>语言：<strong>' + escapeHtml(article.language) + '</strong></span><button class="text-button" type="button" data-article-action="edit-article">编辑文章正文</button></div></section>' +
      '<div class="publish-steps"><div class="publish-step is-done"><b>1</b><span><strong>确认稿原文</strong><small>标题与正文原样发布</small></span></div><div class="publish-step is-done"><b>2</b><span><strong>分类标签</strong><small>用于新闻检索</small></span></div><div class="publish-step' + (relations.length ? " is-done" : "") + '"><b>3</b><span><strong>推荐关系</strong><small>产品与应用页面</small></span></div><div class="publish-step' + (article.status === "已发布" ? " is-done" : "") + '"><b>4</b><span><strong>新闻发布</strong><small>固定进入新闻资讯</small></span></div><div class="publish-step' + (articleFaqs.some(function (faq) { return faq.status === "已发布"; }) ? " is-done" : "") + '"><b>5</b><span><strong>FAQ提取</strong><small>人工确认后单独发布</small></span></div></div>' +
      '<div class="article-workbench-grid"><div>' +
        '<section class="panel"><header class="panel-header"><div><h2>文章分类标签</h2><p>用于新闻检索和FAQ提取范围识别，不自动产生产品或应用关联</p></div></header><div class="panel-body taxonomy-grid"><div><span>内容类型</span><strong>' + escapeHtml(article.type) + '</strong></div><div><span>产品线标签</span><strong>' + escapeHtml(article.productLines || "未设置") + '</strong></div><div><span>应用标签</span><strong>' + escapeHtml(article.applications || "未设置") + '</strong></div><div><span>发布位置</span><strong>新闻资讯</strong></div></div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>前台推荐关系</h2><p>可精确到产品线、系列、完整料号、应用领域或终端</p></div><button class="button button-primary button-small" type="button" data-article-action="new-relation">新增关系</button></header><div class="relation-summary-grid">' +
          mappingSummary("产品关系", productRelations.length, productRelations.reduce(function (n, i) { return n + Number(i.effectCount || 1); }, 0), "产品详情页") +
          mappingSummary("应用关系", applicationRelations.length, applicationRelations.reduce(function (n, i) { return n + Number(i.effectCount || 1); }, 0), "应用终端页") +
          mappingSummary("相关内容", contentRelations.length, contentRelations.length, "文章/FAQ详情") +
          mappingSummary("待确认", invalidRelations.length, invalidRelations.length, "阻止关系发布", invalidRelations.length ? "warning" : "good") +
        '</div><div class="table-scroll"><table class="data-table"><thead><tr><th>维度</th><th>目标对象</th><th>生效范围</th><th>预计页面数</th><th>排序</th><th>数据来源</th><th>校验</th><th>操作</th></tr></thead><tbody>' + articleRelationRows(relations) + '</tbody></table></div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>文章FAQ提取与发布</h2><p>AI只生成候选问题和答案；人工确认后单独发布，并继承上方已发布且校验通过的产品、应用关系</p></div><button class="button button-primary button-small" type="button" data-article-action="extract-faq">AI提取FAQ候选</button></header><div class="table-scroll"><table class="data-table"><thead><tr><th>FAQ问题</th><th>生成方式</th><th>确认状态</th><th>可同步关系</th><th>发布状态</th><th>操作</th></tr></thead><tbody>' + articleFaqRows(articleFaqs, relations) + '</tbody></table></div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>批量维护格式</h2><p>大量数据使用同一模板导入，后台按稳定ID校验</p></div><button class="text-button" data-article-action="download-template">下载模板</button></header><div class="panel-body"><div class="import-columns"><code>文章ID</code><code>关系类型</code><code>目标类型</code><code>目标ID</code><code>生效范围</code><code>排序</code><code>数据来源</code></div><ul class="plain-rules"><li>一个目标一行，可一次导入多个文章、系列、料号和应用终端。</li><li>导入先进入暂存区，不直接覆盖正式关系；支持“追加更新”和“全量替换”两种模式。</li><li>完整料号、系列代码、应用ID必须在主数据中存在；重复和无效记录生成错误报告。</li></ul></div></section>' +
      '</div><aside>' +
        '<section class="panel sticky-panel"><header class="panel-header"><div><h2>发布影响预览</h2><p>提交前确认将出现在哪些页面</p></div></header><div class="panel-body"><div class="impact-number"><strong>' + effectCount + '</strong><span>预计前台展示位置</span></div><ul class="where-used"><li><strong>产品详情页推荐新闻</strong><span>' + productRelations.reduce(function (n, i) { return n + Number(i.effectCount || 1); }, 0) + ' 个页面</span></li><li><strong>应用中心推荐新闻</strong><span>' + applicationRelations.length + ' 个页面</span></li><li><strong>文章详情相关内容</strong><span>' + contentRelations.length + ' 个入口</span></li></ul><button class="button button-secondary full-button" type="button" data-article-action="preview">查看具体页面</button></div></section>' +
        '<section class="panel"><header class="panel-header"><div><h2>发布校验</h2></div></header><div class="panel-body validation-list">' +
          validationItem("文章正文与新闻资讯发布位置", Boolean(article.title && article.channels === "新闻资讯")) +
          validationItem("目标ID在主数据中存在", !invalidRelations.some(function (i) { return /不存在/.test(i.validation || ""); })) +
          validationItem("映射已由数据负责人确认", !invalidRelations.length) +
          validationItem("无重复或冲突关系", !hasDuplicateRelations(relations)) +
        '</div></section>' +
      '</aside></div>';

    bindGlobalPageActions();
    document.getElementById("articleSelector").addEventListener("change", function (event) { state.selectedArticleId = event.target.value; renderPage(); });
    document.querySelectorAll("[data-article-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        const action = button.dataset.articleAction;
        if (action === "edit-article") openRecordEditor(seed.moduleConfigs.articles, article.id);
        if (action === "new-relation") openArticleRelationEditor(article);
        if (action === "bulk-import") { els.importFileInput.dataset.target = "articleRelations"; els.importFileInput.click(); }
        if (action === "download-template") downloadArticleRelationTemplate();
        if (action === "preview") previewArticleEffects(article, relations);
        if (action === "submit") submitArticleBundle(article, relations, invalidRelations);
        if (action === "extract-faq") extractFaqCandidates(article, relations);
      });
    });
    document.querySelectorAll("[data-article-relation-edit]").forEach(function (button) { button.addEventListener("click", function () { openRelationEditor(button.dataset.articleRelationEdit); }); });
    document.querySelectorAll("[data-faq-edit]").forEach(function (button) { button.addEventListener("click", function () { openRecordEditor(seed.moduleConfigs.faqs, button.dataset.faqEdit); }); });
    document.querySelectorAll("[data-faq-publish]").forEach(function (button) { button.addEventListener("click", function () { publishFaqWithRelations(button.dataset.faqPublish); }); });
  }

  function mappingSummary(title, relations, pages, target, tone) {
    return '<div class="mapping-summary ' + (tone || "") + '"><span>' + escapeHtml(title) + '</span><strong>' + relations + '</strong><small>' + pages + ' 个' + escapeHtml(target) + '</small></div>';
  }

  function articleRelationRows(relations) {
    if (!relations.length) return '<tr><td class="empty-state" colspan="8">尚未维护前台推荐关系；文章仍可出现在自身发布频道，但不会进入产品或应用页面的推荐模块。</td></tr>';
    return relations.map(function (item) {
      const validation = item.validation || relationValidation(item);
      return '<tr><td><span class="tag">' + escapeHtml(item.targetType) + '</span></td><td><strong>' + escapeHtml(item.targetName) + '</strong><small>' + escapeHtml(item.targetId) + '</small></td><td>' + escapeHtml(item.scope || "仅当前对象") + '</td><td><strong>' + escapeHtml(item.effectCount || 1) + '</strong></td><td>' + escapeHtml(item.priority || 1) + '</td><td>' + escapeHtml(item.source || "后台维护") + '</td><td>' + statusPill(validation) + '</td><td><button class="text-button" data-article-relation-edit="' + escapeHtml(item.id) + '">编辑</button></td></tr>';
    }).join("");
  }

  function articleFaqRows(faqs, articleRelations) {
    if (!faqs.length) return '<tr><td class="empty-state" colspan="6">尚未提取FAQ。文章发布后点击“AI提取FAQ候选”，人工确认问题与答案后再单独发布。</td></tr>';
    const reusableRelations = articleRelations.filter(function (item) {
      return ["完整料号", "产品系列", "产品线", "应用领域", "应用终端"].includes(item.targetType) && item.status === "已发布" && (item.validation || relationValidation(item)) === "校验通过";
    });
    return faqs.map(function (faq) {
      const publishLabel = faq.status === "已发布" ? "重新同步关联" : "确认并发布";
      return '<tr><td><strong>' + escapeHtml(faq.question) + '</strong><small>来源：' + escapeHtml(faq.sourceArticleTitle || "人工独立维护") + '</small></td><td>' + escapeHtml(faq.source || "人工创建") + '</td><td>' + statusPill(faq.aiConfidence || "待人工确认") + '</td><td><strong>' + reusableRelations.length + '</strong><small>条已确认产品/应用关系</small></td><td>' + statusPill(faq.status) + '</td><td><div class="cell-actions"><button class="text-button" type="button" data-faq-edit="' + escapeHtml(faq.id) + '">编辑确认</button><button class="text-button" type="button" data-faq-publish="' + escapeHtml(faq.id) + '">' + publishLabel + '</button></div></td></tr>';
    }).join("");
  }

  function openArticleFaqManager(articleId) {
    const article = state.database.articles.find(function (item) { return item.id === articleId; });
    if (!article) return;
    const sourceId = relationSourceId(article);
    const relations = state.database.relations.filter(function (item) { return item.sourceType === "文章" && item.sourceId === sourceId && item.status !== "已下架"; });
    const faqs = scopedDataset("faqs").filter(function (item) { return item.sourceArticleId === sourceId && item.status !== "已下架"; });
    const body = '<div class="impact-box"><strong>简单流程：</strong>文章先发布 → AI提取FAQ候选 → 人工编辑确认 → 发布FAQ并同步文章已有的产品、应用关联。</div><div class="table-scroll"><table class="data-table"><thead><tr><th>FAQ问题</th><th>生成方式</th><th>确认状态</th><th>可同步关系</th><th>发布状态</th><th>操作</th></tr></thead><tbody>' + articleFaqRows(faqs, relations) + '</tbody></table></div>';
    showModal("文章发布后的FAQ", article.title, body, [
      { label: "关闭", tone: "ghost", action: closeModal },
      { label: faqs.length ? "重新检查文章" : "AI提取FAQ候选", tone: "primary", action: function () { closeModal(); extractFaqCandidates(article, relations); } }
    ]);
    document.querySelectorAll("[data-faq-edit]").forEach(function (button) { button.addEventListener("click", function () { closeModal(); openRecordEditor(seed.moduleConfigs.faqs, button.dataset.faqEdit); }); });
    document.querySelectorAll("[data-faq-publish]").forEach(function (button) { button.addEventListener("click", function () { closeModal(); publishFaqWithRelations(button.dataset.faqPublish); }); });
  }

  function extractFaqCandidates(article, articleRelations) {
    if (article.status !== "已发布") {
      toast("请先正式发布文章，再提取FAQ", "error");
      return;
    }
    const sourceId = relationSourceId(article);
    const existing = scopedDataset("faqs").filter(function (faq) { return faq.sourceArticleId === sourceId && faq.status !== "已下架"; });
    if (existing.length) {
      toast("这篇文章已有FAQ候选，请直接编辑确认，避免重复提取");
      return;
    }
    const productLine = String(article.productLines || "全部").split(/[,，]/)[0].trim() || "全部";
    const application = String(article.applications || "通用").split(/[,，]/)[0].trim() || "通用";
    const sourceText = String(article.summary || "").trim();
    const faq = {
      id: "FAQ-AI-" + Date.now(),
      question: "关于“" + article.title + "”，客户通常需要确认哪些要点？",
      answer: sourceText,
      sourceExcerpt: sourceText,
      type: article.type === "产品信息" ? "产品与选型" : "应用与选型",
      application: application,
      productLine: productLine,
      sourceArticleId: sourceId,
      sourceArticleTitle: article.title,
      source: "AI从文章提取",
      aiConfidence: "待人工确认",
      relations: 0,
      language: article.language || currentProfile().language,
      status: "草稿",
      updatedAt: todayTime().slice(0, 10)
    };
    state.database.faqs.unshift(faq);
    saveDatabase();
    renderPage();
    toast("已生成FAQ候选，请人工核对原文、问题与答案后发布");
  }

  function publishFaqWithRelations(faqId) {
    const faq = state.database.faqs.find(function (item) { return item.id === faqId; });
    if (!faq) return;
    if (!faq.question || !faq.answer) {
      toast("FAQ的问题和答案必须完整，请先编辑确认", "error");
      return;
    }
    const article = state.database.articles.find(function (item) { return relationSourceId(item) === faq.sourceArticleId && item.language === (faq.language || "简体中文"); }) || state.database.articles.find(function (item) { return relationSourceId(item) === faq.sourceArticleId; });
    if (!article || article.status !== "已发布") {
      toast("来源文章尚未正式发布，不能发布该FAQ", "error");
      return;
    }
    const inherited = state.database.relations.filter(function (item) {
      return item.sourceType === "文章" && item.sourceId === relationSourceId(article) && ["完整料号", "产品系列", "产品线", "应用领域", "应用终端"].includes(item.targetType) && item.status === "已发布" && (item.validation || relationValidation(item)) === "校验通过";
    });
    if (!inherited.length) {
      toast("请先确认并发布该文章的产品中心或应用中心关联", "error");
      return;
    }
    const productCount = inherited.filter(function (item) { return ["完整料号", "产品系列", "产品线"].includes(item.targetType); }).length;
    const applicationCount = inherited.filter(function (item) { return ["应用领域", "应用终端"].includes(item.targetType); }).length;
    showModal("FAQ确认发布", faq.question, '<div class="impact-box"><strong>本次将建立：</strong>来源文章关联1条、产品中心关联' + productCount + '条、应用中心关联' + applicationCount + '条。</div><p>FAQ的问题和答案作为独立内容发布；产品与应用关系继承来源文章中已经发布且校验通过的显式关系。文章标签不会自动扩展关联范围。</p>', [
      { label: "取消", tone: "ghost", action: closeModal },
      { label: "确认并发布", tone: "primary", action: function () {
        syncFaqRelations(faq, article, inherited);
        faq.status = "已发布";
        faq.aiConfidence = "人工已确认";
        faq.relations = inherited.length + 1;
        faq.updatedAt = todayTime().slice(0, 10);
        saveDatabase(); closeModal(); renderPage(); toast("FAQ已发布，来源文章及产品/应用关联已同步");
      } }
    ]);
  }

  function syncFaqRelations(faq, article, inherited) {
    const sourceId = relationSourceId(article);
    const sourceKey = ["文章", sourceId].join("|");
    const desiredKeys = new Set(inherited.map(function (item) { return [item.targetType, item.targetId].join("|"); }).concat([sourceKey]));
    state.database.relations.forEach(function (item) {
      if (item.sourceType !== "FAQ" || item.sourceId !== faq.id) return;
      if (!["FAQ发布时自动建立", "继承来源文章已确认关联"].includes(item.source)) return;
      const key = [item.targetType, item.targetId].join("|");
      if (!desiredKeys.has(key)) item.status = "已下架";
    });
    upsertFaqRelation(faq, {
      targetType: "文章", targetId: sourceId, targetName: article.title, relationType: "来源文章", scope: "仅当前对象", effectCount: 1, priority: 1, source: "FAQ发布时自动建立"
    });
    inherited.forEach(function (item, index) {
      upsertFaqRelation(faq, {
        targetType: item.targetType, targetId: item.targetId, targetName: item.targetName, relationType: "相关知识", scope: item.scope, effectCount: item.effectCount || 1, priority: item.priority || index + 1, source: "继承来源文章已确认关联"
      });
    });
  }

  function upsertFaqRelation(faq, relation) {
    let record = state.database.relations.find(function (item) {
      return item.sourceType === "FAQ" && item.sourceId === faq.id && item.targetType === relation.targetType && item.targetId === relation.targetId;
    });
    if (!record) {
      record = { id: "REL-FAQ-" + Date.now() + "-" + state.database.relations.length };
      state.database.relations.push(record);
    }
    Object.assign(record, relation, {
      sourceType: "FAQ",
      sourceId: faq.id,
      sourceName: faq.question,
      validation: "校验通过",
      status: "已发布"
    });
  }

  function relationValidation(item) {
    if (item.targetType === "完整料号") return state.database.products.some(function (p) { return p.itemNo === item.targetId; }) ? "校验通过" : "目标不存在";
    if (item.targetType === "产品系列") return state.database.series.some(function (s) { return s.id === item.targetId || s.code === item.targetId; }) ? "校验通过" : "目标不存在";
    if (item.targetType === "应用终端") return state.database.terminals.some(function (t) { return t.id === item.targetId; }) ? "校验通过" : "目标不存在";
    if (item.targetType === "应用领域") return state.database.applications.some(function (a) { return a.id === item.targetId; }) ? "校验通过" : "目标不存在";
    return "校验通过";
  }

  function validationItem(label, passed) {
    return '<div class="validation-item ' + (passed ? "passed" : "failed") + '"><b>' + (passed ? "✓" : "!") + '</b><span>' + escapeHtml(label) + '</span><small>' + (passed ? "通过" : "需要处理") + '</small></div>';
  }

  function hasDuplicateRelations(relations) {
    const keys = relations.map(function (item) { return [item.relationType, item.targetType, item.targetId].join("|"); });
    return new Set(keys).size !== keys.length;
  }

  function openArticleRelationEditor(article) {
    const preset = {
      sourceType: "文章",
      sourceId: relationSourceId(article),
      sourceName: article.title,
      relationType: "推荐新闻",
      scope: "仅当前对象",
      effectCount: 1,
      validation: "待校验",
      priority: 1,
      source: "后台维护",
      status: "草稿"
    };
    state.editing = { dataset: "relations", id: null, config: { fields: relationFields() } };
    els.drawerEyebrow.textContent = "文章发布与关联";
    els.drawerTitle.textContent = "新增文章推荐关系";
    els.drawerBody.innerHTML = formHtml(relationFields(), preset);
    openDrawer();
  }

  function downloadArticleRelationTemplate() {
    const csv = "\ufeff文章ID,关系类型,目标类型,目标ID,生效范围,排序,数据来源,操作模式\nART-001,推荐新闻,完整料号,VMM0251V221M0608,仅该料号,1,知识库Excel导入,追加更新\nART-002,推荐新闻,产品系列,SER-SDA,系列下全部料号,1,知识库Excel导入,追加更新\nART-002,推荐新闻,应用终端,TERM-AI-BBU,仅该终端,1,后台维护,追加更新\n";
    downloadText("文章与产品应用关联导入模板.csv", csv);
    toast("文章关联导入模板已生成");
  }

  function exportArticleRelations() {
    const articleIds = new Set(scopedDataset("articles").map(function (article) { return relationSourceId(article); }));
    const rows = (state.database.relations || []).filter(function (item) {
      return item.sourceType === "文章" && articleIds.has(item.sourceId) && item.status !== "已下架";
    });
    if (!rows.length) return toast("当前内容版本没有可导出的文章关联", "error");
    const headers = ["文章编号", "文章标题", "关系类型", "关联范围", "关联对象编号", "关联对象名称", "生效范围", "排序", "状态"];
    const lines = rows.map(function (item) {
      return [item.sourceId, item.sourceName, item.relationType, item.targetType, item.targetId, item.targetName, item.scope, item.priority, item.status].map(csvCell).join(",");
    });
    downloadText("文章与产品应用关联_" + new Date().toISOString().slice(0,10) + ".csv", "\ufeff" + headers.join(",") + "\n" + lines.join("\n"));
    toast("文章关联数据已导出");
  }

  function previewArticleEffects(article, relations) {
    const list = relations.length ? '<ul class="where-used">' + relations.map(function (item) { return '<li><strong>' + escapeHtml(item.targetType + "｜" + item.targetName) + '</strong><span>' + escapeHtml(item.scope || "仅当前对象") + ' · 预计 ' + escapeHtml(item.effectCount || 1) + ' 个页面 · ' + escapeHtml(item.status) + '</span></li>'; }).join("") + '</ul>' : '<div class="empty-state">没有推荐关系，文章仍会在新闻资讯中展示，但不会进入产品或应用页面的推荐模块。</div>';
    showModal("前台效果预览", article.title, '<div class="impact-box"><strong>预览规则：</strong>仅计算已填写的显式推荐关系；分类标签不会自动产生推荐。</div>' + list, [{ label: "关闭", tone: "secondary", action: closeModal }]);
  }

  function submitArticleBundle(article, relations, invalidRelations) {
    const duplicate = hasDuplicateRelations(relations);
    const blocked = invalidRelations.length || duplicate;
    const body = '<div class="impact-box"><strong>本次发布包：</strong>文章正文1篇，推荐关系' + relations.length + '条，预计影响' + relations.reduce(function (n, i) { return n + Number(i.effectCount || 1); }, 0) + '个前台位置。</div>' + (blocked ? '<p style="color:var(--red-600)">存在待确认、无效或重复关系。文章正文可以发布，但这些关系不会随文章生效，需确认后再发布。</p>' : '<p>文章版本和关系版本将在同一次发布中生效，不会出现文章已更新但推荐关系仍是旧版本的情况。</p>');
    showModal("发布确认", "发布文章及关联", body, [
      { label: "取消", tone: "ghost", action: closeModal },
      { label: blocked ? "发布有效内容" : "确认发布", tone: "primary", action: function () {
        article.status = "已发布";
        relations.forEach(function (item) { if ((item.validation || relationValidation(item)) === "校验通过") item.status = "已发布"; });
        saveDatabase(); closeModal(); renderPage(); toast("文章及有效关系已发布");
      } }
    ]);
  }

  function relationTable(rows) {
    const body = rows.length ? rows.map(function (row) {
      return '<tr><td><input class="row-checkbox" type="checkbox"></td><td><div class="relation-path"><span class="relation-node">' + escapeHtml(row.sourceType) + '</span><strong>' + escapeHtml(row.sourceName) + '</strong></div><small>' + escapeHtml(row.sourceId) + '</small></td><td><span class="tag">' + escapeHtml(row.relationType) + '</span></td><td><div class="relation-path"><span class="relation-node">' + escapeHtml(row.targetType) + '</span><strong>' + escapeHtml(row.targetName) + '</strong></div><small>' + escapeHtml(row.targetId) + '</small></td><td>' + escapeHtml(row.source) + '</td><td>' + statusPill(row.status) + '</td><td><div class="cell-actions"><button class="text-button" data-edit-relation="' + escapeHtml(row.id) + '">编辑</button><button class="text-button" data-delete-relation="' + escapeHtml(row.id) + '">下架</button></div></td></tr>';
    }).join("") : '<tr><td class="empty-state" colspan="7">没有符合条件的关联关系</td></tr>';
    return '<div class="table-card"><div class="table-scroll"><table class="data-table"><thead><tr><th></th><th>来源内容</th><th>关系</th><th>目标对象</th><th>数据来源</th><th>状态</th><th>操作</th></tr></thead><tbody>' + body + '</tbody></table></div><footer class="table-footer"><span>共 ' + rows.length + " 条显式关联</span><span>关系使用稳定ID，不依赖显示名称</span></footer></div>";
  }

  function relationFields() {
    return [
      { key: "sourceType", label: "来源类型", type: "select", required: true, options: ["文章", "FAQ", "应用终端", "下载资源"] },
      { key: "sourceId", label: "来源ID", type: "text", required: true },
      { key: "sourceName", label: "来源名称", type: "text", required: true, full: true },
      { key: "relationType", label: "关系类型", type: "select", required: true, options: ["推荐新闻", "推荐产品", "指南下载", "来源文章", "相关知识", "相关资源"] },
      { key: "targetType", label: "目标类型", type: "select", required: true, options: ["完整料号", "产品系列", "产品线", "应用领域", "应用终端", "文章", "FAQ"] },
      { key: "targetId", label: "目标ID", type: "text", required: true },
      { key: "targetName", label: "目标名称", type: "text", required: true, full: true },
      { key: "scope", label: "生效范围", type: "select", required: true, options: ["仅当前对象", "仅该料号", "仅该终端", "系列下全部料号", "产品线下全部系列与料号", "应用领域下全部终端"] },
      { key: "effectCount", label: "预计影响页面数", type: "number", help: "正式系统根据主数据自动计算，人工不可直接修改" },
      { key: "priority", label: "显示顺序", type: "number" },
      { key: "source", label: "数据来源", type: "select", options: ["知识库Excel导入", "应用中心确认数据表", "下载中心", "后台维护", "文章发布页面", "AI从文章提取", "FAQ发布时自动建立", "继承来源文章已确认关联"] },
      { key: "status", label: "状态", type: "select", options: ["草稿", "已发布", "已下架"] }
    ];
  }

  function openRelationEditor(id) {
    openRecordEditor({ dataset: "relations", title: "关联关系", group: "服务支持", fields: relationFields() }, id);
  }

  function archiveRelation(id) {
    const row = state.database.relations.find(function (item) { return item.id === id; });
    if (!row) return;
    showModal("关系下架", "确认下架该关联？", '<div class="impact-box"><strong>前台影响：</strong>关系下架后，来源或目标页面上的对应推荐内容将立即隐藏；其他内容不受影响。</div>', [
      { label: "取消", tone: "ghost", action: closeModal },
      { label: "确认下架", tone: "danger", action: function () { row.status = "已下架"; saveDatabase(); closeModal(); renderPage(); toast("关联已下架"); } }
    ]);
  }

  function renderGuideLinks(config) {
    const visibleResourceIds = new Set(scopedDataset("downloads").map(function (item) { return item.id; }));
    const links = state.database.relations.filter(function (item) { return item.relationType === "指南下载" && item.status !== "已下架" && visibleResourceIds.has(item.sourceId); });
    const body = links.map(function (link) {
      const resource = state.database.downloads.find(function (item) { return item.id === link.sourceId; });
      return '<tr><td><strong>' + escapeHtml(link.targetName) + '</strong><small>' + escapeHtml(link.targetId) + '</small></td><td><strong>' + escapeHtml(resource ? resource.title : link.sourceName) + '</strong><small>' + escapeHtml(link.sourceId) + '</small></td><td>' + escapeHtml(resource ? resource.type : "资源不存在") + '</td><td>' + escapeHtml(resource ? resource.version : "—") + '</td><td>' + escapeHtml(resource ? resource.file : "—") + '</td><td>' + statusPill(resource && resource.status === "已发布" && link.status === "已发布" ? "已关联" : "待发布") + '</td><td><button class="text-button" data-edit-guide="' + escapeHtml(link.id) + '">修改引用</button></td></tr>';
    }).join("");
    const actions = '<button class="button button-primary" type="button" data-action="create-guide">新增指南引用</button>';
    els.main.innerHTML = pageHeader(config, actions) +
      '<div class="notice-strip"><span class="notice-icon">i</span><div>这里不上传指南文件。选择下载中心资源后，应用页面会始终读取该资源ID对应的最新已发布版本。</div></div>' +
      '<div class="table-card"><div class="table-scroll"><table class="data-table"><thead><tr><th>应用页面</th><th>下载资源</th><th>资料类型</th><th>当前版本</th><th>文件</th><th>联动状态</th><th>操作</th></tr></thead><tbody>' + (body || '<tr><td colspan="7" class="empty-state">尚未关联应用指南</td></tr>') + '</tbody></table></div><footer class="table-footer"><span>共 ' + links.length + ' 条指南引用</span><button class="text-button" data-route-action="downloads">前往下载中心维护文件</button></footer></div>';
    bindGlobalPageActions();
    document.querySelectorAll("[data-edit-guide]").forEach(function (button) { button.addEventListener("click", function () { openGuideEditor(button.dataset.editGuide); }); });
  }

  function openGuideEditor(id) {
    const resources = scopedDataset("downloads").filter(function (item) { return item.type === "应用选型手册"; });
    const fields = [
      { key: "targetId", label: "应用ID", type: "select", required: true, options: state.database.applications.map(function (item) { return item.id; }) },
      { key: "targetName", label: "应用领域名称", type: "select", required: true, options: seed.applicationFields },
      { key: "sourceId", label: "下载资源ID", type: "select", required: true, options: resources.map(function (item) { return item.id; }), help: "只显示资料类型为“应用选型手册”的资源" },
      { key: "sourceName", label: "指南显示名称", type: "text", required: true, full: true },
      { key: "priority", label: "按钮顺序", type: "number" },
      { key: "status", label: "状态", type: "select", options: ["草稿", "已发布", "已下架"] }
    ];
    const record = id ? state.database.relations.find(function (item) { return item.id === id; }) : { sourceType: "下载资源", relationType: "指南下载", targetType: "应用领域", source: "下载中心", priority: 1, status: "草稿" };
    state.editing = { dataset: "relations", id: record.id || null, config: { fields: fields } };
    els.drawerEyebrow.textContent = "应用中心";
    els.drawerTitle.textContent = id ? "修改指南引用" : "新增指南引用";
    els.drawerBody.innerHTML = formHtml(fields, record) + '<input type="hidden" name="sourceType" value="下载资源"><input type="hidden" name="relationType" value="指南下载"><input type="hidden" name="targetType" value="应用领域"><input type="hidden" name="source" value="下载中心">';
    openDrawer();
  }

  function renderImport(config) {
    const cards = [
      ["产品料号数据", "CRM系统", "完整料号为主键，官网后台只读", "products"],
      ["应用中心数据", "应用中心确认数据表", "领域、模块、终端、推荐完整料号", "applications"],
      ["新闻与知识库", "知识库Excel与原文链接", "导入索引、正文状态及初始映射", "articles"],
      ["内容关联关系", "文章/产品/应用关系表", "校验稳定ID、重复关系和目标状态", "relations"],
      ["下载中心", "资源清单与文件", "五类资料；系列规格书不导入", "downloads"],
      ["替代料", "业务确认替代料表", "同行完整料号与永铭完整料号", "replacements"]
    ];
    els.main.innerHTML = pageHeader(config, '<button class="button button-secondary" type="button" data-action="export-all">导出全部数据</button>') +
      '<div class="notice-strip"><span class="notice-icon">i</span><div>导入采用“上传 → 字段映射 → 数据校验 → 错误报告 → 写入数据”流程。错误数据不会进入已发布状态。</div></div>' +
      '<div class="settings-grid">' + cards.map(function (card) {
        return '<article class="settings-card"><h3>' + escapeHtml(card[0]) + '</h3><p><strong>建议来源：</strong>' + escapeHtml(card[1]) + '<br>' + escapeHtml(card[2]) + '</p><div class="setting-row"><span><strong>当前记录</strong><small>' + (state.database[card[3]] || []).length + ' 条</small></span><button class="button button-secondary button-small" type="button" data-import-type="' + card[3] + '">选择文件</button></div><div class="setting-row"><span><strong>导入模板</strong><small>包含字段说明和示例</small></span><button class="text-button" type="button" data-template="' + card[3] + '">下载模板</button></div></article>';
      }).join("") + "</div>";
    bindGlobalPageActions();
    document.querySelectorAll("[data-import-type]").forEach(function (button) { button.addEventListener("click", function () { els.importFileInput.dataset.target = button.dataset.importType; els.importFileInput.click(); }); });
    document.querySelectorAll("[data-template]").forEach(function (button) { button.addEventListener("click", function () { downloadTemplate(button.dataset.template); }); });
  }

  function downloadTemplate(dataset) {
    const configEntry = Object.values(seed.moduleConfigs).find(function (item) { return item.dataset === dataset; });
    const headers = configEntry && configEntry.columns ? configEntry.columns.map(function (item) { return item[0]; }) : ["id", "name", "status"];
    downloadText(dataset + "-import-template.csv", "\ufeff" + headers.join(",") + "\n");
    toast("导入模板已生成");
  }

  function exportDataset(dataset) {
    const rows = scopedDataset(dataset);
    if (!rows.length) return toast("当前模块没有可导出数据", "error");
    const headers = Array.from(rows.reduce(function (set, row) { Object.keys(row).forEach(function (key) { if (typeof row[key] !== "object") set.add(key); }); return set; }, new Set()));
    const csv = "\ufeff" + headers.join(",") + "\n" + rows.map(function (row) { return headers.map(function (key) { return csvCell(row[key]); }).join(","); }).join("\n");
    downloadText(dataset + "-" + new Date().toISOString().slice(0,10) + ".csv", csv);
    toast("数据已导出");
  }

  function exportAll() {
    const exportData = {};
    Object.keys(seed.moduleConfigs).filter(canAccessModule).forEach(function (moduleId) {
      const dataset = seed.moduleConfigs[moduleId].dataset;
      if (dataset && !Object.prototype.hasOwnProperty.call(exportData, dataset)) exportData[dataset] = scopedDataset(dataset);
    });
    downloadText("ymin-admin-" + state.roleView + "-" + new Date().toISOString().slice(0,10) + ".json", JSON.stringify(exportData, null, 2));
    toast("已导出当前账号权限范围内的数据");
  }

  const productExportLabels = {
    itemNo: "完整料号",
    productLine: "产品线",
    series: "系列",
    package: "封装形式",
    lifecycle: "全生命周期状态",
    voltage: "额定电压",
    capacitance: "标称容量",
    operatingTemperature: "工作温度",
    diameter: "直径D(mm)",
    height: "高度/长度L(mm)",
    esr: "ESR",
    cycleLife: "循环寿命",
    ratedRipple: "额定纹波电流",
    impedance: "阻抗",
    endurance: "耐久性/寿命",
    aecQ200: "AEC-Q200"
  };

  function productExportKeys() {
    const excluded = new Set(["id", "status", "source", "updatedAt"]);
    const templateFields = Object.values((seed.moduleConfigs.products || {}).fieldTemplates || {}).reduce(function (all, template) { return all.concat(template); }, []);
    return Array.from(state.database.products.reduce(function (set, product) {
      Object.keys(product).forEach(function (key) { if (!excluded.has(key)) set.add(key); });
      return set;
    }, new Set(templateFields.map(function (field) { return field.key; }))));
  }

  function exportProductMaster() {
    const keys = productExportKeys();
    const fieldLabels = Object.values((seed.moduleConfigs.products || {}).fieldTemplates || {}).reduce(function (map, template) { template.forEach(function (field) { if (!map[field.key]) map[field.key] = field.label; }); return map; }, {});
    const headers = keys.map(function (key) { return fieldLabels[key] || productExportLabels[key] || key; });
    const lines = state.database.products.map(function (product) { return keys.map(function (key) { return csvCell(product[key]); }).join(","); });
    downloadText("永铭产品主数据_只读_" + new Date().toISOString().slice(0,10) + ".csv", "\ufeff" + headers.join(",") + "\n" + lines.join("\n"));
    toast("全部产品只读数据已导出");
  }

  function exportAiKeywordTemplate() {
    const keys = productExportKeys();
    const fieldLabels = Object.values((seed.moduleConfigs.products || {}).fieldTemplates || {}).reduce(function (map, template) { template.forEach(function (field) { if (!map[field.key]) map[field.key] = field.label; }); return map; }, {});
    const headers = keys.map(function (key) { return fieldLabels[key] || productExportLabels[key] || key; }).concat(["AI搜索关键词", "操作类型"]);
    const keywordMap = new Map(state.database.productAiKeywords.map(function (item) { return [item.itemNo, item.aiKeywords || ""]; }));
    const lines = state.database.products.map(function (product) {
      return keys.map(function (key) { return csvCell(product[key]); }).concat([csvCell(keywordMap.get(product.itemNo) || ""), csvCell("更新")]).join(",");
    });
    downloadText("永铭AI搜索关键词维护模板_" + new Date().toISOString().slice(0,10) + ".csv", "\ufeff" + headers.join(",") + "\n" + lines.join("\n"));
    toast("AI关键词维护模板已导出");
  }

  function csvCell(value) {
    const text = String(value == null ? "" : value).replace(/"/g, '""');
    return '"' + text + '"';
  }

  function downloadText(name, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = name; link.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function exportAppProductMaintenanceTable() {
    const headers = ["应用领域", "应用模块", "终端ID", "终端名称", "永铭完整料号", "操作类型"];
    const lines = [];
    state.database.terminals.forEach(function (terminal) {
      const relations = state.database.appProducts.filter(function (item) { return item.terminal === terminal.name; }).sort(function (a, b) { return Number(a.priority || 0) - Number(b.priority || 0); });
      relations.concat([{}]).forEach(function (relation, index) {
        lines.push([
          terminal.field,
          terminal.tab,
          terminal.id,
          terminal.name,
          relation.itemNo || "",
          "新增或更新"
        ].map(csvCell).join(","));
      });
    });
    downloadText("应用中心终端推荐料号维护表_" + new Date().toISOString().slice(0,10) + ".csv", "\ufeff" + headers.join(",") + "\n" + lines.join("\n"));
    toast("维护表已导出，可直接用Excel打开；一个推荐料号填写一行");
  }

  function exportCadMappingTable() {
    const headers = ["CAD模型ID", "模型名称", "模型文件", "产品线", "封装形式", "结构尺寸", "永铭完整料号", "匹配来源", "匹配依据", "AI置信度", "确认状态", "操作类型"];
    const lines = [];
    state.database.cadModels.forEach(function (model) {
      const mappings = (state.database.cadMappings || []).filter(function (item) { return item.cadId === model.id; });
      mappings.concat([{}]).forEach(function (mapping) {
        lines.push([
          model.id, model.name, model.file, model.productLine, model.package, model.dimensions,
          mapping.itemNo || "", mapping.source || "AI规格匹配", mapping.matchBasis || "",
          mapping.confidence || "", mapping.status === "已发布" ? "已确认" : "待确认", "新增或更新"
        ].map(csvCell).join(","));
      });
    });
    downloadText("3D-CAD与产品料号映射维护表_" + new Date().toISOString().slice(0,10) + ".csv", "\ufeff" + headers.join(",") + "\n" + lines.join("\n"));
    toast("CAD映射维护表已导出；一个模型对应多个料号时，每个料号填写一行");
  }

  function handleImportFile(file) {
    if (!file) return;
    const target = els.importFileInput.dataset.target || (seed.moduleConfigs[state.current] || {}).dataset || "";
    const accepted = /\.(csv|json|xlsx|xls)$/i.test(file.name);
    if (!accepted) return toast("仅支持CSV、JSON或Excel文件", "error");
    if (target === "articleRelations" && /\.csv$/i.test(file.name)) {
      importArticleRelationsCsv(file);
      els.importFileInput.value = "";
      return;
    }
    if (target === "productAiKeywords" && /\.csv$/i.test(file.name)) {
      importAiKeywordsCsv(file);
      els.importFileInput.value = "";
      return;
    }
    if (target === "appProducts" && /\.csv$/i.test(file.name)) {
      importAppProductsCsv(file);
      els.importFileInput.value = "";
      return;
    }
    if (target === "cadMappings" && /\.csv$/i.test(file.name)) {
      importCadMappingsCsv(file);
      els.importFileInput.value = "";
      return;
    }
    showModal("数据导入", "已选择“" + file.name + "”", '<div class="impact-box"><strong>导入目标：</strong>' + escapeHtml(target || "当前模块") + '<br><strong>导入校验：</strong>字段映射、主键、重复关系和引用ID。</div><ul><li>文件大小：' + Math.ceil(file.size / 1024) + ' KB</li><li>导入后默认保存为草稿</li><li>无效料号、应用ID或资源ID会阻止发布</li></ul>', [
      { label: "取消", tone: "ghost", action: closeModal },
      { label: "开始校验", tone: "primary", action: function () { closeModal(); toast("文件校验完成"); } }
    ]);
    els.importFileInput.value = "";
  }

  function importAppProductsCsv(file) {
    file.text().then(function (content) {
      const rows = parseCsv(content);
      if (rows.length < 2) return toast("维护表没有可导入的数据", "error");
      const headers = rows[0].map(function (item) { return item.replace(/^\ufeff/, "").trim(); });
      const indexOf = function (names) { return headers.findIndex(function (header) { return names.includes(header); }); };
      const terminalIdIndex = indexOf(["终端ID", "terminalId", "terminal_id"]);
      const terminalNameIndex = indexOf(["终端名称", "应用终端", "terminal"]);
      const itemNoIndex = indexOf(["永铭完整料号", "完整料号", "itemNo", "item_no"]);
      const actionIndex = indexOf(["操作类型", "操作", "action"]);
      if ((terminalIdIndex < 0 && terminalNameIndex < 0) || itemNoIndex < 0) return toast("维护表必须包含终端ID或终端名称，以及永铭完整料号", "error");
      const valid = [];
      const errors = [];
      const seen = new Set();
      const seenProductModels = new Map();
      rows.slice(1).forEach(function (cells, index) {
        const rowNo = index + 2;
        const terminalId = terminalIdIndex >= 0 ? String(cells[terminalIdIndex] || "").trim() : "";
        const terminalName = terminalNameIndex >= 0 ? String(cells[terminalNameIndex] || "").trim() : "";
        const rawItemNo = String(cells[itemNoIndex] || "").trim();
        if (!rawItemNo) return;
        const terminal = state.database.terminals.find(function (item) { return (terminalId && item.id === terminalId) || (!terminalId && item.name === terminalName); });
        const product = state.database.products.find(function (item) { return item.itemNo.toUpperCase() === rawItemNo.toUpperCase(); });
        const itemNo = product ? product.itemNo : rawItemNo;
        const key = (terminal ? terminal.id : terminalId || terminalName) + "|" + itemNo.toUpperCase();
        const rowErrors = [];
        if (!terminal) rowErrors.push("终端不存在");
        if (!product) rowErrors.push("料号不在产品中心或尚未发布");
        if (seen.has(key)) rowErrors.push("文件内重复终端—料号关系");
        seen.add(key);
        if (rowErrors.length) {
          errors.push({ line: rowNo, key: key, reason: rowErrors.join("；") });
          return;
        }
        valid.push({
          terminal: terminal,
          product: product,
          itemNo: itemNo,
          reason: "",
          priority: valid.filter(function (item) { return item.terminal.id === terminal.id; }).length + 1,
          status: "已发布",
          action: actionIndex >= 0 ? String(cells[actionIndex] || "新增或更新").trim() || "新增或更新" : "新增或更新"
        });
      });
      const preview = '<div class="import-result-grid"><div><strong>' + valid.length + '</strong><span>校验通过</span></div><div class="error"><strong>' + errors.length + '</strong><span>错误记录</span></div><div><strong>' + new Set(valid.map(function (item) { return item.terminal.id; })).size + '</strong><span>涉及终端</span></div><div><strong>' + valid.filter(function (item) { return item.action !== "删除"; }).length + '</strong><span>导入后可用关系</span></div></div>' +
        (errors.length ? '<h3>错误明细</h3><div class="table-scroll"><table class="data-table"><thead><tr><th>行号</th><th>关系键</th><th>错误原因</th></tr></thead><tbody>' + errors.slice(0, 20).map(function (item) { return '<tr><td>' + item.line + '</td><td>' + escapeHtml(item.key) + '</td><td>' + escapeHtml(item.reason) + '</td></tr>'; }).join("") + '</tbody></table></div>' : '<div class="impact-box"><strong>校验通过：</strong>终端和完整料号均已在主数据中找到。确认后状态为“已发布”的关系可直接供前台调用，产品参数继续实时读取产品中心。</div>');
      showModal("终端推荐料号导入", file.name, preview, [
        { label: "取消", tone: "ghost", action: closeModal },
        { label: "导入通过记录（" + valid.length + "）", tone: "primary", action: function () {
          valid.forEach(function (entry, index) {
            const existingIndex = state.database.appProducts.findIndex(function (item) { return item.terminal === entry.terminal.name && item.itemNo === entry.itemNo; });
            if (entry.action === "删除") {
              if (existingIndex >= 0) state.database.appProducts.splice(existingIndex, 1);
              return;
            }
            const existing = existingIndex >= 0 ? state.database.appProducts[existingIndex] : {};
            const record = Object.assign({}, existing, {
              id: existing.id || "APR-IMPORT-" + Date.now() + "-" + index,
              terminal: entry.terminal.name,
              itemNo: entry.itemNo,
              series: entry.product.series,
              reason: entry.reason,
              priority: entry.priority,
              source: "批量导入",
              status: entry.status,
              updatedAt: todayTime()
            });
            if (existingIndex >= 0) state.database.appProducts.splice(existingIndex, 1, record);
            else state.database.appProducts.push(record);
          });
          saveDatabase(); closeModal(); renderPage(); toast("推荐料号已导入；已发布关系可直接用于前台");
        } }
      ]);
    }).catch(function () { toast("维护表读取失败，请使用本页面导出的CSV文件", "error"); });
  }

  function importCadMappingsCsv(file) {
    file.text().then(function (content) {
      const rows = parseCsv(content);
      if (rows.length < 2) return toast("映射维护表没有可导入的数据", "error");
      const headers = rows[0].map(function (item) { return item.replace(/^\ufeff/, "").trim(); });
      const indexOf = function (names) { return headers.findIndex(function (header) { return names.includes(header); }); };
      const cadIdIndex = indexOf(["CAD模型ID", "模型ID", "cadId", "cad_id"]);
      const itemNoIndex = indexOf(["永铭完整料号", "完整料号", "itemNo", "item_no"]);
      const sourceIndex = indexOf(["匹配来源", "source"]);
      const basisIndex = indexOf(["匹配依据", "matchBasis", "match_basis"]);
      const confidenceIndex = indexOf(["AI置信度", "置信度", "confidence"]);
      const confirmIndex = indexOf(["确认状态", "reviewStatus", "review_status"]);
      const actionIndex = indexOf(["操作类型", "操作", "action"]);
      if (cadIdIndex < 0 || itemNoIndex < 0) return toast("维护表必须包含CAD模型ID和永铭完整料号", "error");
      const valid = [];
      const errors = [];
      const seen = new Set();
      rows.slice(1).forEach(function (cells, index) {
        const line = index + 2;
        const cadId = String(cells[cadIdIndex] || "").trim();
        const rawItemNo = String(cells[itemNoIndex] || "").trim();
        if (!cadId && !rawItemNo) return;
        if (!rawItemNo) return;
        const model = state.database.cadModels.find(function (item) { return item.id === cadId; });
        const product = state.database.products.find(function (item) { return item.itemNo.toUpperCase() === rawItemNo.toUpperCase(); });
        const itemNo = product ? product.itemNo : rawItemNo;
        const key = cadId + "|" + itemNo.toUpperCase();
        const reviewStatus = confirmIndex >= 0 ? String(cells[confirmIndex] || "待确认").trim() : "待确认";
        const publishAfterImport = /已确认|已发布/.test(reviewStatus);
        const rowErrors = [];
        if (!model) rowErrors.push("CAD模型ID不存在");
        if (!product) rowErrors.push("料号不在产品中心或尚未发布");
        if (seen.has(key)) rowErrors.push("文件内重复CAD—料号映射");
        const normalizedItemNo = itemNo.toUpperCase();
        if (seenProductModels.has(normalizedItemNo) && seenProductModels.get(normalizedItemNo) !== cadId) rowErrors.push("同一料号在文件内关联了多个CAD模型");
        const publishedConflict = publishAfterImport && state.database.cadMappings.find(function (item) { return item.itemNo.toUpperCase() === normalizedItemNo && item.cadId !== cadId && item.status === "已发布"; });
        if (publishedConflict) rowErrors.push("该料号已关联其他已发布CAD模型");
        seen.add(key);
        seenProductModels.set(normalizedItemNo, cadId);
        if (rowErrors.length) { errors.push({ line: line, key: key, reason: rowErrors.join("；") }); return; }
        valid.push({
          model: model,
          product: product,
          itemNo: itemNo,
          source: sourceIndex >= 0 ? String(cells[sourceIndex] || "AI规格匹配").trim() || "AI规格匹配" : "AI规格匹配",
          matchBasis: basisIndex >= 0 ? String(cells[basisIndex] || "").trim() : "",
          confidence: confidenceIndex >= 0 ? String(cells[confidenceIndex] || "").trim() : "",
          status: publishAfterImport ? "已发布" : "草稿",
          action: actionIndex >= 0 ? String(cells[actionIndex] || "新增或更新").trim() || "新增或更新" : "新增或更新"
        });
      });
      const confirmed = valid.filter(function (item) { return item.status === "已发布"; }).length;
      const preview = '<div class="import-result-grid"><div><strong>' + valid.length + '</strong><span>校验通过</span></div><div class="error"><strong>' + errors.length + '</strong><span>错误记录</span></div><div><strong>' + new Set(valid.map(function (item) { return item.model.id; })).size + '</strong><span>涉及CAD模型</span></div><div><strong>' + confirmed + '</strong><span>已人工确认</span></div></div>' +
        (errors.length ? '<h3>错误明细</h3><div class="table-scroll"><table class="data-table"><thead><tr><th>行号</th><th>映射键</th><th>错误原因</th></tr></thead><tbody>' + errors.slice(0, 20).map(function (item) { return '<tr><td>' + item.line + '</td><td>' + escapeHtml(item.key) + '</td><td>' + escapeHtml(item.reason) + '</td></tr>'; }).join("") + '</tbody></table></div>' : '<div class="impact-box"><strong>校验通过：</strong>CAD模型和完整料号均已找到。表中标记“已确认”的关系直接发布；其余AI结果保存为草稿，待人工确认后发布。</div>');
      showModal("3D-CAD料号映射导入", file.name, preview, [
        { label: "取消", tone: "ghost", action: closeModal },
        { label: "导入通过记录（" + valid.length + "）", tone: "primary", action: function () {
          valid.forEach(function (entry, index) {
            const existingIndex = state.database.cadMappings.findIndex(function (item) { return item.cadId === entry.model.id && item.itemNo === entry.itemNo; });
            if (entry.action === "删除") { if (existingIndex >= 0) state.database.cadMappings.splice(existingIndex, 1); return; }
            const existing = existingIndex >= 0 ? state.database.cadMappings[existingIndex] : {};
            const record = Object.assign({}, existing, {
              id: existing.id || "CADMAP-IMPORT-" + Date.now() + "-" + index,
              cadId: entry.model.id,
              itemNo: entry.itemNo,
              source: entry.source,
              matchBasis: entry.matchBasis,
              confidence: entry.confidence,
              status: entry.status,
              updatedAt: todayTime()
            });
            if (existingIndex >= 0) state.database.cadMappings.splice(existingIndex, 1, record);
            else state.database.cadMappings.push(record);
          });
          saveDatabase(); closeModal(); renderPage(); toast("CAD与料号映射已导入；草稿关系不会在前台生效");
        } }
      ]);
    }).catch(function () { toast("映射维护表读取失败，请使用本页面导出的CSV文件", "error"); });
  }

  function importAiKeywordsCsv(file) {
    file.text().then(function (content) {
      const rows = parseCsv(content);
      if (rows.length < 2) return toast("文件没有可导入的数据", "error");
      const headers = rows[0].map(function (item) { return item.replace(/^\ufeff/, "").trim(); });
      const findColumn = function (names) { return headers.findIndex(function (header) { return names.includes(header); }); };
      const itemNoIndex = findColumn(["完整料号", "料号", "itemNo", "item_no"]);
      const keywordIndex = findColumn(["AI搜索关键词", "AI搜索关键词(隐藏)", "aiKeywords", "ai_keywords"]);
      const actionIndex = findColumn(["操作类型", "操作", "action"]);
      if (itemNoIndex < 0 || keywordIndex < 0) return toast("缺少“完整料号”或“AI搜索关键词”列", "error");

      const seen = new Set();
      const valid = [];
      const errors = [];
      let unchanged = 0;
      rows.slice(1).forEach(function (cells, index) {
        const rowNo = index + 2;
        const itemNo = String(cells[itemNoIndex] || "").trim();
        const keywords = String(cells[keywordIndex] || "").trim();
        const action = String(actionIndex >= 0 ? cells[actionIndex] || "更新" : "更新").trim() || "更新";
        if (!itemNo) return;
        if (seen.has(itemNo)) { errors.push("第" + rowNo + "行：完整料号重复"); return; }
        seen.add(itemNo);
        const product = state.database.products.find(function (item) { return item.itemNo === itemNo; });
        if (!product) { errors.push("第" + rowNo + "行：完整料号不存在"); return; }
        if (!["更新", "清空"].includes(action)) { errors.push("第" + rowNo + "行：操作类型只能为更新或清空"); return; }
        const existing = state.database.productAiKeywords.find(function (item) { return item.itemNo === itemNo; });
        const nextKeywords = action === "清空" ? "" : keywords;
        if (action === "更新" && !keywords) { unchanged += 1; return; }
        if (existing && String(existing.aiKeywords || "") === nextKeywords) { unchanged += 1; return; }
        valid.push({ product: product, keywords: nextKeywords, action: action });
      });

      const errorList = errors.length ? '<ul class="plain-rules">' + errors.slice(0, 8).map(function (error) { return "<li>" + escapeHtml(error) + "</li>"; }).join("") + (errors.length > 8 ? "<li>另有" + (errors.length - 8) + "条错误</li>" : "") + "</ul>" : "";
      const body = '<div class="impact-box"><strong>校验结果：</strong>可更新 ' + valid.length + ' 条；无变化/空白不处理 ' + unchanged + ' 条；错误 ' + errors.length + ' 条。</div>' + errorList;
      const buttons = [{ label: "取消", tone: "ghost", action: closeModal }];
      if (valid.length) buttons.push({ label: "确认导入", tone: "primary", action: function () {
        valid.forEach(function (entry) {
          let record = state.database.productAiKeywords.find(function (item) { return item.itemNo === entry.product.itemNo; });
          if (!record) {
            record = { id: "AIKW-" + entry.product.id, itemNo: entry.product.itemNo, productLine: entry.product.productLine, series: entry.product.series };
            state.database.productAiKeywords.push(record);
          }
          record.aiKeywords = entry.keywords;
          record.updatedAt = todayTime();
        });
        saveDatabase(); closeModal(); renderPage(); toast("AI搜索关键词已导入");
      } });
      showModal("关键词导入校验", file.name, body, buttons);
    }).catch(function () { toast("无法读取导入文件", "error"); });
  }

  function importArticleRelationsCsv(file) {
    file.text().then(function (content) {
      const rows = parseCsv(content);
      if (rows.length < 2) return toast("文件没有可导入的数据", "error");
      const headers = rows[0].map(function (item) { return item.replace(/^\ufeff/, "").trim(); });
      const headerMap = {
        "文章ID": "sourceId", "article_id": "sourceId",
        "关系类型": "relationType", "relation_type": "relationType",
        "目标类型": "targetType", "target_type": "targetType",
        "目标ID": "targetId", "target_id": "targetId",
        "生效范围": "scope", "scope": "scope",
        "排序": "priority", "priority": "priority",
        "数据来源": "source", "source": "source",
        "操作模式": "mode", "mode": "mode"
      };
      const mappedHeaders = headers.map(function (item) { return headerMap[item] || item; });
      const required = ["sourceId", "relationType", "targetType", "targetId"];
      const missing = required.filter(function (key) { return !mappedHeaders.includes(key); });
      if (missing.length) return toast("导入模板缺少必填列：" + missing.join("、"), "error");

      const valid = [];
      const errors = [];
      const seen = new Set();
      rows.slice(1).forEach(function (cells, index) {
        if (!cells.some(function (cell) { return cell.trim(); })) return;
        const raw = {};
        mappedHeaders.forEach(function (key, cellIndex) { raw[key] = (cells[cellIndex] || "").trim(); });
        const article = state.database.articles.find(function (item) { return item.id === raw.sourceId || relationSourceId(item) === raw.sourceId; });
        const target = resolveRelationTarget(raw.targetType, raw.targetId);
        const key = [raw.sourceId, raw.relationType, raw.targetType, raw.targetId].join("|");
        const rowErrors = [];
        if (!article) rowErrors.push("文章ID不存在");
        if (!target) rowErrors.push("目标ID不存在或类型不匹配");
        if (seen.has(key)) rowErrors.push("文件内重复关系");
        seen.add(key);
        if (rowErrors.length) {
          errors.push({ line: index + 2, key: key, reason: rowErrors.join("；") });
          return;
        }
        valid.push({
          id: "REL-" + Date.now() + "-" + index,
          sourceType: "文章",
          sourceId: relationSourceId(article),
          sourceName: article.title,
          relationType: raw.relationType || "推荐新闻",
          targetType: raw.targetType,
          targetId: target.id,
          targetName: target.name,
          scope: raw.scope || defaultScope(raw.targetType),
          effectCount: relationEffectCount(raw.targetType, target),
          validation: "校验通过",
          priority: Number(raw.priority || 1),
          source: raw.source || "批量导入",
          importMode: raw.mode || "追加更新",
          status: "草稿"
        });
      });

      const preview = '<div class="import-result-grid"><div><strong>' + valid.length + '</strong><span>校验通过</span></div><div class="error"><strong>' + errors.length + '</strong><span>错误记录</span></div><div><strong>' + new Set(valid.map(function (i) { return i.sourceId; })).size + '</strong><span>涉及文章</span></div><div><strong>' + valid.reduce(function (n, i) { return n + Number(i.effectCount || 1); }, 0) + '</strong><span>预计页面</span></div></div>' +
        (errors.length ? '<h3>错误明细</h3><div class="table-scroll"><table class="data-table"><thead><tr><th>行号</th><th>关系键</th><th>错误原因</th></tr></thead><tbody>' + errors.slice(0, 12).map(function (item) { return '<tr><td>' + item.line + '</td><td>' + escapeHtml(item.key) + '</td><td>' + escapeHtml(item.reason) + '</td></tr>'; }).join("") + '</tbody></table></div>' : '<div class="impact-box"><strong>校验通过：</strong>所有目标均能在产品、应用或内容主数据中找到，写入后保存为草稿。</div>');

      showModal("批量关联校验", file.name, preview, [
        { label: "取消", tone: "ghost", action: closeModal },
        { label: "下载错误报告", tone: "secondary", action: function () { downloadImportErrors(errors); } },
        { label: "写入暂存关系（" + valid.length + "）", tone: "primary", action: function () {
          if (!valid.length) return toast("没有可写入的有效关系", "error");
          commitImportedRelations(valid);
          closeModal();
          state.selectedArticleId = valid[0].sourceId;
          renderPage();
          toast(valid.length + "条关系已写入暂存区并保存为草稿");
        } }
      ]);
    }).catch(function () { toast("文件读取失败，请重新选择", "error"); });
  }

  function parseCsv(text) {
    const result = [];
    let row = [];
    let cell = "";
    let quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === '"') {
        if (quoted && text[i + 1] === '"') { cell += '"'; i += 1; }
        else quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(cell); cell = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && text[i + 1] === "\n") i += 1;
        row.push(cell); result.push(row); row = []; cell = "";
      } else cell += char;
    }
    if (cell || row.length) { row.push(cell); result.push(row); }
    return result;
  }

  function resolveRelationTarget(type, id) {
    let item;
    if (type === "完整料号") {
      item = state.database.products.find(function (entry) { return entry.itemNo === id || entry.id === id; });
      return item ? { id: item.itemNo, name: item.itemNo, record: item } : null;
    }
    if (type === "产品系列") {
      item = state.database.series.find(function (entry) { return entry.id === id || entry.code === id; });
      return item ? { id: item.id, name: item.name, record: item } : null;
    }
    if (type === "产品线") return seed.productLines.includes(id) ? { id: id, name: id } : null;
    if (type === "应用终端") {
      item = state.database.terminals.find(function (entry) { return entry.id === id || entry.name === id; });
      return item ? { id: item.id, name: item.name, record: item } : null;
    }
    if (type === "应用领域") {
      item = state.database.applications.find(function (entry) { return entry.id === id || entry.name === id; });
      return item ? { id: item.id, name: item.name, record: item } : null;
    }
    if (type === "文章") {
      item = state.database.articles.find(function (entry) { return entry.id === id; });
      return item ? { id: item.id, name: item.title, record: item } : null;
    }
    if (type === "FAQ") {
      item = state.database.faqs.find(function (entry) { return entry.id === id; });
      return item ? { id: item.id, name: item.question, record: item } : null;
    }
    return null;
  }

  function defaultScope(type) {
    return ({ "完整料号": "仅该料号", "产品系列": "系列下全部料号", "产品线": "产品线下全部系列与料号", "应用终端": "仅该终端", "应用领域": "应用领域下全部终端" })[type] || "仅当前对象";
  }

  function relationEffectCount(type, target) {
    if (type === "产品系列") return Math.max(1, crmProductCountForSeries((target.record || {}).code));
    if (type === "产品线") return state.database.products.filter(function (item) { return item.productLine === target.id; }).length || 1;
    if (type === "应用领域") return state.database.terminals.filter(function (item) { return item.field === target.name; }).length || 1;
    return 1;
  }

  function commitImportedRelations(valid) {
    const replaceArticleIds = new Set(valid.filter(function (item) { return item.importMode === "全量替换"; }).map(function (item) { return item.sourceId; }));
    if (replaceArticleIds.size) {
      state.database.relations = state.database.relations.filter(function (item) { return !(item.sourceType === "文章" && replaceArticleIds.has(item.sourceId)); });
    }
    valid.forEach(function (item) {
      const index = state.database.relations.findIndex(function (existing) { return existing.sourceType === "文章" && existing.sourceId === item.sourceId && existing.relationType === item.relationType && existing.targetType === item.targetType && existing.targetId === item.targetId; });
      if (index >= 0) state.database.relations.splice(index, 1, Object.assign({}, state.database.relations[index], item, { id: state.database.relations[index].id }));
      else state.database.relations.push(item);
    });
    state.database.articles.forEach(function (article) { article.relations = state.database.relations.filter(function (item) { return item.sourceType === "文章" && item.sourceId === relationSourceId(article) && item.status !== "已下架"; }).length; });
    saveDatabase();
  }

  function downloadImportErrors(errors) {
    if (!errors.length) return toast("本次导入没有错误记录");
    const content = "\ufeff行号,关系键,错误原因\n" + errors.map(function (item) { return [item.line, csvCell(item.key), csvCell(item.reason)].join(","); }).join("\n");
    downloadText("文章关联导入错误报告.csv", content);
  }

  function showModal(eyebrow, title, body, buttons) {
    els.modalEyebrow.textContent = eyebrow;
    els.modalTitle.textContent = title;
    els.modalBody.innerHTML = body;
    els.modalFooter.innerHTML = "";
    (buttons || []).forEach(function (item) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button button-" + (item.tone || "secondary");
      button.textContent = item.label;
      button.addEventListener("click", item.action);
      els.modalFooter.appendChild(button);
    });
    els.modalBackdrop.hidden = false;
  }

  function closeModal() { els.modalBackdrop.hidden = true; }

  function openCommandPalette() {
    els.commandPalette.hidden = false;
    els.commandInput.value = "";
    renderCommandResults("");
    setTimeout(function () { els.commandInput.focus(); }, 20);
  }

  function closeCommandPalette() { els.commandPalette.hidden = true; }

  function renderCommandResults(query) {
    const normalized = query.trim().toLowerCase();
    const modules = Object.keys(seed.moduleConfigs).filter(canAccessModule).map(function (id) { return { id: id, title: seed.moduleConfigs[id].title, group: seed.moduleConfigs[id].group || "工作台" }; }).filter(function (item) { return !normalized || (item.title + item.group).toLowerCase().includes(normalized); }).slice(0, 14);
    els.commandResults.innerHTML = modules.map(function (item) { return '<button class="command-result" type="button" data-command-route="' + item.id + '"><span>↗</span><span><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.group) + '</small></span><small>打开</small></button>'; }).join("") || '<div class="empty-state">没有找到匹配功能</div>';
    els.commandResults.querySelectorAll("[data-command-route]").forEach(function (button) { button.addEventListener("click", function () { closeCommandPalette(); navigate(button.dataset.commandRoute); }); });
  }

  function debounce(fn, wait) {
    let timer;
    return function () { const args = arguments; clearTimeout(timer); timer = setTimeout(function () { fn.apply(null, args); }, wait); };
  }

  function initEvents() {
    window.addEventListener("hashchange", function () { setRoute(location.hash.slice(1) || "dashboard"); });
    els.mobileNavButton.addEventListener("click", function () { els.sidebar.classList.toggle("is-open"); });
    els.navSearchTrigger.addEventListener("click", openCommandPalette);
    els.commandInput.addEventListener("input", function () { renderCommandResults(els.commandInput.value); });
    els.commandPalette.addEventListener("click", function (event) { if (event.target === els.commandPalette) closeCommandPalette(); });
    document.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openCommandPalette(); }
      if (event.key === "Escape") { closeCommandPalette(); closeDrawer(); closeModal(); }
    });
    els.drawerClose.addEventListener("click", closeDrawer);
    els.drawerCancel.addEventListener("click", closeDrawer);
    els.drawerBackdrop.addEventListener("click", closeDrawer);
    els.editorForm.addEventListener("submit", function (event) { event.preventDefault(); persistEditor(); });
    els.saveDraftButton.addEventListener("click", function () { persistEditor("草稿"); });
    els.modalClose.addEventListener("click", closeModal);
    els.modalBackdrop.addEventListener("click", function (event) { if (event.target === els.modalBackdrop) closeModal(); });
    els.importFileInput.addEventListener("change", function () { handleImportFile(els.importFileInput.files[0]); });
    els.previewSiteButton.addEventListener("click", function () { window.open(currentProfile().preview, "_blank", "noopener"); });
    els.roleViewSelect.addEventListener("change", function () {
      state.roleView = els.roleViewSelect.value;
      localStorage.setItem(roleStorageKey, state.roleView);
      closeCommandPalette(); closeDrawer(); closeModal();
      updateRoleIdentity();
      setRoute(canAccessModule(state.current) ? state.current : "dashboard");
      toast("已切换为“" + currentProfile().name + "”");
    });
  }

  updateRoleIdentity();
  initEvents();
  setRoute(location.hash.slice(1) || "dashboard");
}());
