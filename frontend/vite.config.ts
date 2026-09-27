import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // The Resume button only renders once public/resume.pdf is committed,
    // so visitors never hit a broken link.
    __HAS_RESUME__: JSON.stringify(existsSync(new URL('./public/resume.pdf', import.meta.url))),
  },
})
