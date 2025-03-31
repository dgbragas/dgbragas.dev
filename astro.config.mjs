import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import path from 'path';

export default defineConfig({
  // INFO: remove after links filter feature
  output: 'server',
  adapter: vercel(),
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
