import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * BASE_PATH : chemin de publication sur GitHub Pages.
 *  - dépôt « <utilisateur>.github.io »  → "/"
 *  - dépôt de projet (ex. « portfolio ») → "/portfolio/"
 * En CI, il est fourni automatiquement par le workflow (actions/configure-pages).
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: base.endsWith('/') ? base : `${base}/`,
  plugins: [react()],
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
});
