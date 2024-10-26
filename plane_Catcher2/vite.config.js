import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/plane_Catcher2/', // Nom du dépôt entouré de slashes
  server: {
    proxy: {
      '/api': {
        target: 'https://aviationstack.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
