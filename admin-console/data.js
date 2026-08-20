(function () {
  "use strict";

  const productLines = [
    "液态铝电解电容器",
    "高分子固态铝电解电容器",
    "高分子混合动力铝电解电容器",
    "叠层高分子固态铝电解电容器",
    "导电高分子钽电解电容器",
    "双电层超级电容器",
    "混合型超级电容（锂离子电容器）",
    "金属化聚丙烯薄膜电容器"
  ];

  const applicationFields = [
    "汽车电子",
    "AI服务器与数据中心",
    "仪器仪表",
    "新型电机驱动",
    "第三代半导体电源（GaN&SiC）",
    "机器人",
    "无人机",
    "光储充",
    "消费类电子"
  ];

  const languages = ["简体中文", "English", "Español", "العربية", "Português", "Français", "Deutsch", "Русский", "日本語", "한국어", "繁體中文"];
  const maintainedLanguages = ["简体中文", "English"];

  const fields = {
    name: { key: "name", label: "名称", type: "text", required: true, full: true },
    title: { key: "title", label: "标题", type: "text", required: true, full: true },
    status: { key: "status", label: "状态", type: "select", required: true, options: ["草稿", "已发布", "已下架"] },
    sort: { key: "sort", label: "排序", type: "number", help: "数值越小越靠前" },
    language: { key: "language", label: "语言", type: "select", options: languages },
    summary: { key: "summary", label: "摘要/说明", type: "textarea", full: true },
    updatedAt: { key: "updatedAt", label: "更新时间", type: "text", readonly: true }
  };

  function productField(key, label, group) {
    return { key: key, label: label, group: group || "基础信息" };
  }

  function baseProductFields(capacityLabel) {
    return [
      productField("productLine", "电容类别"),
      productField("package", "形状"),
      productField("itemNo", "产品料号"),
      productField("series", "系列"),
      productField("lifecycle", "全生命周期状态"),
      productField("polarity", "极性"),
      productField("voltage", "额定电压(V)"),
      productField("capacitance", capacityLabel || "标称容量(µF)"),
      productField("tolerance", "容差"),
      productField("temperatureMin", "温度范围下限(°C)"),
      productField("temperatureMax", "温度范围上限(°C)"),
      productField("ratedLife", "额定寿命 (Hours)")
    ];
  }

  const circularAluminumProductFields = [
    productField("esr", "ESR (mΩ max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(kHz)", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(mArms)", "产品线参数"),
    productField("leakage", "漏电流(µA)Max", "产品线参数"),
    productField("tanDelta", "损失角正切 (tanδ max.)", "产品线参数"),
    productField("diameter", "直径D(mm)", "产品线参数"),
    productField("length", "高度L(mm)", "产品线参数"),
    productField("terminalPitch", "引脚/端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数")
  ];

  const liquidStandardProductFields = [
    productField("esr", "ESR (Ω max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(kHz)", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(mArms)", "产品线参数"),
    productField("leakage", "漏电流(µA)Max", "产品线参数"),
    productField("tanDelta", "损失角正切 (tanδ max.)", "产品线参数"),
    productField("tanDeltaFrequency", "损失角频率(Hz)", "产品线参数"),
    productField("diameter", "直径D(mm)", "产品线参数"),
    productField("length", "高度L(mm)", "产品线参数"),
    productField("terminalPitch", "引脚/端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数")
  ];

  const liquidLargeProductFields = [
    productField("esr", "ESR (mΩ max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(Hz)", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(mArms)", "产品线参数"),
    productField("leakage", "漏电流(µA)Max", "产品线参数"),
    productField("tanDelta", "损失角正切 (tanδ max.)", "产品线参数"),
    productField("diameter", "直径D(mm)", "产品线参数"),
    productField("length", "高度L(mm)", "产品线参数"),
    productField("terminalPitch", "引脚/端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("terminalType", "端子种类", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数")
  ];

  const squareProductFields = [
    productField("esr", "ESR (mΩ max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(kHz)", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(mArms)", "产品线参数"),
    productField("leakage", "漏电流(µA)Max", "产品线参数"),
    productField("tanDelta", "损失角正切 (tanδ max.)", "产品线参数"),
    productField("length", "长L(mm)", "产品线参数"),
    productField("width", "宽W(mm)", "产品线参数"),
    productField("height", "高H(mm)", "产品线参数"),
    productField("terminalPitch", "引脚/端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数")
  ];

  const filmProductFields = [
    productField("esr", "ESR (mΩ max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(10kHz)", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(Arms)", "产品线参数"),
    productField("tanDelta1k", "损失角正切 (tanδ max.1k)", "产品线参数"),
    productField("tanDelta10k", "损失角正切 (tanδ max.10k)", "产品线参数"),
    productField("length", "长L(mm)", "产品线参数"),
    productField("width", "宽W(mm)", "产品线参数"),
    productField("height", "高H(mm)", "产品线参数"),
    productField("pinL1", "引脚L1(mm)", "产品线参数"),
    productField("terminalPitch", "端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数"),
    productField("dvdt", "dv/dt(V/μs)", "产品线参数")
  ];

  const filmModuleProductFields = [
    productField("esr", "ESR (mΩ max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(kHz)", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(Arms)", "产品线参数"),
    productField("leakage", "漏电流(µA)Max", "产品线参数"),
    productField("tanDelta", "损失角正切 (tanδ max.)", "产品线参数"),
    productField("width", "尺寸W(mm)", "产品线参数"),
    productField("height", "尺寸H(mm)", "产品线参数"),
    productField("thickness", "尺寸T(mm)", "产品线参数"),
    productField("terminalPitch", "引脚/端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数")
  ];

  const supercapProductFields = [
    productField("esr", "ESR (mΩ max.)", "产品线参数"),
    productField("esrFrequency", "ESR频率(kHz)AC", "产品线参数"),
    productField("ratedRipple", "额定纹波电流(mArms)", "产品线参数"),
    productField("diameter", "尺寸D(mm)", "产品线参数"),
    productField("length", "尺寸L(mm)", "产品线参数"),
    productField("terminalPitch", "引脚/端子间距(mm)", "产品线参数"),
    productField("terminalMaterial", "端子电镀材质", "产品线参数"),
    productField("weight", "单重", "产品线参数"),
    productField("minimumPack", "最小包装数量", "产品线参数"),
    productField("aecQ200", "AEC-Q200", "产品线参数"),
    productField("rohs", "RoHS指令", "产品线参数"),
    productField("remarks", "备注", "产品线参数"),
    productField("leakage72h", "72H漏电流(μA)", "产品线参数"),
    productField("maxChargeVoltage", "最高充电电压（V）", "产品线参数"),
    productField("maxChargeCurrent", "最大充电电流（A）", "产品线参数"),
    productField("peakCurrent", "峰值电流（A)", "产品线参数"),
    productField("continuousCurrent", "持续电流（A)", "产品线参数")
  ];

  const productFieldTemplates = {
    liquidStandard: baseProductFields("标称容量(µF)").concat(liquidStandardProductFields),
    liquidLarge: baseProductFields("标称容量(µF)").concat(liquidLargeProductFields),
    "高分子固态铝电解电容器": baseProductFields("标称容量(µF)").concat(circularAluminumProductFields),
    "高分子混合动力铝电解电容器": baseProductFields("标称容量(µF)").concat(circularAluminumProductFields),
    "叠层高分子固态铝电解电容器": baseProductFields("标称容量(µF)").concat(squareProductFields.map(function (field) { return field.key === "ratedRipple" ? Object.assign({}, field, { label: "额定纹波电流(mArms) / 45℃" }) : field; })),
    "导电高分子钽电解电容器": baseProductFields("标称容量(µF)").concat(squareProductFields),
    "双电层超级电容器": baseProductFields("标称容量(F)").concat(supercapProductFields),
    "混合型超级电容（锂离子电容器）": baseProductFields("标称容量(F)").concat(supercapProductFields),
    superModule: (function () { var common = baseProductFields("标称容量(F)"); common[1] = productField("package", "封装"); return common.concat(supercapProductFields.slice(0, 5), [productField("height", "尺寸H(mm)", "产品线参数")], supercapProductFields.slice(5)); }()),
    "金属化聚丙烯薄膜电容器": baseProductFields("标称容量(µF)").concat(filmProductFields),
    filmModule: baseProductFields("标称容量(µF)").concat(filmModuleProductFields)
  };

  const datasets = {
    pageMap: [
      ["index.html", "中文首页", "首页版本、轮播图、产品/应用/工具/新闻引用", "首页与全站"],
      ["index-en.html", "国际版首页", "首页版本、国际咨询表单、多语言", "首页与全站"],
      ["product-center.html", "产品筛选与列表", "产品料号数据、动态字段配置", "产品中心"],
      ["product-series.html", "产品体系图与系列", "系列公共资料", "产品中心"],
      ["product-detail.html", "产品详情", "CRM产品参数、系列公共资料、商城同料号链接、设计资源与内容关联", "产品中心"],
      ["product-replacement.html", "寻找替代料", "替代料关系", "产品中心"],
      ["application-center.html", "应用中心总览", "总览页内容、应用领域卡片、热门终端、下载资源与设计工具", "应用中心"],
      ["application-automotive.html", "汽车电子", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-ai-server.html", "AI服务器与数据中心", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-instrument.html", "仪器仪表", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-motor-drive.html", "新型电机驱动", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-power.html", "第三代半导体电源", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-robotics.html", "机器人", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-drone.html", "无人机", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-energy-storage.html", "光储充", "终端详情、推荐料号、内容关联", "应用中心"],
      ["application-consumer.html", "消费类电子", "终端详情、推荐料号、内容关联", "应用中心"],
      ["design-tools.html", "设计工具总览", "总览页内容、工具卡片与入口", "设计工具"],
      ["design-life-calc.html", "寿命推算工具", "寿命公式、计算记录", "设计工具"],
      ["design-3d-cad.html", "3D-CAD下载", "CAD模型", "设计工具"],
      ["design-3d-cad-request.html", "3D-CAD申请", "CAD申请、CRM流转", "设计工具"],
      ["design-spice.html", "SPICE模型", "SPICE模型", "设计工具"],
      ["design-reliability.html", "可靠性实验数据", "可靠性实验数据", "设计工具"],
      ["support.html", "服务支持总览", "总览页内容、入口卡片及新闻、FAQ、下载、合规统计", "服务支持"],
      ["support-news.html", "新闻资讯", "新闻与技术文章", "服务支持"],
      ["support-news-detail.html", "新闻详情", "文章正文、内容关联", "服务支持"],
      ["support-faq.html", "FAQ知识库", "FAQ知识库", "服务支持"],
      ["support-faq-detail.html", "FAQ详情", "FAQ正文、内容关联", "服务支持"],
      ["support-download.html", "下载中心", "下载中心资源", "服务支持"],
      ["support-certification.html", "合规证书", "合规证书", "服务支持"],
      ["about.html", "关于永铭总览", "总览页内容、栏目卡片及产品中心数据", "关于永铭"],
      ["about-company.html", "公司简介", "公司内容", "关于永铭"],
      ["about-honors.html", "企业荣誉", "企业荣誉", "关于永铭"],
      ["about-distributors.html", "代理商网络", "代理商网络", "关于永铭"],
      ["about-contact.html", "联系我们", "咨询与工具登记", "咨询与表单"],
      ["about-careers.html", "加入我们", "招聘岗位", "关于永铭"],
      ["about-procurement.html", "原材料采购", "采购内容、供应商表单", "关于永铭"],
      ["member-login.html", "会员登录", "会员档案、登录日志", "会员与表单"],
      ["member-register.html", "会员注册", "会员档案、条款同意", "会员与表单"],
      ["member-forgot.html", "找回密码", "会员安全事件", "会员与表单"],
      ["member-terms.html", "会员条款", "条款与同意记录", "会员与表单"],
      ["member-center.html", "会员中心", "会员档案、工具记录", "会员与表单"]
    ].map(function (item, index) {
      const isObsoleteMemberPage = /^member-/.test(item[0]);
      return {
        id: "PAGE-" + String(index + 1).padStart(2, "0"),
        file: item[0],
        name: item[1],
        dataSource: isObsoleteMemberPage ? "历史演示页面，不进入正式开发" : item[2],
        backend: isObsoleteMemberPage ? "无日常维护入口" : item[3],
        boundary: isObsoleteMemberPage ? "新官网不做会员功能，仅保留前端历史文件供核对" : "数据/文件由日常运营维护；样式/结构/固定文案由IT维护",
        status: isObsoleteMemberPage ? "已停用" : "已定位"
      };
    }),
    homepage: [
      { id: "HOME-01", name: "中文首页", version: "V1.8", blocks: "轮播图、产品线、应用领域、设计工具、新闻", status: "已发布", updatedAt: "2026-08-10 15:59" },
      { id: "HOME-02", name: "国际版首页", version: "V1.5", blocks: "国际轮播、应用领域、咨询表单", status: "已发布", updatedAt: "2026-08-07 17:57" }
    ],
    banners: [
      { id: "BN-001", title: "全系列电容器产品", scene: "产品组合", image: "assets/home/banner-hero-ymin-products-v2.png", language: "简体中文", link: "product-series.html", leftPanel: "显示", sort: 1, status: "已发布", updatedAt: "2026-08-08 10:30" },
      { id: "BN-002", title: "无人机电源解决方案", scene: "无人机", image: "assets/home/banner-hero-drone-v1.png", language: "简体中文", link: "application-drone.html", leftPanel: "隐藏", sort: 2, status: "已发布", updatedAt: "2026-08-08 10:31" },
      { id: "BN-003", title: "机器人应用解决方案", scene: "机器人", image: "assets/home/banner-hero-robotics-v1.png", language: "简体中文", link: "application-robotics.html", leftPanel: "隐藏", sort: 3, status: "已发布", updatedAt: "2026-08-08 10:32" },
      { id: "BN-EN-001", title: "Industrial Robotics", scene: "Industrial Robotics", image: "assets/home/banner-industrial-robotics.png", language: "English", link: "application-robotics.html", leftPanel: "隐藏", sort: 1, status: "已发布", updatedAt: "2026-08-08 10:30" },
      { id: "BN-EN-002", title: "Smart Automotive", scene: "Smart Automotive", image: "assets/home/banner-smart-automotive.png", language: "English", link: "application-automotive.html", leftPanel: "隐藏", sort: 2, status: "已发布", updatedAt: "2026-08-08 10:31" },
      { id: "BN-EN-003", title: "AI Data Center", scene: "AI Data Center", image: "assets/home/banner-ai-data-center.png", language: "English", link: "application-ai-server.html", leftPanel: "隐藏", sort: 3, status: "已发布", updatedAt: "2026-08-08 10:32" }
    ],
    homepageStats: [
      { id: "HSTAT-001", value: "20+", label: "年行业经验", language: "简体中文", sort: 1, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-002", value: "8", label: "大电容器产品线", language: "简体中文", sort: 2, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-003", value: "9", label: "大应用领域入口", language: "简体中文", sort: 3, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-004", value: "5", label: "项设计工具与数据资源", language: "简体中文", sort: 4, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-EN-001", value: "20+", label: "Years of Industry Experience", language: "English", sort: 1, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-EN-002", value: "8", label: "Capacitor Product Lines", language: "English", sort: 2, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-EN-003", value: "9", label: "Application Fields", language: "English", sort: 3, status: "已发布", updatedAt: "2026-08-14 16:00" },
      { id: "HSTAT-EN-004", value: "5", label: "Design Tools and Data Resources", language: "English", sort: 4, status: "已发布", updatedAt: "2026-08-14 16:00" }
    ],
    homepageProductCards: [
      { id: "HPC-001", productLine: "液态铝电解电容器", displayName: "液态铝电解电容器", summary: "贴片型 · 引线型 · 牛角型 · 螺栓型", image: "首页产品图片/4.png", language: "简体中文", sort: 1, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-002", productLine: "高分子固态铝电解电容器", displayName: "高分子固态铝电解电容器", summary: "贴片型 · 引线型 · 超低ESR", image: "首页产品图片/1.png", language: "简体中文", sort: 2, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-003", productLine: "高分子混合动力铝电解电容器", displayName: "高分子混合动力铝电解电容器", summary: "固液混合 · 贴片型 · 引线型 · AEC-Q200", image: "待上传", language: "简体中文", sort: 3, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-004", productLine: "叠层高分子固态铝电解电容器", displayName: "叠层高分子固态铝电解电容器", summary: "叠层型 · 贴片型 · 薄型封装", image: "首页产品图片/3.png", language: "简体中文", sort: 4, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-005", productLine: "导电高分子钽电解电容器", displayName: "导电高分子钽电解电容器", summary: "贴片型 · 小型化 · 高可靠", image: "首页产品图片/2.png", language: "简体中文", sort: 5, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-006", productLine: "双电层超级电容器", displayName: "双电层超级电容器", summary: "双电层单体 · 模组 · 大功率高能量", image: "首页产品图片/5.png", language: "简体中文", sort: 6, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-007", productLine: "混合型超级电容（锂离子电容器）", displayName: "混合型超级电容（锂离子电容）", summary: "锂离子电容（LIC） · 单体 · 模组", image: "待上传", language: "简体中文", sort: 7, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-008", productLine: "金属化聚丙烯薄膜电容器", displayName: "金属化聚丙烯薄膜电容器", summary: "插针式 · DC-Link · 高压高容量", image: "首页产品图片/6.png", language: "简体中文", sort: 8, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-001", productLine: "液态铝电解电容器", displayName: "Liquid Aluminum Electrolytic Capacitors", summary: "SMD · Radial · Snap-in · Screw Terminal", image: "首页产品图片/4.png", language: "English", sort: 1, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-002", productLine: "高分子固态铝电解电容器", displayName: "Polymer Solid Aluminum Electrolytic Capacitors", summary: "SMD · Radial · Ultra-low ESR", image: "首页产品图片/1.png", language: "English", sort: 2, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-003", productLine: "高分子混合动力铝电解电容器", displayName: "Polymer Hybrid Aluminum Electrolytic Capacitors", summary: "Hybrid · SMD · Radial · AEC-Q200", image: "待上传", language: "English", sort: 3, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-004", productLine: "叠层高分子固态铝电解电容器", displayName: "Stacked Polymer Solid Aluminum Electrolytic Capacitors", summary: "Stacked · SMD · Low Profile", image: "首页产品图片/3.png", language: "English", sort: 4, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-005", productLine: "导电高分子钽电解电容器", displayName: "Conductive Polymer Tantalum Electrolytic Capacitors", summary: "SMD · Compact · High Reliability", image: "首页产品图片/2.png", language: "English", sort: 5, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-006", productLine: "双电层超级电容器", displayName: "Electric Double-layer Supercapacitors", summary: "Cells · Modules · High Power and Energy", image: "首页产品图片/5.png", language: "English", sort: 6, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-007", productLine: "混合型超级电容（锂离子电容器）", displayName: "Hybrid Supercapacitors (Lithium-ion Capacitors)", summary: "LIC · Cells · Modules", image: "待上传", language: "English", sort: 7, status: "已发布", updatedAt: "2026-08-14 16:20" },
      { id: "HPC-EN-008", productLine: "金属化聚丙烯薄膜电容器", displayName: "Metallized Polypropylene Film Capacitors", summary: "Radial · DC-Link · High Voltage", image: "首页产品图片/6.png", language: "English", sort: 8, status: "已发布", updatedAt: "2026-08-14 16:20" }
    ],
    homepageApplicationCards: [
      { id: "HAC-EN-001", applicationId: "APP-01", applicationName: "汽车电子", displayName: "Automotive Electronics", summary: "Electric drives and controls · Thermal management · Smart cockpit · Charging systems", image: "assets/home/banner-smart-automotive.png", link: "application-automotive.html", language: "English", sort: 1, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-002", applicationId: "APP-02", applicationName: "AI服务器与数据中心", displayName: "AI Servers and Data Centers", summary: "CPU/GPU power · VRM · Backup power · DC-Link", image: "assets/home/banner-ai-data-center.png", link: "application-ai-server.html", language: "English", sort: 2, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-003", applicationId: "APP-05", applicationName: "第三代半导体电源（GaN&SiC）", displayName: "Third-generation Semiconductor Power Supplies (GaN & SiC)", summary: "GaN high frequency · SiC high voltage · High power density · High efficiency", image: "assets/home/banner-hero-ymin-products-v2.png", link: "application-power.html", language: "English", sort: 3, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-004", applicationId: "APP-04", applicationName: "新型电机驱动", displayName: "Advanced Motor Drives", summary: "Servo drives · ESC · Inverters · Thermal management", image: "assets/home/banner-industrial-robotics.png", link: "application-motor-drive.html", language: "English", sort: 4, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-005", applicationId: "APP-06", applicationName: "机器人", displayName: "Robotics", summary: "Joint motors · Controllers · Servo drives · Sensors", image: "assets/home/banner-hero-robotics-v1.png", link: "application-robotics.html", language: "English", sort: 5, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-006", applicationId: "APP-07", applicationName: "无人机", displayName: "Drones", summary: "Flight control · ESC · Video transmission · BMS", image: "assets/home/banner-hero-drone-v1.png", link: "application-drone.html", language: "English", sort: 6, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-007", applicationId: "APP-08", applicationName: "光储充", displayName: "Solar, Storage and Charging", summary: "PV inverters · PCS · BMS · High-voltage DC-Link", image: "assets/home/banner-ai-data-center.png", link: "application-energy-storage.html", language: "English", sort: 7, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-008", applicationId: "APP-03", applicationName: "仪器仪表", displayName: "Instrumentation", summary: "Smart meters · Gas meters · Water meters · Industrial automation", image: "assets/home/banner-industrial-robotics.png", link: "application-instrument.html", language: "English", sort: 8, updatedAt: "2026-08-20 10:30" },
      { id: "HAC-EN-009", applicationId: "APP-09", applicationName: "消费类电子", displayName: "Consumer Electronics", summary: "Fast charging · Smart lighting · Electronic pens · Security devices", image: "assets/home/banner-smart-automotive.png", link: "application-consumer.html", language: "English", sort: 9, updatedAt: "2026-08-20 10:30" }
    ],
    newsFeaturedArticles: [
      { id: "NFART-001", articleId: "ART-001", language: "简体中文", sort: 1, status: "已发布", updatedAt: "2026-08-15 10:20" },
      { id: "NFART-002", articleId: "ART-002", language: "简体中文", sort: 2, status: "已发布", updatedAt: "2026-08-15 10:20" },
      { id: "NFART-EN-001", articleId: "ART-001-EN", language: "English", sort: 1, status: "已发布", updatedAt: "2026-08-15 10:20" },
      { id: "NFART-EN-002", articleId: "ART-002-EN", language: "English", sort: 2, status: "已发布", updatedAt: "2026-08-15 10:20" }
    ],
    navigation: [
      { id: "NAV-HOME", name: "首页", children: "无下拉目录", link: "index.html / index-en.html", sort: 1, status: "显示" },
      { id: "NAV-PRODUCTS", name: "产品中心", children: "八大产品线", link: "product-center.html", sort: 2, status: "显示" },
      { id: "NAV-APPLICATIONS", name: "应用中心", children: "九大应用领域", link: "application-center.html", sort: 3, status: "显示" },
      { id: "NAV-TOOLS", name: "设计工具", children: "寿命推算工具、3D-CAD模型、SPICE模型、可靠性实验数据", link: "design-tools.html", sort: 4, status: "显示" },
      { id: "NAV-SUPPORT", name: "服务支持", children: "新闻资讯、知识库、下载中心、合规证书", link: "support.html", sort: 5, status: "显示" },
      { id: "NAV-ABOUT", name: "关于永铭", children: "公司简介、企业荣誉、代理商网络；中文站增加加入我们、原材料采购", link: "about.html", sort: 6, status: "显示" }
    ],
    footers: [
      {
        id: "FOOTER-ZH", language: "简体中文", site: "中文官网",
        navigationTitle: "网站导航", navigationLinks: "首页｜index.html\n产品中心｜product-center.html\n应用中心｜application-center.html\n设计工具｜design-tools.html\n服务支持｜support.html\n关于永铭｜about.html\n新闻中心｜support-news.html",
        productTitle: "产品中心", productLinks: "寻找替代料｜product-replacement.html\n液态铝电解电容器｜product-center.html\n双电层超级电容｜product-center.html\n高分子固态铝电解电容器｜product-center.html\n混合型超级电容(锂离子电容)｜product-center.html\n高分子混合动力铝电解电容器｜product-center.html\n叠层高分子固态铝电解电容器｜product-center.html\n金属化聚丙烯薄膜电容器｜product-center.html\n导电高分子钽电解电容器｜product-center.html",
        aboutTitle: "关于我们", aboutLinks: "公司简介｜about-company.html\n企业荣誉｜about-honors.html\n代理商网络｜about-distributors.html\n联系我们｜about-contact.html\n加入我们｜about-careers.html\n原材料采购｜about-procurement.html",
        rightTitle: "联系支持", hotline: "400 900 1922", domesticEmail: "web@ymin.com", internationalEmail: "ymin-sale@ymin.com", switchboard: "021-33617848", address: "上海市奉贤区南桥镇杨王经济园区光村路258号", addressUrl: "",
        rightExtraType: "二维码", serviceQr: "", serviceQrCaption: "扫码关注服务号", douyinQr: "", douyinQrCaption: "扫码关注抖音号", facebookUrl: "", xUrl: "", youtubeUrl: "", linkedinUrl: "",
        copyright: "© 2026 永铭电子有限公司. 版权所有.", privacyLabel: "隐私政策", privacyUrl: "#", termsLabel: "使用条款", termsUrl: "#", updatedAt: "2026-08-20"
      },
      {
        id: "FOOTER-EN", language: "English", site: "国际官网",
        navigationTitle: "Site Navigation", navigationLinks: "Home｜index-en.html\nProducts｜product-center.html\nApplications｜application-center.html\nDesign Tools｜design-tools.html\nSupport｜support.html\nAbout YMIN｜about.html\nNews Center｜support-news.html",
        productTitle: "Products", productLinks: "Cross-reference Search｜product-replacement.html\nLiquid Aluminum Electrolytic Capacitors｜product-center.html\nElectric Double-layer Supercapacitors｜product-center.html\nPolymer Solid Aluminum Electrolytic Capacitors｜product-center.html\nHybrid Supercapacitors (Lithium-ion Capacitors)｜product-center.html\nPolymer Hybrid Aluminum Electrolytic Capacitors｜product-center.html\nStacked Polymer Solid Aluminum Electrolytic Capacitors｜product-center.html\nMetallized Polypropylene Film Capacitors｜product-center.html\nConductive Polymer Tantalum Electrolytic Capacitors｜product-center.html",
        aboutTitle: "About Us", aboutLinks: "Company Profile｜about-company.html\nHonors and Certifications｜about-honors.html\nDistributor Network｜about-distributors.html\nContact Us｜about-contact.html",
        rightTitle: "Contact Support", hotline: "", domesticEmail: "web@ymin.com", internationalEmail: "ymin-sale@ymin.com", switchboard: "", address: "No. 258 Guangcun Road, Nanqiao Town, Fengxian District, Shanghai, China", addressUrl: "https://www.google.com/maps/search/?api=1&query=No.%20258%20Guangcun%20Road%2C%20Yangwang%20Economic%20Park%2C%20Nanqiao%20Town%2C%20Fengxian%20District%2C%20Shanghai",
        rightExtraType: "社交媒体", serviceQr: "", serviceQrCaption: "", douyinQr: "", douyinQrCaption: "", facebookUrl: "https://www.facebook.com/profile.php?id=100090904592502&mibextid=LQQJ4d", xUrl: "https://x.com/YMINcapacitor", youtubeUrl: "https://youtube.com/@shanghaiyongmingelectroniccolt", linkedinUrl: "https://www.linkedin.com/company/shanghai-yongming-electronic/",
        copyright: "© 2026 YMIN Electronics Co., Ltd. All rights reserved.", privacyLabel: "Privacy Policy", privacyUrl: "#", termsLabel: "Terms of Use", termsUrl: "#", updatedAt: "2026-08-20"
      }
    ],
    frontendChanges: [
      { id: "FE-001", page: "公司简介", file: "about-company.html", section: "发展历程", type: "样式与固定文案", request: "双时间线、新产品线重点展示、关键词强调", codeFiles: "about-company.html；styles/about-company-history.css；components/about-company-history.js", owner: "数字智能部", status: "已完成", updatedAt: "2026-08-13" },
      { id: "FE-002", page: "中文首页", file: "index.html", section: "首页首屏及模块布局", type: "页面结构", request: "中文首页保持确认结构；轮播内容由日常运营维护", codeFiles: "index.html（页面结构与页面样式）；styles/common.css；components/navbar.js；components/footer.js", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-11" },
      { id: "FE-003", page: "全站导航", file: "components/navbar.js", section: "主导航与下拉目录", type: "全站组件", request: "导航结构、间距、下拉交互及多语言显示规则", codeFiles: "components/navbar.js；styles/common.css", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-11" },
      { id: "FE-004", page: "全站页脚", file: "components/footer.js", section: "页脚", type: "全站组件", request: "中英文页脚结构分别展示，其他语言使用国际版结构", codeFiles: "components/footer.js；styles/common.css", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-11" },
      { id: "FE-005", page: "中文首页", file: "index.html", section: "Banner左侧功能区", type: "跳转与交互", request: "轮播切换时读取当前Banner的左侧功能区配置；仅配置为“显示”的Banner展示左侧搜索与快捷入口，配置随Banner记录生效，不随排序位置变化", codeFiles: "index.html（首页轮播交互）", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-14" },
      { id: "FE-006", page: "中文首页", file: "index.html", section: "首页数据指标", type: "页面结构", request: "首页四项指标读取日常运营中的“首页数据指标”，展示数值、说明文字及排序；停用记录不在前台展示", codeFiles: "index.html（首页指标区域）", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-14" },
      { id: "FE-007", page: "中文首页", file: "index.html", section: "产品中心八大产品线卡片", type: "页面结构", request: "八张卡片读取日常运营中的“首页产品线卡片”；前台展示图片、展示名称和简介，按排序输出，停用记录不展示；跳转筛选使用固定产品线绑定，不使用可编辑展示名称拼接", codeFiles: "index.html（homeProductGrid）", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-14" },
      { id: "FE-008", page: "中文首页", file: "index.html", section: "最新动态与技术文章", type: "页面结构", request: "首页无需单独选择文章或设置展示顺序；自动读取新闻中心中已发布的文章，并按发布时间从新到旧展示。文章标题、类型、日期、摘要、图片和链接均读取新闻文章主数据；文章下架后自动从首页移除", codeFiles: "index.html（homeNewsGrid）", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-18" },
      { id: "FE-009", page: "新闻资讯", file: "support-news.html", section: "重点文章", type: "页面结构", request: "重点文章改为轮播，每种语言最多选择三篇已发布文章；按排序轮播，标题、摘要、封面、日期和详情链接实时读取文章主数据；文章下架或从重点文章清单移出后自动停止展示", codeFiles: "support-news.html（重点文章轮播）", owner: "数字智能部", status: "待开发", updatedAt: "2026-08-15" }
    ],
    products: [
      { id: "P-25626", itemNo: "SDA2R7L1050812", productLine: "双电层超级电容器", series: "SDA", package: "引线型", lifecycle: "量产品", polarity: "", voltage: "2.7", capacitance: "1", tolerance: "-10%~+30%", temperatureMin: "-40", temperatureMax: "70", ratedLife: "1000", esr: "180", esrFrequency: "1", ratedRipple: "", diameter: "8", length: "11.5", terminalPitch: "", terminalMaterial: "", weight: "", minimumPack: "500", aecQ200: "", rohs: "", remarks: "", leakage72h: "3", maxChargeVoltage: "", maxChargeCurrent: "", peakCurrent: "1.06", continuousCurrent: "0.26", updatedAt: "2026-08-14 08:30" },
      { id: "P-25627", itemNo: "SDA2R7L2050813", productLine: "双电层超级电容器", series: "SDA", package: "引线型", lifecycle: "量产品", polarity: "", voltage: "2.7", capacitance: "2", tolerance: "-10%~+30%", temperatureMin: "-40", temperatureMax: "70", ratedLife: "1000", esr: "", esrFrequency: "1", ratedRipple: "", diameter: "8", length: "13", terminalPitch: "", terminalMaterial: "", weight: "", minimumPack: "", aecQ200: "", rohs: "", remarks: "", leakage72h: "", maxChargeVoltage: "", maxChargeCurrent: "", peakCurrent: "", continuousCurrent: "", updatedAt: "2026-08-14 08:30" },
      { id: "P-VMM01", itemNo: "VMM0251V221M0608", productLine: "液态铝电解电容器", series: "VMM", package: "贴片型", lifecycle: "量产品", polarity: "有极性", voltage: "25", capacitance: "220", tolerance: "±20%", temperatureMin: "-55", temperatureMax: "105", ratedLife: "5000", esr: "0.18", esrFrequency: "100", ratedRipple: "850", leakage: "", tanDelta: "", tanDeltaFrequency: "120", diameter: "6.3", length: "7.7", terminalPitch: "", terminalMaterial: "", weight: "", minimumPack: "", aecQ200: "符合", rohs: "符合", remarks: "", updatedAt: "2026-08-14 08:30" }
    ],
    productAiKeywords: [
      { id: "AIKW-25626", itemNo: "SDA2R7L1050812", productLine: "双电层超级电容器", series: "SDA", aiKeywords: "2.7V超级电容, 1F引线型超级电容, 备用电源", updatedAt: "2026-08-12 14:20" },
      { id: "AIKW-25627", itemNo: "SDA2R7L2050813", productLine: "双电层超级电容器", series: "SDA", aiKeywords: "", updatedAt: "2026-08-12 14:20" },
      { id: "AIKW-VMM01", itemNo: "VMM0251V221M0608", productLine: "液态铝电解电容器", series: "VMM", aiKeywords: "25V 220μF贴片铝电解电容, AEC-Q200电容, VMM系列", updatedAt: "2026-08-12 14:20" }
    ],
    shopLinks: [
      { id: "SHOP-VMM-LCSC", itemNo: "VMM0251V221M0608", platform: "立创商城", externalSku: "C-YMIN-VMM0251V221M0608", productUrl: "https://item.szlcsc.com/product/VMM0251V221M0608.html", listingStatus: "上架", source: "商城系统", syncStatus: "匹配成功", status: "已发布", updatedAt: "2026-08-14 08:35" },
      { id: "SHOP-VMM-ICKEY", itemNo: "VMM0251V221M0608", platform: "ICKey商城", externalSku: "VMM0251V221M0608", productUrl: "https://www.ickey.cn/detail/VMM0251V221M0608.html", listingStatus: "上架", source: "商城系统", syncStatus: "匹配成功", status: "已发布", updatedAt: "2026-08-14 08:35" },
      { id: "SHOP-SDA-LCSC", itemNo: "SDA2R7L1050812", platform: "立创商城", externalSku: "C-YMIN-SDA2R7L1050812", productUrl: "https://item.szlcsc.com/product/SDA2R7L1050812.html", listingStatus: "上架", source: "商城系统", syncStatus: "匹配成功", status: "已发布", updatedAt: "2026-08-14 08:35" }
    ],
    series: [
      { id: "SER-SDA", code: "SDA", name: "SDA系列", productLine: "双电层超级电容器", image: "SDA系列产品图.png", pdf: "SDA系列规格书.pdf", codingRule: "SDA编码规则.pdf", dimensionImage: "SDA产品尺寸图.png", rippleImage: "SDA纹波电流与频率条件图.png", tags: "高功率, 长循环寿命, 快速充放电" },
      { id: "SER-VMM", code: "VMM", name: "VMM系列", productLine: "液态铝电解电容器", image: "VMM系列产品图.png", pdf: "VMM系列规格书.pdf", codingRule: "VMM编码规则.pdf", dimensionImage: "VMM产品尺寸图.png", rippleImage: "VMM纹波电流与频率条件图.png", tags: "小体积, 低阻抗, 85℃ 3000小时, RoHS指令对应" },
      { id: "SER-LKM", code: "LKM", name: "LKM系列", productLine: "液态铝电解电容器", image: "LKM系列产品图.png", pdf: "LKM系列规格书.pdf", codingRule: "", dimensionImage: "LKM产品尺寸图.png", rippleImage: "", tags: "长寿命, 高纹波" }
    ],
    replacements: [
      { id: "REP-001", brand: "Panasonic", competitorNo: "EEH-ZK1V221P", yminNo: "VMM0251V221M0608", difference: "尺寸一致，纹波电流需复核", reviewer: "电解电容事业群", status: "已发布", updatedAt: "2026-08-06" },
      { id: "REP-002", brand: "NICHICON", competitorNo: "UWT1V221MNL1GS", yminNo: "VMM0251V221M0608", difference: "寿命条件一致", reviewer: "电解电容事业群", status: "草稿", updatedAt: "2026-08-08" }
    ],
    applicationOverview: [
      { id: "APP-OVERVIEW-ZH", title: "应用中心", introduction: "从汽车电子到AI数据中心，从工业设备到消费电子，探索永铭电容在各关键应用领域的电路拓扑与推荐产品。我们提供基于电路方块图的产品选型指南、应用白皮书及设计工具支持，助力您的产品更快上市。", applicationSectionTitle: "按应用领域浏览", hotSectionTitle: "热门终端应用", featuredResourceId: "RES-AI-PDN-GUIDE", language: "简体中文", updatedAt: "2026-08-19" },
      { id: "APP-OVERVIEW-EN", title: "Application Center", introduction: "Explore YMIN capacitor topologies and recommended products across key applications, from automotive electronics and AI data centers to industrial equipment and consumer electronics. Circuit-block-based selection guides, application white papers and design tools help accelerate product development.", applicationSectionTitle: "Browse by Application", hotSectionTitle: "Popular End Applications", featuredResourceId: "RES-AI-PDN-GUIDE-EN", language: "English", updatedAt: "2026-08-19" }
    ],
    applications: applicationFields.map(function (name, index) {
      const summariesZh = [
        "电驱/电控/电源、安全部件、热管理、智能座舱、智能驾驶、车灯、充电桩 —— AEC-Q200合规，耐高温125℃、135℃、150℃，耐振动。",
        "GPU 加速卡、CPU 供电、PDN 总线架构的大电流、超低 ESR 电容方案，支持 400V/800V DC-Link。",
        "精密测量仪器、工业自动化仪表、医疗检测设备等对精度和稳定性要求极高的电容方案。",
        "变频器、伺服驱动器、步进电机驱动等工业电机控制系统的 DC-Link 与滤波电容方案。",
        "聚焦氮化镓（GaN）与碳化硅（SiC）电源，为高频、高压、高功率密度电源系统提供电容方案。",
        "面向机器人关节模组、雷达/摄像头感知系统与高压输入滤波的电容方案。",
        "面向无人机电子调速器与航点飞行调参的滤波、储能及稳定供电电容方案。",
        "光伏逆变器、储能系统、充电桩等高压大容量电容方案，支持高纹波电流与长寿命需求。",
        "笔记本电脑、智能家居、PD快充、LED照明等消费电子产品的薄型化小型化电容方案。"
      ];
      const summariesEn = [
        "Solutions for electric drives, controls and power, safety systems, thermal management, smart cockpits, intelligent driving, lighting and charging — AEC-Q200 compliant, vibration resistant and rated for 125°C, 135°C or 150°C.",
        "High-current, ultra-low-ESR capacitor solutions for GPU accelerators, CPU power and PDN bus architectures, including 400 V / 800 V DC-Link.",
        "Capacitor solutions for precision instruments, industrial automation and medical test equipment requiring exceptional accuracy and stability.",
        "DC-Link and filtering capacitor solutions for inverters, servo drives, stepper drives and other industrial motor-control systems.",
        "Capacitor solutions for high-frequency, high-voltage and high-power-density GaN and SiC power systems.",
        "Capacitor solutions for robot joint modules, radar/camera sensing systems and high-voltage input filtering.",
        "Filtering, energy storage and stable power supply capacitor solutions for UAV electronic speed regulators and waypoint flight parameter adjustment.",
        "High-voltage, high-capacitance solutions for PV inverters, energy storage and charging systems, supporting high ripple current and long service life.",
        "Low-profile, compact capacitor solutions for laptops, smart homes, USB-PD fast chargers, LED lighting and other consumer electronics."
      ];
      const tagsZh = ["AEC-Q200, 135℃耐高温, 极低漏电流", "大电流, 超低ESR, 小型化", "高精度, 低漏电流, 长寿命", "DC-Link, 滤波, 高纹波", "高效率, 低ESR, 高纹波", "高容量密度, 低ESR, 高可靠性", "大纹波, 高能量密度, 小型化", "高压大容量, 高纹波, 长寿命", "薄型化, 小型化, 低ESR"];
      const tagsEn = ["AEC-Q200, High-temperature Operation to 135°C, Ultra-low Leakage Current", "High Current, Ultra-low ESR, Compact", "High Precision, Low Leakage Current, Long Life", "DC-Link, Filtering, High Ripple Current", "High Efficiency, Low ESR, High Ripple Current", "High Capacitance Density, Low ESR, High Reliability", "High Ripple Current, High Energy Density, Compact", "High Voltage and High Capacitance, High Ripple Current, Long Life", "Low Profile, Compact, Low ESR"];
      const notesZh = ["9个应用领域 · 10+产品系列", "VHT · NPX · CW3H系列", "VKM · VPT · LK系列", "VPG · VPX · CW3H系列", "VPG · NPX · CW3H系列", "3个应用子领域 · 31个推荐料号", "2个应用子领域 · 29个推荐料号", "CW3H · VPG系列", "NPX · VKM · VPT系列"];
      const notesEn = ["9 application fields · 10+ product series", "VHT · NPX · CW3H series", "VKM · VPT · LK series", "VPG · VPX · CW3H series", "VPG · NPX · CW3H series", "3 application subfields · 31 recommended part numbers", "2 application subfields · 29 recommended part numbers", "CW3H · VPG series", "NPX · VKM · VPT series"];
      const namesEn = ["Automotive Electronics", "AI Servers and Data Centers", "Instrumentation", "Advanced Motor Drives", "Third-generation Semiconductor Power Supplies (GaN & SiC)", "Robotics", "Drones", "Solar, Storage and Charging", "Consumer Electronics"];
      return { id: "APP-" + String(index + 1).padStart(2, "0"), name: name, summaryZh: summariesZh[index], summaryEn: summariesEn[index], tagsZh: tagsZh[index], tagsEn: tagsEn[index], cardNoteZh: notesZh[index], cardNoteEn: notesEn[index], tabs: index === 0 ? 8 : index === 1 ? 7 : 5, terminals: index === 0 ? 14 : index === 1 ? 11 : 6, guides: index < 2 ? 2 : 1, sort: index + 1, status: "已发布", updatedAt: "2026-08-19" };
    }),
    applicationHighlights: [
      { id: "APP-HOT-ZH-01", terminalId: "TERM-AUTO-MCU", displayTitle: "电机控制-MCU", shortText: "汽车电子电机驱动应用", image: "", language: "简体中文", sort: 1, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-ZH-02", terminalId: "TERM-AUTO-CPM", displayTitle: "CPM碰撞模块", shortText: "超级电容快速放电应用", image: "", language: "简体中文", sort: 2, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-ZH-03", terminalId: "TERM-AUTO-PARK", displayTitle: "驻车锂电BMS", shortText: "驻车电源管理应用", image: "", language: "简体中文", sort: 3, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-ZH-04", terminalId: "TERM-AI-BBU", displayTitle: "BBU备用电源", shortText: "AI服务器短时备电应用", image: "", language: "简体中文", sort: 4, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-EN-01", terminalId: "TERM-AUTO-MCU", displayTitle: "Motor Control MCU", shortText: "Automotive motor-drive application", image: "", language: "English", sort: 1, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-EN-02", terminalId: "TERM-AUTO-CPM", displayTitle: "Collision Module", shortText: "Fast-discharge supercapacitor application", image: "", language: "English", sort: 2, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-EN-03", terminalId: "TERM-AUTO-PARK", displayTitle: "Parking BMS", shortText: "Parking power-management application", image: "", language: "English", sort: 3, status: "已发布", updatedAt: "2026-08-18" },
      { id: "APP-HOT-EN-04", terminalId: "TERM-AI-BBU", displayTitle: "BBU Backup Power", shortText: "Short-term backup for AI servers", image: "", language: "English", sort: 4, status: "已发布", updatedAt: "2026-08-18" }
    ],
    applicationToolHighlights: [
      { id: "APP-TOOL-ZH-01", toolId: "TOOL-LIFE", displayName: "寿命推算工具", shortText: "在线计算电容工作寿命", language: "简体中文", sort: 1, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-ZH-02", toolId: "TOOL-SPICE", displayName: "SPICE模型", shortText: "下载仿真模型库", language: "简体中文", sort: 2, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-ZH-03", toolId: "TOOL-CAD", displayName: "3D-CAD模型", shortText: "STEP/IGES格式", language: "简体中文", sort: 3, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-ZH-04", toolId: "TOOL-REL", displayName: "可靠性实验数据", shortText: "高温负荷、耐湿、温度循环、耐振等可靠性试验的实测数据，按系列查询，为设计评审提供数据支撑。", language: "简体中文", sort: 4, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-EN-01", toolId: "TOOL-LIFE", displayName: "Lifetime Calculator", shortText: "Online calculation of capacitor working life", language: "English", sort: 1, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-EN-02", toolId: "TOOL-SPICE", displayName: "SPICE Models", shortText: "Download simulation model library", language: "English", sort: 2, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-EN-03", toolId: "TOOL-CAD", displayName: "3D-CAD Models", shortText: "STEP/IGES formats", language: "English", sort: 3, status: "已发布", updatedAt: "2026-08-19" },
      { id: "APP-TOOL-EN-04", toolId: "TOOL-REL", displayName: "Reliability Test Data", shortText: "Measured high-temperature load, damp-heat, temperature-cycle and vibration test data, searchable by series for design review.", language: "English", sort: 4, status: "已发布", updatedAt: "2026-08-19" }
    ],
    designOverview: [
      { id: "DESIGN-OVERVIEW-ZH", title: "设计工具", introduction: "为工程师提供全链路设计支持——从3D封装模型、SPICE电路仿真、寿命推算到可靠性数据验证，帮助您加速产品开发进程，降低选型风险。", workflowTitle: "推荐设计工作流", workflowText: "选型 → 下载SPICE模型仿真 → 使用寿命计算器验证 → 下载3D-CAD做Layout → 查阅可靠性数据确认", language: "简体中文", status: "已发布", updatedAt: "2026-08-19" },
      { id: "DESIGN-OVERVIEW-EN", title: "Design Tools", introduction: "End-to-end engineering support—from 3D package models and SPICE simulation to lifetime estimation and reliability validation—helps accelerate development and reduce selection risk.", workflowTitle: "Recommended Design Workflow", workflowText: "Select a product → Simulate with a SPICE model → Verify lifetime → Complete layout with 3D-CAD → Review reliability data", language: "English", status: "已发布", updatedAt: "2026-08-19" }
    ],
    supportOverview: [
      { id: "SUPPORT-OVERVIEW-ZH", title: "让技术资料更容易被找到和使用", introduction: "从问题解答、完整技术文章到产品资料与合规文件，围绕研发选型与项目验证提供统一入口。", language: "简体中文", status: "已发布", updatedAt: "2026-08-19" },
      { id: "SUPPORT-OVERVIEW-EN", title: "Make Technical Resources Easier to Find and Use", introduction: "A unified entry point for engineering selection and project validation, from technical Q&A and full articles to product resources and compliance documents.", language: "English", status: "已发布", updatedAt: "2026-08-19" }
    ],
    supportOverviewCards: [
      { id: "SUPPORT-CARD-ZH-NEWS", module: "新闻资讯", title: "新闻资讯与技术文章", summary: "阅读永铭官网产品动态、应用方案和技术文章全文，支持应用领域、产品系列、料号与关键词检索。", link: "support-news.html", buttonLabel: "查看文章", language: "简体中文", sort: 1, status: "已发布" },
      { id: "SUPPORT-CARD-ZH-FAQ", module: "FAQ知识库", title: "FAQ知识库", summary: "用自然语言搜索问题，并按应用、产品线和问题类型筛选。每条解答可继续进入相关技术文章、规格资料和设计工具。", link: "support-faq.html", buttonLabel: "查询问题", language: "简体中文", sort: 2, status: "已发布" },
      { id: "SUPPORT-CARD-ZH-DOWNLOAD", module: "下载中心", title: "下载中心", summary: "产品目录册、应用选型手册、综合目录册及其他公开技术资料。", link: "support-download.html", buttonLabel: "查找资料", language: "简体中文", sort: 3, status: "已发布" },
      { id: "SUPPORT-CARD-ZH-CERT", module: "合规证书", title: "合规证书", summary: "查阅产品合规、体系认证与相关声明文件。", link: "support-certification.html", buttonLabel: "查看证书", language: "简体中文", sort: 4, status: "已发布" },
      { id: "SUPPORT-CARD-EN-NEWS", module: "新闻资讯", title: "News and Technical Articles", summary: "Read YMIN product updates, application solutions and full technical articles, with search by application, product line, part number and keyword.", link: "support-news.html", buttonLabel: "View Articles", language: "English", sort: 1, status: "已发布" },
      { id: "SUPPORT-CARD-EN-FAQ", module: "FAQ知识库", title: "FAQ Knowledge Base", summary: "Search questions in natural language and filter by application, product line or question type. Each answer links to related articles, technical resources and design tools.", link: "support-faq.html", buttonLabel: "Search FAQs", language: "English", sort: 2, status: "已发布" },
      { id: "SUPPORT-CARD-EN-DOWNLOAD", module: "下载中心", title: "Download Center", summary: "Product catalogs, application selection guides, master catalogs and other public technical resources.", link: "support-download.html", buttonLabel: "Find Downloads", language: "English", sort: 3, status: "已发布" },
      { id: "SUPPORT-CARD-EN-CERT", module: "合规证书", title: "Compliance Certificates", summary: "Browse product compliance documents, management-system certificates and related declarations.", link: "support-certification.html", buttonLabel: "View Certificates", language: "English", sort: 4, status: "已发布" }
    ],
    aboutOverview: [
      { id: "ABOUT-HUB-ZH", heroTitle: "专注电容器研发、制造与应用", heroText: "上海永铭电子股份有限公司始于2001年，围绕客户应用需求持续推进电容器产品研发、精密制造与应用服务。", heroImage: "assets/about/company-factory.webp", overviewTitle: "全面了解永铭", overviewText: "从企业发展、技术成果到销售与供应链协作，进入对应栏目获取清晰、可核验的信息。", capabilityTitle: "以应用需求驱动产品创新", capabilityText: "永铭围绕汽车电子、AI服务器与数据中心、工业电源、新能源、消费电子等应用场景，提供覆盖多种材料体系和封装形态的电容器产品。", capabilitySecondaryText: "从参数选型、样品验证到批量应用，产品、研发和应用团队围绕客户问题开展协同。", capabilityBullets: "覆盖八大电容器产品线\n面向应用场景组织产品与技术资料\n通过产品中心、设计工具和知识库提供选型支持", capabilityItems: "研发｜围绕材料、结构、工艺与应用需求持续开展产品开发。\n制造｜以稳定制造和过程控制支撑产品一致性与交付。\n应用｜针对不同整机系统提供参数选型与应用协同。\n质量｜按适用体系和产品要求持续维护质量与合规资料。", productTitle: "八大产品线", productText: "以产品线为基础组织产品检索、应用选型和技术服务。", ctaTitle: "需要选型或项目支持？", ctaText: "请提供应用场景、目标参数或完整料号，便于业务与技术团队进一步对接。", language: "简体中文", status: "已发布", updatedAt: "2026-08-19" },
      { id: "ABOUT-HUB-EN", heroTitle: "Focused on Capacitor R&D, Manufacturing and Applications", heroText: "Founded in 2001, Shanghai YMIN Electronics Co., Ltd. continuously advances capacitor R&D, precision manufacturing and application support around customer needs.", heroImage: "assets/about/company-factory.webp", overviewTitle: "Discover YMIN", overviewText: "Explore clearly organized and verifiable information on company development, technical achievements, sales and supply-chain collaboration.", capabilityTitle: "Application-driven Product Innovation", capabilityText: "YMIN provides capacitors across multiple material systems and package types for automotive electronics, AI servers and data centers, industrial power, new energy and consumer electronics.", capabilitySecondaryText: "From parameter selection and sample validation to volume applications, our product, R&D and application teams work together to solve customer challenges.", capabilityBullets: "Eight capacitor product lines\nProduct and technical resources organized by application\nSelection support through the Product Center, Design Tools and Knowledge Base", capabilityItems: "R&D｜Continuous product development around materials, structures, processes and application requirements.\nManufacturing｜Stable manufacturing and process control support product consistency and reliable delivery.\nApplications｜Parameter selection and application collaboration for different end systems.\nQuality｜Quality and compliance documentation maintained according to applicable systems and product requirements.", productTitle: "Eight Product Lines", productText: "Product search, application selection and technical support organized by product line.", ctaTitle: "Need Product Selection or Project Support?", ctaText: "Provide the application, target parameters or complete part number so our business and technical teams can support you efficiently.", language: "English", status: "已发布", updatedAt: "2026-08-19" }
    ],
    aboutOverviewCards: [
      { id: "ABOUT-CARD-ZH-COMPANY", title: "公司简介", summary: "企业概况、发展历程、产品布局与制造能力。", link: "about-company.html", buttonLabel: "进入栏目", language: "简体中文", sort: 1, status: "已发布" },
      { id: "ABOUT-CARD-ZH-HONORS", title: "企业荣誉", summary: "以证书图片和文字索引展示企业资质、知识产权与技术成果。", link: "about-honors.html", buttonLabel: "查看荣誉", language: "简体中文", sort: 2, status: "已发布" },
      { id: "ABOUT-CARD-ZH-DEALERS", title: "代理商网络", summary: "查询公开授权代理商名录与授权日期。", link: "about-distributors.html", buttonLabel: "查询代理商", language: "简体中文", sort: 3, status: "已发布" },
      { id: "ABOUT-CARD-ZH-CONTACT", title: "联系我们", summary: "获取国内、海外业务及产品服务热线等官方联系方式。", link: "about-contact.html", buttonLabel: "发起咨询", language: "简体中文", sort: 4, status: "已发布" },
      { id: "ABOUT-CARD-ZH-JOBS", title: "加入我们", summary: "了解招聘方向、工作地点、招聘流程和最新公开职位。", link: "about-careers.html", buttonLabel: "了解招聘", language: "简体中文", sort: 5, status: "已发布" },
      { id: "ABOUT-CARD-ZH-PROCUREMENT", title: "原材料采购", summary: "了解采购原则、供应商要求和准入协作流程。", link: "about-procurement.html", buttonLabel: "供应商合作", language: "简体中文", sort: 6, status: "已发布" },
      { id: "ABOUT-CARD-EN-COMPANY", title: "Company Profile", summary: "Company overview, milestones, product portfolio and manufacturing capabilities.", link: "about-company.html", buttonLabel: "Learn More", language: "English", sort: 1, status: "已发布" },
      { id: "ABOUT-CARD-EN-HONORS", title: "Corporate Honors", summary: "Company qualifications, intellectual property and technical achievements presented through certificate images and searchable indexes.", link: "about-honors.html", buttonLabel: "View Honors", language: "English", sort: 2, status: "已发布" },
      { id: "ABOUT-CARD-EN-DEALERS", title: "Distributor Network", summary: "Search the published list of authorized distributors and authorization dates.", link: "about-distributors.html", buttonLabel: "Find Distributors", language: "English", sort: 3, status: "已发布" },
      { id: "ABOUT-CARD-EN-CONTACT", title: "Contact Us", summary: "Find official contacts for domestic and international business and product support.", link: "about-contact.html", buttonLabel: "Contact YMIN", language: "English", sort: 4, status: "已发布" }
    ],
    aboutPageBackgrounds: [
      { id: "ABOUT-BG-OVERVIEW-ZH", pageKey: "overview", pageName: "关于永铭总览", file: "about.html", language: "简体中文", backgroundImage: "assets/about/company-factory.webp", fallback: "深蓝色默认首屏", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-OVERVIEW-EN", pageKey: "overview", pageName: "About YMIN", file: "about.html", language: "English", backgroundImage: "assets/about/company-factory.webp", fallback: "Default dark-blue hero", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-COMPANY-ZH", pageKey: "company", pageName: "公司简介", file: "about-company.html", language: "简体中文", backgroundImage: "", fallback: "深蓝色默认首屏", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-COMPANY-EN", pageKey: "company", pageName: "Company Profile", file: "about-company.html", language: "English", backgroundImage: "", fallback: "Default dark-blue hero", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-HONORS-ZH", pageKey: "honors", pageName: "企业荣誉", file: "about-honors.html", language: "简体中文", backgroundImage: "assets/about/honor-04.webp", fallback: "深蓝色默认首屏", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-HONORS-EN", pageKey: "honors", pageName: "Corporate Honors", file: "about-honors.html", language: "English", backgroundImage: "assets/about/honor-04.webp", fallback: "Default dark-blue hero", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-CAREERS-ZH", pageKey: "careers", pageName: "加入我们", file: "about-careers.html", language: "简体中文", backgroundImage: "assets/about/careers-hero.webp", fallback: "深蓝色默认首屏", updatedAt: "2026-08-20" },
      { id: "ABOUT-BG-PROCUREMENT-ZH", pageKey: "procurement", pageName: "原材料采购", file: "about-procurement.html", language: "简体中文", backgroundImage: "", fallback: "深蓝色默认首屏", updatedAt: "2026-08-20" }
    ],
    terminals: [
      { id: "TERM-AUTO-MCU", applicationId: "APP-01", moduleId: "APP-01-MOD-01", field: "汽车电子", tab: "电机驱动", name: "电机控制-MCU", template: "电解电容模板", topology: "功能拓扑图", recommended: 3, news: 1, status: "已发布" },
      { id: "TERM-AUTO-CPM", applicationId: "APP-01", moduleId: "APP-01-MOD-09", field: "汽车电子", tab: "CPM碰撞模块", name: "CPM碰撞模块", template: "超级电容模板", topology: "应用实物图", recommended: 2, news: 0, status: "已发布" },
      { id: "TERM-AUTO-PARK", applicationId: "APP-01", moduleId: "APP-01-MOD-10", field: "汽车电子", tab: "驻车锂电", name: "驻车锂电BMS", template: "超级电容模板", topology: "应用实物图", recommended: 2, news: 1, status: "已发布" },
      { id: "TERM-AI-BBU", applicationId: "APP-02", moduleId: "APP-02-MOD-02", field: "AI服务器与数据中心", tab: "BBU备用电源", name: "BBU备用电源", template: "超级电容模板", topology: "应用实物图", recommended: 2, news: 1, status: "已发布" },
      { id: "TERM-AI-RAID", applicationId: "APP-02", moduleId: "APP-02-MOD-03", field: "AI服务器与数据中心", tab: "RAID磁盘阵列", name: "RAID磁盘阵列", template: "超级电容模板", topology: "应用实物图", recommended: 2, news: 0, status: "草稿" }
    ],
    appProducts: [
      { id: "APR-001", terminal: "电机控制-MCU", itemNo: "VMM0251V221M0608", series: "VMM", reason: "高可靠、低阻抗", priority: 1, source: "应用中心确认数据表", status: "已发布" },
      { id: "APR-002", terminal: "CPM碰撞模块", itemNo: "SDA2R7L1050812", series: "SDA", reason: "大功率快速放电", priority: 1, source: "演示数据", status: "草稿" },
      { id: "APR-003", terminal: "驻车锂电BMS", itemNo: "SDA2R7L2050813", series: "SDA", reason: "长循环寿命", priority: 1, source: "演示数据", status: "草稿" }
    ],
    articles: [
      { id: "ART-001", contentId: "CONTENT-001", title: "汽车电子电源系统的电容选型要点", type: "技术文章", channels: "新闻资讯", summary: "围绕车载电源的温度、寿命、纹波和尺寸约束，说明铝电解电容的主要选型方法。", body: "<h2>车载电源对电容器的主要要求</h2><p>汽车电子应用需要综合考虑工作温度、额定电压、纹波电流、寿命与安装空间。</p><h2>推荐选型方法</h2><p>应先确认电压和温度等硬性条件，再核对寿命、纹波电流及结构尺寸。</p>", cover: "汽车电子电容选型.jpg", author: "永铭应用工程部", sourceName: "上海永铭电子股份有限公司", sourceUrl: "", publishAt: "2026-08-09 10:00", productLines: "液态铝电解电容器", applications: "汽车电子", tags: "汽车电子,电容选型,车载电源", seoTitle: "汽车电子电源系统电容选型要点｜永铭电子", seoKeywords: "汽车电子电容,车载电源电容,铝电解电容选型", seoDescription: "了解汽车电子电源系统中铝电解电容的电压、温度、寿命和纹波选型方法。", slug: "automotive-power-capacitor-selection", relations: 4, language: "简体中文", status: "已发布", updatedAt: "2026-08-09" },
      { id: "ART-001-EN", contentId: "CONTENT-001", title: "Capacitor Selection for Automotive Power Systems", type: "技术文章", channels: "新闻资讯", summary: "Selection guidance covering temperature, lifetime, ripple current and dimensional constraints in automotive power systems.", body: "<h2>Key capacitor requirements in automotive power systems</h2><p>Automotive applications require a combined review of operating temperature, rated voltage, ripple current, lifetime and installation space.</p><h2>Recommended selection method</h2><p>Confirm the voltage and temperature limits first, then verify lifetime, ripple-current capability and dimensions.</p>", cover: "汽车电子电容选型.jpg", publishAt: "2026-08-09 10:00", productLines: "液态铝电解电容器", applications: "汽车电子", tags: "automotive,capacitor selection,power supply", seoTitle: "Capacitor Selection for Automotive Power Systems | YMIN", seoKeywords: "automotive capacitor,power supply capacitor,capacitor selection", seoDescription: "Learn how to select capacitors for automotive power systems by voltage, temperature, lifetime and ripple current.", slug: "automotive-power-capacitor-selection-en", relations: 4, language: "English", status: "已发布", updatedAt: "2026-08-09" },
      { id: "ART-002", contentId: "CONTENT-002", title: "AI服务器BBU备用电源中的超级电容应用", type: "技术文章", channels: "新闻资讯", summary: "介绍超级电容在AI服务器BBU备用电源中的快速充放电和高循环寿命优势。", body: "<h2>BBU备用电源的应用需求</h2><p>AI服务器需要在短时掉电期间保持关键负载稳定运行，超级电容适合承担高功率短时备电。</p>", cover: "AI服务器BBU超级电容.jpg", author: "永铭超级电容应用团队", sourceName: "上海永铭电子股份有限公司", sourceUrl: "", publishAt: "2026-08-10 09:30", productLines: "双电层超级电容器", applications: "AI服务器与数据中心", tags: "AI服务器,BBU,超级电容", seoTitle: "AI服务器BBU备用电源中的超级电容应用｜永铭电子", seoKeywords: "AI服务器BBU,超级电容,备用电源", seoDescription: "了解超级电容在AI服务器BBU备用电源中的应用优势和选型重点。", slug: "ai-server-bbu-supercapacitor", relations: 3, language: "简体中文", status: "已发布", updatedAt: "2026-08-10" },
      { id: "ART-002-EN", contentId: "CONTENT-002", title: "Supercapacitors in AI Server BBU Backup Power", type: "技术文章", channels: "新闻资讯", summary: "How supercapacitors support fast charge and discharge with long cycle life in AI server BBU systems.", body: "<h2>Backup power requirements for BBU systems</h2><p>AI servers need stable short-duration power during outages. Supercapacitors are suitable for high-power, short-term backup.</p>", cover: "AI服务器BBU超级电容.jpg", publishAt: "2026-08-10 09:30", productLines: "双电层超级电容器", applications: "AI服务器与数据中心", tags: "AI server,BBU,supercapacitor", seoTitle: "Supercapacitors in AI Server BBU Backup Power | YMIN", seoKeywords: "AI server BBU,supercapacitor,backup power", seoDescription: "Learn the benefits and selection priorities of supercapacitors in AI server BBU backup power.", slug: "ai-server-bbu-supercapacitor-en", relations: 3, language: "English", status: "已发布", updatedAt: "2026-08-10" },
      { id: "ART-003", contentId: "CONTENT-003", title: "永铭推出VMM系列高可靠贴片电容", type: "产品信息", channels: "新闻资讯", summary: "VMM系列面向高可靠贴片应用，兼顾小型化、低阻抗与高纹波能力。", body: "<p>永铭VMM系列高可靠贴片铝电解电容器适用于汽车电子与工业电源等应用。</p>", cover: "VMM系列产品新闻.jpg", author: "永铭市场部", sourceName: "上海永铭电子股份有限公司", sourceUrl: "", publishAt: "", productLines: "液态铝电解电容器", applications: "", tags: "VMM系列,贴片电容,新品", seoTitle: "VMM系列高可靠贴片电容｜永铭电子", seoKeywords: "VMM系列,贴片铝电解电容", seoDescription: "永铭VMM系列高可靠贴片铝电解电容器产品介绍。", slug: "vmm-smd-capacitor", relations: 1, language: "简体中文", status: "草稿", updatedAt: "2026-08-11" }
    ],
    faqs: [
      { id: "FAQ-001", question: "汽车电子电源系统选择电容时需要重点确认哪些参数？", answer: "应先确认额定电压、工作温度等硬性条件，再核对寿命、纹波电流和结构尺寸是否满足整机要求。", type: "应用与选型", application: "汽车电子", productLine: "液态铝电解电容器", sourceArticleId: "ART-001", sourceArticleTitle: "汽车电子电源系统的电容选型要点", source: "AI从文章提取", aiConfidence: "人工已确认", relations: 3, status: "已发布", updatedAt: "2026-08-15" },
      { id: "FAQ-002", question: "超级电容为什么适合AI服务器BBU备用电源？", answer: "超级电容具备高功率、快速充放电和高循环寿命等特点，适合承担AI服务器短时掉电期间的关键负载备电。", type: "应用与选型", application: "AI服务器与数据中心", productLine: "双电层超级电容器", sourceArticleId: "ART-002", sourceArticleTitle: "AI服务器BBU备用电源中的超级电容应用", source: "AI从文章提取", aiConfidence: "待人工确认", relations: 0, status: "草稿", updatedAt: "2026-08-15" },
      { id: "FAQ-003", question: "如何申请没有现成文件的3D-CAD模型？", answer: "在3D-CAD页面输入完整料号；没有现成模型时进入申请页，填写必要联系信息后提交。", type: "资料与工具", application: "通用", productLine: "全部", sourceArticleId: "", sourceArticleTitle: "人工独立维护", source: "人工创建", aiConfidence: "不适用", relations: 0, language: "简体中文", status: "草稿", updatedAt: "2026-08-10" },
      { id: "FAQ-001-EN", contentId: "FAQ-CONTENT-001", question: "Which parameters should be checked first when selecting capacitors for automotive power systems?", answer: "Confirm rated voltage and operating temperature first, then verify lifetime, ripple current and mechanical dimensions.", type: "应用与选型", application: "汽车电子", productLine: "液态铝电解电容器", sourceArticleId: "CONTENT-001", sourceArticleTitle: "Capacitor Selection for Automotive Power Systems", source: "AI从文章提取", aiConfidence: "人工已确认", relations: 3, language: "English", status: "已发布", updatedAt: "2026-08-15" }
    ],
    relations: [
      { id: "REL-001", sourceType: "文章", sourceId: "ART-001", sourceName: "汽车电子电源系统的电容选型要点", relationType: "推荐新闻", targetType: "完整料号", targetId: "VMM0251V221M0608", targetName: "VMM0251V221M0608", scope: "仅该料号", effectCount: 1, validation: "校验通过", priority: 1, source: "知识库Excel导入", status: "已发布" },
      { id: "REL-002", sourceType: "文章", sourceId: "ART-001", sourceName: "汽车电子电源系统的电容选型要点", relationType: "推荐新闻", targetType: "应用终端", targetId: "TERM-AUTO-MCU", targetName: "电机控制-MCU", scope: "仅该终端", effectCount: 1, validation: "校验通过", priority: 1, source: "后台维护", status: "已发布" },
      { id: "REL-003", sourceType: "应用终端", sourceId: "TERM-AUTO-MCU", sourceName: "电机控制-MCU", relationType: "推荐产品", targetType: "完整料号", targetId: "VMM0251V221M0608", targetName: "VMM0251V221M0608", scope: "仅该料号", effectCount: 1, validation: "校验通过", priority: 1, source: "应用中心确认数据表", status: "已发布" },
      { id: "REL-004", sourceType: "下载资源", sourceId: "RES-AUTO-LIQUID", sourceName: "液态电容汽车应用选型指南", relationType: "指南下载", targetType: "应用领域", targetId: "APP-01", targetName: "汽车电子", scope: "应用总览页", effectCount: 1, validation: "校验通过", priority: 1, source: "下载中心", status: "已发布" },
      { id: "REL-005", sourceType: "下载资源", sourceId: "RES-AUTO-SUPER", sourceName: "超级电容汽车应用选型指南", relationType: "指南下载", targetType: "应用领域", targetId: "APP-01", targetName: "汽车电子", scope: "应用总览页", effectCount: 1, validation: "校验通过", priority: 2, source: "下载中心", status: "已发布" },
      { id: "REL-006", sourceType: "文章", sourceId: "ART-002", sourceName: "AI服务器BBU备用电源中的超级电容应用", relationType: "推荐新闻", targetType: "产品系列", targetId: "SER-SDA", targetName: "SDA系列", scope: "系列下全部料号", effectCount: 162, validation: "待事业部确认", priority: 1, source: "知识库Excel导入", status: "草稿" },
      { id: "REL-FAQ-001-SOURCE", sourceType: "FAQ", sourceId: "FAQ-001", sourceName: "汽车电子电源系统选择电容时需要重点确认哪些参数？", relationType: "来源文章", targetType: "文章", targetId: "ART-001", targetName: "汽车电子电源系统的电容选型要点", scope: "仅当前对象", effectCount: 1, validation: "校验通过", priority: 1, source: "FAQ发布时自动建立", status: "已发布" },
      { id: "REL-FAQ-001-PRODUCT", sourceType: "FAQ", sourceId: "FAQ-001", sourceName: "汽车电子电源系统选择电容时需要重点确认哪些参数？", relationType: "相关知识", targetType: "完整料号", targetId: "VMM0251V221M0608", targetName: "VMM0251V221M0608", scope: "仅该料号", effectCount: 1, validation: "校验通过", priority: 1, source: "继承来源文章已确认关联", status: "已发布" },
      { id: "REL-FAQ-001-APP", sourceType: "FAQ", sourceId: "FAQ-001", sourceName: "汽车电子电源系统选择电容时需要重点确认哪些参数？", relationType: "相关知识", targetType: "应用终端", targetId: "TERM-AUTO-MCU", targetName: "电机控制-MCU", scope: "仅该终端", effectCount: 1, validation: "校验通过", priority: 1, source: "继承来源文章已确认关联", status: "已发布" }
    ],
    downloads: [
      { id: "RES-AI-PDN-GUIDE", title: "《AI服务器电源分配网络(PDN)优化指南》", summary: "深入探讨400V/800V直流总线架构下电容选型与布局策略，包含实测数据与仿真模型。适用于数据中心电源工程师。", type: "应用选型手册", productLine: "全部", package: "全部", application: "AI服务器与数据中心", language: "简体中文", version: "2026.02", file: "应用类1-AI服务器专用电容手册20260202.pdf", whereUsed: 1, downloads: 0, status: "已发布", updatedAt: "2026-08-19" },
      { id: "RES-AI-PDN-GUIDE-EN", resourceGroupId: "RES-AI-PDN-GUIDE", title: "AI Server Power Distribution Network (PDN) Optimization Guide", summary: "In-depth discussion of capacitor selection and layout strategies under 400V/800V DC bus architecture, including measured data and simulation models. For data center power engineers.", type: "应用选型手册", productLine: "全部", package: "全部", application: "AI服务器与数据中心", language: "English", version: "2026.02", file: "应用类1-AI服务器专用电容手册20260202.pdf", whereUsed: 1, downloads: 0, status: "已发布", updatedAt: "2026-08-19" },
      { id: "RES-AUTO-LIQUID", title: "液态电容汽车应用选型指南", type: "应用选型手册", productLine: "液态铝电解电容器", package: "全部", application: "汽车电子", language: "简体中文", version: "V2026.08", file: "液态电容汽车应用选型指南.pdf", whereUsed: 2, downloads: 128, status: "已发布", updatedAt: "2026-08-10" },
      { id: "RES-AUTO-SUPER", title: "超级电容汽车应用选型指南", type: "应用选型手册", productLine: "双电层超级电容器", package: "全部", application: "汽车电子", language: "简体中文", version: "V2026.08", file: "超级电容汽车应用选型指南.pdf", whereUsed: 1, downloads: 86, status: "已发布", updatedAt: "2026-08-10" },
      { id: "RES-CATALOG-ALL", title: "永铭电容器综合目录册", type: "综合目录册", productLine: "全部", package: "全部", application: "全部", language: "简体中文", version: "2026版", file: "YMIN综合目录册2026.pdf", whereUsed: 1, downloads: 456, status: "已发布", updatedAt: "2026-08-05" },
      { id: "RES-CODING-VMM", title: "液态铝电解电容器编码规则", type: "编码规则", productLine: "液态铝电解电容器", package: "全部", application: "全部", language: "简体中文", version: "V2.0", file: "液态铝电解电容器编码规则.pdf", whereUsed: 0, downloads: 63, status: "草稿", updatedAt: "2026-08-08" },
      { id: "RES-CATALOG-ALL-EN", resourceGroupId: "RES-CATALOG-ALL", title: "YMIN Capacitor Product Catalog", type: "综合目录册", productLine: "全部", package: "全部", application: "全部", language: "English", version: "2026", file: "YMIN-Capacitor-Catalog-2026.pdf", whereUsed: 1, downloads: 96, status: "已发布", updatedAt: "2026-08-05" }
    ],
    compliance: [
      { id: "CERT-LIQ-ROHS", productLine: "液态铝电解电容器", type: "RoHS", reportNo: "SHAEC25001234", agency: "SGS", reportDate: "2026-04-12", file: "已上传", status: "已发布" },
      { id: "CERT-LIQ-REACH", productLine: "液态铝电解电容器", type: "REACH", reportNo: "SHAEC25001235", agency: "SGS", reportDate: "2026-04-12", file: "已上传", status: "已发布" },
      { id: "CERT-LIQ-HF", productLine: "液态铝电解电容器", type: "无卤", reportNo: "SHAEC25001236", agency: "SGS", reportDate: "2026-04-12", file: "已上传", status: "已发布" },
      { id: "CERT-ISO9001", productLine: "公司体系", type: "ISO 9001", reportNo: "CN-2026-QM-018", agency: "认证机构", reportDate: "2026-01-18", file: "已上传", status: "已发布" }
    ],
    tools: [
      { id: "TOOL-CAD", name: "3D-CAD", displayNameZh: "3D-CAD 模型", displayNameEn: "3D-CAD Models", summaryZh: "STEP / IGES 格式的电容3D封装模型库，支持按封装类型快速筛选下载，直接导入主流PCB设计软件。", summaryEn: "A library of capacitor 3D package models in STEP / IGES formats, filterable by package type and ready for mainstream PCB design tools.", tagsZh: "STEP, IGES", tagsEn: "STEP, IGES", access: "基本信息验证", records: 299, link: "design-3d-cad.html", sort: 1, status: "已发布" },
      { id: "TOOL-LIFE", name: "寿命计算工具", displayNameZh: "寿命计算工具", displayNameEn: "Lifetime Calculator", summaryZh: "在线交互式电容工作寿命推算器。输入工作温度、施加电压、纹波电流等参数，实时预估实际使用寿命。", summaryEn: "An interactive online capacitor lifetime calculator that estimates operating life from working temperature, applied voltage, ripple current and other conditions.", tagsZh: "交互式计算, 在线工具", tagsEn: "Interactive Calculation, Online Tool", access: "基本信息验证", records: 328, link: "design-life-calc.html", sort: 2, status: "已发布" },
      { id: "TOOL-REL", name: "可靠性实验数据", displayNameZh: "可靠性实验数据", displayNameEn: "Reliability Test Data", summaryZh: "高温负荷、耐湿、温度循环、耐振等可靠性试验的实测数据，按系列查询，为设计评审提供数据支撑。", summaryEn: "Measured high-temperature load, humidity, temperature-cycle and vibration test data, searchable by series for design review.", tagsZh: "高温负荷, 温度循环", tagsEn: "High-temperature Load, Temperature Cycling", access: "基本信息验证", records: 0, link: "design-reliability.html", sort: 3, status: "已发布" },
      { id: "TOOL-SPICE", name: "SPICE 模型", displayNameZh: "SPICE 模型", displayNameEn: "SPICE Models", summaryZh: "电容等效电路仿真模型库，支持 LTspice / PSpice / ADS 等主流平台，覆盖频率特性、ESR/ESL 等关键参数。", summaryEn: "Capacitor equivalent-circuit simulation models for LTspice, PSpice, ADS and other mainstream platforms, including frequency characteristics, ESR, ESL and other key parameters.", tagsZh: "LTspice, PSpice", tagsEn: "LTspice, PSpice", access: "基本信息验证", records: 0, link: "design-spice.html", sort: 4, status: "已发布" }
    ],
    cadModels: [
      { id: "CAD-001", name: "贴片型 D6.3×L7.7", productLine: "液态铝电解电容器", package: "贴片型", dimensions: "D6.3×L7.7 mm", format: "STEP", version: "1.0", file: "SMD-D6.3-L7.7.step", downloads: 18, status: "已发布", updatedAt: "2026-08-14 10:20" },
      { id: "CAD-002", name: "引线型 D8×L11.5", productLine: "双电层超级电容器", package: "引线型", dimensions: "D8×L11.5 mm", format: "STEP", version: "1.0", file: "RADIAL-D8-L11.5.step", downloads: 9, status: "已发布", updatedAt: "2026-08-14 10:20" }
    ],
    cadMappings: [
      { id: "CADMAP-001", cadId: "CAD-001", itemNo: "VMM0251V221M0608", source: "AI规格匹配", matchBasis: "封装形式、直径和长度一致", confidence: "高", status: "已发布", updatedAt: "2026-08-14 10:30" },
      { id: "CADMAP-002", cadId: "CAD-002", itemNo: "SDA2R7L1050812", source: "AI规格匹配", matchBasis: "封装形式、直径和长度一致", confidence: "高", status: "草稿", updatedAt: "2026-08-14 10:30" }
    ],
    cadRequests: [
      { id: "CADREQ-260811-01", itemNo: "VMM0501V471M0810", applicant: "张先生", company: "XX汽车电子", contact: "zhang@example.com / 138****1026", application: "车载电源", receivingTeam: "3D-CAD资料负责人", assignee: "电解电容事业群业务员", crm: "CRM-20260811001", wecomStatus: "已推送", crmStatus: "跟进中", submittedAt: "2026-08-11 09:42" },
      { id: "CADREQ-260810-03", itemNo: "SDA2R7L3350820", applicant: "Lee", company: "ABC Power", contact: "lee@example.com", application: "Backup Power", receivingTeam: "3D-CAD资料负责人", assignee: "超级电容事业部业务员", crm: "CRM-20260810018", wecomStatus: "已推送", crmStatus: "已完成", submittedAt: "2026-08-10 16:20" }
    ],
    spiceModels: [],
    reliability: [],
    members: [
      { id: "VERIFY-000128", name: "张伟", position: "研发工程师", company: "上海XX汽车电子", country: "中国", phone: "138****3091", email: "zhang@example.com", sourcePage: "寿命推算工具", crm: "CRM-20260811015", verification: "已验证", validUntil: "2026-09-11", submittedAt: "2026-08-11 09:10" },
      { id: "VERIFY-000127", name: "Michael Lee", position: "Hardware Engineer", company: "ABC Power", country: "United States", phone: "+1 *** 0188", email: "lee@example.com", sourcePage: "3D-CAD 模型", crm: "CRM-20260810018", verification: "已验证", validUntil: "2026-09-10", submittedAt: "2026-08-10 16:08" }
    ],
    leads: [
      { id: "LEAD-260811-01", type: "国际应用咨询", name: "John Smith", company: "Future Mobility", country: "Germany", contact: "john@example.com", sourcePage: "汽车电子", receivingTeam: "国际业务部", assignee: "欧洲区业务员", crm: "CRM-20260811012", wecomStatus: "已推送", crmStatus: "待跟进", submittedAt: "2026-08-11 11:20" },
      { id: "LEAD-260811-02", type: "产品与应用咨询", name: "陈工", company: "深圳XX科技", country: "中国", contact: "chen@example.com / 135****6812", sourcePage: "产品详情页", receivingTeam: "国内业务部", assignee: "华南区业务员", crm: "CRM-20260811015", wecomStatus: "已推送", crmStatus: "已联系", submittedAt: "2026-08-11 13:15" }
    ],
    jobApplications: [
      { id: "JOBAPP-260812-01", jobTitle: "质量经理", name: "吴先生", contact: "wu@example.com / 139****2751", resume: "吴先生_质量经理.pdf", receivingTeam: "人力资源部", assignee: "招聘专员", crm: "CRM-HR-20260812003", wecomStatus: "已推送", crmStatus: "简历筛选", submittedAt: "2026-08-12 10:26" },
      { id: "JOBAPP-260809-02", jobTitle: "代理商开发专员", name: "周女士", contact: "zhou@example.com / 136****4190", resume: "周女士_代理商开发专员.pdf", receivingTeam: "人力资源部", assignee: "招聘专员", crm: "CRM-HR-20260809008", wecomStatus: "已推送", crmStatus: "已联系", submittedAt: "2026-08-09 15:08" }
    ],
    agreements: [
      { id: "TERM-001", title: "永铭会员服务条款", version: "V1.2", language: "简体中文", effectiveDate: "2026-08-01", accepted: 842, status: "已发布" },
      { id: "PRIVACY-001", title: "隐私政策", version: "V1.1", language: "简体中文", effectiveDate: "2026-08-01", accepted: 842, status: "已发布" }
    ],
    aboutContent: [
      { id: "ABOUT-COMPANY", contentId: "ABOUT-COMPANY", name: "公司简介", page: "about-company.html", firstScreen: "统一标准首屏", sections: 4, language: "简体中文", status: "已发布", updatedAt: "2026-08-10" },
      { id: "ABOUT-COMPANY-EN", contentId: "ABOUT-COMPANY", name: "Company Profile", page: "about-company.html", firstScreen: "International standard hero", sections: 4, language: "English", status: "已发布", updatedAt: "2026-08-10" },
      { id: "ABOUT-OVERVIEW", contentId: "ABOUT-OVERVIEW", name: "关于永铭总览", page: "about.html", firstScreen: "总览首屏", sections: 6, language: "简体中文", status: "已发布", updatedAt: "2026-08-08" },
      { id: "ABOUT-OVERVIEW-EN", contentId: "ABOUT-OVERVIEW", name: "About YMIN", page: "about.html", firstScreen: "International overview hero", sections: 4, language: "English", status: "已发布", updatedAt: "2026-08-08" }
    ],
    honors: [
      { id: "HONOR-001", title: "高新技术企业证书", category: "企业资质", issuer: "相关主管部门", date: "2025-12-18", image: "已上传", sort: 1, status: "已发布" },
      { id: "HONOR-002", title: "上海市专精特新企业", category: "企业荣誉", issuer: "上海市相关部门", date: "2025-08-20", image: "已上传", sort: 2, status: "已发布" }
    ],
    dealerPage: [
      { id: "DEALER-PAGE", bannerZh: "assets/about/distributor-banner-dark.jpg", bannerEn: "assets/about/distributor-banner-en.png", updatedAt: "2026-08-19" }
    ],
    dealers: [
      { id: "DEALER-001", company: "上海XX电子有限公司", authorizationDate: "2026-01-01" },
      { id: "DEALER-002", company: "深圳XX科技有限公司", authorizationDate: "2026-01-01" }
    ],
    jobs: [
      { id: "JOB-QUALITY-MGR", title: "质量经理", department: "质量部", location: "上海市奉贤区", experience: "8年以上", contact: "021-33617848-8412 招聘专员", publishDate: "2026-08-06", status: "已发布" },
      { id: "JOB-BD", title: "代理商开发专员", department: "市场/销售", location: "上海市奉贤区", experience: "3年以上", contact: "021-33617848-8412 招聘专员", publishDate: "2026-07-30", status: "已发布" }
    ],
    procurementPage: [
      { id: "PROCUREMENT-PAGE-ZH", title: "原材料采购", introduction: "以质量、交付、技术、成本和合规为共同基础，与供应商建立稳定、透明、可持续的合作关系。", heroBackground: "about-hero 默认背景", principleTitle: "采购原则", principleText: "供应商应具备与供货范围相匹配的质量、制造、交付、技术和合规能力。", cooperationTitle: "主要合作方向", cooperationText: "具体采购项目、技术规格、验证要求和采购计划以正式询价或项目文件为准。", processTitle: "供应商准入流程", processText: "供应商通过送样、试验验证、现场评定和小批量试用后进入合格供方名录，并接受持续评价。", formTitle: "提交合作意向", formText: "请简要说明企业能力、拟供应类别、主要产品、体系资质和合作优势。正式合作以永铭采购团队后续评估与书面文件为准。", language: "简体中文", updatedAt: "2026-08-19" }
    ],
    procurementPrinciples: [
      { id: "PROC-PRINCIPLE-01", icon: "sell", title: "价格优", description: "在满足质量与技术要求的基础上，具备合理且有竞争力的供货价格。", sort: 1, visible: "显示" },
      { id: "PROC-PRINCIPLE-02", icon: "verified", title: "质量与追溯", description: "建立适用的质量管理体系，具备批次追溯、变更管理和异常闭环能力。", sort: 2, visible: "显示" },
      { id: "PROC-PRINCIPLE-03", icon: "speed", title: "交期快", description: "快速响应采购需求，具备及时的生产排期与交付能力。", sort: 3, visible: "显示" },
      { id: "PROC-PRINCIPLE-04", icon: "inventory", title: "供应稳定", description: "具备稳定产能、备货管理和风险应对能力，保障供应连续性。", sort: 4, visible: "显示" },
      { id: "PROC-PRINCIPLE-05", icon: "engineering", title: "技术与改善", description: "能够配合样品、验证、工艺优化、成本改善及问题分析。", sort: 5, visible: "显示" },
      { id: "PROC-PRINCIPLE-06", icon: "eco", title: "环境与物质合规", description: "满足适用的环境管理和限制物质要求，并提供真实、可追溯的资料。", sort: 6, visible: "显示" },
      { id: "PROC-PRINCIPLE-07", icon: "balance", title: "商业道德", description: "遵守适用法律法规，坚持诚信经营，保护商业信息和知识产权。", sort: 7, visible: "显示" },
      { id: "PROC-PRINCIPLE-08", icon: "diversity_3", title: "社会责任", description: "关注劳动权益、职业健康安全、环境影响及负责任供应链要求。", sort: 8, visible: "显示" }
    ],
    procurementCooperations: [
      { id: "PROC-COOP-01", icon: "layers", title: "金属与电极材料", description: "电容器相关铝箔、金属材料、电极材料及配套材料。", sort: 1, visible: "显示" },
      { id: "PROC-COOP-02", icon: "water_drop", title: "化学与功能材料", description: "电解液、导电高分子材料及其他功能化学材料。", sort: 2, visible: "显示" },
      { id: "PROC-COOP-03", icon: "filter_alt", title: "介质与隔离材料", description: "电解纸、薄膜及与产品结构相关的介质和隔离材料。", sort: 3, visible: "显示" },
      { id: "PROC-COOP-04", icon: "category", title: "结构件与辅料", description: "外壳、端子、密封、绝缘及生产使用的配套辅料。", sort: 4, visible: "显示" },
      { id: "PROC-COOP-05", icon: "inventory_2", title: "包装材料", description: "满足防护、运输、标识和追溯要求的包装材料。", sort: 5, visible: "显示" },
      { id: "PROC-COOP-06", icon: "precision_manufacturing", title: "设备与技术服务", description: "制造设备、检测设备、自动化及相关技术服务。", sort: 6, visible: "显示" }
    ],
    procurementSteps: [
      { id: "PROC-STEP-01", title: "供应商初步遴选及送样", description: "结合供货范围和基础能力开展初步遴选并安排送样。", sort: 1, visible: "显示" },
      { id: "PROC-STEP-02", title: "送样确认", description: "核对样品、规格、批次及配套资料。", sort: 2, visible: "显示" },
      { id: "PROC-STEP-03", title: "相关试验验证", description: "按照材料和技术要求完成相关试验。", sort: 3, visible: "显示" },
      { id: "PROC-STEP-04", title: "供应商调查及现场评定", description: "评估制造、质量、产能和现场管理能力。", sort: 4, visible: "显示" },
      { id: "PROC-STEP-05", title: "签订相关协议", description: "确认质量、技术、商务及保密等合作要求。", sort: 5, visible: "显示" },
      { id: "PROC-STEP-06", title: "确认为合格供方", description: "完成审核并纳入合格供方管理。", sort: 6, visible: "显示" },
      { id: "PROC-STEP-07", title: "小批量供货试用", description: "通过小批量供货检验材料和供货表现。", sort: 7, visible: "显示" },
      { id: "PROC-STEP-08", title: "实施验证", description: "结合实际生产验证质量和过程稳定性。", sort: 8, visible: "显示" },
      { id: "PROC-STEP-09", title: "批量供货", description: "验证通过后按采购计划开展批量供货。", sort: 9, visible: "显示" },
      { id: "PROC-STEP-10", title: "月度评审", description: "按月评价质量、交付、响应和改善表现。", sort: 10, visible: "显示" },
      { id: "PROC-STEP-11", title: "年度评审", description: "综合年度表现进行持续合作评定。", sort: 11, visible: "显示" }
    ],
    procurement: [
      { id: "SUP-260811-01", company: "XX铝箔材料有限公司", contact: "李经理 / 138****5206", material: "化成箔", attachments: 3, crm: "SUP-CRM-20260811003", receivingTeam: "采购部", assignee: "原材料采购专员", wecomStatus: "已推送", crmStatus: "试验验证", submittedAt: "2026-08-11 09:18" },
      { id: "SUP-260807-02", company: "XX化工材料有限公司", contact: "周经理 / zhou@example.com", material: "电解液", attachments: 2, crm: "SUP-CRM-20260807008", receivingTeam: "采购部", assignee: "原材料采购专员", wecomStatus: "已推送", crmStatus: "送样确认", submittedAt: "2026-08-07 14:36" }
    ],
    trafficTrend: [
      { id: "TRAFFIC-0806", date: "08-06", zhPv: 936, zhUv: 418, intlPv: 286, intlUv: 142, actions: 51, errors: 3 },
      { id: "TRAFFIC-0807", date: "08-07", zhPv: 1018, zhUv: 447, intlPv: 302, intlUv: 151, actions: 58, errors: 2 },
      { id: "TRAFFIC-0808", date: "08-08", zhPv: 1084, zhUv: 469, intlPv: 327, intlUv: 164, actions: 62, errors: 4 },
      { id: "TRAFFIC-0809", date: "08-09", zhPv: 872, zhUv: 382, intlPv: 251, intlUv: 127, actions: 43, errors: 1 },
      { id: "TRAFFIC-0810", date: "08-10", zhPv: 824, zhUv: 366, intlPv: 239, intlUv: 121, actions: 39, errors: 2 },
      { id: "TRAFFIC-0811", date: "08-11", zhPv: 1127, zhUv: 486, intlPv: 348, intlUv: 171, actions: 67, errors: 5 },
      { id: "TRAFFIC-0812", date: "08-12", zhPv: 1192, zhUv: 513, intlPv: 371, intlUv: 183, actions: 72, errors: 3 },
      { id: "TRAFFIC-0813", date: "08-13", zhPv: 1254, zhUv: 536, intlPv: 389, intlUv: 191, actions: 79, errors: 4 },
      { id: "TRAFFIC-0814", date: "08-14", zhPv: 1296, zhUv: 552, intlPv: 402, intlUv: 198, actions: 83, errors: 2 },
      { id: "TRAFFIC-0815", date: "08-15", zhPv: 1378, zhUv: 581, intlPv: 426, intlUv: 207, actions: 91, errors: 6 },
      { id: "TRAFFIC-0816", date: "08-16", zhPv: 1046, zhUv: 451, intlPv: 334, intlUv: 166, actions: 65, errors: 3 },
      { id: "TRAFFIC-0817", date: "08-17", zhPv: 978, zhUv: 424, intlPv: 318, intlUv: 158, actions: 59, errors: 2 },
      { id: "TRAFFIC-0818", date: "08-18", zhPv: 1442, zhUv: 604, intlPv: 451, intlUv: 218, actions: 98, errors: 7 },
      { id: "TRAFFIC-0819", date: "08-19", zhPv: 1516, zhUv: 628, intlPv: 478, intlUv: 229, actions: 106, errors: 4 }
    ],
    trafficPages: [
      { id: "PAGE-PRODUCT-DETAIL-ZH", site: "中文站", module: "产品中心", pageType: "产品详情页", page: "product-detail.html?pn={完整料号}", objectRule: "完整料号 pn", pv: 1840, uv: 803, actions: 312, actionRate: "38.9%", errors: 2, valueScore: 91 },
      { id: "PAGE-PRODUCT-CENTER-ZH", site: "中文站", module: "产品中心", pageType: "产品筛选页", page: "product-center.html", objectRule: "产品线/系列/筛选参数", pv: 1326, uv: 647, actions: 486, actionRate: "75.1%", errors: 1, valueScore: 88 },
      { id: "PAGE-APP-TERMINAL-ZH", site: "中文站", module: "应用中心", pageType: "应用终端详情", page: "application-*.html?terminal={终端ID}", objectRule: "应用领域ID＋终端ID", pv: 986, uv: 462, actions: 171, actionRate: "37.0%", errors: 0, valueScore: 84 },
      { id: "PAGE-LIFE-ZH", site: "中文站", module: "设计工具", pageType: "寿命推算工具", page: "design-life-calc.html", objectRule: "工具ID＋产品线＋工况", pv: 742, uv: 318, actions: 72, actionRate: "22.6%", errors: 1, valueScore: 82 },
      { id: "PAGE-CAD-ZH", site: "中文站", module: "设计工具", pageType: "3D-CAD模型", page: "design-3d-cad.html", objectRule: "CAD模型ID＋完整料号", pv: 681, uv: 296, actions: 61, actionRate: "20.6%", errors: 1, valueScore: 79 },
      { id: "PAGE-NEWS-DETAIL-ZH", site: "中文站", module: "服务支持", pageType: "新闻详情", page: "support-news-detail.html?id={内容ID}", objectRule: "稳定内容ID", pv: 624, uv: 351, actions: 74, actionRate: "21.1%", errors: 0, valueScore: 76 },
      { id: "PAGE-DOWNLOAD-ZH", site: "中文站", module: "服务支持", pageType: "下载中心", page: "support-download.html", objectRule: "资源ID＋资料类型", pv: 519, uv: 247, actions: 126, actionRate: "51.0%", errors: 2, valueScore: 78 },
      { id: "PAGE-HOME-ZH", site: "中文站", module: "首页", pageType: "中文首页", page: "index.html", objectRule: "Banner ID＋入口ID", pv: 2148, uv: 1126, actions: 286, actionRate: "25.4%", errors: 0, valueScore: 86 },
      { id: "PAGE-HOME-INTL", site: "国际站", module: "首页", pageType: "英文首页", page: "index-en.html", objectRule: "Banner ID＋入口ID＋语言", pv: 846, uv: 429, actions: 91, actionRate: "21.2%", errors: 0, valueScore: 75 },
      { id: "PAGE-PRODUCT-DETAIL-INTL", site: "国际站", module: "产品中心", pageType: "产品详情页", page: "product-detail.html?pn={完整料号}&lang={语言}", objectRule: "完整料号 pn＋语言", pv: 712, uv: 338, actions: 109, actionRate: "32.2%", errors: 1, valueScore: 81 },
      { id: "PAGE-APP-INTL", site: "国际站", module: "应用中心", pageType: "应用终端详情", page: "application-*.html?lang={语言}", objectRule: "应用领域ID＋终端ID＋语言", pv: 438, uv: 214, actions: 63, actionRate: "29.4%", errors: 0, valueScore: 72 },
      { id: "PAGE-INQUIRY-INTL", site: "国际站", module: "应用中心", pageType: "应用咨询表单", page: "application-center.html?lang={语言}#inquiry", objectRule: "表单类型＋来源页＋语言", pv: 206, uv: 151, actions: 27, actionRate: "17.9%", errors: 0, valueScore: 69 }
    ],
    trafficChannels: [
      { id: "CHANNEL-ORGANIC", name: "自然搜索", zhUsers: 2914, intlUsers: 786, share: "41%", quality: "高", note: "搜索词与落地页可继续关联" },
      { id: "CHANNEL-DIRECT", name: "直接访问", zhUsers: 1842, intlUsers: 468, share: "25%", quality: "中", note: "含收藏、输入网址及无法识别来源" },
      { id: "CHANNEL-REFERRAL", name: "外部网站", zhUsers: 1026, intlUsers: 391, share: "16%", quality: "高", note: "行业媒体、合作伙伴与商城入口" },
      { id: "CHANNEL-AI", name: "AI平台推荐", zhUsers: 438, intlUsers: 227, share: "8%", quality: "高", note: "ChatGPT、豆包、元宝等真实点击" },
      { id: "CHANNEL-SOCIAL", name: "社交与企业微信", zhUsers: 596, intlUsers: 92, share: "7%", quality: "中", note: "公众号、企业微信及社媒分享" },
      { id: "CHANNEL-OTHER", name: "其他", zhUsers: 248, intlUsers: 78, share: "3%", quality: "待识别", note: "需继续补充UTM与来源规则" }
    ],
    trafficEvents: [
      { id: "EVENT-SEARCH", event: "product_search", name: "产品料号/参数搜索", module: "产品中心", count: 486, users: 352, valueLevel: "核心行为", crmLink: "否" },
      { id: "EVENT-FILTER", event: "product_filter", name: "产品筛选条件使用", module: "产品中心", count: 359, users: 274, valueLevel: "核心行为", crmLink: "否" },
      { id: "EVENT-COMPARE", event: "product_compare", name: "加入产品对比", module: "产品中心", count: 118, users: 93, valueLevel: "高价值行为", crmLink: "否" },
      { id: "EVENT-PDF", event: "product_pdf_download", name: "产品PDF下载", module: "产品中心", count: 126, users: 101, valueLevel: "高价值行为", crmLink: "可选" },
      { id: "EVENT-LIFE", event: "life_calc_complete", name: "寿命推算完成", module: "设计工具", count: 72, users: 58, valueLevel: "高价值行为", crmLink: "验证记录" },
      { id: "EVENT-CAD", event: "cad_download_or_request", name: "CAD下载/申请", module: "设计工具", count: 61, users: 49, valueLevel: "高价值行为", crmLink: "申请关联" },
      { id: "EVENT-GUIDE", event: "application_guide_download", name: "应用选型指南下载", module: "应用中心", count: 89, users: 74, valueLevel: "高价值行为", crmLink: "可选" },
      { id: "EVENT-INQUIRY", event: "inquiry_submit", name: "咨询/招聘/采购表单提交", module: "全站表单", count: 31, users: 31, valueLevel: "转化行为", crmLink: "必须" }
    ],
    trafficAlerts: [
      { id: "ALERT-404-OLD-PRODUCT", level: "高", type: "404", site: "中文站", url: "/products/detail?id=VMM0251V221M0608", sourcePage: "外部旧链接", hits: 18, lastSeen: "2026-08-19 14:22", owner: "数字智能部", suggestion: "配置旧产品详情地址到新料号详情页的301规则", status: "待处理" },
      { id: "ALERT-404-SPARAM", level: "高", type: "404", site: "中文站", url: "/design-s-parameter.html", sourcePage: "历史收藏/外部引用", hits: 7, lastSeen: "2026-08-19 12:48", owner: "数字智能部", suggestion: "跳转至设计工具总览或返回明确的下线说明", status: "待处理" },
      { id: "ALERT-ASSET-SDA", level: "中", type: "资源异常", site: "全站", url: "/assets/products/SDA-thumb.webp", sourcePage: "产品中心SDA系列", hits: 6, lastSeen: "2026-08-19 11:36", owner: "产品运营", suggestion: "检查系列产品图文件和资源ID", status: "观察中" },
      { id: "ALERT-CAD-API", level: "中", type: "接口异常", site: "国际站", url: "/api/cad/models?lang=en", sourcePage: "3D-CAD模型页", hits: 2, lastSeen: "2026-08-19 10:06", owner: "数字智能部", suggestion: "检查CAD接口超时和国际站缓存", status: "观察中" },
      { id: "ALERT-LINK-GUIDE", level: "低", type: "内部链接", site: "中文站", url: "/downloads/auto-guide-v1.pdf", sourcePage: "汽车电子应用页", hits: 3, lastSeen: "2026-08-18 17:42", owner: "内容运营", suggestion: "应用中心应改为引用下载中心当前资源ID", status: "已解决" }
    ],
    trafficLanguages: [
      { id: "LANGTRAFFIC-ZH", language: "简体中文", users: 7046, pv: 15865, actions: 876, conversionRate: "12.4%" },
      { id: "LANGTRAFFIC-EN", language: "English", users: 2182, pv: 4968, actions: 312, conversionRate: "14.3%" },
      { id: "LANGTRAFFIC-DE", language: "Deutsch", users: 326, pv: 681, actions: 38, conversionRate: "11.7%" },
      { id: "LANGTRAFFIC-ES", language: "Español", users: 294, pv: 604, actions: 31, conversionRate: "10.5%" },
      { id: "LANGTRAFFIC-JA", language: "日本語", users: 251, pv: 532, actions: 28, conversionRate: "11.2%" },
      { id: "LANGTRAFFIC-OTHER", language: "其他语言", users: 578, pv: 1146, actions: 54, conversionRate: "9.3%" }
    ],
    trafficKeywords: [
      { id: "KEY-ZH-01", site: "中文站", keyword: "超级电容 BBU", users: 186, clicks: 142, landingPage: "AI服务器与数据中心", conversionRate: "18.3%" },
      { id: "KEY-ZH-02", site: "中文站", keyword: "VMM 贴片电容", users: 154, clicks: 119, landingPage: "VMM系列产品", conversionRate: "16.8%" },
      { id: "KEY-ZH-03", site: "中文站", keyword: "铝电解电容寿命计算", users: 131, clicks: 96, landingPage: "寿命推算工具", conversionRate: "21.4%" },
      { id: "KEY-EN-01", site: "国际站", keyword: "supercapacitor for BBU", users: 98, clicks: 72, landingPage: "AI Server & Data Center", conversionRate: "19.1%" },
      { id: "KEY-EN-02", site: "国际站", keyword: "YMIN VMM capacitor", users: 76, clicks: 58, landingPage: "VMM Series", conversionRate: "17.2%" }
    ],
    trafficDevices: [
      { id: "DEVICE-ZH-PC", site: "中文站", name: "桌面端", users: 5361, share: "76.1%" },
      { id: "DEVICE-ZH-MOBILE", site: "中文站", name: "移动端", users: 1685, share: "23.9%" },
      { id: "DEVICE-EN-PC", site: "国际站", name: "Desktop", users: 2341, share: "64.5%" },
      { id: "DEVICE-EN-MOBILE", site: "国际站", name: "Mobile", users: 1289, share: "35.5%" }
    ],
    trafficRegions: [
      { id: "REGION-ZH-EAST", site: "中文站", name: "华东", users: 2864, share: "40.6%" },
      { id: "REGION-ZH-SOUTH", site: "中文站", name: "华南", users: 1732, share: "24.6%" },
      { id: "REGION-ZH-OTHER", site: "中文站", name: "其他地区", users: 2450, share: "34.8%" },
      { id: "REGION-EN-ASIA", site: "国际站", name: "Asia", users: 1428, share: "39.3%" },
      { id: "REGION-EN-EU", site: "国际站", name: "Europe", users: 1058, share: "29.1%" },
      { id: "REGION-EN-AMERICA", site: "国际站", name: "Americas & Others", users: 1144, share: "31.6%" }
    ],
    trafficVisitors: [
      { id: "VISITOR-ZH-NEW", site: "中文站", name: "新访客", users: 4370, share: "62.0%", actionRate: "10.8%" },
      { id: "VISITOR-ZH-RETURN", site: "中文站", name: "回访用户", users: 2676, share: "38.0%", actionRate: "15.6%" },
      { id: "VISITOR-EN-NEW", site: "国际站", name: "New Visitors", users: 2468, share: "68.0%", actionRate: "12.4%" },
      { id: "VISITOR-EN-RETURN", site: "国际站", name: "Returning Visitors", users: 1162, share: "32.0%", actionRate: "18.1%" }
    ],
    contentMetrics: [
      { id: "CONTENT-METRIC-ART-001-ZH", site: "中文站", contentId: "CONTENT-001", type: "文章", title: "汽车电子电源系统的电容选型要点", pv: 624, uv: 351, avgDuration: "03:18", searchEntrances: 126, relatedClicks: 74, helpfulRate: "—" },
      { id: "CONTENT-METRIC-ART-002-ZH", site: "中文站", contentId: "CONTENT-002", type: "文章", title: "AI服务器BBU备用电源中的超级电容应用", pv: 518, uv: 286, avgDuration: "03:46", searchEntrances: 114, relatedClicks: 83, helpfulRate: "—" },
      { id: "CONTENT-METRIC-FAQ-001-ZH", site: "中文站", contentId: "FAQ-001", type: "FAQ", title: "汽车电子电容选型时需要重点关注哪些参数？", pv: 276, uv: 204, avgDuration: "01:22", searchEntrances: 92, relatedClicks: 31, helpfulRate: "91%" },
      { id: "CONTENT-METRIC-ART-001-EN", site: "国际站", contentId: "CONTENT-001", type: "Article", title: "Capacitor Selection for Automotive Power Systems", pv: 214, uv: 138, avgDuration: "02:54", searchEntrances: 61, relatedClicks: 29, helpfulRate: "—" },
      { id: "CONTENT-METRIC-FAQ-001-EN", site: "国际站", contentId: "FAQ-001", type: "FAQ", title: "What parameters matter most for automotive capacitors?", pv: 107, uv: 81, avgDuration: "01:09", searchEntrances: 34, relatedClicks: 12, helpfulRate: "88%" }
    ],
    trafficFoundation: [
      { id: "FOUNDATION-PAGE", layer: "页面注册表", current: "41个静态入口＋动态详情规则", key: "页面文件、页面类型、站点、语言、所属模块", source: "新官网前端页面清单", status: "已建立" },
      { id: "FOUNDATION-OBJECT", layer: "业务对象映射", current: "产品/系列/终端/文章/资源/工具", key: "完整料号、系列代码、终端ID、内容ID、资源ID、工具ID", source: "CRM＋官网后台稳定ID", status: "需正式对接" },
      { id: "FOUNDATION-EVENT", layer: "关键行为字典", current: "8类核心事件", key: "搜索、筛选、对比、下载、计算、CAD、指南、表单", source: "前端埋点＋CRM回传", status: "已建立" },
      { id: "FOUNDATION-SOURCE", layer: "流量与质量来源", current: "访问/日志/搜索/AI/CRM", key: "百度统计或统一埋点、服务器日志、搜索词、AI来源、CRM转化", source: "多数据源汇总", status: "沿用原基座" },
      { id: "FOUNDATION-CACHE", layer: "周期快照与预警", current: "日报、周报、月报", key: "周期缓存、页面价值、质量检查、告警规则", source: "流量分析智能体", status: "沿用并改页面规则" }
    ],
    languagePacks: languages.map(function (name, index) {
      return { id: "LANG-" + index, name: name, base: index === 0 ? "中文模板" : index === 1 ? "确认英文页面" : "英文页面结构", coverage: index < 2 ? "100%" : index === 10 ? "78%" : "92%", rtl: name === "العربية" ? "是" : "否", reviewer: index < 2 ? "人工确认" : "待抽检", status: index < 2 ? "已发布" : "草稿" };
    }),
    permissions: [
      { id: "ROLE-ZH-OPS", name: "中文官网运营人员", users: 3, modules: "中文首页、中文内容、共享产品/应用/资源、中文专属页面", productLines: "全部", actions: "维护中文内容；查看共享数据；按授权维护共享关系", status: "正常" },
      { id: "ROLE-INTL-OPS", name: "国际官网运营人员", users: 3, modules: "国际版首页、英文内容、共享产品/应用/资源、国际咨询", productLines: "全部", actions: "维护英文内容；查看共享数据；按授权维护共享关系", status: "正常" }
    ],
    logs: [
      { id: "LOG-001", time: "2026-08-11 13:46:22", user: "王傑维", module: "内容关联", action: "新增映射", target: "ART-002 → TERM-AI-BBU", result: "成功", ip: "10.10.18.26" },
      { id: "LOG-002", time: "2026-08-11 13:18:09", user: "系统任务", module: "下载中心", action: "资源引用检查", target: "全部公开资源", result: "成功", ip: "system" },
      { id: "LOG-003", time: "2026-08-11 11:32:45", user: "内容运营", module: "新闻资讯", action: "保存文章", target: "ART-003", result: "成功", ip: "10.10.18.42" }
    ]
  };

  const moduleConfigs = {
    dashboard: { kind: "dashboard", title: "运营工作台", group: "工作台", description: "" },
    trafficAnalytics: { kind: "traffic-analytics", title: "流量分析", group: "工作台", description: "访问趋势、页面表现、用户行为与网站异常。" },
    pageMap: { kind: "table", dataset: "pageMap", title: "全站页面定位", group: "前端页面管理", description: "按页面文件定位前台入口、后台维护模块和维护边界，供后续页面调整时查询。", columns: [["file","页面文件/入口"],["name","页面名称"],["dataSource","动态数据来源"],["backend","日常运营入口"],["boundary","维护边界"],["status","定位状态"]], readonly: true },
    homepages: { kind: "table", dataset: "homepage", title: "首页结构与发布记录", group: "前端页面管理", description: "记录中文首页和国际版首页的结构版本，供IT预览、发布和回退；状态只区分编辑中、当前版本和历史版本。", columns: [["name","页面"],["version","结构版本"],["blocks","固定模块"],["status","版本状态"],["updatedAt","更新时间"]], fields: [fields.name,{key:"version",label:"结构版本",type:"text"},{key:"blocks",label:"固定模块",type:"textarea",full:true},{key:"status",label:"版本状态",type:"select",required:true,options:["编辑中","当前版本","历史版本"]},fields.updatedAt] },
    banners: { kind: "table", dataset: "banners", title: "首页轮播图", group: "日常运营", description: "中文运营只维护中文首页Banner，英文运营只维护国际版首页Banner；图片、文案和跳转分别保存，账号不能跨站点切换语言。", columns: [["title","轮播标题"],["scene","场景"],["language","内容版本"],["link","跳转"],["leftPanel","左侧功能区"],["sort","排序"],["status","状态"]], fields: [fields.title,{key:"scene",label:"场景",type:"select",options:["产品组合","无人机","机器人","Industrial Robotics","Smart Automotive","AI Data Center"]},fields.language,{key:"image",label:"轮播图片",type:"file",full:true},{key:"link",label:"跳转地址",type:"text",full:true},{key:"leftPanel",label:"左侧功能区",type:"select",required:true,options:["显示","隐藏"],help:"绑定当前Banner记录；调整排序后设置仍随该Banner生效"},fields.sort,fields.status] },
    homepageStats: { kind: "table", dataset: "homepageStats", title: "首页数据指标", group: "日常运营", fixedPage: true, description: "首页固定展示四项数据指标；点击编辑修改数字、说明或顺序后直接保存。", columns: [["value","展示数值"],["label","说明文字"],["language","语言"],["sort","排序"],["updatedAt","更新时间"]], fields: [{key:"value",label:"展示数值",type:"text",required:true,help:"例如：20+、8、9、5"},{key:"label",label:"说明文字",type:"text",required:true,full:true,help:"例如：年行业经验、大电容器产品线"},fields.language,fields.sort] },
    homepageProductCards: { kind: "table", dataset: "homepageProductCards", title: "首页产品线卡片", group: "日常运营", fixedPage: true, description: "首页固定展示八大产品线卡片；点击编辑修改图片、展示名称、简介或顺序后直接保存。", columns: [["displayName","展示名称"],["productLine","绑定产品线"],["summary","卡片简介"],["image","产品图片"],["language","语言"],["sort","排序"]], fields: [{key:"productLine",label:"绑定产品线",type:"select",options:productLines,required:true,help:"用于跳转产品中心的筛选条件，不建议随意修改"},{key:"displayName",label:"展示名称",type:"text",required:true,full:true},{key:"summary",label:"卡片简介",type:"textarea",full:true},{key:"image",label:"产品图片",type:"file",full:true},fields.language,fields.sort] },
    homepageApplicationCards: { kind: "table", dataset: "homepageApplicationCards", title: "英文首页应用卡片", group: "日常运营", fixedPage: true, directSave: true, description: "仅用于国际版首页。英文运营可维护九张应用卡片的图片、英文名称、说明和排序；绑定的应用领域与页面地址固定读取应用中心。中文首页继续直接读取应用中心，不在首页重复维护。", columns: [["displayName","英文名称"],["applicationName","绑定应用领域"],["summary","卡片说明"],["image","卡片图片"],["sort","排序"],["updatedAt","更新时间"]], fields: [{key:"applicationName",label:"绑定应用领域",type:"text",readonly:true,full:true},{key:"displayName",label:"英文显示名称",type:"text",required:true,full:true},{key:"summary",label:"英文说明",type:"textarea",required:true,full:true},{key:"image",label:"卡片图片",type:"file",required:true,full:true,help:"替换后只影响国际版首页，不修改应用中心卡片图片"},{key:"link",label:"应用页面地址",type:"text",readonly:true,full:true,help:"固定读取绑定应用领域的详情页，不在此修改"},{key:"sort",label:"展示顺序",type:"number",required:true,help:"数值越小越靠前"}] },
    newsFeaturedArticles: { kind: "table", dataset: "newsFeaturedArticles", title: "新闻中心重点文章", group: "服务支持", createLabel: "选择重点文章", selectionList: true, description: "每种语言最多选择三篇已发布文章组成新闻中心重点轮播。添加后直接生效，不设置草稿或下架；不再展示时点击移出轮播。", columns: [["articleId","重点文章"],["language","新闻中心语言"],["sort","轮播顺序"],["updatedAt","更新时间"]], lookups: { articleId: { dataset: "articles", valueKey: "id", labelKeys: ["id","title"], separator: "｜" } }, maxPerLanguage: 3, fields: [{key:"articleId",label:"选择已发布文章",type:"select",required:true,full:true,optionsSource:{dataset:"articles",valueKey:"id",labelKeys:["id","title"],separator:"｜",filters:[{key:"status",equals:"已发布"},{key:"channels",includes:"新闻资讯"}]},help:"标题、摘要、封面和跳转链接自动读取所选文章"},fields.language,{key:"sort",label:"轮播顺序",type:"number",required:true,help:"填写1、2或3；数值越小越靠前"}] },
    navigation: { kind: "table", dataset: "navigation", title: "导航栏", group: "全站组件", description: "中文官网与国际官网共用一套主导航结构。可维护栏目名称、下拉内容、页面地址、排序和显示状态。", columns: [["name","栏目"],["children","下拉内容"],["link","页面地址"],["sort","排序"],["status","前台显示"]], fields: [fields.name,{key:"children",label:"下拉内容",type:"textarea",full:true},{key:"link",label:"页面地址",type:"text",full:true},fields.sort,{key:"status",label:"前台显示",type:"select",required:true,options:["显示","隐藏"]}] },
    footers: { kind: "table", dataset: "footers", title: "页脚", group: "全站组件", fixedPage: true, directSave: true, description: "中文官网与国际官网的页脚分别维护。网站导航和产品栏目可各自配置，右侧联系信息、二维码或社交媒体按站点独立保存。", columns: [["site","站点"],["rightTitle","右侧区域"],["rightExtraType","右下内容"],["updatedAt","更新时间"]], fields: [{key:"site",label:"站点",type:"text",readonly:true},{key:"language",label:"内容版本",type:"select",options:maintainedLanguages},{key:"navigationTitle",label:"导航区标题",type:"text",required:true},{key:"navigationLinks",label:"导航区链接（每行：名称｜地址）",type:"textarea",required:true,full:true},{key:"productTitle",label:"产品区标题",type:"text",required:true},{key:"productLinks",label:"产品区链接（每行：名称｜地址）",type:"textarea",required:true,full:true},{key:"aboutTitle",label:"关于区标题",type:"text",required:true},{key:"aboutLinks",label:"关于区链接（每行：名称｜地址）",type:"textarea",required:true,full:true},{key:"rightTitle",label:"右侧区域标题",type:"text",required:true,full:true},{key:"hotline",label:"产品服务热线",type:"text",full:true,languages:["简体中文"]},{key:"domesticEmail",label:"国内业务 / China Sales 邮箱",type:"email",full:true},{key:"internationalEmail",label:"国外业务 / International Sales 邮箱",type:"email",full:true},{key:"switchboard",label:"公司总机",type:"text",full:true,languages:["简体中文"]},{key:"address",label:"联系地址",type:"textarea",required:true,full:true},{key:"addressUrl",label:"地址跳转链接",type:"url",full:true,languages:["English"]},{key:"rightExtraType",label:"右下内容类型",type:"text",readonly:true},{key:"serviceQr",label:"服务号二维码图片",type:"file",full:true,languages:["简体中文"]},{key:"serviceQrCaption",label:"服务号二维码说明",type:"text",full:true,languages:["简体中文"]},{key:"douyinQr",label:"抖音号二维码图片",type:"file",full:true,languages:["简体中文"]},{key:"douyinQrCaption",label:"抖音号二维码说明",type:"text",full:true,languages:["简体中文"]},{key:"facebookUrl",label:"Facebook链接",type:"url",full:true,languages:["English"]},{key:"xUrl",label:"X链接",type:"url",full:true,languages:["English"]},{key:"youtubeUrl",label:"YouTube链接",type:"url",full:true,languages:["English"]},{key:"linkedinUrl",label:"LinkedIn链接",type:"url",full:true,languages:["English"]},{key:"copyright",label:"版权文字",type:"text",required:true,full:true},{key:"privacyLabel",label:"隐私政策显示文字",type:"text"},{key:"privacyUrl",label:"隐私政策链接",type:"url"},{key:"termsLabel",label:"使用条款显示文字",type:"text"},{key:"termsUrl",label:"使用条款链接",type:"url"}] },
    frontendChanges: { kind: "table", dataset: "frontendChanges", title: "前端修改需求", group: "前端页面管理", description: "记录样式、页面结构、固定文案和交互逻辑的修改需求，并标明准确页面及关联代码文件，供IT处理。", columns: [["page","页面"],["file","页面文件"],["section","具体位置"],["type","修改类型"],["request","修改要求"],["codeFiles","关联代码"],["owner","处理人"],["status","处理状态"],["updatedAt","更新时间"]], fields: [{key:"page",label:"页面名称",type:"text",required:true},{key:"file",label:"页面文件/地址",type:"text",required:true},{key:"section",label:"页面具体位置",type:"text",required:true},{key:"type",label:"修改类型",type:"select",options:["页面结构","样式调整","固定文案","跳转与交互","全站组件"],required:true},{key:"request",label:"修改要求",type:"textarea",full:true,required:true},{key:"attachment",label:"参考截图/附件",type:"file",full:true},{key:"codeFiles",label:"关联代码文件",type:"textarea",full:true},{key:"owner",label:"处理人",type:"text"},{key:"status",label:"处理状态",type:"select",required:true,options:["待开发","处理中","已完成"]}] },
    products: { kind: "product-master", dataset: "products", title: "产品主数据（CRM系统）", group: "产品中心", description: "按事业部确认的字段模板展示CRM产品数据。每个料号固定显示所属产品线全部字段，空值保留；官网后台只读。", columns: [["itemNo","完整料号"],["productLine","产品线"],["series","系列"],["package","封装/形状"],["lifecycle","全生命周期状态"],["fieldStatus","字段完整度"],["updatedAt","同步时间"]], readonly: true, viewable: true, previewLabel: "查看全部字段", exportLabel: "导出全部产品数据", fieldTemplates: productFieldTemplates },
    productAiKeywords: { kind: "ai-keywords", dataset: "productAiKeywords", title: "AI搜索关键词", group: "产品中心", description: "按完整料号维护隐藏搜索关键词，支持批量导出、补充和导入。是否调用由CRM当前同步料号自动决定。", columns: [["itemNo","完整料号"],["productLine","产品线"],["series","系列"],["aiKeywords","AI搜索关键词（隐藏）"],["callStatus","CRM调用状态"],["updatedAt","更新时间"]], fields: [{key:"itemNo",label:"完整料号",type:"text",readonly:true,required:true},{key:"productLine",label:"产品线",type:"text",readonly:true},{key:"series",label:"系列",type:"text",readonly:true},{key:"aiKeywords",label:"AI搜索关键词（隐藏）",type:"textarea",full:true,help:"多个关键词建议使用英文逗号分隔"}] },
    shopLinks: { kind: "table", dataset: "shopLinks", title: "商城商品匹配", group: "产品中心", description: "商城系统同步上架商品，官网以完整料号精确匹配同料号商品链接。一个永铭料号可以对应多个商城平台；官网不人工拼接链接。", columns: [["itemNo","永铭完整料号"],["platform","商城平台"],["externalSku","商城商品编号"],["listingStatus","上架状态"],["syncStatus","匹配状态"],["source","数据来源"],["updatedAt","同步时间"]], readonly: true, viewable: true, exportLabel: "导出匹配结果" },
    series: { kind: "table", dataset: "series", title: "系列公共资料", group: "产品中心", description: "产品图片、系列规格书PDF、编码规则、特性标签、产品尺寸图和纹波电流与频率条件图均按系列维护。CRM当前同步的同系列料号自动调用；没有同步料号时资料保留但前台不调用。", columns: [["code","系列代码"],["name","系列名称"],["productLine","产品线"],["image","产品图"],["pdf","系列规格书"],["dimensionImage","产品尺寸图"],["rippleImage","纹波/频率条件图"],["tags","特性标签"],["crmProducts","CRM关联产品"],["callStatus","调用状态"]], fields: [{key:"code",label:"系列代码",type:"text",required:true},{key:"name",label:"系列名称",type:"text",required:true},{key:"productLine",label:"产品线",type:"select",options:productLines,required:true},{key:"imageFile",label:"系列产品图片",type:"file",full:true,help:"产品详情页主图；同系列全部料号共用"},{key:"pdfFile",label:"系列规格书PDF",type:"file",full:true,help:"产品详情页“产品PDF下载”；替换后同系列全部料号同步"},{key:"codingRuleFile",label:"编码规则文件",type:"file",full:true},{key:"dimensionImageFile",label:"产品尺寸图",type:"file",full:true,help:"系列技术图片之一，与具体料号的尺寸数值分开维护"},{key:"rippleImageFile",label:"纹波电流与频率条件图",type:"file",full:true,help:"系列技术图片之一；同系列全部料号共用"},{key:"tags",label:"特性标签",type:"textarea",full:true,help:"CRM当前同步的同系列料号自动继承"}] },
    replacements: { kind: "table", dataset: "replacements", title: "替代料关系", group: "产品中心", description: "只维护经业务确认的同行完整料号与永铭完整料号映射，不用相似料号代替。", columns: [["brand","同行品牌"],["competitorNo","同行完整料号"],["yminNo","永铭替代料号"],["difference","差异说明"],["reviewer","确认部门"],["status","关系状态"],["updatedAt","更新时间"]], fields: [{key:"brand",label:"同行品牌",type:"text",required:true},{key:"competitorNo",label:"同行完整料号",type:"text",required:true},{key:"yminNo",label:"永铭替代料号",type:"text",required:true},{key:"difference",label:"差异说明",type:"textarea",full:true},{key:"reviewer",label:"确认部门",type:"text"},{key:"status",label:"关系状态",type:"select",required:true,options:["待确认","有效","停用"]}] },
    applicationOverview: { kind: "table", dataset: "applicationOverview", title: "应用中心总览页", group: "应用中心", uniqueKey: "language", fixedPage: true, description: "对应 application-center.html 的标题区、应用领域标题、热门终端标题和技术资源区。九大应用卡片、热门终端和设计工具展示分别在对应模块维护。", columns: [["title","页面标题"],["language","内容版本"],["featuredResourceId","技术资源"],["updatedAt","更新时间"]], lookups: { featuredResourceId: { dataset: "downloads", valueKey: "id", labelKeys: ["title"], separator: "｜" } }, fields: [fields.title,{key:"introduction",label:"页面介绍",type:"textarea",full:true,required:true},{key:"applicationSectionTitle",label:"应用领域分区标题",type:"text",required:true,full:true},{key:"hotSectionTitle",label:"热门终端分区标题",type:"text",required:true,full:true},{key:"featuredResourceId",label:"技术资源（标题、说明和文件均读取下载中心）",type:"select",full:true,optionsSource:{dataset:"downloads",valueKey:"id",labelKeys:["title","version"],separator:"｜",filters:[{key:"status",equals:"已发布"}]}},fields.language] },
    applications: { kind: "table", dataset: "applications", title: "应用领域卡片", group: "应用中心", fixedPage: true, description: "对应 application-center.html 的九张应用卡片。卡片图标为前端固定样式，不在日常运营中上传；这里仅维护前端实际展示的简介、标签、底部文字和排序。", columns: [["name","应用领域"],["tabs","应用模块"],["terminals","终端"],["guides","指南"],["sort","排序"],["updatedAt","更新时间"]], fields: [fields.name,{key:"summary",label:"卡片简介",type:"textarea",full:true},{key:"tags",label:"特性标签",type:"textarea",full:true,help:"多个标签使用英文逗号分隔"},{key:"cardNote",label:"卡片底部补充文字",type:"text",full:true},fields.sort] },
    applicationHighlights: { kind: "table", dataset: "applicationHighlights", title: "总览页热门终端", group: "应用中心", createLabel: "添加展示终端", selectionList: true, description: "对应 application-center.html 的热门终端入口。终端从“终端详情与模板”中选择，图标为前端固定样式；添加后直接生效，不再展示时点击移出总览。", columns: [["terminalId","选择的终端"],["displayTitle","总览页显示名称"],["language","内容版本"],["sort","排序"]], lookups: { terminalId: { dataset: "terminals", valueKey: "id", labelKeys: ["field","tab","name"], separator: "｜" } }, fields: [{key:"terminalId",label:"从终端详情选择",type:"select",required:true,full:true,optionsSource:{dataset:"terminals",valueKey:"id",labelKeys:["field","tab","name"],separator:"｜",filters:[{key:"status",equals:"已发布"}]}},{key:"displayTitle",label:"总览页显示名称（可选）",type:"text",full:true,help:"不填写时读取终端详情中的终端名称；英文版可在此填写英文显示名称"},{key:"shortText",label:"补充说明（可选）",type:"text",full:true},fields.language,fields.sort] },
    applicationToolHighlights: { kind: "table", dataset: "applicationToolHighlights", title: "总览页设计工具", group: "应用中心", createLabel: "添加展示工具", selectionList: true, description: "对应 application-center.html 底部四个设计工具入口。先选择设计工具主档，再维护该入口实际展示的名称和短说明；链接始终读取工具主档。", columns: [["toolId","选择的工具"],["displayName","前端显示名称"],["shortText","前端短说明"],["language","内容版本"],["sort","排序"]], lookups: { toolId: { dataset: "tools", valueKey: "id", labelKeys: ["name","link"], separator: "｜" } }, fields: [{key:"toolId",label:"从设计工具选择",type:"select",required:true,full:true,optionsSource:{dataset:"tools",valueKey:"id",labelKeys:["name","link"],separator:"｜",filters:[{key:"status",equals:"已发布"}]}},{key:"displayName",label:"前端显示名称",type:"text",required:true,full:true},{key:"shortText",label:"前端短说明",type:"textarea",required:true,full:true},fields.language,fields.sort] },
    terminals: { kind: "table", dataset: "terminals", title: "终端详情与模板", group: "应用中心", description: "终端只使用两种模板：电解电容模板展示功能拓扑图，超级电容模板展示应用实物图。", columns: [["field","应用领域"],["tab","应用模块"],["name","终端"],["template","模板"],["topology","拓扑区域"],["recommended","推荐料号"],["news","推荐新闻"],["status","状态"]], fields: [{key:"field",label:"应用领域",type:"select",options:applicationFields,required:true},{key:"tab",label:"应用模块",type:"text",required:true},{key:"name",label:"终端名称",type:"text",required:true},{key:"template",label:"展示模板",type:"select",options:["电解电容模板","超级电容模板"],required:true},{key:"topology",label:"拓扑区域内容",type:"select",options:["功能拓扑图","应用实物图"]},{key:"image",label:"拓扑/应用图片",type:"file",full:true},{key:"advantage",label:"优势介绍",type:"textarea",full:true},fields.status] },
    appProducts: { kind: "app-products", dataset: "appProducts", title: "终端推荐料号", group: "应用中心", description: "以终端为单位只添加永铭完整料号；支持输入、粘贴和产品中心候选提示。添加顺序自动作为前台排序，保存后默认发布，九项展示参数实时读取产品中心。", columns: [["terminal","应用终端"],["itemNo","完整料号"],["voltageDisplay","电压"],["capacitanceDisplay","容量"],["temperatureDisplay","工作温度"],["lifeDisplay","寿命"],["dimensionsDisplay","尺寸"],["esrDisplay","ESR"],["rippleDisplay","额定纹波电流"],["lifecycle","全生命周期状态"],["productValidation","产品中心校验"]], fields: [{key:"terminal",label:"应用终端",type:"select",required:true,full:true,optionsSource:{dataset:"terminals",valueKey:"name",labelKeys:["field","tab","name"],separator:"｜",filters:[{key:"status",equals:"已发布"}]}},{key:"itemNo",label:"永铭完整料号",type:"text",required:true,full:true,help:"输入或粘贴完整料号，保存时校验产品中心已发布数据"}] },
    appGuides: { kind: "guide-links", title: "应用指南关联", group: "应用中心", description: "应用页面不上传文件，只引用下载中心已发布的应用选型手册。" },
    supportOverview: { kind: "table", dataset: "supportOverview", title: "服务支持总览页", group: "服务支持", uniqueKey: "language", fixedPage: true, description: "对应 support.html 的首屏标题和介绍。该前端页面没有首屏图片或入口区标题，因此后台不提供无对应位置的字段。", columns: [["title","首屏标题"],["language","内容版本"],["updatedAt","更新时间"]], fields: [fields.title,{key:"introduction",label:"首屏介绍",type:"textarea",full:true,required:true},fields.language] },
    supportOverviewCards: { kind: "table", dataset: "supportOverviewCards", title: "服务支持入口卡片", group: "服务支持", fixedPage: true, description: "对应 support.html 的新闻、FAQ、下载中心和合规证书四个入口。前端图标为固定样式，后台仅维护实际展示的文字、入口和排序。", columns: [["module","对应模块"],["title","显示标题"],["language","内容版本"],["sort","排序"]], fields: [{key:"module",label:"对应模块",type:"text",readonly:true},{key:"title",label:"显示标题",type:"text",required:true,full:true},{key:"summary",label:"卡片说明",type:"textarea",full:true},{key:"link",label:"固定页面地址",type:"text",readonly:true,full:true},{key:"buttonLabel",label:"入口文字",type:"text",full:true},fields.language,fields.sort] },
    articles: { kind: "table", dataset: "articles", title: "文章发布", group: "服务支持", createLabel: "发布文章", description: "在一个页面完成确认稿正文、应用中心展示范围、产品详情页相关文章和发布设置。中文与英文正文分别维护，产品和应用的关联只需维护一次；历史关联可在本页批量导入和导出。", columns: [["title","文章标题"],["type","类型"],["applications","应用中心"],["productLines","产品标签"],["publishAt","发布时间"],["language","内容版本"],["draftStatus","编辑版本"],["status","正式状态"]], fields: [] },
    articleWorkbench: { kind: "table", dataset: "articles", title: "文章发布", group: "服务支持", createLabel: "发布文章", description: "原文章关系入口已合并到文章发布页面；应用中心、产品详情页和FAQ均在文章操作中完成。", columns: [["title","文章标题"],["type","类型"],["applications","应用中心"],["productLines","产品标签"],["publishAt","发布时间"],["language","语言"],["draftStatus","编辑版本"],["status","正式状态"]], fields: [] },
    faqs: { kind: "table", dataset: "faqs", title: "FAQ知识库", group: "服务支持", description: "FAQ以文章中的问答内容为主要来源：AI提取候选、人工编辑确认、单独发布，并关联来源文章及其已经确认的产品和应用；中英文正文分别维护，产品和应用的关联只需维护一次。", columns: [["question","问题"],["sourceArticleTitle","来源文章"],["language","内容版本"],["source","生成方式"],["aiConfidence","确认状态"],["relations","已发布关联"],["status","状态"],["updatedAt","更新时间"]], fields: [{key:"question",label:"FAQ问题",type:"text",required:true,full:true},{key:"answer",label:"FAQ答案",type:"textarea",required:true,full:true},{key:"sourceExcerpt",label:"来源文章原文片段",type:"textarea",readonly:true,full:true,help:"用于人工核对AI是否忠实提取，不允许脱离原文自动编造答案"},{key:"sourceArticleId",label:"来源文章记录",type:"text",readonly:true,help:"中英文版本归到同一篇文章下，产品和应用的关联不用重复维护"},{key:"sourceArticleTitle",label:"来源文章",type:"text",readonly:true,full:true},{key:"type",label:"问题类型",type:"text"},{key:"application",label:"应用领域标签",type:"select",options:["通用"].concat(applicationFields),help:"用于知识库筛选，不代替已经确认的应用关联"},{key:"productLine",label:"产品线标签",type:"select",options:["全部"].concat(productLines),help:"用于知识库筛选，不代替已经确认的产品关联"},fields.language,{key:"source",label:"生成方式",type:"text",readonly:true},{key:"aiConfidence",label:"人工确认状态",type:"text",readonly:true},fields.status] },
    downloads: { kind: "resources", title: "下载中心", group: "服务支持", description: "所有公开资料的唯一文件来源；应用中心指南与技术资源区等页面只保存资源ID引用。" },
    compliance: { kind: "table", dataset: "compliance", title: "合规证书", group: "服务支持", description: "合规证书由CRM系统维护并同步，官网后台只查看和导出，不在此修改或上下架。", columns: [["productLine","产品线/体系"],["type","资料类型"],["reportNo","报告编号"],["agency","检测/认证机构"],["reportDate","日期"],["file","文件"],["status","CRM状态"]], readonly: true, viewable: true, exportLabel: "导出证书清单" },
    designOverview: { kind: "table", dataset: "designOverview", title: "设计工具总览页", group: "设计工具", uniqueKey: "language", fixedPage: true, description: "对应 design-tools.html 的标题区和推荐设计工作流。该前端页面没有标题区图片或工具区标题，因此后台不提供这些无对应位置的字段。", columns: [["title","页面标题"],["language","内容版本"],["updatedAt","更新时间"]], fields: [fields.title,{key:"introduction",label:"页面介绍",type:"textarea",full:true,required:true},{key:"workflowTitle",label:"工作流标题",type:"text",full:true},{key:"workflowText",label:"工作流内容",type:"textarea",full:true},fields.language] },
    tools: { kind: "table", dataset: "tools", title: "工具卡片与入口", group: "设计工具", description: "对应 design-tools.html 的四张工具卡片。卡片图标为前端固定样式，不在日常运营中上传；这里维护前端实际展示的名称、说明、标签、排序、访问策略和页面入口。", columns: [["name","工具主档"],["access","访问策略"],["records","资源/记录"],["link","页面"],["sort","排序"],["status","状态"]], fields: [{key:"name",label:"工具主档",type:"text",readonly:true},{key:"displayName",label:"卡片显示名称",type:"text",full:true},{key:"summary",label:"卡片说明",type:"textarea",full:true},{key:"tags",label:"卡片标签",type:"textarea",full:true,help:"多个标签使用英文逗号分隔"},{key:"access",label:"访问策略",type:"select",options:["公开","基本信息验证"]},{key:"link",label:"页面地址",type:"text",full:true},fields.sort,fields.status] },
    cadModels: { kind: "cad-library", dataset: "cadModels", title: "3D-CAD模型与料号映射", group: "设计工具", description: "CAD文件只维护一次，通过显式映射关联多个完整料号；支持单个或批量上传STEP模型，AI按规格生成候选映射，校验并确认后供前台调用。", columns: [["name","模型名称"],["productLine","产品线"],["package","封装形式"],["dimensions","结构尺寸"],["format","格式"],["version","版本"],["file","模型文件"],["status","状态"]], fields: [{key:"name",label:"模型名称",type:"text",required:true,full:true},{key:"productLine",label:"适用产品线",type:"select",options:productLines,required:true},{key:"package",label:"封装/结构形式",type:"text",required:true},{key:"dimensions",label:"结构尺寸",type:"text",required:true,help:"用于AI匹配和人工复核，不替代明确的料号映射"},{key:"format",label:"文件格式",type:"select",options:["STEP"],required:true},{key:"version",label:"版本",type:"text",required:true},{key:"fileUpload",label:"STEP模型文件",type:"file",accept:".step,.stp",full:true},fields.status] },
    cadRequests: { kind: "table", dataset: "cadRequests", title: "3D-CAD申请记录", group: "设计工具", description: "只读展示CRM中的3D-CAD申请、分配结果和企业微信推送状态。申请处理、负责人分配和状态更新均在CRM中完成。", columns: [["id","申请编号"],["itemNo","料号"],["applicant","申请人"],["company","公司"],["contact","联系方式"],["application","应用整机"],["receivingTeam","接收岗位"],["assignee","CRM负责人"],["crm","CRM编号"],["wecomStatus","企微推送"],["crmStatus","CRM处理状态"],["submittedAt","提交时间"]], readonly: true, viewable: true, previewLabel: "查看详情", exportLabel: "导出CRM记录" },
    spiceModels: { kind: "table", dataset: "spiceModels", title: "SPICE模型", group: "设计工具", description: "功能入口已保留，当前尚未开发且没有正式数据。后续确认文件格式与产品关联层级后再启用维护，不预置演示记录。", columns: [["series","系列"],["itemNo","适用料号"],["model","模型类型"],["software","兼容软件"],["version","版本"],["file","文件"],["status","状态"]], fields: [{key:"series",label:"系列",type:"text"},{key:"itemNo",label:"适用料号",type:"text"},{key:"model",label:"模型类型",type:"text"},{key:"software",label:"兼容软件",type:"text"},{key:"version",label:"版本",type:"text"},{key:"fileUpload",label:"模型文件",type:"file",full:true},fields.status] },
    reliability: { kind: "table", dataset: "reliability", title: "可靠性实验数据", group: "设计工具", description: "功能入口已保留，当前尚未开发且没有正式数据。后续确认报告结构与产品关联层级后再启用维护，不预置演示记录。", columns: [["title","报告名称"],["productLine","产品线"],["target","适用范围"],["conditions","试验条件"],["version","版本"],["file","文件"],["status","状态"]], fields: [fields.title,{key:"productLine",label:"产品线",type:"select",options:productLines},{key:"target",label:"适用系列/料号",type:"text"},{key:"conditions",label:"试验条件",type:"textarea",full:true},{key:"version",label:"版本",type:"text"},{key:"fileUpload",label:"报告文件",type:"file",full:true},fields.status] },
    members: { kind: "table", dataset: "members", title: "设计工具验证记录", group: "设计工具", description: "不建立会员档案，只读展示设计工具基本信息验证记录。验证规则、有效期和使用状态由CRM统一记录。", columns: [["name","姓名"],["position","职位"],["company","公司"],["country","国家/地区"],["phone","电话"],["email","邮箱"],["sourcePage","使用工具"],["crm","CRM编号"],["verification","验证状态"],["validUntil","有效期至"],["submittedAt","提交时间"]], readonly: true, viewable: true, previewLabel: "查看详情", exportLabel: "导出CRM记录" },
    leads: { kind: "table", dataset: "leads", title: "应用咨询记录", group: "应用中心", description: "只读展示CRM接收的官网应用咨询。CRM按地区、业务范围和表单来源分配对应业务员，并可同步企业微信提醒。", columns: [["type","表单类型"],["name","姓名"],["company","公司"],["country","国家/地区"],["contact","联系方式"],["sourcePage","来源页面"],["receivingTeam","接收部门"],["assignee","CRM负责人"],["crm","CRM编号"],["wecomStatus","企微推送"],["crmStatus","CRM处理状态"],["submittedAt","提交时间"]], readonly: true, viewable: true, previewLabel: "查看详情", exportLabel: "导出CRM记录" },
    jobApplications: { kind: "table", dataset: "jobApplications", title: "招聘申请记录", group: "关于永铭", description: "只读展示CRM中的职位申请和简历附件。CRM分配给人事岗位，并将新申请通过企业微信推送给招聘专员。", columns: [["jobTitle","申请岗位"],["name","姓名"],["contact","联系方式"],["resume","简历附件"],["receivingTeam","接收部门"],["assignee","CRM负责人"],["crm","CRM编号"],["wecomStatus","企微推送"],["crmStatus","CRM处理状态"],["submittedAt","提交时间"]], readonly: true, viewable: true, previewLabel: "查看详情", exportLabel: "导出CRM记录" },
    agreements: { kind: "table", dataset: "agreements", title: "条款与同意记录", group: "会员与表单", description: "条款按语言和版本留档，不使用下架状态；只区分当前生效版本和历史版本。", columns: [["title","条款"],["version","版本"],["language","语言"],["effectiveDate","生效日期"],["accepted","同意人数"],["status","版本状态"]], fields: [fields.title,{key:"version",label:"版本",type:"text"},fields.language,{key:"effectiveDate",label:"生效日期",type:"date"},{key:"content",label:"条款正文",type:"textarea",full:true},{key:"status",label:"版本状态",type:"select",required:true,options:["当前生效","历史版本"]}] },
    aboutContent: { kind: "table", dataset: "aboutContent", title: "关于永铭固定页面", group: "前端页面管理", fixedPage: true, description: "公司简介等固定页面由IT定位页面后编辑保存，不设置草稿或下架。荣誉、代理商、招聘等动态数据仍在日常运营维护。", columns: [["name","页面"],["page","前台文件"],["firstScreen","首屏样式"],["sections","内容模块"],["language","语言"],["updatedAt","更新时间"]], fields: [fields.name,{key:"headline",label:"首屏固定文案",type:"textarea",full:true},{key:"body",label:"固定页面文案",type:"textarea",full:true},fields.language] },
    aboutOverview: { kind: "table", dataset: "aboutOverview", title: "关于永铭总览页", group: "关于永铭", uniqueKey: "language", fixedPage: true, description: "对应 about.html 的标题、栏目区、企业能力、产品线区和底部联系引导；首屏背景统一在“各页面首屏背景图”维护。", columns: [["heroTitle","首屏标题"],["language","内容版本"],["updatedAt","更新时间"]], fields: [{key:"heroTitle",label:"首屏标题",type:"text",required:true,full:true},{key:"heroText",label:"首屏介绍",type:"textarea",full:true},{key:"overviewTitle",label:"栏目区标题",type:"text",full:true},{key:"overviewText",label:"栏目区说明",type:"textarea",full:true},{key:"capabilityTitle",label:"企业能力标题",type:"text",full:true},{key:"capabilityText",label:"企业能力介绍（第一段）",type:"textarea",full:true},{key:"capabilitySecondaryText",label:"企业能力介绍（第二段）",type:"textarea",full:true},{key:"capabilityBullets",label:"企业能力要点",type:"textarea",full:true,help:"每行一项，对应前端项目符号"},{key:"capabilityItems",label:"研发/制造/应用/质量内容",type:"textarea",full:true,help:"每行格式：名称｜说明"},{key:"productTitle",label:"产品线区域标题",type:"text",full:true},{key:"productText",label:"产品线区域说明",type:"textarea",full:true},{key:"ctaTitle",label:"底部引导标题",type:"text",full:true},{key:"ctaText",label:"底部引导说明",type:"textarea",full:true},fields.language] },
    aboutOverviewCards: { kind: "table", dataset: "aboutOverviewCards", title: "关于永铭栏目卡片", group: "关于永铭", fixedPage: true, description: "对应 about.html 的栏目入口卡片。前端使用固定图标样式，后台仅维护实际展示的标题、说明、入口文字和排序；英文页面不展示加入我们和原材料采购。", columns: [["title","栏目"],["link","页面"],["language","内容版本"],["sort","排序"]], fields: [{key:"title",label:"卡片标题",type:"text",required:true,full:true},{key:"summary",label:"卡片说明",type:"textarea",full:true},{key:"link",label:"固定页面地址",type:"text",readonly:true,full:true},{key:"buttonLabel",label:"入口文字",type:"text",full:true},fields.language,fields.sort] },
    aboutPageBackgrounds: { kind: "about-page-backgrounds", dataset: "aboutPageBackgrounds", title: "各页面首屏背景图", group: "关于永铭", fixedPage: true, directSave: true, description: "统一维护关于永铭各栏目第一屏的背景图。未上传图片时继续使用前端默认背景；代理商网络横幅仍在代理商网络页面单独维护。", columns: [["pageName","页面"],["file","前台页面"],["language","内容版本"],["backgroundImage","当前背景图"],["updatedAt","更新时间"]], fields: [{key:"pageName",label:"页面名称",type:"text",readonly:true,full:true},{key:"file",label:"前台页面",type:"text",readonly:true,full:true},fields.language,{key:"backgroundImage",label:"首屏背景图片",type:"file",assetKind:"image",accept:"image/png,image/jpeg,image/webp",maxSizeMB:8,dimensionHint:"建议使用横向深色图片，并按首屏宽屏比例裁切",full:true,help:"未上传时保留该页面当前默认背景，不需要修改前端代码。"},{key:"fallback",label:"未上传时的默认效果",type:"text",readonly:true,full:true}] },
    honors: { kind: "table", dataset: "honors", title: "企业荣誉", group: "关于永铭", directSave: true, description: "维护已确认的荣誉分类、证书图片、名称、颁发单位和时间；新增或修改后直接保存。", columns: [["title","荣誉名称"],["category","分类"],["issuer","颁发单位"],["date","日期"],["image","证书图片"],["sort","排序"]], fields: [fields.title,{key:"category",label:"分类",type:"text"},{key:"issuer",label:"颁发单位",type:"text"},{key:"date",label:"日期",type:"date"},{key:"imageUpload",label:"证书图片",type:"file",full:true},fields.sort] },
    dealers: { kind: "dealer-network", dataset: "dealers", title: "代理商网络", group: "关于永铭", directSave: true, description: "公开名录只维护并展示代理商公司名称和授权时间；页面顶部横幅图片单独维护，不在名录中记录资格类型。", columns: [["company","代理商公司名称"],["authorizationDate","授权时间"]], fields: [{key:"company",label:"代理商完整公司名称",type:"text",required:true,full:true},{key:"authorizationDate",label:"授权时间",type:"date",required:true}] },
    jobs: { kind: "table", dataset: "jobs", title: "加入我们", group: "关于永铭", description: "直接维护在招岗位和统一招聘联系方式，不配置筛选或招聘流程模块。", columns: [["title","岗位"],["department","部门"],["location","工作地点"],["experience","经验要求"],["contact","招聘联系方式"],["publishDate","发布日期"],["status","招聘状态"]], fields: [fields.title,{key:"department",label:"部门",type:"text"},{key:"location",label:"工作地点",type:"text"},{key:"experience",label:"经验要求",type:"text"},{key:"responsibilities",label:"核心职责",type:"textarea",full:true},{key:"qualifications",label:"任职资格",type:"textarea",full:true},{key:"contact",label:"招聘联系方式",type:"text",full:true},{key:"publishDate",label:"发布日期",type:"date"},{key:"status",label:"招聘状态",type:"select",required:true,options:["招聘中","已结束"]}] },
    procurementPage: { kind: "procurement-page", dataset: "procurementPage", title: "原材料采购页面", group: "关于永铭", fixedPage: true, directSave: true, description: "逐项维护前台原材料采购页的文字、页面卡片、展示顺序和供应商准入流程；首屏背景在“各页面首屏背景图”维护。合作意向申请记录单独读取CRM。" },
    procurement: { kind: "table", dataset: "procurement", title: "原材料采购申请记录", group: "关于永铭", description: "只读展示CRM中的供应商合作意向、附件数量、负责人、当前进度和企业微信推送状态。供应商准入流程在CRM中处理。", columns: [["company","供应商"],["contact","联系人"],["material","材料类别"],["attachments","附件"],["receivingTeam","接收部门"],["assignee","CRM负责人"],["crm","CRM编号"],["wecomStatus","企微推送"],["crmStatus","CRM处理状态"],["submittedAt","提交时间"]], readonly: true, viewable: true, previewLabel: "查看详情", exportLabel: "导出CRM记录" },
    languagePacks: { kind: "table", dataset: "languagePacks", title: "其他语言同步状态", group: "系统管理", description: "只查看除中英文外语言包的生成、覆盖率和RTL抽检状态；运营人员不逐条编辑其他语言内容。", columns: [["name","语言"],["base","页面基准"],["coverage","翻译覆盖率"],["rtl","RTL"],["reviewer","校验状态"],["status","发布状态"]], readonly: true, columnsNote: "其他语言统一读取English Base" },
    imports: { kind: "import", title: "数据导入与导出", group: "系统管理", description: "按业务模板批量导入产品、应用、知识内容和映射关系；导入前校验并生成错误报告。" },
    permissions: { kind: "table", dataset: "permissions", title: "角色与权限", group: "系统管理", description: "权限按模块、操作、产品线、语言和数据状态控制；敏感表单及批量导出单独授权。", columns: [["name","角色"],["users","用户数"],["modules","模块范围"],["productLines","产品线范围"],["actions","操作权限"],["status","状态"]], fields: [fields.name,{key:"modules",label:"模块范围",type:"textarea",full:true},{key:"productLines",label:"产品线范围",type:"textarea",full:true},{key:"actions",label:"操作权限",type:"textarea",full:true},{key:"status",label:"状态",type:"select",options:["正常","禁用"]}] },
    logs: { kind: "table", dataset: "logs", title: "操作日志", group: "系统管理", description: "记录登录、导入导出、内容发布、文件替换、关系变更和权限调整。", columns: [["time","时间"],["user","用户"],["module","模块"],["action","操作"],["target","对象"],["result","结果"],["ip","IP/来源"]], readonly: true }
  };

  moduleConfigs.footers.kind = "footer-manager";
  moduleConfigs.terminals.kind = "application-tree";
  moduleConfigs.terminals.fields.unshift(
    { key: "applicationId", label: "应用领域稳定ID", type: "text", readonly: true, full: true },
    { key: "moduleId", label: "应用模块稳定ID", type: "text", readonly: true, full: true }
  );
  moduleConfigs.downloads.description = "下载中心资料由CRM统一维护并同步；官网后台查看资源、版本和页面引用，不在此新增、替换或上下架。";
  moduleConfigs.downloads.readonly = true;
  moduleConfigs.downloads.viewable = true;
  moduleConfigs.downloads.exportLabel = "导出资源清单";

  const imageFieldPattern = /图片|横幅|封面|背景|二维码|产品图|尺寸图|频率条件图/;
  const pdfFieldPattern = /PDF|规格书|目录册|编码规则|报告文件/;
  Object.keys(moduleConfigs).forEach(function (moduleName) {
    (moduleConfigs[moduleName].fields || []).forEach(function (field) {
      if (field.type !== "file") return;
      if (imageFieldPattern.test(field.label || "")) {
        field.accept = field.accept || "image/png,image/jpeg,image/webp";
        field.maxSizeMB = field.maxSizeMB || 5;
        field.assetKind = "image";
        field.dimensionHint = field.dimensionHint || "上传JPG、PNG或WebP；建议先按前台展示比例裁切";
      } else if (pdfFieldPattern.test(field.label || "")) {
        field.accept = field.accept || ".pdf";
        field.maxSizeMB = field.maxSizeMB || 20;
        field.assetKind = "document";
      } else {
        field.accept = field.accept || ".pdf,.doc,.docx,.xlsx,.zip";
        field.maxSizeMB = field.maxSizeMB || 30;
        field.assetKind = "document";
      }
    });
  });

  moduleConfigs.series.fields.forEach(function (field) {
    if (["imageFile", "pdfFile", "codingRuleFile", "dimensionImageFile", "rippleImageFile"].includes(field.key)) field.localizedAsset = true;
    if (field.key === "tags") field.localizedText = true;
  });
  moduleConfigs.applications.fields.forEach(function (field) {
    if (["summary", "tags", "cardNote"].includes(field.key)) field.localizedText = true;
    if (field.key === "coverFile") field.localizedAsset = true;
  });
  moduleConfigs.terminals.fields.forEach(function (field) { if (field.key === "advantage") field.localizedText = true; });
  moduleConfigs.tools.fields.forEach(function (field) {
    if (["displayName", "summary", "tags"].includes(field.key)) field.localizedText = true;
    if (field.key === "cardImageFile") field.localizedAsset = true;
  });

  const navGroups = [
    { area: "日常运营", label: "工作台", icon: "▦", items: [["dashboard","运营工作台"],["trafficAnalytics","流量分析"]] },
    { area: "日常运营", label: "首页运营", icon: "⌂", items: [["banners","首页轮播图"],["homepageStats","首页数据指标"],["homepageProductCards","首页产品线卡片"],["homepageApplicationCards","英文首页应用卡片"]] },
    { area: "日常运营", label: "全站组件", icon: "▧", items: [["navigation","导航栏"],["footers","页脚"]] },
    { area: "日常运营", label: "产品中心", icon: "◫", items: [["products","产品主数据（只读）"],["productAiKeywords","AI搜索关键词"],["series","系列公共资料"],["shopLinks","商城商品匹配"],["replacements","替代料关系"]] },
    { area: "日常运营", label: "应用中心", icon: "⌘", items: [["applicationOverview","总览页内容"],["applications","应用领域卡片"],["applicationHighlights","总览页热门终端"],["applicationToolHighlights","总览页设计工具"],["terminals","终端详情与模板"],["appProducts","终端推荐料号"],["appGuides","应用指南关联"],["leads","应用咨询记录"]] },
    { area: "日常运营", label: "设计工具", icon: "◇", items: [["designOverview","总览页内容"],["tools","工具卡片与入口"],["cadModels","3D-CAD模型"],["spiceModels","SPICE模型"],["reliability","可靠性实验数据"],["cadRequests","3D-CAD申请记录"],["members","设计工具验证记录"]] },
    { area: "日常运营", label: "服务支持", icon: "▤", items: [["supportOverview","总览页内容"],["supportOverviewCards","总览页入口卡片"],["articles","新闻资讯"],["newsFeaturedArticles","新闻重点轮播"],["faqs","知识库"],["downloads","下载中心"],["compliance","合规证书"]] },
    { area: "日常运营", label: "关于永铭", icon: "◆", items: [["aboutOverview","总览页内容"],["aboutOverviewCards","总览页栏目卡片"],["aboutPageBackgrounds","各页面首屏背景图"],["honors","企业荣誉"],["dealers","代理商网络"],["jobs","加入我们"],["procurementPage","原材料采购页面"],["jobApplications","招聘申请记录"],["procurement","原材料采购申请记录"]] },
    { area: "前端页面管理", label: "前端页面管理", icon: "⌘", items: [["pageMap","全站页面定位"]] }
  ];

  const roleProfiles = {
    zh: {
      id: "zh",
      name: "中文官网运营人员",
      shortName: "中文运营",
      site: "中文官网",
      language: "简体中文",
      preview: "../index.html?lang=zh-CN",
      department: "国内推广部",
      description: "只维护中文内容、中文专属页面及获授权的全站共享数据。"
    },
    international: {
      id: "international",
      name: "国际官网运营人员",
      shortName: "英文运营",
      site: "国际版官网 / English Base",
      language: "English",
      preview: "../index-en.html?lang=en",
      department: "国外推广部",
      description: "维护确认英文页面；其余语言由英文内容和国际版页面结构生成。"
    }
  };

  const roleModuleAccess = {
    zh: [
      "dashboard", "trafficAnalytics", "banners", "homepageStats", "homepageProductCards", "navigation", "footers",
      "products", "productAiKeywords", "series", "shopLinks", "replacements",
      "applicationOverview", "applications", "applicationHighlights", "applicationToolHighlights", "terminals", "appProducts", "appGuides",
      "designOverview", "tools", "cadModels", "spiceModels", "reliability",
      "supportOverview", "supportOverviewCards", "articles", "newsFeaturedArticles", "faqs", "downloads", "compliance",
      "aboutOverview", "aboutOverviewCards", "aboutPageBackgrounds", "honors", "dealers", "jobs", "procurementPage",
      "leads", "members", "cadRequests", "jobApplications", "procurement", "pageMap"
    ],
    international: [
      "dashboard", "trafficAnalytics", "banners", "homepageStats", "homepageProductCards", "homepageApplicationCards", "navigation", "footers",
      "products", "productAiKeywords", "series", "shopLinks", "replacements",
      "applicationOverview", "applications", "applicationHighlights", "applicationToolHighlights", "terminals", "appProducts", "appGuides",
      "designOverview", "tools", "cadModels", "spiceModels", "reliability",
      "supportOverview", "supportOverviewCards", "articles", "newsFeaturedArticles", "faqs", "downloads", "compliance",
      "aboutOverview", "aboutOverviewCards", "aboutPageBackgrounds", "honors", "dealers",
      "leads", "members", "cadRequests", "pageMap"
    ]
  };

  const localizedDatasets = [
    "banners", "homepageStats", "homepageProductCards", "homepageApplicationCards", "applicationOverview", "applicationHighlights", "applicationToolHighlights",
    "designOverview", "supportOverview", "supportOverviewCards", "aboutOverview", "aboutOverviewCards", "aboutPageBackgrounds", "newsFeaturedArticles",
    "articles", "faqs", "downloads", "aboutContent", "footers"
  ];

  const moduleScopes = {
    banners: "中英文分别维护", homepageStats: "中英文分别维护", homepageProductCards: "中英文分别维护", homepageApplicationCards: "英文首页专属维护",
    applicationOverview: "中英文分别维护", applications: "中英文分别维护", applicationHighlights: "中英文分别维护", applicationToolHighlights: "中英文分别维护",
    designOverview: "中英文分别维护", tools: "中英文分别维护",
    supportOverview: "中英文分别维护", supportOverviewCards: "中英文分别维护",
    aboutOverview: "中英文分别维护", aboutOverviewCards: "中英文分别维护", aboutPageBackgrounds: "中英文分别维护",
    articles: "中英文分别维护", newsFeaturedArticles: "中英文分别维护", faqs: "中英文分别维护",
    downloads: "中英文分别维护", aboutContent: "中英文分别维护",
    jobs: "中文专属", procurementPage: "中文专属",
    trafficAnalytics: "全站只读分析", leads: "CRM按账号范围只读", members: "CRM按账号范围只读", cadRequests: "CRM按账号范围只读",
    jobApplications: "CRM按人事权限只读", procurement: "CRM按采购权限只读", languagePacks: "由英文版生成",
    navigation: "全站共享", footers: "中英文分别维护",
    pageMap: "只读页面定位", homepages: "系统技术配置",
    frontendChanges: "仅IT可见", permissions: "仅IT可见", logs: "仅IT可见", imports: "仅IT可见"
  };

  window.ADMIN_DATA = {
    productLines: productLines,
    applicationFields: applicationFields,
    languages: languages,
    maintainedLanguages: maintainedLanguages,
    datasets: datasets,
    moduleConfigs: moduleConfigs,
    navGroups: navGroups,
    roleProfiles: roleProfiles,
    roleModuleAccess: roleModuleAccess,
    localizedDatasets: localizedDatasets,
    moduleScopes: moduleScopes
  };
}());
