import { execFileSync } from "node:child_process";
import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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

const redirectsContent =
  "/app/index.html  /app/index.html  200\n/app/*  /app/index.html  200\n";

const headersContent = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/app/index.html
  Cache-Control: public, max-age=0, must-revalidate

/app/assets/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

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
  await writeFile(path.join(distDir, "_redirects"), redirectsContent);
  await writeFile(path.join(distDir, "_headers"), headersContent);

  await assertExists(path.join(distDir, "index.html"), "static home index.html");
  await assertExists(path.join(distDir, "app", "index.html"), "app index.html");

  const redirectsPath = path.join(distDir, "_redirects");
  await assertExists(redirectsPath, "_redirects");
  const redirectsFile = await readFile(redirectsPath, "utf-8");
  if (!redirectsFile.includes("/app/*  /app/index.html  200")) {
    throw new Error("_redirects missing /app/* rule");
  }
};

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
