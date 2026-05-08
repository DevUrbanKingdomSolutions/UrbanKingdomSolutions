import { copyFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputDir = resolve(root, "www");
const staticFiles = ["index.html", "app.js", "styles.css"];

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

for (const file of staticFiles) {
  await copyFile(resolve(root, file), resolve(outputDir, file));
}

console.log(`Prepared ${staticFiles.length} web files for Capacitor in ${outputDir}`);
