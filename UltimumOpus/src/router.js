define([
    'backbone',
    'underscore',
    'config',
    'modernizr',
    'views/app/app_view',
    'routeManager'
], function(Backbone, _, Config, Modernizr, appView, routeManager) {
    return Backbone.Router.extend({
        routes: routeManager.routes,

        views : {},

        initialize: function() {
            appView.render();
            
            Backbone.history.start({
                pushState: Config.pushState,
                root: Modernizr.history?'/':Config.path
            });
        },

        home: function() {
            this.goto('views/home/home_view');
        },
        
        goto: function(view, options, callback) {
            this.loadView(view, function(View) {
                var view = new View(options);
                view.render();
                appView.setContent(view);

                if(callback) {
                    callback.apply(this);
                }
            })
        },

        loadView: function(view, callback) {
            var self = this;

            if(_.isObject(this.views[view])) {
                callback.call(this, this.views[view]);
            }
            else {
                require([view], function(View) {
                    self.views[view] = View;
                    if(callback) {
                        callback.call(this, View);
                    }
                });
            }
        }
    });
});