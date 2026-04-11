import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        about:      resolve(__dirname, 'about.html'),
        treatments: resolve(__dirname, 'treatments.html'),
        booking:    resolve(__dirname, 'booking.html'),
        contact:    resolve(__dirname, 'contact.html'),
      },
    },
  },
  server: {
    port: 3100,
    open: true,
    allowedHosts: 'all',
  },
});
