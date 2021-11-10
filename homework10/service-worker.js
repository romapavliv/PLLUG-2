const cacheName = 'health_v1';
const filesToCache = [
    './service-worker.js',
    './index.js',

    './sign_up/sign_up.html',
    './sign_up/css/576px.css',
    './sign_up/css/768px.css',
    './sign_up/css/992px.css',
    './sign_up/css/1200px-and-up.css',
    './sign_up/css/less-than-576px.css',
    './sign_up/images/Mask Group 43.png',

    './sign_in/sign_in.html',
    './sign_in/css/576px.css',
    './sign_in/css/768px.css',
    './sign_in/css/992px.css',
    './sign_in/css/1200px-and-up.css',
    './sign_in/css/less-than-576px.css',
    './sign_in/images/Mask Group 43.png',

    './forgot_password/forgot_password.html',
    './forgot_password/css/576px.css',
    './forgot_password/css/768px.css',
    './forgot_password/css/992px.css',
    './forgot_password/css/1200px-and-up.css',
    './forgot_password/css/less-than-576px.css',
    './forgot_password/images/Mask Group 43.png',

    './email_send/email_send.html',
    './email_send/css/576px.css',
    './email_send/css/768px.css',
    './email_send/css/992px.css',
    './email_send/css/1200px-and-up.css',
    './email_send/css/less-than-576px.css',
    './email_send/images/Mask Group 43.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cache) => {
            if (cache !== cacheName) {
                caches.delete(cache);
            }
        }));
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});