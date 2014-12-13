define([
    'localeManager',
    'router',
    'config'
], function(localeManager, Router, Config)
{
    // Start App
    var app = null;

    var initialize = function()
    {
        if(app === null) {
            app = new Router();
        }
    };

    return {
        router: app,
        initialize: initialize
    }
});