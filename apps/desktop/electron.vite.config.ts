import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';

const rootDir = resolve(__dirname, '../..');
const desktopDir = __dirname;

const alias = {
  '@hennya/shared': resolve(rootDir, 'packages/shared/src'),
  '@hennya/ai': resolve(rootDir, 'packages/ai/src'),
  '@hennya/document-parser': resolve(rootDir, 'packages/document-parser/src'),
  '@hennya/deck-engine': resolve(rootDir, 'packages/deck-engine/src'),
  '@hennya/template-engine': resolve(rootDir, 'packages/template-engine/src')
};

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve(desktopDir, 'src/main/index.ts')
      }
    },
    resolve: {
      alias
    }
  },
  preload: {
    build: {
      lib: {
        entry: resolve(desktopDir, 'src/preload/index.ts')
      }
    },
    resolve: {
      alias
    }
  },
  renderer: {
    root: resolve(desktopDir, 'src/renderer'),
    build: {
      rollupOptions: {
        input: resolve(desktopDir, 'src/renderer/index.html')
      }
    },
    resolve: {
      alias
    },
    plugins: [react()]
  }
});