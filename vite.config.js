import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Always use /ToDo-app/ base path for GitHub Pages deployment
// This ensures assets load correctly from the subdirectory
export default defineConfig({
  plugins: [react()],
  base: '/ToDo-app/',
})

