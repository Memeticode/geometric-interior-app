// Library files served under /vendor/. Keys are paths under /vendor/,
// values are paths under node_modules/. A trailing slash maps a directory.
// The import map in public/index.html points at these paths.
export const vendor = {
    'geometric-interior/': '@memeticode/geometric-interior/dist/',
    'three/three.module.min.js': 'three/build/three.module.min.js',
    'three/three.core.min.js': 'three/build/three.core.min.js',
    'postprocessing/index.js': 'postprocessing/build/index.js',
};
