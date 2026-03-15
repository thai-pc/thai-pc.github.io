import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thai-pc.github.io',
  //base: '/fluxfiles',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
