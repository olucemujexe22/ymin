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

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

test("8条产品线均已配置", () => assert.equal(Object.keys(Engine.PRODUCT_LINES).length, 8));

test("液态铝电解额定纹波条件返回额定寿命", () => {
  const result = Engine.calculateProduct("liquid", aluminum());
  assert.equal(result.ok, true);
  close(result.rawHours, 2000);
});

test("液态铝电解降低10℃寿命翻倍", () => {
  close(Engine.calculateProduct("liquid", aluminum({ ambientTemperatureC: 95 })).rawHours, 4000);
});

test("液态铝电解超温、超压、超纹波均拦截", () => {
  assert.equal(Engine.calculateProduct("liquid", aluminum({ ambientTemperatureC: 106 })).ok, false);
  assert.equal(Engine.calculateProduct("liquid", aluminum({ actualVoltageV: 51 })).ok, false);
  assert.equal(Engine.calculateProduct("liquid", aluminum({ actualRippleMa: 351 })).ok, false);
});

test("高分子固态公开公式在降低10℃时翻倍", () => {
  const result = Engine.calculateProduct("polymer", polymer({ ambientTemperatureC: 95 }));
  close(result.rawHours, 4000);
});

test("叠层高分子使用独立产品线入口与同族候选公式", () => {
  const result = Engine.calculateProduct("stacked", polymer({ ambientTemperatureC: 95 }));
  close(result.rawHours, 4000);
});

test("混合动力铝电解使用铝电解可配置模型", () => {
  const result = Engine.calculateProduct("hybrid", aluminum({ ambientTemperatureC: 95 }));
  close(result.rawHours, 4000);
});

test("双电层平方根退化公式正确反解时间", () => {
  const result = Engine.calculateProduct("edlc", {
    degradationK: 0.1, initialLossPercent: 2, lossLimitPercent: 20, maxLifeHours: 1e9
  });
  close(result.rawHours, 32400);
});

test("双电层退化阈值不大于截距时拒绝计算", () => {
  const result = Engine.calculateProduct("edlc", {
    degradationK: 0.1, initialLossPercent: 20, lossLimitPercent: 20
  });
  assert.equal(result.ok, false);
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

test("薄膜电容公开公式在参考条件下返回参考寿命", () => {
  const result = Engine.calculateProduct("film", {
    referenceLifeHours: 100000, referenceHotspotC: 70, actualHotspotC: 70,
    referenceVoltageV: 450, actualVoltageV: 450, accelerationA: 10,
    voltageExponentN: 7, maxLifeHours: 1e9
  });
  close(result.rawHours, 100000);
});

test("薄膜电容温度与电压因子按公式计算", () => {
  const result = Engine.calculateProduct("film", {
    referenceLifeHours: 1000, referenceHotspotC: 80, actualHotspotC: 70,
    referenceVoltageV: 400, actualVoltageV: 200, accelerationA: 10,
    voltageExponentN: 2, maxLifeHours: 1e9
  });
  close(result.rawHours, 1000 * Math.E * 4);
});

test("高分子钽输出FIT与MTBF而非磨损寿命", () => {
  const result = Engine.calculateProduct("tantalum", {
    baseFit: 0.5, temperatureFactor: 2, voltageFactor: 3, environmentFactor: 1,
    ratedVoltageV: 10, actualVoltageV: 8
  });
  assert.equal(result.type, "reliability");
  close(result.fit, 3);
  close(result.mtbfHours, 1e9 / 3);
});

test("寿命结果按15年上限封顶但保留原始值", () => {
  const result = Engine.calculateProduct("polymer", polymer({ ambientTemperatureC: 40 }));
  assert.equal(result.hours, 131400);
  assert.equal(result.capped, true);
  assert.ok(result.rawHours > result.hours);
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
