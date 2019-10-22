// window.importScripts('data/games.js');

var cacheName = 'offline-data'
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Install');
  event.waitUntil(preLoad());
});

var preLoad = function() {
  console.log('[PWA Builder] Install Event processing');
  return caches.open(cacheName).then(function(cache) {
    console.log(cacheName + ': [PWA Builder] Cached index and offline page during Install');
    return cache.addAll(
      [
        'https://unpkg.com/react@16/umd/react.development.js',
        'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
        'https://unpkg.com/babel-standalone@6.26.0/babel.js',
        '/index.css',
        '/index.js',
        '/app.js',
        '/service-worker.js',
        '/manifest.json',
        '/index.html'
      ]
    );
  })
}

self.addEventListener('fetch', function(event) {
  console.log(event.request)
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request)
  }));
  event.waitUntil(addToCache(event.request))
});

var checkResponse = function(request) {
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response) {
      if (response.status !== 404) {
        fulfill(response)
      } else {
        reject()
      }
    }, reject)
  })
}

var addToCache = function(request) {
  return caches.open(cacheName).then(function(cache) {
      return fetch(request).then(function(response) {
          console.log('[PWA Builder] add page to offline' + response.url)
          return cache.put(request, response);
      });
  });
  };
  
var returnFromCache = function(request) {
  return caches.open(cacheName).then(function(cache) {
      return cache.match(request).then(function(matching) {
          if (!matching || matching.status == 404) {
              return cache.match('offline.html')
          } else {
              return matching
          }
      });
  });
};

// caches.match(e.request).then(function(r) {
//   console.log('[Service Worker] Fetching resource: '+e.request.url);
//   return r || fetch(e.request).then(function(response) {
//     return caches.open(cacheName).then(function(cache) {
//       console.log('[Service Worker] Caching new resource: '+e.request.url);
//       cache.put(e.request, response.clone());
//       return response;
//     });
//   });
// })