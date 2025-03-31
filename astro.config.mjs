import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import path from 'path';

export default defineConfig({
  // INFO: remove after links filter feature
  output: 'server',
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
