"use strict";

const assert = require("assert");
const Engine = require("./life-calc-engine.js");

function close(actual, expected, tolerance = 1e-8) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `expected ${expected}, got ${actual}`);
}

function aluminum(overrides = {}) {
  return {
    ratedLifeHours: 2000, ratedTemperatureC: 105, ambientTemperatureC: 105,
    ratedVoltageV: 50, actualVoltageV: 50, ratedRippleMa: 350, actualRippleMa: 350,
    ratedTempRiseC: 5, temperatureBase: 2, temperatureCorrection: 1,
    rippleDivisorC: 5, voltageCoefficient: 0, minimumTemperatureC: 40,
    enduranceBasis: "rated_ripple", maxLifeHours: 131400, ...overrides
  };
}

function polymer(overrides = {}) {
  return {
    ratedLifeHours: 2000, ratedTemperatureC: 105, ambientTemperatureC: 105,
    ratedVoltageV: 16, actualVoltageV: 16, ratedRippleMa: 3000, actualRippleMa: 0,
    ratedTempRiseC: 20, minimumTemperatureC: 40, maxLifeHours: 131400, ...overrides
  };
}

function stacked(overrides = {}) {
  return {
    ratedLifeHours: 2000, ratedTemperatureC: 105, ratedRippleA: 2.125,
    actualRippleA: 0.22, ambientTemperatureC: 65, ratedTempRiseC: 20,
    maxLifeHours: 131400, ...overrides
  };
}

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test("页面包含8条独立产品线", () => {
  assert.equal(Object.keys(Engine.PRODUCT_LINES).length, 8);
});

test("液态铝电解在额定纹波条件下返回额定寿命", () => {
  close(Engine.calculateProduct("liquid", aluminum()).rawHours, 2000);
});

test("液态铝电解降低10℃时寿命翻倍", () => {
  close(Engine.calculateProduct("liquid", aluminum({ ambientTemperatureC: 95 })).rawHours, 4000);
});

test("液态铝电解拦截超温、超压和超纹波", () => {
  assert.equal(Engine.calculateProduct("liquid", aluminum({ ambientTemperatureC: 106 })).ok, false);
  assert.equal(Engine.calculateProduct("liquid", aluminum({ actualVoltageV: 51 })).ok, false);
  assert.equal(Engine.calculateProduct("liquid", aluminum({ actualRippleMa: 351 })).ok, false);
});

test("高分子固态降低10℃时寿命翻倍", () => {
  close(Engine.calculateProduct("polymer", polymer({ ambientTemperatureC: 95 })).rawHours, 4000);
});

test("叠层计算卡示例温升、本体温度和原始寿命正确", () => {
  const result = Engine.calculateProduct("stacked", stacked());
  close(result.details.actualRise, 0.21436678200692044);
  close(result.details.bodyTemperature, 65.21436678200692);
  close(result.rawHours, 195124.43411457943, 1e-6);
});

test("叠层结果超过15年时显示131400小时", () => {
  const result = Engine.calculateProduct("stacked", stacked());
  assert.equal(result.capped, true);
  assert.equal(result.hours, 131400);
  assert.equal(result.years, 15);
});

test("叠层拦截超额定纹波和超本体温度", () => {
  assert.equal(Engine.calculateProduct("stacked", stacked({ actualRippleA: 2.126 })).ok, false);
  assert.equal(Engine.calculateProduct("stacked", stacked({ ambientTemperatureC: 100, actualRippleA: 2 })).ok, false);
});

test("双电层平方根退化模型正确反解时间", () => {
  const result = Engine.calculateProduct("edlc", {
    degradationK: 0.1, initialLossPercent: 2, lossLimitPercent: 20, maxLifeHours: 1e9
  });
  close(result.rawHours, 32400);
});

test("锂离子电容日历和循环损伤按倒数相加", () => {
  const result = Engine.calculateProduct("lic", {
    calendarRefLifeHours: 10000, referenceTemperatureC: 70, ambientTemperatureC: 70,
    temperatureBase: 2, referenceVoltageV: 3.8, actualVoltageV: 3.8,
    voltageCoefficient: 0, referenceCycleLife: 1000000, cyclesPerHour: 100,
    maxLifeHours: 1e9
  });
  close(result.rawHours, 5000);
});

test("混合动力产品线使用独立入口并正常输出", () => {
  const result = Engine.calculateProduct("hybrid", aluminum({ ambientTemperatureC: 95 }));
  assert.equal(result.ok, true);
  close(result.rawHours, 4000);
});

test("薄膜电容参考条件返回参考寿命", () => {
  const result = Engine.calculateProduct("film", {
    referenceLifeHours: 100000, referenceHotspotC: 70, actualHotspotC: 70,
    referenceVoltageV: 450, actualVoltageV: 450, accelerationA: 10,
    voltageExponentN: 7, maxLifeHours: 1e9
  });
  close(result.rawHours, 100000);
});

test("高分子钽输出FIT与MTBF", () => {
  const result = Engine.calculateProduct("tantalum", {
    baseFit: 0.5, temperatureFactor: 2, voltageFactor: 3, environmentFactor: 1,
    ratedVoltageV: 10, actualVoltageV: 8
  });
  assert.equal(result.type, "reliability");
  close(result.fit, 3);
  close(result.mtbfHours, 1e9 / 3);
});

let passed = 0;
for (const { name, fn } of tests) {
  try {
    fn();
    passed += 1;
    process.stdout.write(`PASS  ${name}\n`);
  } catch (error) {
    process.stderr.write(`FAIL  ${name}\n${error.stack}\n`);
    process.exitCode = 1;
  }
}
process.stdout.write(`\n${passed}/${tests.length} tests passed.\n`);
