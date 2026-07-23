/**
 * 解析最新 STEP 文件并缓存真实几何包络。
 *
 * 使用方式：
 *   npm install
 *   npm run build:cad-geometry
 *
 * 输出 data/cad-geometry.json，以 STEP 内容哈希作为主键；完全相同的文件只解析一次。
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const MODEL_INDEX = path.join(ROOT, "data", "cad-models.json");
const OUTPUT = path.join(ROOT, "data", "cad-geometry.json");

function loadOcctFactory() {
  try {
    return require("occt-import-js");
  } catch (error) {
    const customModule = process.env.YMIN_OCCT_MODULE;
    if (customModule) return require(customModule);
    throw new Error("缺少 occt-import-js。请先运行 npm install，或设置 YMIN_OCCT_MODULE。", { cause: error });
  }
}

function rounded(value) {
  return Math.round(value * 1000) / 1000;
}

function parseGeometry(occt, sourcePath) {
  const bytes = new Uint8Array(fs.readFileSync(sourcePath));
  const result = occt.ReadStepFile(bytes, null);
  if (!result || !result.success || !Array.isArray(result.meshes) || !result.meshes.length) {
    throw new Error("STEP 解析失败");
  }

  const minimum = [Infinity, Infinity, Infinity];
  const maximum = [-Infinity, -Infinity, -Infinity];
  let vertices = 0;
  let triangles = 0;

  result.meshes.forEach((mesh) => {
    const positions = mesh.attributes.position.array;
    vertices += positions.length / 3;
    triangles += mesh.index.array.length / 3;
    for (let index = 0; index < positions.length; index += 3) {
      for (let axis = 0; axis < 3; axis += 1) {
        minimum[axis] = Math.min(minimum[axis], positions[index + axis]);
        maximum[axis] = Math.max(maximum[axis], positions[index + axis]);
      }
    }
  });

  const envelope = maximum.map((value, axis) => rounded(value - minimum[axis]));
  const sortedEnvelope = envelope.slice().sort((a, b) => a - b);
  return {
    status: "parsed",
    envelope,
    sortedEnvelope,
    minimum: minimum.map(rounded),
    maximum: maximum.map(rounded),
    parts: result.meshes.length,
    vertices,
    triangles,
  };
}

async function main() {
  if (!fs.existsSync(MODEL_INDEX)) throw new Error("请先运行 python build_cad_index.py 生成模型索引");
  const models = JSON.parse(fs.readFileSync(MODEL_INDEX, "utf8"));
  const existing = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, "utf8")) : {};
  const representatives = new Map();
  models.forEach((model) => {
    if (!representatives.has(model.fileHash)) representatives.set(model.fileHash, model);
  });

  const occt = await loadOcctFactory()();
  const output = {};
  let completed = 0;
  let reused = 0;
  let failed = 0;

  for (const [fileHash, model] of representatives) {
    if (existing[fileHash] && existing[fileHash].status === "parsed") {
      output[fileHash] = existing[fileHash];
      reused += 1;
    } else {
      try {
        output[fileHash] = {
          ...parseGeometry(occt, path.join(ROOT, ...model.step.split("/"))),
          source: model.step,
          fileHash,
        };
      } catch (error) {
        output[fileHash] = {
          status: "error",
          error: error.message,
          source: model.step,
          fileHash,
        };
        failed += 1;
      }
    }
    completed += 1;
    if (completed % 20 === 0 || completed === representatives.size) {
      process.stdout.write(`已处理 ${completed}/${representatives.size}\n`);
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + "\n", "utf8");
  process.stdout.write(`完成：${representatives.size} 个唯一几何，复用 ${reused}，失败 ${failed}\n`);
  process.stdout.write(`输出：${path.relative(ROOT, OUTPUT)}\n`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
