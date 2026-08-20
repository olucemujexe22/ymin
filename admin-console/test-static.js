const fs = require("fs");
const path = require("path");

global.window = {};
const root = path.resolve(__dirname, "..");
const adminRoot = __dirname;

[
  "system-modules.js",
  "application-product-index.js",
  "application-collected-data.js",
  "application-additional-pages.js",
  "application-ai-server-supercapacitor.js",
  "application-automotive-supercapacitor.js",
  "download-library.js",
  "compliance-certificates.js",
  "series-table.js",
  "series-images.js",
  "series-datasheets.js",
  "cad-models.js",
  "about-content.js"
].forEach((file) => require(path.join(root, "data", file)));
require("./data.js");
require("./frontend-validation-data.js");

const data = window.ADMIN_DATA;
const failures = [];

const navRoutes = data.navGroups.flatMap((group) => group.items.map((item) => item[0]));
navRoutes.forEach((route) => {
  if (!data.moduleConfigs[route]) failures.push(`导航缺少模块定义：${route}`);
});

["zh", "international"].forEach((role) => {
  if (!data.roleProfiles[role]) failures.push(`缺少账号视角：${role}`);
  (data.roleModuleAccess[role] || []).forEach((route) => {
    if (!data.moduleConfigs[route]) failures.push(`账号视角 ${role} 引用了不存在的模块：${route}`);
  });
});

if (data.roleModuleAccess.international.includes("jobs") || data.roleModuleAccess.international.includes("procurement")) {
  failures.push("国际官网运营人员不应看到加入我们或原材料采购");
}
if (data.roleModuleAccess.zh.includes("languagePacks")) failures.push("中文官网运营人员不应维护其他语言包");
if (!["zh", "international"].every((role) => data.roleModuleAccess[role].includes("navigation") && data.roleModuleAccess[role].includes("footers"))) failures.push("中文和国际运营账号均应可维护导航栏及各自页脚");
if (data.roleProfiles.admin || data.roleModuleAccess.admin) failures.push("官网运营后台不应设置IT/全站管理员视角");
if (!["zh", "international"].every((role) => data.roleModuleAccess[role].includes("pageMap"))) failures.push("中文和英文运营人员均应可查看全站页面定位");
if (data.roleModuleAccess.zh.includes("homepageApplicationCards")) failures.push("中文运营不应重复维护首页应用卡片，应直接读取应用中心");
if (!data.roleModuleAccess.international.includes("homepageApplicationCards")) failures.push("国际运营缺少英文首页应用卡片维护入口");

if (data.datasets.products.some((item) => Object.prototype.hasOwnProperty.call(item, "status"))) failures.push("CRM同步产品不应维护官网发布状态");
if (data.datasets.series.some((item) => Object.prototype.hasOwnProperty.call(item, "status"))) failures.push("系列公共资料不应维护上下架状态");
if (data.datasets.productAiKeywords.some((item) => Object.prototype.hasOwnProperty.call(item, "status"))) failures.push("AI搜索关键词不应维护上下架状态");
if ((data.moduleConfigs.series.fields || []).some((field) => field.key === "status")) failures.push("系列公共资料编辑页仍包含状态字段");
if ((data.moduleConfigs.productAiKeywords.fields || []).some((field) => field.key === "status")) failures.push("AI搜索关键词编辑页仍包含状态字段");

data.localizedDatasets.forEach((dataset) => {
  if (!Array.isArray(data.datasets[dataset])) failures.push(`中英文分版数据集不存在：${dataset}`);
});

if (!data.datasets.banners.some((item) => item.language === "简体中文") || !data.datasets.banners.some((item) => item.language === "English")) {
  failures.push("首页Banner缺少中文或英文版本");
}
if ((data.datasets.homepageApplicationCards || []).length !== 9 || data.datasets.homepageApplicationCards.some((item) => item.language !== "English")) failures.push("英文首页应包含九张独立维护的应用卡片");
const homeApplicationFieldKeys = (data.moduleConfigs.homepageApplicationCards.fields || []).map((field) => field.key);
["displayName", "summary", "image", "sort"].forEach((field) => {
  if (!homeApplicationFieldKeys.includes(field)) failures.push(`英文首页应用卡片缺少维护字段：${field}`);
});

