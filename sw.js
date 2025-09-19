// Service Worker for ENEPLUS website
// Provides basic offline functionality and caching

const CACHE_NAME = 'eneplus-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
    '/',
    '/o-nama/',
    '/nase-usluge/',
    '/kontakt/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/offline.html',
    // Add critical images
    '/assets/images/hero-image.jpg',
    '/assets/images/about-image.jpg'
];

// Install event - cache static resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: Installed successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Installation failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the response for future use
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                // Only cache GET requests for same origin
                                if (event.request.method === 'GET' &&
                                    event.request.url.startsWith(self.location.origin)) {
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    })
                    .catch(() => {
                        // Network failed, try to serve offline page for navigations
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }

                        // For other resources, return a generic offline response
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Message event - handle messages from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
            case 'GET_VERSION':
                event.ports[0].postMessage({
                    version: CACHE_NAME
                });
                break;
            case 'CLEAR_CACHE':
                caches.delete(CACHE_NAME).then(() => {
                    event.ports[0].postMessage({
                        success: true
                    });
                });
                break;
            default:
                console.log('Service Worker: Unknown message type', event.data.type);
        }
    }
});

// Background sync for form submissions (if supported)
if ('sync' in self.registration) {
    self.addEventListener('sync', event => {
        console.log('Service Worker: Background sync', event.tag);

        if (event.tag === 'contact-form') {
            event.waitUntil(
                // Handle offline form submission
                handleOfflineFormSubmission()
            );
        }
    });
}

// Push notifications (if needed in future)
self.addEventListener('push', event => {
    console.log('Service Worker: Push message received', event);

    const options = {
        body: event.data ? event.data.text() : 'Nova poruka od ENEPLUS',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Otvori'
            },
            {
                action: 'close',
                title: 'Zatvori'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('ENEPLUS', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked', event);

    event.notification.close();

    if (event.action === 'open') {
        const url = event.notification.data?.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});

// Helper function for offline form submissions
async function handleOfflineFormSubmission() {
    try {
        // Get stored form submissions from IndexedDB or localStorage
        const storedSubmissions = await getStoredFormSubmissions();

        for (const submission of storedSubmissions) {
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(submission.data)
                });

                if (response.ok) {
                    // Remove successfully sent submission
                    await removeStoredFormSubmission(submission.id);
                    console.log('Service Worker: Form submission sent successfully');
                }
            } catch (error) {
                console.log('Service Worker: Failed to send form submission', error);
            }
        }
    } catch (error) {
        console.error('Service Worker: Error handling offline form submissions', error);
    }
}

// Helper functions for form submission storage
async function getStoredFormSubmissions() {
    // Implementation would depend on chosen storage method
    // This is a placeholder for the actual implementation
    return [];
}

async function removeStoredFormSubmission(id) {
    // Implementation would depend on chosen storage method
    // This is a placeholder for the actual implementation
    return true;
}

// Error handling
self.addEventListener('error', event => {
    console.error('Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
});

console.log('Service Worker: Script loaded');
