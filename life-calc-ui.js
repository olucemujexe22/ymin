(function () {
  "use strict";

  const Engine = window.LifeCalcEngine;
  const byId = id => document.getElementById(id);

  const commonMax = {
    key: "maxLifeHours", label: "结果显示上限", unit: "h", value: 131400,
    help: "铝电解公开工具通常以15年（131,400h）作为估算上限。"
  };

  const modelSchemas = {
    liquid: {
      title: "液态铝电解：温度、纹波自热与可选电压项",
      formula: "L = Lr × Bt^[Kt(To−Tx)/10] × 2^[(ΔTo−ΔT)/A] × 2^[Kv(1−V/Vr)]",
      status: "候选公式｜待工程按封装/系列确认 Bt、Kt、ΔTo、A、Kv",
      source: "与公开铝电解寿命模型结构一致；电压项仅在工程确认时启用。",
      fields: aluminumFields()
    },
    edlc: {
      title: "双电层超级电容：容量退化阈值模型",
      formula: "ΔC = k√t + a　→　t = [(ΔClimit−a)/k]²",
      status: "公开退化模型｜k、a必须由各系列试验取得",
      source: "日本贵弥功技术说明给出平方根时间退化关系，并明确k受温度、电压和系列影响。",
      fields: [
        field("degradationK", "退化斜率 k", "%/√h", "", "必填：目标温度、电压下的系列试验拟合值"),
        field("initialLossPercent", "初始退化 a", "%", "", "必填：系列试验拟合截距"),
        field("lossLimitPercent", "允许容量退化上限", "%", 20, "例如容量保持率80%对应退化20%"),
        commonMax
      ]
    },
    polymer: {
      title: "高分子固态铝电解：10℃规则与纹波自热",
      formula: "L = Lo × 2^[(To−Tx)/10] × 2^(−ΔT/10)，ΔT = ΔTo × (I/Io)²",
      status: "公开公式｜待工程确认系列、频率系数和额定温升",
      source: "日本贵弥功导电高分子铝固态寿命资料公式。",
      fields: polymerFields()
    },
    lic: {
      title: "锂离子电容：日历老化 + 循环老化损伤模型",
      formula: "1/L = 1/Lcalendar(T,V) + cycles/hour ÷ Ncycle",
      status: "工程拟合候选｜无通用公开系数，必须用本公司试验数据标定",
      source: "友商公开资料提供浮充与循环试验点，但未给出可跨系列套用的统一公式。",
      fields: [
        field("calendarRefLifeHours", "参考日历寿命", "h", "", "参考温度、电压下达到退化阈值的时间"),
        field("referenceTemperatureC", "参考温度", "℃", "", ""),
        field("ambientTemperatureC", "实际温度", "℃", "", ""),
        field("temperatureBase", "温度加速底数", "", "", "每10℃的加速底数，由试验拟合"),
        field("referenceVoltageV", "参考电压", "V", "", ""),
        field("actualVoltageV", "实际电压", "V", "", ""),
        field("voltageCoefficient", "电压加速系数", "1/V", "", "由试验拟合；0代表暂不考虑电压差"),
        field("referenceCycleLife", "参考循环寿命", "次", "", "指定电压窗口、温度、电流下的循环次数"),
        field("cyclesPerHour", "每小时循环次数", "次/h", "", ""),
        commonMax
      ]
    },
    hybrid: {
      title: "高分子混合动力铝电解：温度与纹波自热模型",
      formula: "L = Lr × Bt^[Kt(To−Tx)/10] × Bt^[(ΔTo−ΔT)/10]",
      status: "公开公式｜Bt、Kt、ΔTo随系列和尺寸变化",
      source: "日本贵弥功混合型铝电解寿命资料明确按系列/尺寸给出Bt、Kt和温升。",
      fields: aluminumFields({ voltageCoefficient: 0 })
    },
    stacked: {
      title: "叠层高分子固态铝电解：固态高分子候选模型",
      formula: "L = Lo × 2^[(To−Tx)/10] × 2^(−ΔT/10)",
      status: "候选公式｜需工程确认叠层封装是否沿用及额定温升",
      source: "先沿用导电高分子铝固态公开模型作为评估入口，不宣称已适用于永铭叠层产品。",
      fields: polymerFields()
    },
    film: {
      title: "薄膜电容：热点温度与电压加速模型",
      formula: "t₂ = t₁ × exp[(T₁−T₂)/A] × (V₁/V₂)ⁿ",
      status: "公开公式｜A、n必须按介质与系列确认",
      source: "TDK薄膜电容数据表公开公式；热点温度应包含电流引起的自热。",
      fields: [
        field("referenceLifeHours", "参考寿命 t₁", "h", "", ""),
        field("referenceHotspotC", "参考热点温度 T₁", "℃", "", ""),
        field("actualHotspotC", "实际热点温度 T₂", "℃", "", "环境温度 + 实测/计算温升"),
        field("referenceVoltageV", "参考电压 V₁", "V", "", ""),
        field("actualVoltageV", "实际电压 V₂", "V", "", ""),
        field("accelerationA", "温度加速因子 A", "K", "", "系列专用参数"),
        field("voltageExponentN", "电压指数 n", "", "", "系列专用参数"),
        commonMax
      ]
    },
    tantalum: {
      title: "导电高分子钽：FIT / MTBF可靠性模型",
      formula: "FITuse = FITbase × FT × FV × FE　；　MTBF = 10⁹ / FITuse",
      status: "可靠性评估｜不输出伪“磨损寿命”",
      source: "友商资料将聚合物钽描述为无典型磨损失效，并使用电压、温度等条件修正失效率。",
      fields: [
        field("baseFit", "基准失效率", "FIT", "", "必须来自本系列可靠性报告"),
        field("temperatureFactor", "温度修正因子 FT", "", "", ""),
        field("voltageFactor", "电压修正因子 FV", "", "", ""),
        field("environmentFactor", "环境/应用因子 FE", "", 1, ""),
        field("ratedVoltageV", "额定电压", "V", "", ""),
        field("actualVoltageV", "实际电压", "V", "", "")
      ]
    }
  };

  function field(key, label, unit, value, help, extra) {
    return { key, label, unit, value, help, ...(extra || {}) };
  }

  function aluminumFields(overrides) {
    const voltageDefault = overrides && overrides.voltageCoefficient !== undefined
      ? overrides.voltageCoefficient : 0;
    return [
      field("ratedLifeHours", "额定寿命 Lr", "h", 2000, ""),
      field("ratedTemperatureC", "最高额定温度 To", "℃", 105, ""),
      field("ambientTemperatureC", "环境温度 Tx", "℃", 55, ""),
      field("ratedVoltageV", "额定电压 Vr", "V", 50, ""),
      field("actualVoltageV", "实际电压 V", "V", 50, ""),
      field("ratedRippleMa", "额定纹波 Io", "mArms", 350, "须先按频率系数折算到同一频率"),
      field("actualRippleMa", "实际纹波 I", "mArms", 230, ""),
      field("ratedTempRiseC", "额定纹波温升 ΔTo", "℃", 5, "由系列/尺寸试验确认"),
      field("temperatureBase", "温度加速底数 Bt", "", 2, ""),
      field("temperatureCorrection", "温度修正系数 Kt", "", 1, ""),
      field("rippleDivisorC", "纹波温升除数 A", "℃", 5, ""),
      field("voltageCoefficient", "电压指数 Kv", "", voltageDefault, "未确认时保持0"),
      field("minimumTemperatureC", "计算温度下限", "℃", 40, ""),
      { key: "enduranceBasis", label: "耐久寿命基准", type: "select", value: "rated_ripple", options: [
        ["rated_ripple", "额定温度 + 额定纹波"],
        ["rated_voltage", "额定温度 + 额定电压"]
      ] },
      commonMax
    ];
  }

  function polymerFields() {
    return [
      field("ratedLifeHours", "额定寿命 Lo", "h", 2000, ""),
      field("ratedTemperatureC", "最高额定温度 To", "℃", 105, ""),
      field("ambientTemperatureC", "环境温度 Tx", "℃", 55, ""),
      field("ratedVoltageV", "额定电压", "V", 16, ""),
      field("actualVoltageV", "实际电压", "V", 12, ""),
      field("ratedRippleMa", "额定纹波 Io", "mArms", 3000, "须按频率系数折算"),
      field("actualRippleMa", "实际纹波 I", "mArms", 1500, ""),
      field("ratedTempRiseC", "额定纹波下温升 ΔTo", "℃", 20, "系列专用参数"),
      field("minimumTemperatureC", "计算温度下限", "℃", 40, ""),
      commonMax
    ];
  }

  function renderModel() {
    const key = byId("product-line").value;
    const schema = modelSchemas[key];
    const product = Engine.PRODUCT_LINES[key];
    byId("model-title").textContent = schema.title;
    byId("formula-text").textContent = schema.formula;
    byId("model-status").textContent = schema.status;
    byId("model-source").textContent = schema.source;
    byId("parameter-fields").innerHTML = schema.fields.map(renderField).join("");
    byId("product-review").textContent = product.review;
    byId("calculation-output").innerHTML = emptyOutput();
  }

  function renderField(item) {
    if (item.type === "select") {
      return `<label class="field"><span>${item.label}</span><select data-key="${item.key}">${item.options.map(
        option => `<option value="${option[0]}" ${option[0] === item.value ? "selected" : ""}>${option[1]}</option>`
      ).join("")}</select></label>`;
    }
    const value = item.value === "" ? "" : ` value="${item.value}"`;
    const placeholder = item.value === "" ? " placeholder=\"由工程填写\"" : "";
    return `<label class="field">
      <span>${item.label}</span>
      <div class="input-unit"><input type="number" step="any" data-key="${item.key}"${value}${placeholder}><em>${item.unit || ""}</em></div>
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
    const result = Engine.calculateProduct(productLine, readInput());
    if (!result.ok) {
      byId("calculation-output").innerHTML = `<div class="error-box"><strong>暂不能计算，请补充或修正：</strong><ul>${
        result.errors.map(item => `<li>${item}</li>`).join("")
      }</ul></div>${warningsHtml(result.warnings)}`;
      return;
    }

    if (result.type === "reliability") {
      byId("calculation-output").innerHTML = `
        <div class="result-summary">
          <div class="main-result"><span>工作条件失效率</span><strong>${format(result.fit, 4)} FIT</strong></div>
          <div><span>统计平均无故障时间</span><strong>${format(result.mtbfHours, 0)} h</strong></div>
          <div><span>年等效</span><strong>${format(result.mtbfYears, 1)} 年</strong></div>
        </div>${warningsHtml(result.warnings)}
        <div class="result-details"><p>FIT表示每10⁹器件小时的预期失效数，不能解释为某一只产品必然工作到该时刻。</p></div>`;
      return;
    }

    const prefix = result.capped ? "≥ " : "";
    byId("calculation-output").innerHTML = `
      <div class="result-summary">
        <div class="main-result"><span>预计寿命（参考值）</span><strong>${prefix}${format(result.hours, 0)} h</strong></div>
        <div><span>年等效（8760h/年）</span><strong>${prefix}${format(result.years, 2)} 年</strong></div>
        <div><span>结果状态</span><strong>${result.capped ? "达到显示上限" : "公式正常输出"}</strong></div>
      </div>${warningsHtml(result.warnings)}
      <div class="result-details">
        <p>未封顶原始计算值：${format(result.rawHours, 2)} h。工程评估时请同时核对公式适用范围、参数来源、封装/系列和试验边界。</p>
      </div>`;
  }

  function emptyOutput() {
    return `<div class="output-empty"><span>∑</span><h3>等待工程参数</h3><p>空白项代表不能通用预设的系列系数，填写后再计算。</p></div>`;
  }

  function warningsHtml(warnings) {
    if (!warnings || !warnings.length) return "";
    return `<div class="warning-box"><strong>评估提示</strong><ul>${warnings.map(item => `<li>${item}</li>`).join("")}</ul></div>`;
  }

  function format(value, digits) {
    return Number(value).toLocaleString("zh-CN", { maximumFractionDigits: digits });
  }

  byId("product-line").addEventListener("change", renderModel);
  byId("calculate").addEventListener("click", calculate);
  byId("reset").addEventListener("click", renderModel);

  const mobileMenuToggle = byId("mobile-menu-toggle");
  const siteHeader = document.querySelector(".site-header");
  if (mobileMenuToggle && siteHeader) {
    mobileMenuToggle.addEventListener("click", () => {
      const open = siteHeader.classList.toggle("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", String(open));
      mobileMenuToggle.textContent = open ? "关闭" : "菜单";
    });
  }

  renderModel();
})();
