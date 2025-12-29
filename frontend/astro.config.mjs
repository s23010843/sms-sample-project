// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import analogjsangular from '@analogjs/astro-angular';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://sms-platform.example.com',
  base: '/',

  server: {
    port: 4321,
    host: true
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true
        }
      }
    }
  },

  integrations: [vue(), react(), sitemap(), analogjsangular(), svelte()]
});