import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const jsFiles = [
  "art.js",
  "game.js",
  "playwright.config.js",
  "scripts/validate.mjs",
  "tests/game.spec.js",
];

const requiredAssets = [
  "index.html",
  "style.css",
  "pixi-legacy.min.js",
  "art.js",
  "game.js",
  "mono.ttf",
  "pixel.ttf",
];

for (const file of requiredAssets) {
  const fullPath = path.join(root, file);
  if (!existsSync(fullPath)) {
    throw new Error(`Missing required asset: ${file}`);
  }
  const size = statSync(fullPath).size;
  if (size === 0) {
    throw new Error(`Required asset is empty: ${file}`);
  }
  console.log(`asset ok: ${file} (${size} bytes)`);
}

for (const file of jsFiles) {
  const fullPath = path.join(root, file);
  if (!existsSync(fullPath)) {
    throw new Error(`Missing JavaScript file: ${file}`);
  }
  execFileSync(process.execPath, ["--check", fullPath], { stdio: "inherit" });
  console.log(`syntax ok: ${file}`);
}
