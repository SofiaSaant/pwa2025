// sw.js

self.addEventListener(
  'fetch',
  function (evento) {
    // http://localhost/pwasd25/pwa2/index.jpg > unicorn.jpg
    // http://localhost/pwasd25/pwa2/index.jpg > utp.png
    console.log(evento.request.url);
    if (/\.(jpg)$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('unicorn.jpg')
      );
    } else if (/\.(png)$/.test(evento.request.url)) {
      evento.respondWith(
        fetch('utp.png')
      );
    }
  }
);
