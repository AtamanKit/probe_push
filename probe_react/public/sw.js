const imageNot = () => require('../src/images/icon.png');

self.addEventListener('push', (e) => {
    console.log('[Service Worker] Push Received');
    console.log(`[Service Worker] Push had this data: "${e.data.text()}"`);

    const title = 'Push notification';
    const options = {
        body: 'Yay it works',
        icon: imageNot,
        badge: '../src/images/badge.png'
    };

    e.waitUntil(self.registration.showNotification(title, options));
});