# Deploying to Cloudflare Pages

This repo builds a static home page at `/` and a Vite React SPA under `/app/*` into a **single** output directory: `dist/`.

## 1) Create the Pages project
1. In Cloudflare Pages, click **Create a project**.
2. Connect the GitHub repository for this project.
3. Choose the **Production** branch you want to deploy.

## 2) Build settings
Use the following settings in the Pages build configuration:

- **Build command:** `npm run build`
- **Build output directory:** `dist`

## 3) Environment variables (client)
The current client build does **not** require any `VITE_*` variables.

If you add client environment variables later, they must be prefixed with `VITE_` (for example, `VITE_API_BASE_URL`) and configured in **Pages → Settings → Environment variables**.

## 4) What the build produces
Running `npm run build` generates:

```
dist/
  index.html            # static home
  assets/...            # static home assets
  app/
    index.html          # Vite SPA entry
    assets/...          # hashed Vite assets
  _redirects            # SPA fallback only for /app/*
  _headers              # caching + minimal security headers
```

## 5) Validate routes in production
After the first deployment finishes, validate the routing:

1. Visit `/` and confirm the static home loads with no SPA router.
2. Visit `/app/` and confirm the React SPA loads.
3. Visit a deep link like `/app/portal/vault` and confirm it renders the SPA (the `_redirects` rule handles this).
4. Confirm assets load:
   - `/assets/...` (static home assets)
   - `/app/assets/...` (Vite assets)

If any of these fail, re-check that your Pages settings match the **Build command** and **Build output directory** listed above.
