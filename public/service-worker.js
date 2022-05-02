importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

console.log("Hello from sw");

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
);
