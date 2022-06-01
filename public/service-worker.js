self.addEventListener('install', (event) => {
  console.log(event)
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['offline.js']);
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

self.addEventListener('fetch', async (event) => {
  console.log(event.request.url); // skriver ut url:en på varje nätvärksförfrågan
  if (navigator.onLine) {
    console.log("Du är online");
    const response = await updateCache(event.request);
    return response;
  } else {
    console.log('Offline');
    event.respondWith(
      caches.match(event.request).then((response) => {
        console.log('RESPONSE:', response);
        if (response) {
          return response;
        } else {
          return caches.match(new Request('offline.html'));
        }
      })
    )
  }
})


async function updateCache(request) {
  console.log(request);
  const response = await fetch(request);
  const cache = await caches.open('v1');
  if(request.Method === "GET"){
    cache.put(request, response.clone());
  }
  return response;
}
