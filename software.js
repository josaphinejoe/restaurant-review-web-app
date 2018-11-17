const m_Cache = "restaurant-reviews-v1";

self.addEventListener('install', (evnt) => {

    evnt.waitUntil(
        caches.open(m_Cache).then((memory) => {

            self.c_Cache = memory;
            // the basic files in the page is to be stored in the memory
            return memory.addAll([
                'index.html',
                'restaurant.html',
                'css/style4.css',
                'css/style3.css',
                'css/media.css',
                'css/style1.css',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'data/restaurants.json',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/rest.jpg'
            ]);
        }).catch((var1) => {
            console.log("error in load files in cache", var1);
        })
    );
});

// the files in the memory or network has to be fetched
self.addEventListener('fetch', (evnt) => {

    evnt.respondWith(
        //now check if requested files are already there in memory
        caches.match(evnt.request).then((result) => {

            if (result) {
                //return if files are found in memory
                return result;
            } else {
                //else request them from the network
                return fetch(evnt.request).then((result) => {
                    return result;
                }).catch((var1) => {
                    console.log('Fetching failed', var1);
                });
            }
        })
    );


    caches.match(evnt.request).then((result) => {
        if (!result) {
            //if result is not found in the memory,then get it again from network and save it in cache
            fetch(evnt.request).then((result) => {
                //do this by using the reference to c_cache property
                self.c_Cache.put(evnt.request, result);
            });
        }
    });

});