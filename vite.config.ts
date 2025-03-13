import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,  // Thay đổi thành cổng bạn muốn, ví dụ: 3000
  },
  plugins: [react(), tailwindcss(),]
})
