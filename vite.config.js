import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// In production we deploy to GitHub Pages at /portfolio/, but dev stays at /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}))
