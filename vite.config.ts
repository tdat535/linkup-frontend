import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
<<<<<<< HEAD
    port: 3000,
=======
    port: 3000,  // Thay đổi thành cổng bạn muốn, ví dụ: 3000
>>>>>>> ee9755745071d6cf272b7a72036cea65f6afc4f0
  },
  plugins: [react(), tailwindcss(),]
})
