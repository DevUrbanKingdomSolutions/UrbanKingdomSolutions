import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const requiredWebFiles = ["index.html", "app.js", "styles.css", "manifest.webmanifest", "sw.js"];
const requiredAndroidPermissions = [
  "android.permission.INTERNET",
  "android.permission.CAMERA",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.POST_NOTIFICATIONS"
];
const requiredIosUsageKeys = [
  "NSCameraUsageDescription",
  "NSLocationWhenInUseUsageDescription",
  "NSPhotoLibraryAddUsageDescription",
  "NSPhotoLibraryUsageDescription"
];

async function fileExists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function requireMatch(label, actual, expected, failures) {
  if (actual !== expected) failures.push(`${label} should be ${expected}, found ${actual || "missing"}.`);
}

const failures = [];
const config = await readJson(resolve(root, "capacitor.config.json"));
const manifest = await readJson(resolve(root, "manifest.webmanifest"));
const packageJson = await readJson(resolve(root, "package.json"));

requireMatch("Capacitor appId", config.appId, "com.productioncrew.dashboard", failures);
requireMatch("Capacitor appName", config.appName, "Production Crew", failures);
requireMatch("Capacitor webDir", config.webDir, "www", failures);
requireMatch("Manifest name", manifest.name, "Production Crew", failures);

for (const file of requiredWebFiles) {
  if (!await fileExists(resolve(root, file))) failures.push(`Missing source web file: ${file}.`);
  if (!await fileExists(resolve(root, config.webDir || "www", file))) failures.push(`Missing prepared native web file: ${config.webDir || "www"}/${file}.`);
}

for (const icon of manifest.icons || []) {
  if (icon.src && !await fileExists(resolve(root, icon.src))) failures.push(`Manifest icon is missing: ${icon.src}.`);
}

const androidBuild = await readFile(resolve(root, "android/app/build.gradle"), "utf8");
const androidManifest = await readFile(resolve(root, "android/app/src/main/AndroidManifest.xml"), "utf8");
const androidStrings = await readFile(resolve(root, "android/app/src/main/res/values/strings.xml"), "utf8");
if (!androidBuild.includes(`applicationId "${config.appId}"`)) failures.push("Android applicationId does not match Capacitor appId.");
if (!androidBuild.includes(`versionName "${packageJson.version}"`)) failures.push(`Android versionName should match package version ${packageJson.version}.`);
if (!androidStrings.includes(`<string name="app_name">${config.appName}</string>`)) failures.push("Android app_name does not match Capacitor appName.");
for (const permission of requiredAndroidPermissions) {
  if (!androidManifest.includes(permission)) failures.push(`Android permission missing: ${permission}.`);
}

const iosInfo = await readFile(resolve(root, "ios/App/App/Info.plist"), "utf8");
if (!iosInfo.includes(`<string>${config.appName}</string>`)) failures.push("iOS display name does not match Capacitor appName.");
for (const key of requiredIosUsageKeys) {
  if (!iosInfo.includes(`<key>${key}</key>`)) failures.push(`iOS permission text missing: ${key}.`);
}

if (failures.length) {
  console.error("Native readiness check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Native readiness check passed.");
