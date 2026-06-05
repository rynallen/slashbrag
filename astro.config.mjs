// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://brag.example.com',
  output: 'static',

  build: {
    inlineStylesheets: 'always',
  },

  adapter: cloudflare(),
});