/**
 * vite.config.ts
 * 
 * Vite configuration file for building the React application as a Progressive Web App (PWA).
 * 
 * Configuration includes:
 * - React plugin for JSX/TSX support
 * - PWA plugin for offline capabilities and app manifest
 * - Service worker auto-update
 * - Workbox for advanced caching strategies
 * - Runtime caching for external resources (Google Fonts, API requests)
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Vite configuration for the Vibrand Studio web application.
 * 
 * Features:
 * - React Fast Refresh for HMR
 * - PWA manifest for installability
 * - Service Worker for offline support
 * - Runtime caching strategies for external resources and API calls
 * - Static asset caching via Workbox
 */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // SW auto-update
      manifest: {
        name: 'Vibrand Studio',
        short_name: 'Vibrand',
        description: 'Vibrand Studio web app',
        start_url: '.',
        display: 'standalone',
        background_color: '#F5F5F5',
        theme_color: '#DB5349',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      includeAssets: [
        'favicon.svg', 
        'robots.txt', 
        'apple-touch-icon.png'
      ], // additional static assets to cache
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webp}'], // cache your build assets
        runtimeCaching: [
          {
            // cache Google Fonts CSS
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            // cache Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
      },
    },
  },
})
