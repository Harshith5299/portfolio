import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Harshith Chittajallu — Portfolio',
        short_name: 'Portfolio',
        description: 'Full Stack Software Developer portfolio',
        theme_color: '#242424',
        background_color: '#242424',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Cache all static assets for offline support
        globPatterns: ['**/*.{js,css,html,svg,jpg,png,ico,woff2}'],
      },
      devOptions: {
        // Activate service worker in dev mode so PWA works via the dev server
        enabled: true,
      },
    }),
  ],
  server: {
    // Allow any host so tunnels (ngrok, localtunnel, etc.) work without reconfiguring
    allowedHosts: true,
  },
})
