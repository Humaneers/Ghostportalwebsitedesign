import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuration
// You should set this env var in your CI or local environment
// Example: '/my-repo/'
const REPO_BASE = process.env.VITE_BASE_PATH ? process.env.VITE_BASE_PATH.replace(/\/app\/$/, '/') : '/'; 
// If VITE_BASE_PATH is /repo/app/, REPO_BASE is /repo/

console.log(`Building for Base: ${REPO_BASE}`);
console.log(`App Base: ${REPO_BASE}app/`);

// 1. Clean dist
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// 2. Build Vite App
console.log('Running Vite Build...');
try {
  // We pass VITE_BASE_PATH to the build
  execSync(`npx vite build --base=${REPO_BASE}app/`, { stdio: 'inherit', cwd: rootDir });
} catch (e) {
  console.error('Build failed', e);
  process.exit(1);
}

// 3. Create Static Home (index.html)
const staticHomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Centurions Society</title>
    <style>
        body { margin: 0; background: #F5F2ED; color: #1A1A1B; font-family: 'Times New Roman', serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
        .ticker { position: absolute; top: 1rem; right: 1rem; font-family: monospace; font-size: 12px; letter-spacing: 0.1em; }
        .hero { font-size: 2rem; margin-bottom: 2rem; text-align: center; }
        .cta { font-family: monospace; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; color: #B87333; border: 1px solid #B87333; padding: 1rem 2rem; transition: all 0.3s; }
        .cta:hover { background: #B87333; color: #F5F2ED; }
    </style>
</head>
<body>
    <div class="ticker">001 / 881</div>
    <div class="hero">
        Centurions Society
        <div style="font-size: 1rem; opacity: 0.5; margin-top: 1rem; font-family: monospace;">The signal is waiting.</div>
    </div>
    <a href="${REPO_BASE}app/estate" class="cta">Request Consideration</a>
</body>
</html>
`;
fs.writeFileSync(path.join(distDir, 'index.html'), staticHomeHtml);

// 4. Create 404.html for SPA Fallback
const notFoundHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Store the current path
      sessionStorage.redirect = window.location.href;
      // Redirect to the app base
      window.location.replace("${REPO_BASE}app/");
    </script>
  </head>
  <body>
  </body>
</html>
`;
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

console.log('Build Complete. Output in /dist');
console.log(' - /dist/index.html (Static Home)');
console.log(' - /dist/app/ (SPA)');
