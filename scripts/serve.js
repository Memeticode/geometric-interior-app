// Local dev server: serves public/, and /vendor/ straight from node_modules,
// so edits show up on reload without a build step. No dependencies.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { vendor } from './vendor.js';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const modulesDir = fileURLToPath(new URL('../node_modules/', import.meta.url));
const port = Number(process.env.PORT) || 8080;

const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
};

// Resolves a URL path to a file inside `dir`, or null if it escapes it.
function within(dir, path) {
    const file = normalize(join(dir, path));
    return file.startsWith(dir.endsWith(sep) ? dir : dir + sep) ? file : null;
}

function resolve(path) {
    if (path.startsWith('/vendor/')) {
        const rest = path.slice('/vendor/'.length);
        for (const [to, from] of Object.entries(vendor)) {
            if (to.endsWith('/') ? rest.startsWith(to) : rest === to) {
                return within(modulesDir, from + rest.slice(to.length));
            }
        }
        return null;
    }
    return within(publicDir, path.endsWith('/') ? path + 'index.html' : path);
}

createServer(async (req, res) => {
    const file = resolve(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try {
        if (!file) throw new Error();
        const body = await readFile(file);
        res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
        res.end(body);
    } catch {
        res.writeHead(404).end('Not found');
    }
}).listen(port, () => console.log(`Serving on http://localhost:${port}`));
