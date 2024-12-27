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
    // WARNING: Port 5178 causes BAD_REQUEST_ERROR during entity sync
    // Error: {"error":{"code":"BAD_REQUEST_ERROR","description":"given field is an invalid field","source":"NA","step":"entity_sync","reason":"only valid field of entities are accepted"}}
    // if port is changed to the vite default 5173, it will work with no issues.
    port: 5178,
    proxy: {
      '/subscriptions': {
        target: `${process.env.VITE_API_URL}/subscriptions`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [vue()],
})
