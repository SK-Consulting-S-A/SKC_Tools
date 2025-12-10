#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const presetPath = path.join(root, "presets", "extensions.json");
const packagePath = path.join(root, "package.json");

function readJson(filePath) {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
}

function ensureStringArray(value) {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function main() {
    if (!fs.existsSync(presetPath)) {
        throw new Error(`Preset file not found at ${presetPath}`);
    }

    const preset = readJson(presetPath);
    if (!ensureStringArray(preset.extensions)) {
        throw new Error("presets/extensions.json must contain an 'extensions' string array.");
    }

    const extensions = Array.from(new Set(preset.extensions));

    const pkg = readJson(packagePath);
    pkg.contributes = pkg.contributes ?? {};
    pkg.contributes.extensionDependencies = extensions;
    pkg.contributes.extensionPack = extensions;

    fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log(`Synced ${extensions.length} extensions into package.json`);
}

main();

