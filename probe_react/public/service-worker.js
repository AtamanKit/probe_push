self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'Push Notification';
    var body = 'You have received a new push notification.';
    var icon = '../src/images/ataman_enter.png';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon
        })
    );
});