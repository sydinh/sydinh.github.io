// Register a service worker
if ('serviceWorker' in navigator) {
  // ServiceWorker registration in progress.
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker-configuration.js').then(
      function(registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        );
      },
      function(err) {
        // registration failed
        console.log('ServiceWorker registration failed: ', err);
      },
    );
  });
}
