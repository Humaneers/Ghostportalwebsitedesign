import { execFileSync } from "node:child_process";
import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const staticDir = path.join(root, "apps", "web-static");

const viteBin = path.join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "vite.cmd" : "vite"
);

const assertExists = async (filePath, label) => {
  try {
    await access(filePath);
  } catch {
    throw new Error(`Missing ${label}: ${filePath}`);
  }
};

const build = async () => {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  execFileSync(viteBin, ["build"], { stdio: "inherit" });

  await cp(staticDir, distDir, { recursive: true });

  await assertExists(path.join(distDir, "index.html"), "static home index.html");
  await assertExists(path.join(distDir, "app", "index.html"), "app index.html");
  await assertExists(path.join(distDir, "404.html"), "404.html");
};

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
