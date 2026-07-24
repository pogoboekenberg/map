const CACHE_NAME = "pogo-boekenberg-20260724-63";
const APP_SHELL = [
  "./index.html",
  "./styles.css",
  "./config.js",
  "./app.js",
  "./manifest.webmanifest",
  "./version.json",
  "./assets/app-icon-180.png",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cacheKey = event.request.mode === "navigate" ? "./index.html" : url.pathname;
    try {
      const response = await fetch(event.request);
      if (response.ok) await caches.open(CACHE_NAME).then(cache => cache.put(cacheKey, response.clone()));
      return response;
    } catch {
      return caches.match(cacheKey);
    }
  })());
});
