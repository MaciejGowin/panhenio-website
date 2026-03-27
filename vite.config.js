import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://d1lq7hwd1ek5lv.cloudfront.net',
        changeOrigin: true,
      },
    },
  },
})
