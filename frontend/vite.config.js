import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 50 versions', 'ie >= 9'],
        }),
      ],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
