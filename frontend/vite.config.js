import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3255,
    proxy: {
      '/api/users': {
        target: 'http://127.0.0.1:52451',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/users/, '')
      },
      '/api/books': {
        target: 'http://127.0.0.1:64105',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/books/, '/api/books')
      }
    }
  }
})
