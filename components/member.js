/**
 * 永铭官网会员模块
 * - 前端演示数据保存在浏览器本地；正式上线时由会员 API 替换账户存储与身份校验。
 * - 中英文文案集中在本文件，支持 ?lang=en、html[lang] 和常用语言存储键。
 */
(function (window, document) {
  "use strict";

  var YMIN = window.YMIN = window.YMIN || {};
  if (YMIN.member && YMIN.member.__loaded) return;

  var STORAGE = {
    accounts: "ymin_member_accounts_v1",
    session: "ymin_member_session_v1",
    history: "ymin_member_life_history_v1",
    language: "ymin_language"
  };

  var PROTECTED_PAGES = {
    "design-life-calc.html": "life",
    "design-3d-cad.html": "cad",
    "design-3d-cad-request.html": "cadRequest",
    "design-spice.html": "spice",
    "design-reliability.html": "reliability"
  };

  var SERVICE_REASONS = {
    life: "reasonLife",
    cad: "reasonCad",
    cadRequest: "reasonCadRequest",
    spice: "reasonSpice",
    reliability: "reasonReliability",
    certificate: "reasonCertificate"
  };

  var REGION_GROUPS = [
    { key: "regionGroupChina", codes: ["CN", "HK", "MO", "TW"] },
    { key: "regionGroupAsiaPacific", codes: ["JP", "KR", "SG", "MY", "TH", "VN", "ID", "IN", "PH", "PK", "BD", "LK", "NP", "MM", "KH", "LA", "BN", "MN", "KZ", "UZ", "AF", "AM", "AZ", "BH", "BT", "CY", "GE", "IR", "IQ", "IL", "JO", "KW", "KG", "LB", "MV", "KP", "OM", "PS", "QA", "SA", "SY", "TJ", "TL", "TR", "TM", "AE", "YE"] },
    { key: "regionGroupEurope", codes: ["GB", "DE", "FR", "IT", "ES", "PT", "NL", "PL", "RU", "IE", "BE", "LU", "CH", "AT", "SE", "NO", "DK", "FI", "IS", "CZ", "SK", "HU", "RO", "BG", "GR", "UA", "HR", "SI", "EE", "LV", "LI", "LT", "AL", "AD", "BY", "BA", "MT", "MD", "MC", "ME", "MK", "SM", "RS", "VA"] },
    { key: "regionGroupAmericas", codes: ["US", "CA", "MX", "BR", "AR", "CL", "CO", "PE", "VE", "EC", "UY", "PY", "BO", "CR", "PA", "GT", "DO", "AG", "BS", "BB", "BZ", "CU", "DM", "SV", "GD", "GY", "HT", "HN", "JM", "NI", "KN", "LC", "SR", "TT", "VC"] },
    { key: "regionGroupAfrica", codes: ["ZA", "EG", "NG", "KE", "MA", "DZ", "TN", "GH", "ET", "TZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD", "KM", "CD", "CG", "CI", "DJ", "GQ", "ER", "SZ", "GA", "GM", "GN", "GW", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MZ", "NA", "NE", "RW", "ST", "SN", "SC", "SL", "SO", "SS", "SD", "TG", "UG", "ZM", "ZW"] },
    { key: "regionGroupOceania", codes: ["AU", "NZ", "FJ", "PG", "WS", "SB", "TO", "TV", "VU", "KI", "MH", "FM", "NR", "PW"] }
  ];

  var REGION_UI_TEXT = {
    "zh-CN": { placeholder: "请选择国家 / 地区", other: "其他国家或地区" },
    "zh-TW": { placeholder: "請選擇國家 / 地區", other: "其他國家或地區" },
    en: { placeholder: "Select a country or region", other: "Other country or region" },
    es: { placeholder: "Seleccione un país o región", other: "Otro país o región" },
    ar: { placeholder: "اختر دولة أو منطقة", other: "دولة أو منطقة أخرى" },
    pt: { placeholder: "Selecione um país ou região", other: "Outro país ou região" },
    fr: { placeholder: "Sélectionnez un pays ou une région", other: "Autre pays ou région" },
    de: { placeholder: "Land oder Region auswählen", other: "Anderes Land oder andere Region" },
    ru: { placeholder: "Выберите страну или регион", other: "Другая страна или регион" },
    ja: { placeholder: "国または地域を選択", other: "その他の国・地域" },
    ko: { placeholder: "국가 또는 지역 선택", other: "기타 국가 또는 지역" },
    it: { placeholder: "Seleziona un paese o una regione", other: "Altro paese o regione" },
    tr: { placeholder: "Ülke veya bölge seçin", other: "Diğer ülke veya bölge" },
    vi: { placeholder: "Chọn quốc gia hoặc khu vực", other: "Quốc gia hoặc khu vực khác" },
    id: { placeholder: "Pilih negara atau wilayah", other: "Negara atau wilayah lain" },
    th: { placeholder: "เลือกประเทศหรือภูมิภาค", other: "ประเทศหรือภูมิภาคอื่น" },
    hi: { placeholder: "देश या क्षेत्र चुनें", other: "अन्य देश या क्षेत्र" },
    pl: { placeholder: "Wybierz kraj lub region", other: "Inny kraj lub region" },
    nl: { placeholder: "Selecteer een land of regio", other: "Ander land of andere regio" },
    ms: { placeholder: "Pilih negara atau rantau", other: "Negara atau rantau lain" }
  };

  var REGION_GROUP_TEXT = {
    "zh-CN": ["中国及地区", "亚洲", "欧洲", "美洲", "非洲", "大洋洲"],
    "zh-TW": ["中國及地區", "亞洲", "歐洲", "美洲", "非洲", "大洋洲"],
    en: ["China and regions", "Asia", "Europe", "Americas", "Africa", "Oceania"],
    es: ["China y regiones", "Asia", "Europa", "América", "África", "Oceanía"],
    ar: ["الصين والمناطق", "آسيا", "أوروبا", "الأمريكتان", "أفريقيا", "أوقيانوسيا"],
    pt: ["China e regiões", "Ásia", "Europa", "Américas", "África", "Oceania"],
    fr: ["Chine et régions", "Asie", "Europe", "Amériques", "Afrique", "Océanie"],
    de: ["China und Regionen", "Asien", "Europa", "Amerika", "Afrika", "Ozeanien"],
    ru: ["Китай и регионы", "Азия", "Европа", "Америка", "Африка", "Океания"],
    ja: ["中国および地域", "アジア", "ヨーロッパ", "アメリカ", "アフリカ", "オセアニア"],
    ko: ["중국 및 지역", "아시아", "유럽", "아메리카", "아프리카", "오세아니아"],
    it: ["Cina e regioni", "Asia", "Europa", "Americhe", "Africa", "Oceania"],
    tr: ["Çin ve bölgeler", "Asya", "Avrupa", "Amerika", "Afrika", "Okyanusya"],
    vi: ["Trung Quốc và các khu vực", "Châu Á", "Châu Âu", "Châu Mỹ", "Châu Phi", "Châu Đại Dương"],
    id: ["Tiongkok dan wilayah", "Asia", "Eropa", "Amerika", "Afrika", "Oseania"],
    th: ["จีนและภูมิภาค", "เอเชีย", "ยุโรป", "อเมริกา", "แอฟริกา", "โอเชียเนีย"],
    hi: ["चीन और क्षेत्र", "एशिया", "यूरोप", "अमेरिका", "अफ्रीका", "ओशिनिया"],
    pl: ["Chiny i regiony", "Azja", "Europa", "Ameryki", "Afryka", "Oceania"],
    nl: ["China en regio's", "Azië", "Europa", "Amerika", "Afrika", "Oceanië"],
    ms: ["China dan wilayah", "Asia", "Eropah", "Amerika", "Afrika", "Oceania"]
  };

  var TEXT = {
    "zh-CN": {
      navLogin: "登录",
      navCenter: "会员中心",
      accountTitle: "会员账户",
      home: "首页",
      memberCenter: "会员中心",
      memberLogin: "会员登录",
      memberRegister: "会员注册",
      forgotPassword: "找回密码",
      termsTitle: "会员服务条款",
      freeMember: "免费会员服务",
      loginIntroTitle: "登录后使用专业设计资源",
      loginIntroText: "注册永铭会员，可使用设计工具、下载专业资料，并集中查看寿命推算记录。",
      registerIntroTitle: "一个账户，连接设计与应用支持",
      registerIntroText: "会员注册免费。请填写真实的企业与联系信息，便于获取适合项目的产品与技术支持。",
      resetIntroTitle: "重置会员密码",
      resetIntroText: "使用注册邮箱确认账户并设置新密码，完成后即可重新登录会员服务。",
      benefitLife: "寿命推算与历史记录",
      benefitCad: "3D-CAD 模型与申请",
      benefitSimulation: "SPICE 模型",
      benefitReliability: "可靠性数据与合规文件",
      loginTitle: "登录永铭会员",
      loginSubtitle: "使用注册邮箱和密码登录",
      registerTitle: "注册永铭会员",
      registerSubtitle: "填写以下信息即可免费注册",
      resetTitle: "设置新密码",
      resetSubtitle: "输入注册邮箱并重新设置密码",
      email: "邮箱",
      emailPlaceholder: "请输入工作邮箱",
      password: "密码",
      passwordPlaceholder: "请输入密码",
      currentPassword: "当前密码",
      newPassword: "新密码",
      newPasswordPlaceholder: "不少于 8 位，包含字母和数字",
      confirmPassword: "确认密码",
      confirmPasswordPlaceholder: "请再次输入密码",
      rememberMe: "保持登录状态",
      forgotLink: "忘记密码？",
      loginButton: "登录",
      noAccount: "还不是会员？",
      registerNow: "免费注册",
      hasAccount: "已有会员账户？",
      loginNow: "立即登录",
      company: "公司名称",
      companyPlaceholder: "请输入公司全称",
      department: "部门",
      departmentPlaceholder: "请输入所在部门",
      name: "姓名",
      namePlaceholder: "请输入姓名",
      phone: "联系电话",
      phonePlaceholder: "请输入联系电话",
      region: "国家 / 地区",
      regionChina: "中国大陆",
      regionHongKong: "中国香港",
      regionMacao: "中国澳门",
      regionTaiwan: "中国台湾",
      regionOther: "其他国家或地区",
      regionSelectPlaceholder: "请选择国家 / 地区",
      regionGroupChina: "中国及地区",
      regionGroupAsiaPacific: "亚太地区",
      regionGroupEurope: "欧洲",
      regionGroupAmericas: "美洲",
      regionGroupAfrica: "非洲",
      regionGroupOceania: "大洋洲",
      acceptTermsPrefix: "我已阅读并同意",
      acceptTermsLink: "《会员服务条款》",
      nonMilitary: "我确认会员资源不用于军事用途或受限制用途",
      newsletter: "订阅永铭产品、技术与活动资讯",
      registerButton: "免费注册",
      resetButton: "重置密码",
      backToLogin: "返回会员登录",
      loginSuccess: "登录成功，正在进入会员服务……",
      registerSuccess: "注册成功，正在进入会员中心……",
      resetSuccess: "密码已更新，请使用新密码登录。",
      invalidLogin: "邮箱或密码不正确，请重新输入。",
      accountExists: "该邮箱已经注册，请直接登录或找回密码。",
      accountMissing: "未找到该邮箱对应的会员账户。",
      passwordRule: "密码至少 8 位，并同时包含字母和数字。",
      passwordMismatch: "两次输入的密码不一致。",
      requiredAgreement: "请同意会员服务条款并确认资源使用范围。",
      formIncomplete: "请完整填写必填信息。",
      reasonGeneric: "该功能面向永铭会员开放，请先登录或免费注册。",
      reasonLife: "寿命推算工具面向会员开放。登录后可进行计算并查看历史记录。",
      reasonCad: "3D-CAD 模型下载面向会员开放，请登录后继续。",
      reasonCadRequest: "3D-CAD 申请面向会员开放，请登录后提交需求。",
      reasonSpice: "SPICE 模型面向会员开放，请登录后查询和下载。",
      reasonReliability: "可靠性实验数据面向会员开放，请登录后查看。",
      reasonCertificate: "合规证书 PDF 面向会员提供下载，请登录后继续。",
      dashboardTitle: "会员中心",
      welcomePrefix: "您好，",
      dashboardSubtitle: "使用永铭设计工具、专业资料与会员记录。",
      logout: "退出登录",
      quickServices: "会员服务",
      profileTitle: "账户信息",
      lifeHistory: "寿命推算记录",
      clearHistory: "清空记录",
      noHistory: "暂无寿命推算记录。完成一次计算后，结果会保存在这里。",
      historyUnknownLine: "电容寿命推算",
      serviceLife: "寿命推算工具",
      serviceCad: "3D-CAD",
      serviceSpice: "SPICE 模型",
      serviceReliability: "可靠性数据",
      serviceCertificates: "合规证书",
      createdAt: "注册时间",
      languageLabel: "语言",
      termsLead: "本条款用于说明永铭会员服务的注册、使用、信息处理与账户责任。",
      terms1Title: "一、会员服务范围",
      terms1Text: "会员可使用寿命推算、3D-CAD、SPICE 模型、可靠性数据及合规文件下载等服务。具体服务内容可随网站建设进度调整。",
      terms2Title: "二、注册信息与账户安全",
      terms2Text: "会员应提供真实、准确的公司与联系信息，妥善保管登录凭证，并对账户下的操作负责。发现异常使用时应及时联系永铭。",
      terms3Title: "三、信息使用",
      terms3Text: "注册信息与服务使用记录用于身份验证、会员服务提供、技术支持、产品与活动信息发送以及匿名化的网站使用分析。",
      terms4Title: "四、资料使用范围",
      terms4Text: "会员下载的模型、实验数据与证明文件仅用于合法的产品选型、设计验证、质量核对及相关业务，不得用于军事用途、非法用途或未经授权的传播。",
      terms5Title: "五、数据与免责声明",
      terms5Text: "网站资料用于设计参考。正式选型、结构与合规判断应以永铭发布的有效规格书、正式文件及双方确认信息为准。",
      terms6Title: "六、账户注销与联系",
      terms6Text: "会员可申请修改或注销账户。永铭有权对违反本条款或存在安全风险的账户暂停服务。",
      showPassword: "显示密码",
      hidePassword: "隐藏密码",
      memberOnly: "会员功能",
      historyCleared: "寿命推算记录已清空。"
    },
    en: {
      navLogin: "Sign in",
      navCenter: "Member Center",
      accountTitle: "Member account",
      home: "Home",
      memberCenter: "Member Center",
      memberLogin: "Member Sign In",
      memberRegister: "Member Registration",
      forgotPassword: "Reset Password",
      termsTitle: "Member Service Terms",
      freeMember: "Free Member Services",
      loginIntroTitle: "Professional design resources for members",
      loginIntroText: "Register as a YMIN member to use design tools, download professional resources, and review lifetime calculation history.",
      registerIntroTitle: "One account for design and application support",
      registerIntroText: "Membership is free. Please provide valid company and contact details so we can support your projects effectively.",
      resetIntroTitle: "Reset your member password",
      resetIntroText: "Confirm your account with the registered email address and set a new password.",
      benefitLife: "Lifetime calculation and history",
      benefitCad: "3D-CAD models and requests",
      benefitSimulation: "SPICE models",
      benefitReliability: "Reliability data and compliance files",
      loginTitle: "Sign in to YMIN",
      loginSubtitle: "Use your registered email and password",
      registerTitle: "Create a YMIN account",
      registerSubtitle: "Complete the form to register for free",
      resetTitle: "Set a new password",
      resetSubtitle: "Enter your registered email and a new password",
      email: "Email",
      emailPlaceholder: "Enter your business email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      currentPassword: "Current password",
      newPassword: "New password",
      newPasswordPlaceholder: "8+ characters with letters and numbers",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Enter the password again",
      rememberMe: "Keep me signed in",
      forgotLink: "Forgot password?",
      loginButton: "Sign in",
      noAccount: "Not a member yet?",
      registerNow: "Register for free",
      hasAccount: "Already have an account?",
      loginNow: "Sign in",
      company: "Company",
      companyPlaceholder: "Enter the full company name",
      department: "Department",
      departmentPlaceholder: "Enter your department",
      name: "Name",
      namePlaceholder: "Enter your name",
      phone: "Phone",
      phonePlaceholder: "Enter your phone number",
      region: "Country / Region",
      regionChina: "Chinese Mainland",
      regionHongKong: "Hong Kong, China",
      regionMacao: "Macao, China",
      regionTaiwan: "Taiwan, China",
      regionOther: "Other country or region",
      regionSelectPlaceholder: "Select a country or region",
      regionGroupChina: "China and Regions",
      regionGroupAsiaPacific: "Asia-Pacific",
      regionGroupEurope: "Europe",
      regionGroupAmericas: "Americas",
      regionGroupAfrica: "Africa",
      regionGroupOceania: "Oceania",
      acceptTermsPrefix: "I have read and agree to the",
      acceptTermsLink: "Member Service Terms",
      nonMilitary: "I confirm that member resources will not be used for military or restricted purposes",
      newsletter: "Subscribe to YMIN product, technology and event updates",
      registerButton: "Register for free",
      resetButton: "Reset password",
      backToLogin: "Back to sign in",
      loginSuccess: "Signed in. Opening member services…",
      registerSuccess: "Registration complete. Opening Member Center…",
      resetSuccess: "Your password has been updated. Please sign in with the new password.",
      invalidLogin: "The email or password is incorrect.",
      accountExists: "This email is already registered. Please sign in or reset the password.",
      accountMissing: "No member account was found for this email.",
      passwordRule: "Use at least 8 characters including both letters and numbers.",
      passwordMismatch: "The passwords do not match.",
      requiredAgreement: "Please accept the service terms and confirm the permitted use of resources.",
      formIncomplete: "Please complete all required fields.",
      reasonGeneric: "This service is available to YMIN members. Please sign in or register for free.",
      reasonLife: "The lifetime calculator is a member service. Sign in to calculate and review history.",
      reasonCad: "3D-CAD model downloads are available to members. Please sign in to continue.",
      reasonCadRequest: "3D-CAD requests are available to members. Please sign in to submit a request.",
      reasonSpice: "SPICE models are available to members. Please sign in to search and download.",
      reasonReliability: "Reliability test data is available to members. Please sign in to view it.",
      reasonCertificate: "Compliance certificate PDFs are available to members. Please sign in to download.",
      dashboardTitle: "Member Center",
      welcomePrefix: "Welcome, ",
      dashboardSubtitle: "Access YMIN design tools, professional resources and member records.",
      logout: "Sign out",
      quickServices: "Member Services",
      profileTitle: "Account Information",
      lifeHistory: "Lifetime Calculation History",
      clearHistory: "Clear history",
      noHistory: "No lifetime calculation history yet. Completed calculations will appear here.",
      historyUnknownLine: "Capacitor lifetime calculation",
      serviceLife: "Lifetime Calculator",
      serviceCad: "3D-CAD",
      serviceSpice: "SPICE Models",
      serviceReliability: "Reliability Data",
      serviceCertificates: "Compliance Certificates",
      createdAt: "Registered",
      languageLabel: "Language",
      termsLead: "These terms describe registration, use, information processing and account responsibilities for YMIN member services.",
      terms1Title: "1. Member service scope",
      terms1Text: "Members may use the lifetime calculator, 3D-CAD, SPICE models, reliability data and compliance downloads. Services may be updated as the website evolves.",
      terms2Title: "2. Registration and account security",
      terms2Text: "Members must provide accurate company and contact information, protect their credentials and remain responsible for account activity. Suspicious use should be reported to YMIN promptly.",
      terms3Title: "3. Use of information",
      terms3Text: "Registration data and service usage records may be used for authentication, member service delivery, technical support, product and event communications, and anonymized website analysis.",
      terms4Title: "4. Permitted use of resources",
      terms4Text: "Models, test data and certificates may only be used for lawful product selection, design verification, quality review and related business. Military, illegal or unauthorized distribution is prohibited.",
      terms5Title: "5. Data and disclaimer",
      terms5Text: "Website resources are design references. Final selection, mechanical and compliance decisions must rely on current YMIN specifications, formal documents and mutually confirmed information.",
      terms6Title: "6. Account closure and contact",
      terms6Text: "Members may request account changes or closure. YMIN may suspend accounts that violate these terms or pose a security risk.",
      showPassword: "Show password",
      hidePassword: "Hide password",
      memberOnly: "Member service",
      historyCleared: "Lifetime calculation history has been cleared."
    }
  };

  var initialized = false;
  var memoryStore = {};

  function normalizeLanguage(value) {
    var normalized = String(value || "").toLowerCase();
    if (normalized === "zh" || normalized === "zh-cn" || normalized === "zh-hans") return "zh-CN";
    if (normalized === "zh-tw" || normalized === "zh-hk" || normalized === "zh-hant") return "zh-TW";
    if (normalized.indexOf("en") === 0) return "en";
    if (normalized.indexOf("ja") === 0) return "ja";
    if (normalized.indexOf("ko") === 0) return "ko";
    if (normalized.indexOf("de") === 0) return "de";
    if (normalized.indexOf("fr") === 0) return "fr";
    if (normalized.indexOf("es") === 0) return "es";
    if (normalized.indexOf("pt") === 0) return "pt";
    if (normalized.indexOf("ru") === 0) return "ru";
    if (normalized.indexOf("ar") === 0) return "ar";
    if (normalized.indexOf("it") === 0) return "it";
    if (normalized.indexOf("tr") === 0) return "tr";
    if (normalized.indexOf("vi") === 0) return "vi";
    if (normalized.indexOf("id") === 0) return "id";
    if (normalized.indexOf("th") === 0) return "th";
    if (normalized.indexOf("hi") === 0) return "hi";
    if (normalized.indexOf("pl") === 0) return "pl";
    if (normalized.indexOf("nl") === 0) return "nl";
    if (normalized.indexOf("ms") === 0) return "ms";
    return "zh-CN";
  }

  function getLanguage() {
    var query = new URLSearchParams(window.location.search).get("lang");
    if (query) return normalizeLanguage(query);
    var candidates = [STORAGE.language, "ymin-language", "language", "lang"];
    for (var i = 0; i < candidates.length; i += 1) {
      try {
        var stored = window.localStorage.getItem(candidates[i]);
        if (stored) return normalizeLanguage(stored);
      } catch (ignore) {}
    }
    return normalizeLanguage(document.documentElement.lang || "zh-CN");
  }

  function t(key) {
    var lang = getLanguage();
    var fallback = lang === "zh-CN" ? TEXT["zh-CN"] : TEXT.en;
    return (TEXT[lang] && TEXT[lang][key]) || (fallback && fallback[key]) || TEXT["zh-CN"][key] || key;
  }

  function setLanguage(language) {
    var lang = normalizeLanguage(language);
    try { window.localStorage.setItem(STORAGE.language, lang); } catch (ignore) {}
    try { window.localStorage.setItem("ymin-language", lang); } catch (ignoreShared) {}
    if (YMIN.i18n && typeof YMIN.i18n.setLanguage === "function") {
      YMIN.i18n.setLanguage(lang);
      return;
    }
    document.documentElement.lang = lang;
    applyTranslations();
    try {
      window.dispatchEvent(new CustomEvent("ymin:languagechange", { detail: { language: lang } }));
    } catch (ignoreEvent) {}
  }

  function getStore(type, key) {
    try {
      var store = type === "session" ? window.sessionStorage : window.localStorage;
      var value = store.getItem(key);
      return value === null ? null : value;
    } catch (ignore) {
      return Object.prototype.hasOwnProperty.call(memoryStore, type + ":" + key)
        ? memoryStore[type + ":" + key]
        : null;
    }
  }

  function setStore(type, key, value) {
    try {
      var store = type === "session" ? window.sessionStorage : window.localStorage;
      store.setItem(key, value);
    } catch (ignore) {
      memoryStore[type + ":" + key] = value;
    }
  }

  function removeStore(type, key) {
    try {
      var store = type === "session" ? window.sessionStorage : window.localStorage;
      store.removeItem(key);
    } catch (ignore) {
      delete memoryStore[type + ":" + key];
    }
  }

  function readJson(type, key, fallback) {
    try {
      var raw = getStore(type, key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (ignore) {
      return fallback;
    }
  }

  function writeJson(type, key, value) {
    setStore(type, key, JSON.stringify(value));
  }

  function getAccounts() {
    var accounts = readJson("local", STORAGE.accounts, []);
    return Array.isArray(accounts) ? accounts : [];
  }

  function saveAccounts(accounts) {
    writeJson("local", STORAGE.accounts, accounts);
  }

  function getSession() {
    var session = readJson("session", STORAGE.session, null) || readJson("local", STORAGE.session, null);
    if (!session || !session.email || Number(session.expiresAt) <= Date.now()) {
      removeStore("session", STORAGE.session);
      removeStore("local", STORAGE.session);
      return null;
    }
    return session;
  }

  function getCurrentUser() {
    var session = getSession();
    if (!session) return null;
    var email = String(session.email).toLowerCase();
    return getAccounts().filter(function (account) {
      return String(account.email).toLowerCase() === email;
    })[0] || null;
  }

  function isAuthenticated() {
    return !!getCurrentUser();
  }

  function startSession(account, remember) {
    var session = {
      email: account.email,
      expiresAt: Date.now() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000
    };
    removeStore("session", STORAGE.session);
    removeStore("local", STORAGE.session);
    writeJson(remember ? "local" : "session", STORAGE.session, session);
  }

  function logout() {
    removeStore("session", STORAGE.session);
    removeStore("local", STORAGE.session);
    window.location.href = withLanguage("member-login.html");
  }

  function randomSalt() {
    if (window.crypto && window.crypto.getRandomValues) {
      var bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      return Array.prototype.map.call(bytes, function (byte) {
        return byte.toString(16).padStart(2, "0");
      }).join("");
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function hashPassword(password, salt) {
    var content = String(salt) + ":" + String(password);
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(content)).then(function (buffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
          return byte.toString(16).padStart(2, "0");
        }).join("");
      });
    }
    var hash = 5381;
    for (var i = 0; i < content.length; i += 1) hash = ((hash << 5) + hash) ^ content.charCodeAt(i);
    return Promise.resolve((hash >>> 0).toString(16));
  }

  function validPassword(password) {
    return String(password).length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
  }

  function currentFile() {
    var file = window.location.pathname.split("/").pop();
    return file || "index.html";
  }

  function currentRelativeUrl() {
    return currentFile() + window.location.search + window.location.hash;
  }

  function withLanguage(value) {
    try {
      var url = new URL(value, document.baseURI);
      url.searchParams.set("lang", getLanguage());
      return url.pathname.split("/").pop() + url.search + url.hash;
    } catch (ignore) {
      return value;
    }
  }

  function safeReturn(value, fallback) {
    var candidate = String(value || "").trim();
    if (!candidate || candidate.indexOf(":") !== -1 || candidate.indexOf("//") !== -1 || candidate.charAt(0) === "/") {
      return fallback || "member-center.html";
    }
    if (!/^[A-Za-z0-9._-]+\.html(?:[?#].*)?$/.test(candidate)) return fallback || "member-center.html";
    return candidate;
  }

  function loginUrl(service, returnUrl) {
    var params = new URLSearchParams();
    if (returnUrl) params.set("return", safeReturn(returnUrl, "member-center.html"));
    if (service) params.set("service", service);
    params.set("lang", getLanguage());
    return "member-login.html?" + params.toString();
  }

  function redirectToLogin(service, returnUrl) {
    window.location.href = loginUrl(service || "generic", returnUrl || currentRelativeUrl());
  }

  function protectCurrentPage() {
    var file = currentFile();
    if (PROTECTED_PAGES[file] && !isAuthenticated()) {
      redirectToLogin(PROTECTED_PAGES[file], currentRelativeUrl());
      return true;
    }
    if (file === "member-center.html" && !isAuthenticated()) {
      redirectToLogin("generic", "member-center.html");
      return true;
    }
    return false;
  }

  function regionDisplayName(code, language) {
    var specialKeys = { CN: "regionChina", HK: "regionHongKong", MO: "regionMacao", TW: "regionTaiwan" };
    var traditionalChinese = { CN: "中國大陸", HK: "中國香港", MO: "中國澳門", TW: "中國台灣" };
    if (language === "zh-TW" && traditionalChinese[code]) return traditionalChinese[code];
    if ((language === "zh-CN" || language === "en") && specialKeys[code]) return t(specialKeys[code]);
    try {
      if (window.Intl && Intl.DisplayNames) {
        return new Intl.DisplayNames([language], { type: "region" }).of(code) || code;
      }
    } catch (ignore) {}
    return code;
  }

  function regionUiText(key, language) {
    var pack = REGION_UI_TEXT[language] || REGION_UI_TEXT.en;
    return pack[key] || REGION_UI_TEXT.en[key] || "";
  }

  function regionGroupDisplayName(group, language) {
    var groupKeys = [
      "regionGroupChina",
      "regionGroupAsiaPacific",
      "regionGroupEurope",
      "regionGroupAmericas",
      "regionGroupAfrica",
      "regionGroupOceania"
    ];
    var groupIndex = groupKeys.indexOf(group.key);
    var pack = REGION_GROUP_TEXT[language] || REGION_GROUP_TEXT.en;
    return groupIndex >= 0 ? pack[groupIndex] : t(group.key);
  }

  function populateRegionSelect() {
    var select = document.querySelector("[data-member-region-select]");
    if (!select) return;
    // Region names are already localized by Intl.DisplayNames and the
    // dedicated region packs. Keep the global DOM translator from processing
    // the generated options a second time.
    select.setAttribute("data-i18n-ignore", "");
    var language = getLanguage();
    var selectedValue = select.value;
    select.innerHTML = "";

    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = regionUiText("placeholder", language);
    placeholder.disabled = true;
    select.appendChild(placeholder);

    REGION_GROUPS.forEach(function (group) {
      var optgroup = document.createElement("optgroup");
      optgroup.label = regionGroupDisplayName(group, language);
      group.codes.forEach(function (code) {
        var option = document.createElement("option");
        option.value = code;
        option.textContent = regionDisplayName(code, language);
        optgroup.appendChild(option);
      });
      select.appendChild(optgroup);
    });

    var other = document.createElement("option");
    other.value = "OTHER";
    other.textContent = regionUiText("other", language);
    select.appendChild(other);

    if (selectedValue && select.querySelector('option[value="' + selectedValue + '"]')) select.value = selectedValue;
    else select.value = "";
  }

  function applyTranslations() {
    var lang = getLanguage();
    document.documentElement.lang = lang;
    // Member features are loaded on every page. Keep the confirmed English
    // layout direction and do not mirror the whole site for Arabic.
    document.documentElement.dir = "ltr";
    document.documentElement.setAttribute("data-language-direction", lang === "ar" ? "rtl" : "ltr");
    document.querySelectorAll("[data-member-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-member-i18n"));
    });
    document.querySelectorAll("[data-member-i18n-placeholder]").forEach(function (node) {
      node.setAttribute("placeholder", t(node.getAttribute("data-member-i18n-placeholder")));
    });
    document.querySelectorAll("[data-member-i18n-title]").forEach(function (node) {
      node.setAttribute("title", t(node.getAttribute("data-member-i18n-title")));
    });
    var titleKey = document.body && document.body.getAttribute("data-member-title");
    if (titleKey) document.title = t(titleKey) + " - YMIN";
    document.querySelectorAll("[data-member-language]").forEach(function (button) {
      button.classList.toggle("is-active", normalizeLanguage(button.getAttribute("data-member-language")) === lang);
    });
    populateRegionSelect();
    updateNavigation();
    renderLoginReason();
    if (currentFile() === "member-center.html") renderMemberCenter();
  }

  function updateNavigation() {
    var authenticated = isAuthenticated();
    document.querySelectorAll("[data-member-nav]").forEach(function (node) {
      node.textContent = t(authenticated ? "navCenter" : "navLogin");
      node.setAttribute("href", withLanguage(authenticated ? "member-center.html" : "member-login.html"));
    });
    document.querySelectorAll("[data-member-account-icon]").forEach(function (node) {
      node.setAttribute("href", withLanguage(authenticated ? "member-center.html" : "member-login.html"));
      node.setAttribute("title", t("accountTitle"));
      node.setAttribute("aria-label", t("accountTitle"));
    });
  }

  function renderLoginReason() {
    var box = document.querySelector("[data-member-login-reason]");
    if (!box) return;
    var service = new URLSearchParams(window.location.search).get("service");
    if (!service) {
      box.classList.remove("is-visible");
      return;
    }
    var content = box.querySelector("[data-member-reason-text]");
    if (content) content.textContent = t(SERVICE_REASONS[service] || "reasonGeneric");
    box.classList.add("is-visible");
  }

  function showMessage(form, message, type) {
    var target = form.querySelector("[data-member-message]");
    if (!target) return;
    target.textContent = message;
    target.className = "member-message is-visible " + (type === "success" ? "is-success" : "is-error");
  }

  function setSubmitting(form, submitting) {
    var submit = form.querySelector("button[type='submit']");
    if (submit) submit.disabled = submitting;
  }

  function handleLogin(form) {
    var data = new FormData(form);
    var email = String(data.get("email") || "").trim().toLowerCase();
    var password = String(data.get("password") || "");
    var account = getAccounts().filter(function (item) {
      return String(item.email).toLowerCase() === email;
    })[0];
    if (!account) {
      showMessage(form, t("invalidLogin"), "error");
      return;
    }
    setSubmitting(form, true);
    hashPassword(password, account.salt).then(function (hash) {
      if (hash !== account.passwordHash) {
        showMessage(form, t("invalidLogin"), "error");
        setSubmitting(form, false);
        return;
      }
      startSession(account, data.get("remember") === "on");
      showMessage(form, t("loginSuccess"), "success");
      var destination = safeReturn(new URLSearchParams(window.location.search).get("return"), withLanguage("member-center.html"));
      window.setTimeout(function () { window.location.href = destination; }, 280);
    }).catch(function () {
      showMessage(form, t("invalidLogin"), "error");
      setSubmitting(form, false);
    });
  }

  function handleRegistration(form) {
    if (!form.checkValidity()) {
      form.reportValidity();
      showMessage(form, t("formIncomplete"), "error");
      return;
    }
    var data = new FormData(form);
    var email = String(data.get("email") || "").trim().toLowerCase();
    var password = String(data.get("password") || "");
    var confirm = String(data.get("confirmPassword") || "");
    if (getAccounts().some(function (item) { return String(item.email).toLowerCase() === email; })) {
      showMessage(form, t("accountExists"), "error");
      return;
    }
    if (!validPassword(password)) {
      showMessage(form, t("passwordRule"), "error");
      return;
    }
    if (password !== confirm) {
      showMessage(form, t("passwordMismatch"), "error");
      return;
    }
    if (data.get("terms") !== "on" || data.get("nonMilitary") !== "on") {
      showMessage(form, t("requiredAgreement"), "error");
      return;
    }
    setSubmitting(form, true);
    var salt = randomSalt();
    hashPassword(password, salt).then(function (passwordHash) {
      var account = {
        id: "YM" + Date.now().toString(36).toUpperCase(),
        company: String(data.get("company") || "").trim(),
        department: String(data.get("department") || "").trim(),
        name: String(data.get("name") || "").trim(),
        email: email,
        phone: String(data.get("phone") || "").trim(),
        region: String(data.get("region") || "").trim(),
        newsletter: data.get("newsletter") === "on",
        salt: salt,
        passwordHash: passwordHash,
        termsVersion: "2026-08-05",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      var accounts = getAccounts();
      accounts.push(account);
      saveAccounts(accounts);
      startSession(account, true);
      showMessage(form, t("registerSuccess"), "success");
      window.setTimeout(function () { window.location.href = withLanguage("member-center.html"); }, 320);
    }).catch(function () {
      showMessage(form, t("formIncomplete"), "error");
      setSubmitting(form, false);
    });
  }

  function handlePasswordReset(form) {
    if (!form.checkValidity()) {
      form.reportValidity();
      showMessage(form, t("formIncomplete"), "error");
      return;
    }
    var data = new FormData(form);
    var email = String(data.get("email") || "").trim().toLowerCase();
    var password = String(data.get("password") || "");
    var confirm = String(data.get("confirmPassword") || "");
    var accounts = getAccounts();
    var index = accounts.findIndex(function (item) { return String(item.email).toLowerCase() === email; });
    if (index < 0) {
      showMessage(form, t("accountMissing"), "error");
      return;
    }
    if (!validPassword(password)) {
      showMessage(form, t("passwordRule"), "error");
      return;
    }
    if (password !== confirm) {
      showMessage(form, t("passwordMismatch"), "error");
      return;
    }
    setSubmitting(form, true);
    var salt = randomSalt();
    hashPassword(password, salt).then(function (passwordHash) {
      accounts[index].salt = salt;
      accounts[index].passwordHash = passwordHash;
      accounts[index].updatedAt = new Date().toISOString();
      saveAccounts(accounts);
      removeStore("session", STORAGE.session);
      removeStore("local", STORAGE.session);
      showMessage(form, t("resetSuccess"), "success");
      setSubmitting(form, false);
    });
  }

  function getHistoryMap() {
    var history = readJson("local", STORAGE.history, {});
    return history && typeof history === "object" ? history : {};
  }

  function saveLifetimeHistory() {
    var user = getCurrentUser();
    if (!user || currentFile() !== "design-life-calc.html") return;
    var output = document.getElementById("calculation-output");
    if (!output || output.querySelector(".error-box")) return;
    var raw = String(output.textContent || "").replace(/\s+/g, " ").trim();
    if (!raw || raw.length < 8) return;
    var select = document.getElementById("product-line");
    var productLine = select && select.options[select.selectedIndex]
      ? select.options[select.selectedIndex].textContent.trim()
      : t("historyUnknownLine");
    var history = getHistoryMap();
    var key = String(user.email).toLowerCase();
    var list = Array.isArray(history[key]) ? history[key] : [];
    var signature = productLine + "|" + raw.slice(0, 160);
    if (list[0] && list[0].signature === signature && Date.now() - new Date(list[0].createdAt).getTime() < 3000) return;
    list.unshift({
      id: "LH" + Date.now().toString(36).toUpperCase(),
      productLine: productLine,
      summary: raw.slice(0, 360),
      signature: signature,
      createdAt: new Date().toISOString()
    });
    history[key] = list.slice(0, 20);
    writeJson("local", STORAGE.history, history);
  }

  function clearHistory() {
    var user = getCurrentUser();
    if (!user) return;
    var history = getHistoryMap();
    history[String(user.email).toLowerCase()] = [];
    writeJson("local", STORAGE.history, history);
    renderMemberCenter();
    var message = document.querySelector("[data-member-center-message]");
    if (message) {
      message.textContent = t("historyCleared");
      message.className = "member-message is-visible is-success";
    }
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    try {
      return new Intl.DateTimeFormat(getLanguage() === "en" ? "en-US" : "zh-CN", {
        year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
      }).format(new Date(value));
    } catch (ignore) {
      return String(value || "");
    }
  }

  function formatRegion(value) {
    var legacy = {
      "中国大陆": "CN",
      "中国香港": "HK",
      "中国澳门": "MO",
      "中国台湾": "TW",
      "其他": "OTHER"
    };
    var code = legacy[value] || String(value || "").toUpperCase();
    if (code === "OTHER") return regionUiText("other", getLanguage());
    return /^[A-Z]{2}$/.test(code) ? regionDisplayName(code, getLanguage()) : value;
  }

  function renderMemberCenter() {
    if (currentFile() !== "member-center.html") return;
    var user = getCurrentUser();
    if (!user) return;
    var welcome = document.querySelector("[data-member-welcome]");
    if (welcome) welcome.textContent = t("welcomePrefix") + user.name;
    var profile = document.querySelector("[data-member-profile]");
    if (profile) {
      var fields = [
        [t("company"), user.company],
        [t("department"), user.department],
        [t("name"), user.name],
        [t("email"), user.email],
        [t("phone"), user.phone],
        [t("region"), formatRegion(user.region)],
        [t("createdAt"), formatDate(user.createdAt)]
      ];
      profile.innerHTML = fields.map(function (field) {
        return '<div class="member-profile-row"><dt>' + escapeHtml(field[0]) + '</dt><dd>' + escapeHtml(field[1] || "—") + '</dd></div>';
      }).join("");
    }
    var historyTarget = document.querySelector("[data-member-history]");
    if (historyTarget) {
      var history = getHistoryMap()[String(user.email).toLowerCase()] || [];
      if (!history.length) {
        historyTarget.innerHTML = '<div class="member-history-empty">' + escapeHtml(t("noHistory")) + '</div>';
      } else {
        historyTarget.innerHTML = '<div class="member-history-list">' + history.map(function (entry) {
          return '<article class="member-history-item"><strong>' + escapeHtml(entry.productLine || t("historyUnknownLine")) + '</strong>' +
            '<p>' + escapeHtml(entry.summary) + '</p><time>' + escapeHtml(formatDate(entry.createdAt)) + '</time></article>';
        }).join("") + '</div>';
      }
    }
  }

  function protectedAction(target) {
    var anchor = target.closest && target.closest("a[href]");
    if (anchor) {
      var href = anchor.getAttribute("href") || "";
      var clean = href.split("?")[0].split("#")[0].split("/").pop();
      if (PROTECTED_PAGES[clean]) return { service: PROTECTED_PAGES[clean], returnUrl: safeReturn(href, clean) };
      if (anchor.classList.contains("certification-file-link") ||
          (anchor.classList.contains("certification-report-action") && /\.pdf(?:$|[?#])/i.test(href))) {
        return { service: "certificate", returnUrl: currentRelativeUrl() };
      }
    }
    return null;
  }

  function bindEvents() {
    document.addEventListener("click", function (event) {
      var languageButton = event.target.closest && event.target.closest("[data-member-language]");
      if (languageButton) {
        event.preventDefault();
        setLanguage(languageButton.getAttribute("data-member-language"));
        return;
      }
      var passwordToggle = event.target.closest && event.target.closest("[data-member-password-toggle]");
      if (passwordToggle) {
        event.preventDefault();
        var input = document.getElementById(passwordToggle.getAttribute("data-member-password-toggle"));
        if (input) {
          var show = input.type === "password";
          input.type = show ? "text" : "password";
          passwordToggle.setAttribute("title", t(show ? "hidePassword" : "showPassword"));
          var icon = passwordToggle.querySelector(".material-symbols-outlined");
          if (icon) icon.textContent = show ? "visibility_off" : "visibility";
        }
        return;
      }
      var logoutButton = event.target.closest && event.target.closest("[data-member-logout]");
      if (logoutButton) {
        event.preventDefault();
        logout();
        return;
      }
      var clearButton = event.target.closest && event.target.closest("[data-member-clear-history]");
      if (clearButton) {
        event.preventDefault();
        clearHistory();
        return;
      }
      if (!isAuthenticated()) {
        var action = protectedAction(event.target);
        if (action) {
          event.preventDefault();
          event.stopImmediatePropagation();
          redirectToLogin(action.service, action.returnUrl);
          return;
        }
      }
      var calculate = event.target.closest && event.target.closest("#calculate");
      if (calculate && isAuthenticated()) window.setTimeout(saveLifetimeHistory, 80);
    }, true);

    document.addEventListener("submit", function (event) {
      var form = event.target;
      if (form.matches("[data-member-login-form]")) {
        event.preventDefault();
        handleLogin(form);
      } else if (form.matches("[data-member-register-form]")) {
        event.preventDefault();
        handleRegistration(form);
      } else if (form.matches("[data-member-reset-form]")) {
        event.preventDefault();
        handlePasswordReset(form);
      }
    });

    window.addEventListener("storage", function (event) {
      if (!event.key || event.key === STORAGE.session || event.key === STORAGE.accounts || event.key.indexOf("lang") !== -1) {
        applyTranslations();
      }
    });
    window.addEventListener("ymin:languagechange", applyTranslations);
    window.addEventListener("ymin:language-ready", applyTranslations);
  }

  function init() {
    if (protectCurrentPage()) return;
    applyTranslations();
    if (!initialized) {
      initialized = true;
      bindEvents();
    }
    renderMemberCenter();
  }

  YMIN.member = {
    __loaded: true,
    init: init,
    isAuthenticated: isAuthenticated,
    getCurrentUser: getCurrentUser,
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    logout: logout,
    requireLogin: redirectToLogin,
    protectedPages: Object.assign({}, PROTECTED_PAGES)
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);
