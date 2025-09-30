// Service Worker basique mais fonctionnel
const CACHE_NAME = 'jnk-po-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('Service Worker installé');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log('Service Worker activé');
});

self.addEventListener('fetch', (event) => {
  // Laisser passer toutes les requêtes réseau
  event.respondWith(fetch(event.request));
});
