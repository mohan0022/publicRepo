console.warn("its working.");

let cacheData = "mySlate";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/1.chunk.js",
        "/static/js/4.chunk.js",

        "/static/js/18.chunk.js",

        "/static/js/20.chunk.js",
        "/static/js/12.chunk.js",

        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/static/js/13.chunk.js",
        "/static/media/poppins-latin-400.c14093ce.woff",

        "/static/media/poppins-latin-500.ff86872b.woff",

        "/static/media/poppins-latin-600.8c4516c5.woff",

        "/assets/images/avatars/profile.jpg",

        "/assets/images/flags/sa.png",

        "/static/media/poppins-latin-400.5b8f3ba8.woff2",

        "/static/media/poppins-latin-500.dc16a359.woff",

        "/static/media/poppins-latin-600.e49343f0.woff2",

        "/static/media/poppins-latin-500.dc16a359.woff2",

        "/manifest.json",

        "/assets/images/flags/us.png",
        "/assets/images/myslate/Talentely Logo.png",
        "/assets/fonts/material-design-icons/MaterialIconsOutlined.css",
        "/assets/fonts/meteocons/style.css",
        "/assets/fonts/material-design-icons/MaterialIconsOutlined-Regular.woff2",

        "/assets/languages/en/translation.json",
        "/assets/languages/tn/translation.json",
        "/favicon.png",
        "/",
        "/index.html",
        "/welcome",
        "/report",
        "/blog",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        // let requestUrl = event.request.clone();
        // fetch(requestUrl)
      })
    );
  }
});
