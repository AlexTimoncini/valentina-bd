const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'main.js',
  "assets/android/android-launchericon-512-512.png",
  "assets/android/android-launchericon-192-192.png",
  "assets/android/android-launchericon-144-144.png",
  "assets/android/android-launchericon-96-96.png",
  "assets/android/android-launchericon-72-72.png",
  "assets/android/android-launchericon-48-48.png"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['my-pwa-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
