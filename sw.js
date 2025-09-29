// sw.js

// 1. Definimos un nombre y versión para nuestro caché.
const CACHE_NAME = 'pwa3-cache-v1';

// 2. Listamos los archivos que queremos guardar en el caché (el "App Shell").
const assetsToCache = [
  'index.html',
  'hola.png',
  'lib1.js',
  'lib2.js',
  'unicorn.jpg', // Aunque no se use en index.html, lo agregamos si es necesario
  'utp.png',
  'manifiest.json'
];

// 3. Evento de instalación: Se dispara cuando el Service Worker se instala.
// Aquí es donde guardamos nuestros archivos en el caché.
self.addEventListener('install', event => {
  console.log('Instalando el Service Worker y guardando archivos en caché...');
  // event.waitUntil() asegura que el SW no se instale hasta que el código dentro se complete.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierto exitosamente');
        // cache.addAll() toma una lista de URLs y las guarda en el caché.
        return cache.addAll(assetsToCache);
      })
      .catch(err => {
        console.log('Falló el registro en caché: ', err);
      })
  );
});

// 4. Evento de fetch: Se dispara cada vez que la página solicita un recurso (una imagen, un script, etc.).
// Aquí decidimos si entregamos el recurso desde el caché o desde la red.
self.addEventListener('fetch', event => {
  // event.respondWith() intercepta la petición.
  event.respondWith(
    // caches.match() busca si la petición ya existe en nuestro caché.
    caches.match(event.request)
      .then(response => {
        // Si encontramos una respuesta en el caché, la devolvemos.
        if (response) {
          console.log('Entregando desde caché:', event.request.url);
          return response;
        }
        // Si no está en caché, vamos a la red a buscarlo.
        console.log('Entregando desde la red:', event.request.url);
        return fetch(event.request);
      })
  );
});