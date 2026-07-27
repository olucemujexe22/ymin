(function () {
  "use strict";

  const Engine = window.LifeCalcEngine;
  const byId = id => document.getElementById(id);
  const MAX_LIFE_HOURS = 131400;
  let lastResultText = "";

  const schemas = {
    liquid: {
      title: "液态铝电解电容器寿命推算",
      description: "根据额定寿命、温度、纹波自热和工作电压推算实际工况下的参考寿命。",
      note: "额定纹波与实际纹波应先换算到相同频率条件。",
      fields: aluminumFields(),
      details: {
        calculationTemp: detail("计算采用温度", 2, "℃"),
        rippleRatio: detail("纹波电流比", 4, ""),
        actualRise: detail("实际纹波温升", 4, "℃"),
        temperatureFactor: detail("温度影响系数", 4, ""),
        rippleFactor: detail("纹波影响系数", 4, ""),
        voltageFactor: detail("电压影响系数", 4, "")
      }
    },
    edlc: {
      title: "双电层超级电容容量退化寿命",
      description: "根据容量退化斜率、初始退化量和允许退化上限推算达到目标容量保持率的时间。",
      note: "退化参数应与所选系列、温度和工作电压条件一致。",
      fields: [
        field("lossLimitPercent", "允许容量退化上限", "%", 20, "容量保持率80%对应退化20%"),
        field("degradationK", "退化斜率 k", "%/√h", 0.1, "按系列退化数据填写", { advanced: true }),
        field("initialLossPercent", "初始退化 a", "%", 2, "按系列退化数据填写", { advanced: true }),
        maxLifeField()
      ],
      details: {
        degradationK: detail("退化斜率 k", 6, "%/√h"),
        initialLossPercent: detail("初始退化 a", 4, "%"),
        lossLimitPercent: detail("允许退化上限", 2, "%")
      }
    },
    polymer: {
      title: "高分子固态铝电解电容器寿命推算",
      description: "根据额定寿命、使用温度及纹波电流产生的自热推算参考寿命。",
      note: "额定纹波与实际纹波应使用同一频率基准。",
      fields: polymerFields(),
      details: {
        calculationTemp: detail("计算采用温度", 2, "℃"),
        actualRise: detail("实际纹波温升", 4, "℃"),
        temperatureFactor: detail("温度影响系数", 4, ""),
        selfHeatingFactor: detail("自热影响系数", 4, "")
      }
    },
    lic: {
      title: "混合型超级电容日历与循环寿命",
      description: "综合温度、电压引起的日历老化与充放电循环损伤，输出参考使用时间。",
      note: "循环寿命必须对应相同的电压窗口、温度和充放电电流条件。",
      fields: [
        field("calendarRefLifeHours", "参考日历寿命", "h", 10000, "参考条件下达到退化阈值的时间"),
        field("referenceTemperatureC", "参考温度", "℃", 70, ""),
        field("ambientTemperatureC", "实际温度", "℃", 55, ""),
        field("referenceVoltageV", "参考电压", "V", 3.8, ""),
        field("actualVoltageV", "实际电压", "V", 3.5, ""),
        field("referenceCycleLife", "参考循环寿命", "次", 1000000, ""),
        field("cyclesPerHour", "每小时循环次数", "次/h", 1, ""),
        field("temperatureBase", "温度影响底数", "", 2, "每降低10℃的寿命影响", { advanced: true }),
        field("voltageCoefficient", "电压影响系数", "1/V", 0, "", { advanced: true }),
        maxLifeField()
      ],
      details: {
        calendarLife: detail("当前条件日历寿命", 0, "h"),
        calendarDamage: detail("每小时日历损伤", 8, ""),
        cycleDamage: detail("每小时循环损伤", 8, "")
      }
    },
    hybrid: {
      title: "高分子混合动力铝电解电容器寿命推算",
      description: "根据额定寿命、温度、纹波自热和工作电压推算实际工况下的参考寿命。",
      note: "实际输入应与产品规格书中的额定条件保持一致。",
      fields: aluminumFields({ ratedVoltageV: 35, actualVoltageV: 28, ratedRippleMa: 2500, actualRippleMa: 1200 }),
      details: {
        calculationTemp: detail("计算采用温度", 2, "℃"),
        rippleRatio: detail("纹波电流比", 4, ""),
        actualRise: detail("实际纹波温升", 4, "℃"),
        temperatureFactor: detail("温度影响系数", 4, ""),
        rippleFactor: detail("纹波影响系数", 4, ""),
        voltageFactor: detail("电压影响系数", 4, "")
      }
    },
    stacked: {
      title: "叠层高分子固态铝电解电容器寿命推算",
      description: "根据最高使用温度、环境温度以及纹波电流产生的本体温升推算参考寿命。",
      note: "当原始推算结果超过15年时，页面显示上限为131,400小时。",
      fields: [
        field("ratedLifeHours", "保证寿命 L0", "h", 2000, "最高额定温度条件下的保证寿命"),
        field("ratedTemperatureC", "最高使用温度 T0", "℃", 105, ""),
        field("ratedRippleA", "额定最大纹波 I0", "A", 2.125, "参考目录书或承认书规定值"),
        field("actualRippleA", "实际等效纹波 I", "A", 0.22, ""),
        field("ambientTemperatureC", "环境温度 T", "℃", 65, ""),
        field("ratedTempRiseC", "额定纹波温升 ΔT0", "℃", 20, ""),
        maxLifeField()
      ],
      details: {
        rippleRatio: detail("纹波电流比 I/I0", 6, ""),
        actualRise: detail("实际温升 ΔT", 6, "℃"),
        bodyTemperature: detail("实际本体温度 Tx", 6, "℃"),
        temperatureFactor: detail("温度影响系数", 6, "")
      }
    },
    film: {
      title: "薄膜电容器热点温度与电压寿命",
      description: "根据参考寿命、热点温度和工作电压条件推算薄膜电容器参考寿命。",
      note: "实际热点温度应包含环境温度和工作电流产生的温升。",
      fields: [
        field("referenceLifeHours", "参考寿命 t1", "h", 100000, ""),
        field("referenceHotspotC", "参考热点温度 T1", "℃", 70, ""),
        field("actualHotspotC", "实际热点温度 T2", "℃", 60, ""),
        field("referenceVoltageV", "参考电压 V1", "V", 450, ""),
        field("actualVoltageV", "实际电压 V2", "V", 400, ""),
        field("accelerationA", "温度影响因子 A", "K", 10, "", { advanced: true }),
        field("voltageExponentN", "电压指数 n", "", 7, "", { advanced: true }),
        maxLifeField()
      ],
      details: {
        temperatureFactor: detail("温度影响系数", 6, ""),
        voltageFactor: detail("电压影响系数", 6, "")
      }
    },
    tantalum: {
      title: "导电高分子钽电解电容器可靠性评估",
      description: "根据基准失效率以及温度、电压、应用环境修正因子计算FIT和统计MTBF。",
      note: "FIT和MTBF是批量统计可靠性指标，不等同于单只产品的保证寿命。",
      fields: [
        field("ratedVoltageV", "额定电压", "V", 10, ""),
        field("actualVoltageV", "实际电压", "V", 8, ""),
        field("baseFit", "基准失效率", "FIT", 0.5, "参考产品可靠性数据", { advanced: true }),
        field("temperatureFactor", "温度修正因子 FT", "", 2, "", { advanced: true }),
        field("voltageFactor", "电压修正因子 FV", "", 3, "", { advanced: true }),
        field("environmentFactor", "应用环境因子 FE", "", 1, "", { advanced: true })
      ],
      details: {
        voltageRatio: detail("工作电压比", 4, "")
      }
    }
  };

  function detail(label, digits, unit) {
    return { label, digits, unit };
  }

  function field(key, label, unit, value, help, extra) {
    return { key, label, unit, value, help, ...(extra || {}) };
  }

  function selectField(key, label, value, options, extra) {
    return { key, label, value, options, type: "select", ...(extra || {}) };
  }

  function maxLifeField() {
    return field("maxLifeHours", "结果显示上限", "h", MAX_LIFE_HOURS, "15年，按8760h/年换算", { readonly: true });
  }

  function aluminumFields(overrides) {
    const values = {
      ratedLifeHours: 2000,
      ratedTemperatureC: 105,
      ambientTemperatureC: 55,
      ratedVoltageV: 50,
      actualVoltageV: 40,
      ratedRippleMa: 350,
      actualRippleMa: 230,
      ratedTempRiseC: 5,
      temperatureBase: 2,
      temperatureCorrection: 1,
      rippleDivisorC: 5,
      voltageCoefficient: 0,
      minimumTemperatureC: 40,
      ...(overrides || {})
    };
    return [
      field("ratedLifeHours", "额定寿命 Lr", "h", values.ratedLifeHours, ""),
      field("ratedTemperatureC", "最高额定温度 To", "℃", values.ratedTemperatureC, ""),
      field("ambientTemperatureC", "环境温度 Tx", "℃", values.ambientTemperatureC, ""),
      field("ratedVoltageV", "额定电压 Vr", "V", values.ratedVoltageV, ""),
      field("actualVoltageV", "实际电压 V", "V", values.actualVoltageV, ""),
      field("ratedRippleMa", "额定纹波 Io", "mArms", values.ratedRippleMa, "按频率系数折算"),
      field("actualRippleMa", "实际纹波 I", "mArms", values.actualRippleMa, "与额定纹波使用同一频率基准"),
      field("ratedTempRiseC", "额定纹波温升 ΔTo", "℃", values.ratedTempRiseC, "", { advanced: true }),
      field("temperatureBase", "温度影响底数 Bt", "", values.temperatureBase, "", { advanced: true }),
      field("temperatureCorrection", "温度修正系数 Kt", "", values.temperatureCorrection, "", { advanced: true }),
      field("rippleDivisorC", "纹波温升除数 A", "℃", values.rippleDivisorC, "", { advanced: true }),
      field("voltageCoefficient", "电压影响系数 Kv", "", values.voltageCoefficient, "", { advanced: true }),
      field("minimumTemperatureC", "计算温度下限", "℃", values.minimumTemperatureC, "", { advanced: true }),
      selectField("enduranceBasis", "耐久寿命基准", "rated_ripple", [
        ["rated_ripple", "额定温度 + 额定纹波"],
        ["rated_voltage", "额定温度 + 额定电压"]
      ], { advanced: true }),
      maxLifeField()
    ];
  }

  function polymerFields() {
    return [
      field("ratedLifeHours", "额定寿命 Lo", "h", 2000, ""),
      field("ratedTemperatureC", "最高额定温度 To", "℃", 105, ""),
      field("ambientTemperatureC", "环境温度 Tx", "℃", 55, ""),
      field("ratedVoltageV", "额定电压", "V", 16, ""),
      field("actualVoltageV", "实际电压", "V", 12, ""),
      field("ratedRippleMa", "额定纹波 Io", "mArms", 3000, "按频率系数折算"),
      field("actualRippleMa", "实际纹波 I", "mArms", 1500, ""),
      field("ratedTempRiseC", "额定纹波温升 ΔTo", "℃", 20, "", { advanced: true }),
      field("minimumTemperatureC", "计算温度下限", "℃", 40, "", { advanced: true }),
      maxLifeField()
    ];
  }

  function renderModel() {
    const key = byId("product-line").value;
    const schema = schemas[key];
    byId("model-title").textContent = schema.title;
    byId("model-description").textContent = schema.description;
    byId("model-note").textContent = schema.note;

    const basic = schema.fields.filter(item => !item.advanced);
    const advanced = schema.fields.filter(item => item.advanced);
    byId("parameter-fields").innerHTML = `
      <div class="parameter-group">
        <h3>规格与工况参数</h3>
        <div class="field-grid four-cols">${basic.map(renderField).join("")}</div>
      </div>
      ${advanced.length ? `<details class="advanced-settings">
        <summary>专业参数</summary>
        <div class="field-grid four-cols">${advanced.map(renderField).join("")}</div>
      </details>` : ""}`;
    byId("calculation-output").innerHTML = readyOutput(schema.title);
    setResultActions(false);
  }

  function renderField(item) {
    if (item.type === "select") {
      return `<label class="field"><span>${item.label}</span><select data-key="${item.key}">${
        item.options.map(option => `<option value="${option[0]}" ${option[0] === item.value ? "selected" : ""}>${option[1]}</option>`).join("")
      }</select>${item.help ? `<small>${item.help}</small>` : ""}</label>`;
    }
    const readonly = item.readonly ? " readonly aria-readonly=\"true\"" : "";
    return `<label class="field">
      <span>${item.label}</span>
      <div class="input-unit">
        <input type="number" step="any" data-key="${item.key}" value="${item.value}"${readonly}>
        <em>${item.unit || ""}</em>
      </div>
      ${item.help ? `<small>${item.help}</small>` : ""}
    </label>`;
  }

  function readInput() {
    const input = {};
    byId("parameter-fields").querySelectorAll("[data-key]").forEach(control => {
      input[control.dataset.key] = control.tagName === "SELECT" ? control.value : Number(control.value);
    });
    return input;
  }

  function calculate() {
    const productLine = byId("product-line").value;
    const schema = schemas[productLine];
    const input = readInput();
    const result = Engine.calculateProduct(productLine, input);
    if (!result.ok) {
      byId("calculation-output").innerHTML = `<div class="error-box"><strong>请检查以下输入：</strong><ul>${
        result.errors.map(item => `<li>${item}</li>`).join("")
      }</ul></div>${warningsHtml(result.warnings)}`;
      setResultActions(false);
      return;
    }

    if (result.type === "reliability") {
      byId("calculation-output").innerHTML = `
        <div class="result-summary">
          <div class="main-result"><span>工作条件失效率</span><strong>${format(result.fit, 4)} FIT</strong></div>
          <div><span>统计MTBF</span><strong>${format(result.mtbfHours, 0)} h</strong></div>
          <div><span>年等效</span><strong>${format(result.mtbfYears, 2)} 年</strong></div>
        </div>
        ${warningsHtml(result.warnings)}
        ${detailsHtml(schema, result.details)}`;
      updateReport(schema, input, result);
      setResultActions(true);
      return;
    }

    const prefix = result.capped ? "≥ " : "";
    byId("calculation-output").innerHTML = `
      <div class="result-summary">
        <div class="main-result"><span>预计寿命</span><strong>${prefix}${format(result.hours, 0)} h</strong></div>
        <div><span>原始推算值</span><strong>${format(result.rawHours, 0)} h</strong></div>
        <div><span>年等效（8760h/年）</span><strong>${prefix}${format(result.years, 2)} 年</strong></div>
      </div>
      ${warningsHtml(result.warnings)}
      ${detailsHtml(schema, result.details)}`;
    updateReport(schema, input, result);
    setResultActions(true);
  }

  function detailsHtml(schema, values) {
    const rows = Object.keys(schema.details || {}).filter(key => Number.isFinite(values[key])).map(key => {
      const meta = schema.details[key];
      return `<div><span>${meta.label}</span><strong>${format(values[key], meta.digits)}${meta.unit ? " " + meta.unit : ""}</strong></div>`;
    }).join("");
    if (!rows) return "";
    return `<div class="result-details"><h3>计算过程</h3><div class="calculation-steps">${rows}</div></div>`;
  }

  function readyOutput(title) {
    return `<div class="output-empty ready">
      <span>∑</span>
      <h3>${title}</h3>
      <p>填写或确认参数后，点击“开始计算”查看结果。</p>
    </div>`;
  }

  function warningsHtml(warnings) {
    if (!warnings || !warnings.length) return "";
    return `<div class="warning-box"><strong>结果说明</strong><ul>${
      warnings.map(item => `<li>${item}</li>`).join("")
    }</ul></div>`;
  }

  function updateReport(schema, input, result) {
    const productLineName = byId("product-line").selectedOptions[0].textContent.trim();
    const calculatedAt = new Date().toLocaleString("zh-CN", { hour12: false });
    const basicFields = schema.fields.filter(item => !item.advanced && !item.readonly);
    const advancedFields = schema.fields.filter(item => item.advanced && !item.readonly);
    const resultRows = reportResultRows(result);
    const detailRows = reportDetailRows(schema, result.details);
    const warnings = result.warnings || [];

    byId("print-report").innerHTML = `
      <div class="print-report-header">
        <div>
          <span>YMIN DESIGN TOOLS</span>
          <h1>电容寿命计算报告</h1>
        </div>
        <div class="print-report-time">计算时间<br><strong>${escapeHtml(calculatedAt)}</strong></div>
      </div>
      <div class="print-report-meta">
        <div><span>产品线</span><strong>${escapeHtml(productLineName)}</strong></div>
        <div><span>计算项目</span><strong>${escapeHtml(schema.title)}</strong></div>
      </div>
      ${reportParameterSection("产品参数与实际工况", basicFields, input)}
      ${advancedFields.length ? reportParameterSection("专业计算参数", advancedFields, input) : ""}
      <section class="print-report-section">
        <h2>计算结果</h2>
        <div class="print-result-grid">${resultRows.map(reportResultCard).join("")}</div>
      </section>
      ${detailRows.length ? `<section class="print-report-section">
        <h2>主要计算过程</h2>
        <table class="print-report-table"><tbody>${detailRows.map(reportTableRow).join("")}</tbody></table>
      </section>` : ""}
      <section class="print-report-section">
        <h2>校验信息</h2>
        ${warnings.length
          ? `<ul class="print-report-warnings">${warnings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
          : `<p class="print-report-ok">本次输入未触发超温、过压、纹波超限等校验警告。</p>`}
      </section>
      <div class="print-report-disclaimer">
        <strong>结果说明：</strong>本报告根据页面中填写的产品参数与实际工况生成，计算结果仅供设计选型和工况分析参考，不构成产品寿命承诺。实际应用请结合产品规格书、散热、安装及环境应力综合判断。
      </div>
      <div class="print-report-footer"><span>永铭电子 · 电容寿命计算工具</span><span>报告由系统自动生成</span></div>`;

    lastResultText = buildReportText(
      productLineName,
      schema,
      calculatedAt,
      basicFields,
      advancedFields,
      input,
      resultRows,
      detailRows,
      warnings
    );
  }

  function reportParameterSection(title, fields, input) {
    return `<section class="print-report-section">
      <h2>${escapeHtml(title)}</h2>
      <table class="print-report-table"><tbody>${
        fields.map(item => reportTableRow([item.label, reportFieldValue(item, input[item.key])])).join("")
      }</tbody></table>
    </section>`;
  }

  function reportResultRows(result) {
    if (result.type === "reliability") {
      return [
        ["工作条件失效率", `${format(result.fit, 4)} FIT`],
        ["统计MTBF", `${format(result.mtbfHours, 0)} h`],
        ["年等效", `${format(result.mtbfYears, 2)} 年`]
      ];
    }
    const prefix = result.capped ? "≥ " : "";
    return [
      ["预计寿命", `${prefix}${format(result.hours, 0)} h`],
      ["原始推算值", `${format(result.rawHours, 0)} h`],
      ["年等效（8760h/年）", `${prefix}${format(result.years, 2)} 年`]
    ];
  }

  function reportDetailRows(schema, values) {
    return Object.keys(schema.details || {})
      .filter(key => Number.isFinite(values[key]))
      .map(key => {
        const meta = schema.details[key];
        return [meta.label, `${format(values[key], meta.digits)}${meta.unit ? " " + meta.unit : ""}`];
      });
  }

  function reportResultCard(row) {
    return `<div><span>${escapeHtml(row[0])}</span><strong>${escapeHtml(row[1])}</strong></div>`;
  }

  function reportTableRow(row) {
    return `<tr><th>${escapeHtml(row[0])}</th><td>${escapeHtml(row[1])}</td></tr>`;
  }

  function reportFieldValue(item, value) {
    let display = value;
    if (item.type === "select") {
      const selected = item.options.find(option => option[0] === value);
      display = selected ? selected[1] : value;
    } else if (Number.isFinite(value)) {
      display = format(value, 8);
    }
    return `${display}${item.unit ? " " + item.unit : ""}`;
  }

  function buildReportText(productLineName, schema, calculatedAt, basicFields, advancedFields, input, resultRows, detailRows, warnings) {
    const lines = [
      "永铭电子｜电容寿命计算报告",
      `产品线：${productLineName}`,
      `计算项目：${schema.title}`,
      `计算时间：${calculatedAt}`,
      "",
      "一、产品参数与实际工况",
      ...basicFields.map(item => `${item.label}：${reportFieldValue(item, input[item.key])}`)
    ];

    if (advancedFields.length) {
      lines.push("", "二、专业计算参数", ...advancedFields.map(item => `${item.label}：${reportFieldValue(item, input[item.key])}`));
    }
    lines.push(
      "",
      "三、计算结果",
      ...resultRows.map(row => `${row[0]}：${row[1]}`)
    );
    if (detailRows.length) {
      lines.push("", "四、主要计算过程", ...detailRows.map(row => `${row[0]}：${row[1]}`));
    }
    lines.push(
      "",
      "五、校验信息",
      ...(warnings.length ? warnings : ["本次输入未触发超温、过压、纹波超限等校验警告。"]),
      "",
      "结果说明：本报告根据页面中填写的产品参数与实际工况生成，计算结果仅供设计选型和工况分析参考，不构成产品寿命承诺。"
    );
    return lines.join("\n");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function setResultActions(enabled) {
    byId("copy-result").disabled = !enabled;
    byId("print-result").disabled = !enabled;
    if (!enabled) {
      lastResultText = "";
      byId("print-report").innerHTML = "";
    }
  }

  async function copyResult() {
    if (!lastResultText) return;
    try {
      await navigator.clipboard.writeText(lastResultText);
    } catch (error) {
      const temporary = document.createElement("textarea");
      temporary.value = lastResultText;
      temporary.style.position = "fixed";
      temporary.style.opacity = "0";
      document.body.appendChild(temporary);
      temporary.select();
      document.execCommand("copy");
      temporary.remove();
    }
    const button = byId("copy-result");
    const original = button.textContent;
    button.textContent = "已复制";
    window.setTimeout(() => { button.textContent = original; }, 1400);
  }

  function format(value, digits) {
    return Number(value).toLocaleString("zh-CN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits
    });
  }

  byId("product-line").addEventListener("change", renderModel);
  byId("calculate").addEventListener("click", calculate);
  byId("reset").addEventListener("click", renderModel);
  byId("copy-result").addEventListener("click", copyResult);
  byId("print-result").addEventListener("click", () => {
    if (lastResultText) window.print();
  });

  renderModel();
})();
