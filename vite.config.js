import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    // SPA fallback: serve index.html for all unknown paths so React Router handles routing
    historyApiFallback: true,
  }
})