self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

const SPRITE_CACHE = "pogo-boekenberg-sprites-v1";
const CACHE_PREFIX = "pogo-boekenberg-";
const SPRITE_HOSTS = new Set(["cdn.jsdelivr.net", "raw.githubusercontent.com"]);

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== SPRITE_CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const pokemonSprite = SPRITE_HOSTS.has(url.hostname) && (/\/PokeMiners\/pogo_assets@master\/Images\/Pokemon\//i.test(url.pathname) || /\/PokeAPI\/sprites\/master\/sprites\/pokemon\//i.test(url.pathname));
  if (pokemonSprite) {
    event.respondWith(caches.open(SPRITE_CACHE).then(async cache => {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      const response = await fetch(event.request);
      if (response.ok || response.type === "opaque") await cache.put(event.request, response.clone()).catch(() => {});
      return response;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request));
});
