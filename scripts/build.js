// Copies public/ and the vendored library files into dist/ for static hosting.
import { cp, rm } from 'node:fs/promises';
import { vendor } from './vendor.js';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);

await rm(dist, { recursive: true, force: true });
await cp(new URL('public/', root), dist, { recursive: true });

for (const [to, from] of Object.entries(vendor)) {
    await cp(new URL(`node_modules/${from}`, root), new URL(`vendor/${to}`, dist), {
        recursive: true,
        // Type declarations and source maps aren't needed in the browser.
        filter: src => !/\.d\.ts$|\.map$/.test(src),
    });
}

console.log('Built dist/');