const frontendCounts = (data.frontendValidation && data.frontendValidation.counts) || {};
if (frontendCounts.products < 40) failures.push("产品中心前端验证料号不足40条");
if (frontendCounts.series < 100) failures.push("系列公共资料未覆盖当前前端系列数据");
if (frontendCounts.terminals < 70) failures.push("应用中心终端验证数据不完整");
if (frontendCounts.terminalProducts < 100) failures.push("终端推荐料号未读取前端现有数据");
if (frontendCounts.downloads !== window.YMIN_DOWNLOAD_LIBRARY.length) failures.push("下载中心后台样本与前端资源数量不一致");
if (frontendCounts.compliance !== 29) failures.push("合规证书未覆盖24份产品文件和5份体系证书");
if (frontendCounts.cadModels !== window.YMIN_CAD_MODELS.length) failures.push("CAD模型后台样本与前端模型数量不一致");
const cadFormatField = (data.moduleConfigs.cadModels.fields || []).find((field) => field.key === "format");
if (!cadFormatField || JSON.stringify(cadFormatField.options) !== JSON.stringify(["STEP"])) failures.push("3D-CAD模型后台应只接收STEP格式");
const adminAppSource = fs.readFileSync(path.join(adminRoot, "app.js"), "utf8");
if (!adminAppSource.includes('id="cadBatchFileInput"') || !adminAppSource.includes('multiple hidden') || !adminAppSource.includes('data-cad-action="batch-upload"')) failures.push("3D-CAD缺少STEP文件批量上传入口");
if (frontendCounts.articles < 8 || frontendCounts.faqs < 10) failures.push("新闻或FAQ真实前端样本不足");

const productNumbers = new Set(data.datasets.products.map((item) => item.itemNo));
data.datasets.appProducts.forEach((item) => {
  if (!productNumbers.has(item.itemNo)) failures.push(`终端推荐料号未进入产品主数据样本：${item.itemNo}`);
});

const terminalIds = new Set(data.datasets.terminals.map((item) => item.id));
data.datasets.applicationHighlights.forEach((item) => {
  if (!terminalIds.has(item.terminalId)) failures.push(`应用中心热门终端引用不存在：${item.terminalId}`);
});

Object.entries(data.moduleConfigs).forEach(([route, config]) => {
  if (config.dataset && !data.datasets[config.dataset]) {
    failures.push(`模块 ${route} 缺少数据集：${config.dataset}`);
  }
});

const rootHtmlPages = fs.readdirSync(root).filter((name) => name.endsWith(".html") && !name.startsWith("_") && !name.startsWith("about-timeline-preview"));
const mappedPages = new Set(data.datasets.pageMap.map((item) => item.file));
rootHtmlPages.forEach((file) => {
  if (!mappedPages.has(file)) failures.push(`前台页面未映射后台来源：${file}`);
});

const resourceIds = new Set(data.datasets.downloads.map((item) => item.id));
data.datasets.relations
  .filter((item) => item.relationType === "指南下载")
  .forEach((item) => {
    if (!resourceIds.has(item.sourceId)) failures.push(`指南关系引用不存在的资源：${item.id}`);
  });

// 运营后台的默认值必须来自当前前端，而不是后台原型自行概括的文案。
function assertFrontendCopy(page, copy, label) {
  const htmlPath = path.join(root, page);
  const htmlText = fs.readFileSync(htmlPath, "utf8");
  if (!htmlText.includes(copy)) failures.push(`后台“${label}”与 ${page} 当前前端文案不一致`);
}

