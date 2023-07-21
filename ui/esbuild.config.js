const esbuild = require('esbuild');
const postcss = require('esbuild-postcss');
const fs = require('fs/promises');
const path = require('path');

const SOURCE = 'public/';
const DESTINATION = '../electron-app/front/';

async function main() {
  await fs.rm(DESTINATION, { recursive: true, force: true });
  await fs.cp(SOURCE, DESTINATION, { force: true, recursive: true });

  const dev = process.argv[2] === 'dev';

  await esbuild.build({
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    minify: !dev,
    sourcemap: dev,
    target: ['es6'],
    plugins: [postcss()],
    outfile: path.join(DESTINATION, 'static/main.js')
  });
}

main().catch(console.error);
