# create-solid-ssg
This an exercise in how to use [solidstart](https://start.solidjs.com) as a static site generator together with Clouldflare Pages [functions](https://developers.cloudflare.com/pages/functions/).

Deployed on Cloudflare Pages at https://create-solid-ssg.pages.dev/

> [!TIP]
> For SSR, use the `Solid` framework starter in `npm create cloudflare`.
> This setup avoids the `cloudflare-pages` preset which generates a [`_worker.js`](https://developers.cloudflare.com/pages/functions/advanced-mode/) for SSR.

### Steps to reproduce this repo
- `pnpm create solid` say yes `SolidStart`, then choose `Basic`
- `pnpm install wrangler`
- add/modify files as below

### package.json
```json
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "preview": "pnpm run build && npx wrangler pages dev",
    "ship": "pnpm run build && wrangler pages deploy"
  },
```

### wrangler.toml
```toml
#:schema node_modules/wrangler/config-schema.json
name = "create-solid-ssg"
compatibility_date = "2024-12-30"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".output/public"
```

### app.config.ts
```ts
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
```

### functions/helloworld.js
```js
// https://developers.cloudflare.com/pages/functions/get-started/#create-a-function
export function onRequest(context) {
  return new Response('Hello, world!');
}
```

### src/app.tsx
```tsx
<Router
  root={(props) => (
    <MetaProvider>
      <Title>SolidStart - Basic</Title>
      <a href="/">Index</a>
      <a href="/about">About</a>

      // NOTE target="_self" avoids client-side navigation
      // https://docs.solidjs.com/solid-router/reference/components/a#soft-navigation
      <a href="/helloworld" target="_self">
        helloworld function
      </a>

<Suspense>{props.children}</Suspense>
    </MetaProvider>
  )}
>
  <FileRoutes />
</Router>
```

### original motivation
- https://discord.com/channels/595317990191398933/1325149026156413000

### prerendering
- https://docs.solidjs.com/solid-start/building-your-application/route-prerendering
- https://github.com/solidjs/solid/discussions/686

### preset static
- https://discord.com/channels/722131463138705510/843551011825909760/1272458017983696897
- https://discord.com/channels/722131463138705510/1276808191228903456/1276814750499602495

### solid-router
- https://github.com/solidjs/solid-router
- https://github.com/solidjs/solid-router/pull/312
- https://hackmd.io/@0u1u3zEAQAO0iYWVAStEvw/Hk4vO2Az6#set-up-the-router

### vinxi
- https://vinxi.vercel.app/guide/why-vinxi.html (sad docs)
- https://www.brenelz.com/posts/building-a-react-metaframework-with-vinxi/
