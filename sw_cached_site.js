const cacheName = "v2";

// call install event

self.addEventListener("install", e => {
  console.log("Service worker: Installed");
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
  e.respondWith(
    fetch(e.request)
      .then(res => {
        //   make copy clone of response
        const resClone = res.clone();

        // open cache
        caches.open(cacheName).then(cache => {
          // add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