const designOverviewZh = data.datasets.designOverview.find((item) => item.id === "DESIGN-OVERVIEW-ZH");
const applicationOverviewZh = data.datasets.applicationOverview.find((item) => item.id === "APP-OVERVIEW-ZH");
const supportOverviewZh = data.datasets.supportOverview.find((item) => item.id === "SUPPORT-OVERVIEW-ZH");
const aboutOverviewZh = data.datasets.aboutOverview.find((item) => item.id === "ABOUT-HUB-ZH");

assertFrontendCopy("design-tools.html", designOverviewZh.introduction, "设计工具页面介绍");
assertFrontendCopy("design-tools.html", designOverviewZh.workflowText, "设计工具工作流");
assertFrontendCopy("application-center.html", applicationOverviewZh.introduction, "应用中心页面介绍");
assertFrontendCopy("support.html", supportOverviewZh.introduction, "服务支持页面介绍");
assertFrontendCopy("about.html", aboutOverviewZh.heroText, "关于永铭首屏介绍");
assertFrontendCopy("about.html", aboutOverviewZh.capabilityText, "关于永铭企业能力第一段");
assertFrontendCopy("about.html", aboutOverviewZh.capabilitySecondaryText, "关于永铭企业能力第二段");
(aboutOverviewZh.capabilityBullets || "").split("\n").filter(Boolean).forEach((copy) => assertFrontendCopy("about.html", copy, "关于永铭企业能力要点"));

data.datasets.applications.forEach((item) => {
  assertFrontendCopy("application-center.html", item.summaryZh, `${item.name}应用卡片简介`);
  assertFrontendCopy("application-center.html", item.cardNoteZh, `${item.name}应用卡片底部文字`);
});
data.datasets.supportOverviewCards.filter((item) => item.language === "简体中文").forEach((item) => {
  assertFrontendCopy("support.html", item.summary, `${item.title}入口卡片说明`);
});
data.datasets.aboutOverviewCards.filter((item) => item.language === "简体中文").forEach((item) => {
  assertFrontendCopy("about.html", item.summary, `${item.title}入口卡片说明`);
});
data.datasets.tools.forEach((item) => {
  assertFrontendCopy("design-tools.html", item.displayNameZh, `${item.name}工具卡片名称`);
  assertFrontendCopy("design-tools.html", item.summaryZh, `${item.name}工具卡片说明`);
});

// 后台导航遵循现官网顺序；CRM表单保留在对应业务板块并只读展示。
const dailyGroups = data.navGroups.filter((group) => group.area === "日常运营");
const dailyLabels = dailyGroups.map((group) => group.label);
const expectedDailyLabels = ["工作台", "首页运营", "全站组件", "产品中心", "应用中心", "设计工具", "服务支持", "关于永铭"];
if (JSON.stringify(dailyLabels) !== JSON.stringify(expectedDailyLabels)) failures.push(`日常运营导航顺序不正确：${dailyLabels.join(" → ")}`);

const globalGroup = dailyGroups.find((group) => group.label === "全站组件");
if (!globalGroup || JSON.stringify(globalGroup.items.map((item) => item[0])) !== JSON.stringify(["navigation", "footers"])) failures.push("全站组件应仅包含导航栏和页脚");
const frontendGroup = data.navGroups.find((group) => group.area === "前端页面管理");
if (!frontendGroup || JSON.stringify(frontendGroup.items.map((item) => item[0])) !== JSON.stringify(["pageMap"])) failures.push("前端页面管理应只保留全站页面定位");
if (data.navGroups.some((group) => group.area === "公共管理" || group.label === "系统管理")) failures.push("运营后台不应展示独立的IT系统管理菜单");

