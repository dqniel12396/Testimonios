import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://testimoniosud.netlify.app/.netlify/functions',  // URL de las funciones desplegadas
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Ajuste para redirigir las solicitudes a las funciones
      },
    },
  },
})
