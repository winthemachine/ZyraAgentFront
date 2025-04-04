import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  define: {
    global: {},
  },
  optimizeDeps: {
    exclude: ['chunk-KQVXTJIT.js']
  },
  server: {
    host: '127.0.0.1',
    port: 3010
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      "@": path.resolve(__dirname, "./src"),
    },
  },
});