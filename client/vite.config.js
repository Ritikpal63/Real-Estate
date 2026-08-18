import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true, // agar 5173 busy hai toh error dega, silently dusra port nahi lega
    proxy: {
      '/api': {
        target: 'https://real-estate-1-x62z.onrender.com', // apne actual backend port se match
        changeOrigin: true,
      },
    },
  },
})