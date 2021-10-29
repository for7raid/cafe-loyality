/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // ...настройки других vue-cli плагинов...
    pwa: {
        name: 'Cafe loyality',
        themeColor: '#4a4a4a',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // настройки манифеста
        manifestOptions: {
            display: 'standalone',
            theme_color: "#4a4a4a",
            background_color: "#ffffff", 
            name: "Cafe loyality",
            short_name: "Cafe loyality",
            description: "\u041a\u0430\u0440\u0442\u0430 \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u043e\u0433\u043e \u043f\u043e\u043a\u0443\u043f\u0430\u0442\u0435\u043b\u044f \u0432 \u043a\u0430\u0444\u0435",
            "icons": [
                {
                    "src": "/icon-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/icon-256x256.png",
                    "sizes": "256x256",
                    "type": "image/png"
                },
                {
                    "src": "/icon-384x384.png",
                    "sizes": "384x384",
                    "type": "image/png"
                },
                {
                    "src": "/icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
            
        },

        iconPaths: {
            favicon32: 'favicon.png',
            favicon16: 'favicon.png',
            appleTouchIcon: 'icon-192x192.png',
            maskIcon: null,
            msTileImage: 'icon-192x192.png'
        },

        // настройка workbox-плагина
        workboxPluginMode: 'GenerateSW',
        // workboxOptions: {
        //     // swSrc необходимо в режиме InjectManifest
        //     swSrc: 'src/registerServiceWorker.ts',
        //     // ...другие настройки Workbox...
        // }
    }
}