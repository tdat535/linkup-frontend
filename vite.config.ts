import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
<<<<<<< HEAD
    port: 3000,  // Thay đổi thành cổng bạn muốn, ví dụ: 3000
=======
    port: 3000,
>>>>>>> d6827a66f96e8de1f36f29ad48f59de19e957886
  },
  plugins: [react(), tailwindcss(),]
})
