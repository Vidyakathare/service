const cacheName = "v1";

const cacheAssets = ["index.html", "about.html", "style.css", "main.js"];

// call install event

self.addEventListener("install", e => {
  console.log("Service worker: Installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service worker: caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// call activate event

self.addEventListener("activate", e => {
  console.log("Service worker: Activated");

  // Remove unwanted chaches

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service worker: Clearing Old Chache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// call fetch event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
