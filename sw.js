let staticCacheName = "restaurants-cache-1";
/*files to cache*/
let urlToCache = [
  './', 
  'css/styles.css',
  'data/restaurants.json',
  'js/dbhelper.js',
  'index.html',
  'restaurant.html',
  'js/main.js',
  'js/restaurant_info.js',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

/*install service worker*/
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
        console.log(cache);
        return cache.addAll(urlToCache);
      }).catch(error => {
        console.log(error);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurant-') && cache !== staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/*fetch the request*/
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  ); 
});
