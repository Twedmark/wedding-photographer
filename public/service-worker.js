self.addEventListener('install', (event) => {
  console.log(event)
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['offline.html', 'app.js', 'app.css', 'index.html', 'index.css', 'landing.js','gallery.js', 'gallery.css', 'camera.js', 'camera.css', 'CameraComponent.js', 'CameraComponent.css', 'ImageComponent.js', 'ImageComponent.css']);
    })
  )
  self.skipWaiting();
  console.log('Service worker installed!');
})

self.addEventListener('activate', (event) => {
   console.log(event);
  self.skipWaiting();
  console.log('Service worker activated!');
})

self.addEventListener('fetch', (event) => {
  console.log(event);
  console.log(event.request.url); // skriver ut url:en på varje nätvärksförfrågan
  if(navigator.onLine){
    console.log("Du är online");
  }else{
    console.log("du är offline");
    event.respondWith(
      caches.match(event.request).then((response) => {
        console.log(response);
        if (response) return response;
        else return caches.match(new Request('offline.html'));
      })
    );
  }
})
