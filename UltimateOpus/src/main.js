requirejs.config({
    baseUrl: '/js',
    //locale: 'fr',
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'gsap': {
            exports: 'TweenMax'
        }
    },
    paths: {
        'underscore': '../components/underscore/underscore',
        'backbone': '../components/backbone/backbone',
        'jquery': '../components/jquery/jquery',
        'text': '../components/requirejs-text/text',
        'css':  '../components/requirejs-css/css',
        'css-builder': '../components/requirejs-css/css-builder',
        'i18n': '../components/requirejs-i18n/i18n',
        'normalize': '../components/requirejs-css/normalize',
        'modernizr': '../components/modernizr/modernizr',
        'gsap': '../components/gsap/src/uncompressed/TweenMax',
        'signal': '../components/js-signals/dist/signals',
        'templates': '../templates',
        'config': 'config/config_base',
        'routeManager': 'managers/route_manager',
        'localeManager': 'managers/locale_manager'
    }
});

if (!window.isTest) {
    require(['vendors'], function(vendors) {
        require(['localeManager'], function(localeManager) {
            // Set locale (URL or default)
            localeManager.setLocale(localeManager.getURLLocale(), function() {
                // Load & start App
                require(['app'], function(App) {
                    App.initialize();
                });
            });
        });
    });
}
