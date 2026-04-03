// MH Academy Service Worker v1.0
const CACHE_NAME = 'mh-academy-v1';
const BASE = 'https://economist-bd.github.io/localpage/';

const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// Pages to cache on first visit
const PAGE_URLS = [
  BASE + 'free-ai-tools.html',
  BASE + 'free-prompt.html',
  BASE + 'bangla-book-list.html',
  BASE + 'story.html',
  BASE + 'freecourse.html',
];

// ─── INSTALL ───────────────────────────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
});

// ─── ACTIVATE ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Skip chrome-extension and non-http
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req).then(response => {
        // Cache successful responses for same-origin + github pages
        if (
          response.ok &&
          (url.origin === self.location.origin || url.hostname === 'economist-bd.github.io')
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: return index.html for navigation requests
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
