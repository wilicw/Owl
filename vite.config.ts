import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import linaria from '@linaria/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    linaria({
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
