import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  envPrefix: 'PUBLIC_',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
})
