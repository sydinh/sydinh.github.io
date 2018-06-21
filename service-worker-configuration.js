const CACHE_NAME = 'sydinh-dot-com-cache-v1';

const JS = 'js';
const CSS = 'css';
const styleCSS = `${CSS}/style.css`;
const iconsCSS = `${CSS}/icons.css`;
const scriptJS = `${JS}/script.js`;
const jqueryJS = `${JS}/jquery.min.js`;

const urlsToCache = [styleCSS, iconsCSS, jqueryJS, scriptJS];

// Install a service worker
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Cache and return requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});

// Update a service worker
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['foo-cache-v1', 'bar-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Installation Events
self.addEventListener('beforeinstallprompt', (event) => {
  // Suppress automatic prompting.
  event.preventDefault();

  // Show the (disabled-by-default) install button. This button
  // resolves the installButtonClicked promise when clicked.
  installButton.disabled = false;

  // Wait for the user to click the button.
  installButton.addEventListener('click', async (e) => {
    // The prompt() method can only be used once.
    installButton.disabled = true;

    // Show the prompt.
    const { userChoice } = await event.prompt();
    console.info(`user choice was: ${userChoice}`);
  });
});
