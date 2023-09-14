import path from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import ui_pkg from './ui/package.json';

export default defineConfig(() => {
  const electron_app_src = path.join(__dirname, 'electron-app/src/');
  const ui_src = path.join(__dirname, 'ui/src');
  const commons = path.join(__dirname, 'commons/index.ts');

  return {
    main: {
      build: {
        lib: {
          entry: path.join(electron_app_src, 'main.ts'),
        },
        emptyOutDir: true,
      },
      plugins: [externalizeDepsPlugin()],
      resolve: {
        alias: {
          src: electron_app_src,
          'postybirb-commons': commons,
        },
      },
      root: path.join(electron_app_src, '..'),
    },
    preload: {
      build: {
        lib: {
          entry: path.join(electron_app_src, 'app/preload.ts'),
        },
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          src: electron_app_src,
          'postybirb-commons': commons,
        },
      },
      root: path.join(electron_app_src, '..'),
      plugins: [externalizeDepsPlugin()],
    },
    renderer: {
      build: {
        rollupOptions: {
          input: path.join(ui_src, 'index.tsx'),
        },
      },
      plugins: [
        react(),
        externalizeDepsPlugin({
          include: Object.keys(ui_pkg.dependencies),
        }),
      ],
      resolve: {
        alias: {
          src: ui_src,
          'postybirb-commons': commons,
        },
      },
      root: path.join(ui_src, '..'),
    },
  };
});
