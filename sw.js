// Service Worker ultra-simplifié
const CACHE_NAME = 'jnk-po-v1';

self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker installé');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activé');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Laisser passer toutes les requêtes (stratégie réseau d'abord)
  event.respondWith(fetch(event.request));
});
