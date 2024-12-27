import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5178, // 5178 is the root cause of
    proxy: {
      '/subscriptions': {
        target: `${process.env.VITE_API_URL}/subscriptions`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [vue()]
})
