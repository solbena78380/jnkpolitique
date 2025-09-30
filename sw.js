const CACHE_NAME = 'jnk-po-app-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Stratégie de cache: réseau d'abord, puis cache
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

// Activation - nettoyer les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
