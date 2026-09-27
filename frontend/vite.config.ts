import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Hero "Resume" button only renders when public/resume.pdf is committed,
// so the live site never links to a 404. Drop the PDF in and it appears.
const hasResume = existsSync(fileURLToPath(new URL('./public/resume.pdf', import.meta.url)))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
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
