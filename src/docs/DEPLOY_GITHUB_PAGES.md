# Deployment to GitHub Pages

This repository is configured to deploy automatically to GitHub Pages via GitHub Actions.

## Prerequisites

1.  **Repository Settings**:
    *   Go to **Settings** > **Pages**.
    *   Under **Build and deployment**, select **GitHub Actions** as the source.

2.  **Environment Variables** (Optional but recommended):
    *   If you have a connected Supabase project, go to **Settings** > **Secrets and variables** > **Actions**.
    *   Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
    *   If not provided, the app will run with stubs (mock mode).

## Workflow

1.  **Push to main**: Any push to the `main` branch triggers the workflow.
2.  **Build**:
    *   The `scripts/build.js` script runs.
    *   It determines the `VITE_BASE_PATH` automatically based on the repository name (e.g., `/repo-name/`).
    *   It builds the React app into `dist/app`.
    *   It generates a static `dist/index.html` (Landing Page).
    *   It generates `dist/404.html` to handle SPA deep links via the redirect hack.
3.  **Deploy**: The content of `dist/` is uploaded to GitHub Pages.

## Local Testing of Build

To test the build process locally:

```bash
npm install
export VITE_BASE_PATH=/my-repo/
npm run build
# Serve dist/ to verify
npx serve dist
```

## Structure on Pages

*   `https://user.github.io/repo/` -> Static Landing Page (Teaser/Threshold).
*   `https://user.github.io/repo/app/` -> React SPA Entry.
*   `https://user.github.io/repo/app/estate` -> Deep link (handled by 404.html redirect).
