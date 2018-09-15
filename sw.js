'use strict';
var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          'offline.html',
          '/assets/css/style.css?v=',
          '/assets/css/fontello.css',
          '/assets/font/fontello.eot?17398342',
          '/assets/font/fontello.eot?17398342#iefix',
          '/assets/font/fontello.woff2?17398342',
          '/assets/font/fontello.woff?17398342',
          '/assets/font/fontello.ttf?17398342',
          '/assets/font/fontello.ttf?17398342',
          '/assets/font/fontello.svg?17398342#fontello'
      ]);
    })
  );
});
this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match('offline.html');
          })
    );
  }
  else{
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
                        return response || fetch(event.request);
                    })
            );
      }
});