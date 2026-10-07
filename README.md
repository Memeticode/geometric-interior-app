# geometric-interior-app

A small, framework-free web app for [@memeticode/geometric-interior](https://www.npmjs.com/package/@memeticode/geometric-interior). Pick a seed, controls, and camera, render a still, and download it or share a link to it (the config is stored in the URL hash).

No bundler: the browser loads the library as ES modules through an import map in `public/index.html`.

## Develop

```sh
npm install
npm run dev      # http://localhost:8080
```

The dev server serves `public/` and maps `/vendor/` to `node_modules`, so edits show up on reload.

## Build

```sh
npm run build    # writes dist/
npm run preview  # build and serve dist/ locally
```

The build copies `public/` into `dist/` and adds the library files listed in `scripts/vendor.js` under `dist/vendor/`. If a dependency upgrade adds or renames files, update that list and the import map together.

## Deploy to Cloudflare Pages

Connect the repository in Cloudflare Pages with:

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |

Or deploy from your machine with Wrangler: `npm run build && npx wrangler pages deploy dist`.
