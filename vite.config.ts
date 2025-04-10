import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'src/renderer'),
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/renderer/index.html'),
        mixer: path.resolve(__dirname, 'src/renderer/mixer/index.html'),
        pianoroll: path.resolve(__dirname, 'src/renderer/pianoroll/index.html'),
      },
    },
    outDir: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@plugins': path.resolve(__dirname, 'src/plugins'),
    }
  },
  server: {
    port: 3000,
  },
});