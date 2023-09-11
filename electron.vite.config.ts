import path from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import electron_app_pkg from './electron-app/package.json';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        src: path.join(__dirname, 'electron-app/src/'),
        'postybirb-plus': path.join(__dirname, 'commons/src'),
      },
    },
    plugins: [externalizeDepsPlugin({ include: Object.keys(electron_app_pkg.dependencies) })],
  },
  renderer: {
    plugins: [react()],
    root: path.join(__dirname, 'ui/'),
  },
});
