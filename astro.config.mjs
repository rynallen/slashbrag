// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://brag.example.com',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
});
