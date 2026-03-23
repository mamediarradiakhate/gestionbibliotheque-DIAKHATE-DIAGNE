import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3255,
    proxy: {
      '/api/users': {
        target: 'http://192.168.49.2:30008',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/users/, '')
      },
      '/api/books': {
        target: 'http://192.168.49.2:30007',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/books/, '/api/books')
      }
    }
  }
})
