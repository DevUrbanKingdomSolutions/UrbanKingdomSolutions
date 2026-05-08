import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputDir = resolve(root, "www");
const staticFiles = ["index.html", "app.js", "styles.css", "manifest.webmanifest"];
const assetDirs = ["assets"];

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

for (const file of staticFiles) {
  await copyFile(resolve(root, file), resolve(outputDir, file));
}

for (const dir of assetDirs) {
  await cp(resolve(root, dir), resolve(outputDir, dir), { recursive: true });
}

console.log(`Prepared ${staticFiles.length} web files and ${assetDirs.length} asset folder for Capacitor in ${outputDir}`);
