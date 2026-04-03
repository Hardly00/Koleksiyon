const cacheName = 'lego-v1';
const assets = ['./index.html', './manifest.json'];

// Kurulum aşamasında dosyaları önbelleğe al
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// İnternet olmasa da önbellekten dosyaları getir
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});