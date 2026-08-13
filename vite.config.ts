import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SpringUpTalk',
        short_name: 'SpringUpTalk',
        description: 'Luyện viết tiếng Anh qua hội thoại',
        theme_color: '#12372a',
        background_color: '#f7f8f2',
        display: 'standalone',
        icons: [],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        globIgnores: [
          '**/assets/batch-*.js',
          '**/assets/additions-*.js',
          '**/assets/daily-life-*.js',
          '**/assets/food-drink-*.js',
          '**/assets/transportation-*.js',
          '**/assets/shopping-*.js',
          '**/assets/work-*.js',
          '**/assets/social-life-*.js',
          '**/assets/home-social-*.js',
          '**/assets/services-travel-*.js',
          '**/assets/technology-*.js',
        ],
        runtimeCaching: [{
          urlPattern: ({ request, url }) => request.destination === 'script' && url.pathname.includes('/assets/'),
          handler: 'StaleWhileRevalidate',
          options: { cacheName:'lesson-content-v1', expiration:{ maxEntries:80, maxAgeSeconds:30 * 24 * 60 * 60 }, cacheableResponse:{ statuses:[0,200] } },
        }],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    testTimeout: 20_000,
    setupFiles: './src/tests/setup.ts',
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    css: true,
  },
});
