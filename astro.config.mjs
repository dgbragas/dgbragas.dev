import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'path';

export default defineConfig({
  integrations: [react()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/tokens.scss" as *;',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
