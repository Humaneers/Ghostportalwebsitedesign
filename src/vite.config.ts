import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // In development, we might want '/' but for build we want the repo base
  // We'll let the build script or env var set the base.
  // Default to '/app/' if not set, as per requirements.
  const basePath = process.env.VITE_BASE_PATH || '/app/';

  return {
    plugins: [react()],
    base: basePath,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    build: {
      outDir: 'dist/app',
      emptyOutDir: true, // We will manage cleaning dist in the build script
    },
    server: {
      historyApiFallback: true, // For dev server SPA routing
    }
  }
})
