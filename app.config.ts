import { defineConfig } from '@solidjs/start/config';

// https://docs.solidjs.com/solid-start/building-your-application/route-prerendering
export default defineConfig({
  server: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      ignore: ['/helloworld'],
    },
  },
});