if ((data.datasets.navigation || []).length !== 6) failures.push("共享导航栏应包含六个一级栏目");
if ((data.datasets.navigation || []).some((item) => item.language || item.audience)) failures.push("共享导航栏不应按中英文重复维护");
if ((data.datasets.navigation || []).some((item) => !["显示", "隐藏"].includes(item.status))) failures.push("导航栏显示状态不正确");
const footerZh = (data.datasets.footers || []).find((item) => item.language === "简体中文");
const footerEn = (data.datasets.footers || []).find((item) => item.language === "English");
if (!footerZh || !footerEn || data.datasets.footers.length !== 2) failures.push("页脚应分别包含中文官网和国际官网两套维护记录");
const footerFieldMap = new Map((data.moduleConfigs.footers.fields || []).map((field) => [field.key, field]));
if (footerZh && (footerZh.rightExtraType !== "二维码" || footerZh.hotline !== "400 900 1922" || footerZh.domesticEmail !== "web@ymin.com" || !footerZh.serviceQrCaption || !footerZh.douyinQrCaption)) failures.push("中文页脚右侧联系信息或二维码配置不完整");
if (!footerFieldMap.has("serviceQr") || footerFieldMap.get("serviceQr").type !== "file" || !footerFieldMap.has("douyinQr") || footerFieldMap.get("douyinQr").type !== "file") failures.push("中文页脚两个二维码必须使用图片上传字段");
if (!footerFieldMap.get("serviceQr").languages.includes("简体中文") || !footerFieldMap.get("facebookUrl").languages.includes("English")) failures.push("页脚中文二维码与国际社交媒体字段未按语言隔离");
if (footerEn && (footerEn.rightExtraType !== "社交媒体" || !footerEn.linkedinUrl || !footerEn.facebookUrl || footerEn.domesticEmail !== "web@ymin.com" || !footerEn.addressUrl)) failures.push("国际页脚右侧联系信息或社交媒体配置不完整");
["domesticEmail", "internationalEmail", "address", "facebookUrl", "xUrl", "youtubeUrl", "linkedinUrl", "privacyUrl", "termsUrl"].forEach((key) => {
  if (!footerFieldMap.has(key)) failures.push(`页脚缺少独立维护字段：${key}`);
});

const applicationGroup = dailyGroups.find((group) => group.label === "应用中心");
const designGroup = dailyGroups.find((group) => group.label === "设计工具");
const supportGroup = dailyGroups.find((group) => group.label === "服务支持");
const aboutGroup = dailyGroups.find((group) => group.label === "关于永铭");
if (!applicationGroup || applicationGroup.items[applicationGroup.items.length - 1][0] !== "leads") failures.push("应用咨询记录应放在应用中心最后");
if (!designGroup || JSON.stringify(designGroup.items.map((item) => item[0])) !== JSON.stringify(["designOverview","tools","cadModels","spiceModels","reliability","cadRequests","members"])) failures.push("设计工具后台不应提供寿命公式维护，申请记录应放在末尾");
if (!supportGroup || JSON.stringify(supportGroup.items.map((item) => item[0])) !== JSON.stringify(["supportOverview","supportOverviewCards","articles","newsFeaturedArticles","faqs","downloads","compliance"])) failures.push("服务支持不应单列内容分析或内容关联中心");
if (!aboutGroup || JSON.stringify(aboutGroup.items.map((item) => item[0])) !== JSON.stringify(["aboutOverview","aboutOverviewCards","aboutPageBackgrounds","honors","dealers","jobs","procurementPage","jobApplications","procurement"])) failures.push("关于永铭后台顺序未与前台确认顺序一致，页面背景应集中维护且申请记录应放在末尾");

const aboutBackgroundConfig = data.moduleConfigs.aboutPageBackgrounds || {};
const aboutBackgroundRows = data.datasets.aboutPageBackgrounds || [];
if (aboutBackgroundConfig.kind !== "about-page-backgrounds") failures.push("关于永铭各栏目首屏背景缺少独立维护页面");
const backgroundField = (aboutBackgroundConfig.fields || []).find((field) => field.key === "backgroundImage");
if (!backgroundField || backgroundField.type !== "file" || backgroundField.assetKind !== "image") failures.push("关于永铭首屏背景必须使用图片上传字段");
["overview", "company", "honors", "careers", "procurement"].forEach((pageKey) => {
  if (!aboutBackgroundRows.some((row) => row.pageKey === pageKey)) failures.push(`关于永铭缺少${pageKey}页面首屏背景维护记录`);
});
if (aboutBackgroundRows.some((row) => row.pageKey === "dealers" || row.file === "about-distributors.html")) failures.push("代理商网络横幅不应在各页面首屏背景中重复维护");
if ((data.moduleConfigs.aboutOverview.fields || []).some((field) => field.key === "heroImage")) failures.push("关于永铭总览背景不应在总览内容与背景模块重复维护");

