const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  "./",
  "index.html",
  "main.js",
  "style.css",
  "assets/android/android-launchericon-512-512.png",
  "assets/android/android-launchericon-192-192.png",
  "assets/android/android-launchericon-144-144.png",
  "assets/android/android-launchericon-96-96.png",
  "assets/android/android-launchericon-72-72.png",
  "assets/android/android-launchericon-48-48.png",
  "assets/audio/quack-0.png",
  "assets/audio/quack-1.png",
  "assets/audio/quack-2.png",
  "assets/audio/quack-3.png",
  "assets/audio/quack-4.png",
  "assets/audio/quack-5.png",
  "assets/audio/quack-6.png",
  "assets/audio/quack-7.png",
  "assets/audio/quack-8.png",
  "assets/audio/quack-9.png",
  "assets/audio/quack-10.png",
  "assets/audio/quack-11.png",
  "assets/audio/quack-12.png",
  "assets/audio/quack-13.png",
  "assets/audio/quack-14.png",
  "assets/audio/quack-15.png",
  "assets/audio/quack-16.png",
  "assets/audio/quack-17.png",
  "assets/ducks/duck-0.png",
  "assets/ducks/duck-1.png",
  "assets/ducks/duck-2.png",
  "assets/ducks/duck-3.png",
  "assets/ducks/duck-4.png",
  "assets/ducks/duck-5.png",
  "assets/ducks/duck-6.png",
  "assets/ducks/duck-7.png",
  "assets/ducks/duck-8.png",
  "assets/ducks/duck-9.png",
  "assets/ducks/duck-10.png",
  "assets/ducks/duck-11.png",
  "assets/ducks/duck-12.png",
  "assets/ducks/duck-13.png",
  "assets/ducks/duck-14.png",
  "assets/ducks/duck-15.png",
  "assets/ducks/duck-16.png",
  "assets/ducks/duck-17.png"
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
