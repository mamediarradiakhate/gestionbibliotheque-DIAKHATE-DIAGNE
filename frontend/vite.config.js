import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/users': {
        target: 'http://localhost:2700',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/users/, '')
      },
      '/api/books': {
        target: 'http://localhost:2600',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/books/, '/api/books')
      }
    }
  }
})