const crmFormModules = ["leads", "members", "cadRequests", "jobApplications", "procurement"];
crmFormModules.forEach((moduleName) => {
  const config = data.moduleConfigs[moduleName];
  if (!config || !config.readonly || !config.viewable) failures.push(`${moduleName} 应为CRM只读查看模块`);
  if (config && Array.isArray(config.fields) && config.fields.length) failures.push(`${moduleName} 不应保留官网后台编辑字段`);
  (data.datasets[moduleName] || []).forEach((row) => {
    if (!row.crm) failures.push(`${moduleName} 记录缺少CRM编号：${row.id}`);
  });
});

const workbenchGroup = dailyGroups.find((group) => group.label === "工作台");
if (!workbenchGroup || JSON.stringify(workbenchGroup.items.map((item) => item[0])) !== JSON.stringify(["dashboard"])) failures.push("工作台应只保留官网运营维护入口");
const trafficGroup = data.navGroups.find((group) => group.label === "流量分析");
const trafficModules = ["trafficAnalytics", "pageValueAnalytics", "trafficSourceAnalytics", "aiTrafficAnalytics", "keywordAnalytics", "operationsAlerts"];
if (!trafficGroup || JSON.stringify(trafficGroup.items.map((item) => item[0])) !== JSON.stringify(trafficModules)) failures.push("流量分析应为独立模块并包含六个分析页面");
trafficModules.forEach((moduleName) => {
  if (!data.moduleConfigs[moduleName] || data.moduleConfigs[moduleName].kind !== "traffic-module") failures.push(`缺少流量分析页面：${moduleName}`);
});
["trafficTrend", "trafficPages", "trafficChannels", "trafficEvents", "trafficAlerts", "trafficLanguages", "trafficKeywords", "trafficStatusCodes", "trafficAiSources", "trafficAiCrawlers", "trafficOpportunities", "trafficDevices", "trafficRegions", "trafficVisitors", "contentMetrics", "trafficFoundation"].forEach((dataset) => {
  if (!Array.isArray(data.datasets[dataset]) || !data.datasets[dataset].length) failures.push(`流量分析数据基座缺少演示数据：${dataset}`);
});
if (!data.datasets.trafficFoundation.some((item) => item.layer === "页面注册表")) failures.push("新官网流量基座缺少页面注册表层");
if (!data.datasets.trafficFoundation.some((item) => item.layer === "业务对象映射")) failures.push("新官网流量基座缺少稳定业务对象映射层");
if (!data.datasets.trafficFoundation.some((item) => item.layer === "关键行为字典")) failures.push("新官网流量基座缺少关键行为事件层");
if (!data.datasets.trafficAlerts.some((item) => item.type === "404")) failures.push("流量分析面板缺少404预警演示数据");
if (data.moduleConfigs.lifeFormulas || data.datasets.lifeFormulas) failures.push("寿命公式不应在官网运营后台维护");
if (data.moduleConfigs.contentAnalytics) failures.push("文章与FAQ分析应并入流量分析，不应保留独立模块");
if (data.moduleConfigs.relations) failures.push("批量内容关联应并入文章发布，不应保留独立模块");
if (data.moduleConfigs.terminals.kind !== "application-tree") failures.push("应用终端未使用稳定ID层级树维护");
if (data.datasets.terminals.some((item) => !item.applicationId || !item.moduleId)) failures.push("应用终端缺少应用领域或应用模块稳定ID");
if (data.moduleConfigs.footers.kind !== "footer-manager") failures.push("页脚未提供中英文独立预览维护");
if (!data.moduleConfigs.downloads.readonly || !data.moduleConfigs.downloads.viewable) failures.push("下载中心应为CRM同步只读模块");
Object.entries(data.moduleConfigs).forEach(([moduleName, config]) => {
  (config.fields || []).filter((field) => field.type === "file").forEach((field) => {
    if (!field.accept || !field.maxSizeMB) failures.push(`文件上传字段缺少格式或大小规则：${moduleName}.${field.key}`);
  });
});
["leads", "cadRequests", "jobApplications", "procurement"].forEach((moduleName) => {
  (data.datasets[moduleName] || []).forEach((row) => {
    if (!row.receivingTeam || !row.assignee || !row.wecomStatus || !row.crmStatus) failures.push(`${moduleName} 记录缺少CRM分配或企业微信推送结果：${row.id}`);
  });
});

