import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fetch': {
        target: 'http://localhost:3000',  // Your backend API
        changeOrigin: true,              // For virtual hosted sites
        secure: false,                   // Set to false if using http
      },
    },
  },
})