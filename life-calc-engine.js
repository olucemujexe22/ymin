(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LifeCalcEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const HOURS_PER_YEAR = 8760;
  const DEFAULT_MAX_HOURS = 15 * HOURS_PER_YEAR;
  const EPSILON = 1e-12;

  const PRODUCT_LINES = {
    liquid: { name: "液态铝电解电容器", model: "aluminum", review: "待工程确认系列/封装系数" },
    edlc: { name: "双电层超级电容", model: "edlc", review: "必须填写系列退化试验系数" },
    polymer: { name: "高分子固态铝电解电容器", model: "polymer", review: "公开公式，待工程确认适用系列" },
    lic: { name: "混合型超级电容（锂离子电容）", model: "lic", review: "工程拟合模型，必须填写日历/循环数据" },
    hybrid: { name: "高分子混合动力铝电解电容器", model: "aluminum", review: "公开公式，待工程确认系列系数" },
    stacked: { name: "叠层高分子固态铝电解电容器", model: "polymer", review: "公开公式，待工程确认封装适用性" },
    film: { name: "薄膜电容器", model: "film", review: "公开公式，A、n必须按系列确认" },
    tantalum: { name: "导电高分子钽电解电容器", model: "tantalum", review: "可靠性模型，非磨损寿命模型" }
  };

  function finite(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

  function requireNumber(input, key, label, options, errors) {
    const value = Number(input[key]);
    const settings = options || {};
    if (!Number.isFinite(value)) {
      errors.push(`${label}必须为有效数字。`);
    } else if (settings.positive && value <= 0) {
      errors.push(`${label}必须大于0。`);
    } else if (settings.nonNegative && value < 0) {
      errors.push(`${label}不能小于0。`);
    }
    return value;
  }

  function cappedLife(rawHours, maxHours) {
    const cap = finite(maxHours) && maxHours > 0 ? maxHours : DEFAULT_MAX_HOURS;
    return {
      rawHours,
      hours: Math.min(rawHours, cap),
      years: Math.min(rawHours, cap) / HOURS_PER_YEAR,
      capped: rawHours > cap,
      maxHours: cap
    };
  }

  function calculateAluminum(input) {
    const errors = [];
    const warnings = [];
    const ratedLife = requireNumber(input, "ratedLifeHours", "额定寿命", { positive: true }, errors);
    const ratedTemp = requireNumber(input, "ratedTemperatureC", "最高额定温度", {}, errors);
    const ambient = requireNumber(input, "ambientTemperatureC", "环境温度", {}, errors);
    const ratedRipple = requireNumber(input, "ratedRippleMa", "额定纹波电流", { positive: true }, errors);
    const actualRipple = requireNumber(input, "actualRippleMa", "实际纹波电流", { nonNegative: true }, errors);
    const ratedRise = requireNumber(input, "ratedTempRiseC", "额定纹波温升", { nonNegative: true }, errors);
    const base = requireNumber(input, "temperatureBase", "温度加速底数", { positive: true }, errors);
    const correction = requireNumber(input, "temperatureCorrection", "温度修正系数", { positive: true }, errors);
    const rippleDivisor = requireNumber(input, "rippleDivisorC", "纹波温升加速除数", { positive: true }, errors);
    const ratedVoltage = requireNumber(input, "ratedVoltageV", "额定电压", { positive: true }, errors);
    const actualVoltage = requireNumber(input, "actualVoltageV", "实际电压", { nonNegative: true }, errors);
    const voltageCoefficient = requireNumber(input, "voltageCoefficient", "电压指数系数", { nonNegative: true }, errors);
    const minimumTemp = requireNumber(input, "minimumTemperatureC", "计算温度下限", {}, errors);

    if (ambient > ratedTemp) errors.push("环境温度超过最高额定温度。");
    if (actualRipple > ratedRipple) errors.push("实际纹波电流超过额定纹波电流。");
    if (actualVoltage > ratedVoltage) errors.push("实际电压超过额定电压。");
    if (base <= 1) errors.push("温度加速底数必须大于1。");
    if (errors.length) return { ok: false, errors, warnings };

    const calculationTemp = Math.max(ambient, minimumTemp);
    if (ambient < minimumTemp) warnings.push(`环境温度低于${minimumTemp}℃，按${minimumTemp}℃计算。`);
    if (voltageCoefficient > 0) warnings.push("电压指数项不是所有系列通用，须由工程确认后启用。");

    const rippleRatio = actualRipple / ratedRipple;
    const actualRise = ratedRise * rippleRatio * rippleRatio;
    const temperatureFactor = Math.pow(base, correction * (ratedTemp - calculationTemp) / 10);
    const enduranceBasis = input.enduranceBasis === "rated_voltage" ? "rated_voltage" : "rated_ripple";
    const rippleExponent = enduranceBasis === "rated_ripple"
      ? (ratedRise - actualRise) / rippleDivisor
      : -actualRise / rippleDivisor;
    const rippleFactor = Math.pow(2, rippleExponent);
    const voltageFactor = Math.pow(2, voltageCoefficient * (1 - actualVoltage / ratedVoltage));
    const rawHours = ratedLife * temperatureFactor * rippleFactor * voltageFactor;

    return {
      ok: true,
      type: "life",
      ...cappedLife(rawHours, Number(input.maxLifeHours)),
      errors,
      warnings,
      details: { calculationTemp, rippleRatio, actualRise, temperatureFactor, rippleFactor, voltageFactor }
    };
  }

  function calculatePolymer(input) {
    const errors = [];
    const warnings = [];
    const ratedLife = requireNumber(input, "ratedLifeHours", "额定寿命", { positive: true }, errors);
    const ratedTemp = requireNumber(input, "ratedTemperatureC", "最高额定温度", {}, errors);
    const ambient = requireNumber(input, "ambientTemperatureC", "环境温度", {}, errors);
    const ratedRipple = requireNumber(input, "ratedRippleMa", "额定纹波电流", { positive: true }, errors);
    const actualRipple = requireNumber(input, "actualRippleMa", "实际纹波电流", { nonNegative: true }, errors);
    const ratedRise = requireNumber(input, "ratedTempRiseC", "额定纹波下温升", { nonNegative: true }, errors);
    const ratedVoltage = requireNumber(input, "ratedVoltageV", "额定电压", { positive: true }, errors);
    const actualVoltage = requireNumber(input, "actualVoltageV", "实际电压", { nonNegative: true }, errors);
    const minimumTemp = requireNumber(input, "minimumTemperatureC", "计算温度下限", {}, errors);

    if (ambient > ratedTemp) errors.push("环境温度超过最高额定温度。");
    if (actualRipple > ratedRipple) errors.push("实际纹波电流超过额定纹波电流。");
    if (actualVoltage > ratedVoltage) errors.push("实际电压超过额定电压。");
    if (errors.length) return { ok: false, errors, warnings };

    const calculationTemp = Math.max(ambient, minimumTemp);
    if (ambient < minimumTemp) warnings.push(`环境温度低于${minimumTemp}℃，按${minimumTemp}℃计算。`);
    const actualRise = ratedRise * Math.pow(actualRipple / ratedRipple, 2);
    const temperatureFactor = Math.pow(2, (ratedTemp - calculationTemp) / 10);
    const selfHeatingFactor = Math.pow(2, -actualRise / 10);
    const rawHours = ratedLife * temperatureFactor * selfHeatingFactor;

    return {
      ok: true,
      type: "life",
      ...cappedLife(rawHours, Number(input.maxLifeHours)),
      errors,
      warnings,
      details: { calculationTemp, actualRise, temperatureFactor, selfHeatingFactor }
    };
  }

  function calculateEdlc(input) {
    const errors = [];
    const warnings = ["k与a必须来自该系列在目标温度、电压下的退化试验，不能跨系列套用。"];
    const k = requireNumber(input, "degradationK", "退化斜率k", { positive: true }, errors);
    const a = requireNumber(input, "initialLossPercent", "初始退化a", { nonNegative: true }, errors);
    const limit = requireNumber(input, "lossLimitPercent", "允许退化上限", { positive: true }, errors);
    if (limit <= a) errors.push("允许退化上限必须大于初始退化a。");
    if (errors.length) return { ok: false, errors, warnings };
    const rawHours = Math.pow((limit - a) / k, 2);
    return {
      ok: true,
      type: "life",
      ...cappedLife(rawHours, Number(input.maxLifeHours)),
      errors,
      warnings,
      details: { degradationK: k, initialLossPercent: a, lossLimitPercent: limit }
    };
  }

  function calculateLic(input) {
    const errors = [];
    const warnings = ["该模型把日历老化与循环老化按线性损伤相加，需用本公司系列试验数据验证。"];
    const calendarRefLife = requireNumber(input, "calendarRefLifeHours", "参考日历寿命", { positive: true }, errors);
    const referenceTemp = requireNumber(input, "referenceTemperatureC", "参考温度", {}, errors);
    const actualTemp = requireNumber(input, "ambientTemperatureC", "实际温度", {}, errors);
    const tempBase = requireNumber(input, "temperatureBase", "温度加速底数", { positive: true }, errors);
    const referenceVoltage = requireNumber(input, "referenceVoltageV", "参考电压", { positive: true }, errors);
    const actualVoltage = requireNumber(input, "actualVoltageV", "实际电压", { positive: true }, errors);
    const voltageCoefficient = requireNumber(input, "voltageCoefficient", "电压加速系数", { nonNegative: true }, errors);
    const referenceCycles = requireNumber(input, "referenceCycleLife", "参考循环寿命", { positive: true }, errors);
    const cyclesPerHour = requireNumber(input, "cyclesPerHour", "每小时循环次数", { nonNegative: true }, errors);
    if (tempBase <= 1) errors.push("温度加速底数必须大于1。");
    if (errors.length) return { ok: false, errors, warnings };

    const calendarLife = calendarRefLife
      * Math.pow(tempBase, (referenceTemp - actualTemp) / 10)
      * Math.exp(voltageCoefficient * (referenceVoltage - actualVoltage));
    const calendarDamage = 1 / calendarLife;
    const cycleDamage = cyclesPerHour / referenceCycles;
    const rawHours = 1 / (calendarDamage + cycleDamage);
    return {
      ok: true,
      type: "life",
      ...cappedLife(rawHours, Number(input.maxLifeHours)),
      errors,
      warnings,
      details: { calendarLife, calendarDamage, cycleDamage }
    };
  }

  function calculateFilm(input) {
    const errors = [];
    const warnings = ["A、n为系列加速因子；模型未覆盖湿度、机械应力等环境影响。"];
    const referenceLife = requireNumber(input, "referenceLifeHours", "参考寿命t₁", { positive: true }, errors);
    const referenceTemp = requireNumber(input, "referenceHotspotC", "参考热点温度T₁", {}, errors);
    const actualTemp = requireNumber(input, "actualHotspotC", "实际热点温度T₂", {}, errors);
    const referenceVoltage = requireNumber(input, "referenceVoltageV", "参考电压V₁", { positive: true }, errors);
    const actualVoltage = requireNumber(input, "actualVoltageV", "实际电压V₂", { positive: true }, errors);
    const A = requireNumber(input, "accelerationA", "温度加速因子A", { positive: true }, errors);
    const n = requireNumber(input, "voltageExponentN", "电压指数n", { positive: true }, errors);
    if (errors.length) return { ok: false, errors, warnings };
    const temperatureFactor = Math.exp((referenceTemp - actualTemp) / A);
    const voltageFactor = Math.pow(referenceVoltage / actualVoltage, n);
    const rawHours = referenceLife * temperatureFactor * voltageFactor;
    return {
      ok: true,
      type: "life",
      ...cappedLife(rawHours, Number(input.maxLifeHours)),
      errors,
      warnings,
      details: { temperatureFactor, voltageFactor }
    };
  }

  function calculateTantalum(input) {
    const errors = [];
    const warnings = ["该结果是统计可靠性参考，不代表单只电容的磨损寿命。"];
    const baseFit = requireNumber(input, "baseFit", "基准失效率", { positive: true }, errors);
    const tempFactor = requireNumber(input, "temperatureFactor", "温度修正因子", { positive: true }, errors);
    const voltageFactor = requireNumber(input, "voltageFactor", "电压修正因子", { positive: true }, errors);
    const environmentFactor = requireNumber(input, "environmentFactor", "环境/应用修正因子", { positive: true }, errors);
    const ratedVoltage = requireNumber(input, "ratedVoltageV", "额定电压", { positive: true }, errors);
    const actualVoltage = requireNumber(input, "actualVoltageV", "实际电压", { nonNegative: true }, errors);
    if (actualVoltage > ratedVoltage) errors.push("实际电压超过额定电压。");
    if (errors.length) return { ok: false, errors, warnings };
    const fit = baseFit * tempFactor * voltageFactor * environmentFactor;
    return {
      ok: true,
      type: "reliability",
      fit,
      mtbfHours: 1e9 / fit,
      mtbfYears: 1e9 / fit / HOURS_PER_YEAR,
      errors,
      warnings,
      details: { voltageRatio: actualVoltage / ratedVoltage }
    };
  }

  function calculateProduct(productLine, input) {
    const product = PRODUCT_LINES[productLine];
    if (!product) return { ok: false, errors: ["未知产品线。"], warnings: [] };
    switch (product.model) {
      case "aluminum": return calculateAluminum(input);
      case "polymer": return calculatePolymer(input);
      case "edlc": return calculateEdlc(input);
      case "lic": return calculateLic(input);
      case "film": return calculateFilm(input);
      case "tantalum": return calculateTantalum(input);
      default: return { ok: false, errors: ["该产品线尚未配置计算模型。"], warnings: [] };
    }
  }

  function round(value, digits) {
    const scale = Math.pow(10, digits || 0);
    return Math.round((value + EPSILON) * scale) / scale;
  }

  return {
    HOURS_PER_YEAR,
    DEFAULT_MAX_HOURS,
    PRODUCT_LINES,
    calculateProduct,
    calculateAluminum,
    calculatePolymer,
    calculateEdlc,
    calculateLic,
    calculateFilm,
    calculateTantalum,
    round
  };
});