const appResource = data.datasets.downloads.find((item) => item.id === applicationOverviewZh.featuredResourceId);
if (!appResource) failures.push("应用中心技术资源未关联下载中心资源");
else {
  assertFrontendCopy("application-center.html", appResource.title, "应用中心技术资源标题");
  assertFrontendCopy("application-center.html", appResource.summary, "应用中心技术资源说明");
}

[
  ["applicationOverview", ["heroImage", "toolsSectionTitle"]],
  ["designOverview", ["heroImage", "cardsSectionTitle"]],
  ["supportOverview", ["heroImage", "cardsSectionTitle"]],
  ["applications", ["coverFile"]],
  ["applicationHighlights", ["image"]],
  ["tools", ["cardImageFile"]],
  ["supportOverviewCards", ["image"]],
  ["aboutOverviewCards", ["image"]]
].forEach(([moduleName, invalidFields]) => {
  const fieldKeys = (data.moduleConfigs[moduleName].fields || []).map((field) => field.key);
  invalidFields.forEach((key) => {
    if (fieldKeys.includes(key)) failures.push(`${moduleName} 包含前端不存在的运营字段：${key}`);
  });
});

// 原材料采购页必须按前台真实结构逐项维护，并与CRM申请记录分离。
if (!data.moduleConfigs.procurementPage || data.moduleConfigs.procurementPage.kind !== "procurement-page") failures.push("原材料采购页应使用独立的页面维护界面");
const procurementPage = (data.datasets.procurementPage || [])[0] || {};
["title", "introduction", "heroBackground", "principleTitle", "cooperationTitle", "processTitle", "formTitle"].forEach((key) => {
  if (!procurementPage[key]) failures.push(`原材料采购页缺少基础字段：${key}`);
});
[
  ["procurementPrinciples", 8, "采购原则卡片"],
  ["procurementCooperations", 6, "主要合作方向卡片"],
  ["procurementSteps", 11, "供应商准入流程"]
].forEach(([datasetName, expectedCount, label]) => {
  const rows = data.datasets[datasetName] || [];
  if (rows.length !== expectedCount) failures.push(`${label}数量应与前台一致：期望${expectedCount}，实际${rows.length}`);
  const sorts = new Set();
  rows.forEach((row) => {
    if (!row.title || !row.description || !row.sort || !row.visible) failures.push(`${label}字段不完整：${row.id}`);
    if (sorts.has(String(row.sort))) failures.push(`${label}排序重复：${row.sort}`);
    sorts.add(String(row.sort));
    assertFrontendCopy("about-procurement.html", row.title, `${label}标题`);
    assertFrontendCopy("about-procurement.html", row.description, `${label}说明`);
  });
});
if (!data.moduleConfigs.procurement.readonly || !data.moduleConfigs.procurement.viewable) failures.push("原材料采购申请记录必须只读展示CRM数据");
(data.datasets.procurement || []).forEach((row) => {
  ["crm", "receivingTeam", "assignee", "wecomStatus", "crmStatus"].forEach((key) => {
    if (!row[key]) failures.push(`原材料采购申请记录缺少${key}：${row.id}`);
  });
});

