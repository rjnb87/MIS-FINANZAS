const CACHE_NAME = 'finanz-v2';
const urlsToCache = ['./','./index.html','./índice.html'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(res=>{
        // cache
        let clone = res.clone();
        caches.open(CACHE_NAME).then(c=>c.put(event.request, clone));
        return res;
      });
    })
  );
});
