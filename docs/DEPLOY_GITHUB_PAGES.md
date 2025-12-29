# Deploying to GitHub Pages

This repository builds a static home page at `/` and a Vite React app under `/app/` into a **single** output directory: `dist/`.

## 1) Enable GitHub Pages
1. Go to **Settings → Pages** for the repository.
2. Under **Build and deployment**, select **GitHub Actions** as the source.

## 2) Configure the workflow
This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

- installs dependencies with npm
- runs `npm run build`
- publishes `dist/` to GitHub Pages

No changes are required unless you want to rename the workflow.

## 3) Environment variables (client)
If your client requires environment variables, they must be prefixed with `VITE_` and configured as repository secrets and environment variables in GitHub Actions.

For GitHub Pages, you also need to set the base path so Vite emits assets under the repo prefix:

- `BASE_PATH=/<repo-name>/`

The workflow already sets this value automatically using the repository name.

## 4) What the build produces
Running `npm run build` generates:

```
dist/
  index.html            # static home
  assets/...            # static home assets
  app/
    index.html          # Vite SPA entry
    assets/...          # hashed Vite assets
  404.html              # GitHub Pages fallback redirect
```

## 5) Validate routes in production
After the deployment finishes, validate the routing:

1. Visit `/` and confirm the static home loads (no SPA router).
2. Visit `/app/` and confirm the React app loads.
3. Visit a deep link like `/app/portal/vault` and confirm it loads the app (GitHub Pages uses `404.html` fallback).
4. Confirm assets load:
   - `/assets/...` (static home assets)
   - `/app/assets/...` (Vite assets)
