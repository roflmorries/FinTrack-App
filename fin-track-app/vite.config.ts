import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**']
    },
    hmr: false, // <--- добавь это
  },
  build: {
    sourcemap: false,
  },
})