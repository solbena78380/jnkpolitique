// Service Worker ESSENTIEL
const CACHE_NAME = 'jnk-po-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  console.log('🔄 Service Worker installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('📦 Mise en cache des fichiers');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('✅ Tous les fichiers en cache');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('✅ Service Worker activé');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
