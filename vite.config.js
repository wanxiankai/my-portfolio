import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      // 将 /api 的请求代理到本地的后端服务器
      '/api': {
        target: 'http://localhost:3001', // 您的本地后端地址
        changeOrigin: true,
      }
    }
  }
})
