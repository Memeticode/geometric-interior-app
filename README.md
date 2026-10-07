# geometric-interior-app

A small, framework-free web app for [@memeticode/geometric-interior](https://www.npmjs.com/package/@memeticode/geometric-interior). Pick a seed, controls, and camera, render a still, and download it or share a link to it (the config is stored in the URL hash).

No bundler: the browser loads the library as ES modules through an import map in `public/index.html`.

## Develop

```sh
npm install
npm run dev      # http://localhost:8080
```

The dev server serves `public/` and maps `/vendor/` to `node_modules`, so edits show up on reload.

## Languages

The language picker in the header sets both the page language and the language of each image's generated title and descriptions. It supports the library's six locales: English, Spanish, French, Italian, Simplified Chinese, and Russian. On a first visit the page uses the browser's language if it's supported; after that it remembers the visitor's choice. A shared link always opens in the language it was made in.

All page text, including tooltips and the artist statement, lives in `public/i18n/<locale>.js`, with English in `en.js` as the reference. Every locale file has the same keys. The non-English files are machine-drafted and marked as unreviewed at the top; when a native speaker reviews one, edit it in place and remove that note.

## Build

```sh
npm run build    # writes dist/
npm run preview  # build and serve dist/ locally
```

The build copies `public/` into `dist/` and adds the library files listed in `scripts/vendor.js` under `dist/vendor/`. If a dependency upgrade adds or renames files, update that list and the import map together.

## Deployed via Cloudflare Pages

https://geometric-interior.org/

