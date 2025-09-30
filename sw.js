// sw.js - VERSION SCK ADAPTÉE
const CACHE_NAME = 'jnk-po-app-v1.0';
const urlsToCache = [
  '/',
  '/index.html'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Stratégie de cache: réseau d'abord, puis cache (EXACTEMENT COMME SCK)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Mettre à jour le cache
        return caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
      })
      .catch(() => {
        // Si hors ligne, utiliser le cache
        return caches.match(event.request);
      })
  );
});
