import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, './src/Components')
    }
  }
})
