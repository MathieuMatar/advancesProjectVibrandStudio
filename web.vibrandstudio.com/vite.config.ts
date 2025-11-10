import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /graphql requests to the backend to avoid CORS in development
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // rewrite not necessary for same path, but keep in case backend expects trailing slash
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
})
