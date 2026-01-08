// サービスワーカーのバージョン
const CACHE_NAME = 'fit-stack-v1';
// 内部ファイルのみをキャッシュ（外部CDNは除外）
const urlsToCache = [
  './',
  './index.html',
  './workout-app.js',
  './workout-data.js',
  './workout-storage.js',
  './manifest.json'
];

// インストール時の処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        // キャッシュの追加に失敗した場合も続行
        console.error('キャッシュの追加に失敗しました:', error);
      })
  );
  // 新しいサービスワーカーをすぐに有効化
  self.skipWaiting();
});

// アクティベート時の処理
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // 古いキャッシュを削除
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // すぐに制御を取得
  return self.clients.claim();
});

// フェッチ時の処理（オフライン対応）
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 外部CDNのリクエストは常にネットワークから取得（キャッシュしない）
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // 内部ファイルのみキャッシュを利用
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュに存在する場合はキャッシュを返す
        if (response) {
          return response;
        }
        // キャッシュにない場合はネットワークから取得
        return fetch(event.request).then((response) => {
          // 有効なレスポンスでない場合はそのまま返す
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // レスポンスをクローンしてキャッシュに保存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        }).catch(() => {
          // ネットワークエラーの場合、オフラインページを返す
          return caches.match('./index.html');
        });
      })
  );
});
