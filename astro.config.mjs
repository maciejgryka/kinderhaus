// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import tidewave from 'tidewave/vite-plugin';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://maciejgryka.github.io',

  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss(), tidewave()]
  },

  integrations: [react()]
});