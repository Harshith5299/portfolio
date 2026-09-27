import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the portfolio itself and the /ask RAG demo.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        ask: resolve(import.meta.dirname, 'ask.html'),
      },
    },
  },
})
