const APP_SHELL_CACHE = "production-crew-shell-v1.07.016";
const APP_SHELL_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=V1.07.016-awards-technical",
  "./app.js?v=V1.07.016-awards-technical",
  "./release-notice.json",
  "./manifest.webmanifest",
  "./assets/logo/app-logo-admin.png",
  "./assets/logo/app-logo-client.png",
  "./assets/logo/app-logo-promoter.png",
  "./assets/logo/app-logo-production.png",
  "./assets/logo/app-logo-crew.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names
        .filter((name) => name.startsWith("production-crew-shell-") && name !== APP_SHELL_CACHE)
        .map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(APP_SHELL_CACHE).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(APP_SHELL_CACHE).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
