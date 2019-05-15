//script for caching files using the service worker 

let staticFilesCache = 'cc-v1'; 

//caching the appilication shell

self.addEventListener('install', event => {
   console.log("service worker installed");
    event.waitUntil(
      caches.open(staticFilesCache).then(cache =>{
        
         cache.addAll(
          [
            '/',
            '/codeWords.html',
            '/alphabets',
            '/css/style.css',
            '/Javascript/codeWords.js'
         ]
        );
      })
    );
  });


  //deleting cache and updating service workers
  self.addEventListener('activate',  event => {

    console.log("service worker activated");

    event.waitUntil(caches.keys().then(cacheNames => {
       Promise.all(cacheNames.map(thisCacheName =>{
         if (thisCacheName !== staticFilesCache) {

           console.log("deleting cache files from",thisCacheName)

           return caches.delete(thisCacheName);
         }

      }));
    }));
});


//hijacking requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          console.log('fetching',response);
          return response;
        }

        //  Clone the request. 
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response. 
            var responseToCache = response.clone();

            caches.open(staticFilesCache)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});