// 代理商公开名录与前台保持一致：只维护公司名称和授权时间。
const dealerConfig = data.moduleConfigs.dealers || {};
if (dealerConfig.kind !== "dealer-network") failures.push("代理商网络应使用独立页面维护界面");
const dealerColumns = (dealerConfig.columns || []).map((column) => column[0]);
const dealerFields = (dealerConfig.fields || []).map((field) => field.key);
if (JSON.stringify(dealerColumns) !== JSON.stringify(["company", "authorizationDate"])) failures.push(`代理商名录展示字段不正确：${dealerColumns.join("、")}`);
if (JSON.stringify(dealerFields) !== JSON.stringify(["company", "authorizationDate"])) failures.push(`代理商名录维护字段不正确：${dealerFields.join("、")}`);
["certificate", "expiryDate", "region", "status"].forEach((key) => {
  if (dealerColumns.includes(key) || dealerFields.includes(key)) failures.push(`代理商名录不应体现字段：${key}`);
});
const dealerPage = (data.datasets.dealerPage || [])[0] || {};
if (!dealerPage.bannerZh || !dealerPage.bannerEn) failures.push("代理商网络缺少中英文页面横幅维护数据");
(data.datasets.dealers || []).forEach((row) => {
  if (!row.company || !row.authorizationDate) failures.push(`代理商名录缺少公司名称或授权时间：${row.id}`);
  ["certificate", "expiryDate", "region", "status"].forEach((key) => {
    if (row[key]) failures.push(`代理商名录仍包含不公开字段${key}：${row.id}`);
  });
});

const html = fs.readFileSync(path.join(adminRoot, "index.html"), "utf8");
const appSource = fs.readFileSync(path.join(adminRoot, "app.js"), "utf8");
const dataSource = fs.readFileSync(path.join(adminRoot, "data.js"), "utf8");
if (!appSource.includes("contentAnalyticsHtml()")) failures.push("流量分析页面尚未并入文章与FAQ表现");
if (!appSource.includes('data-action="import-article-relations"') || !appSource.includes('data-action="export-article-relations"')) failures.push("文章发布页面缺少关联导入或导出功能");
if (appSource.includes('config.kind === "content-analytics"') || appSource.includes('config.kind === "relations"')) failures.push("已取消的独立分析或内容关联页面仍可被访问");
if (html.includes('value="admin"') || html.includes("IT/全站管理员")) failures.push("账号视角仍显示IT/全站管理员");
[
  "聚合当前账号真正需要处理的待办",
  "演示面板",
  "正式开发时读取流量分析数据基座",
  "新官网数据基座演示",
  "演示数据更新至",
  "演示账号视角",
  "演示环境"
].forEach((copy) => {
  if ((html + appSource + dataSource).includes(copy)) failures.push(`后台仍包含过程说明：${copy}`);
});
const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
const duplicateIds = Array.from(new Set(ids.filter((id, index) => ids.indexOf(id) !== index)));
duplicateIds.forEach((id) => failures.push(`index.html 存在重复ID：${id}`));

const refs = Array.from(html.matchAll(/(?:src|href)="([^"]+)"/g), (match) => match[1]);
refs.filter((ref) => !ref.startsWith("#") && !/^https?:/.test(ref)).forEach((ref) => {
  const fileRef = ref.split("?")[0];
  if (!fs.existsSync(path.resolve(adminRoot, fileRef))) failures.push(`静态资源不存在：${ref}`);
});

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  navigationModules: navRoutes.length,
  datasets: Object.keys(data.datasets).length,
  frontendPagesMapped: data.datasets.pageMap.length,
  rootHtmlPages: rootHtmlPages.length,
  relationRecords: data.datasets.relations.length,
  downloadResources: data.datasets.downloads.length,
  roleViews: Object.keys(data.roleProfiles).length,
  localizedDatasets: data.localizedDatasets.length
}, null, 2));
