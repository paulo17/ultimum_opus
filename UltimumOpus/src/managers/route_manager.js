define([
    "underscore",
    "jquery",
    "config",
    "modernizr",
    "localeManager",
    "utils/tag.template.backbone"
], function(_, $, Config, Modernizr, localeManager, tagTemplate) {

    /**
     * Route manager
     */
    var RouteManager = function() {
        var self = this;

        // Load routes
        this.reload();

        // Push state
        if(Config.pushState) {
            $('body').on('click', 'a', function(e) {
                // Test if the link contain a backbone route
                if(self.isBackboneRoute(e.currentTarget)) {
                    e.preventDefault();
                    self.goto(e.currentTarget);
                }
            });
        }

        // Routes templating
        this.initRouteTemplate();
    };

    /**
     * Reload routes
     */
    RouteManager.prototype.reload = function() {
        var routes = localeManager.getFile('routes');

        // Push state
        if(Modernizr.history) {
            newRoutes = {};
            _.each(routes, function(route, id){
                newRoutes[(Config.path + id).replace(/^\//, "")] = route;
            });
            routes = newRoutes;
        }
        this.routes = routes;

        // Reversed routes
        this.reversedRoutes = this.reverseRoutes(routes);

        return this;
    };

    /**
     * Reverse a list routes
     * @param {array} routes
     * @return array
     */
    RouteManager.prototype.reverseRoutes = function(routes) {
        var reversedRoutes = [];
        for(var id in routes) {
            reversedRoutes[routes[id]] = id;
        }
        return reversedRoutes;
    };

    /**
     * Test if the link is internal or external
     * @param {HTMLObject||JqueryObject||string} link DOM node or URL
     * @param {string} [target] Target link
     */
    RouteManager.prototype.isInternalLink = function(link, target) {
        /**
         * Test if an URL is internal or not
         * @param {string} url
         * @param {string} [target]
         */
        var isInternal = function(url, target) {
            // Target
            if(!_.isUndefined(target) && target !== "_self") {
                return false;
            }
            
            // URL
            if(_.isString(url)) {
                return url.indexOf('://') === -1;
            }

            return null;
        };
        
        var output = isInternal(link, target);

        // DOM
        if(_.isNull(output)) {
            var $link = $(link);
            output = isInternal($link.attr('href'), $link.attr('target'));
        }

        return output;
    };

    /**
     * Test if the link can be a backbone route
     * @param {HTMLObject||JqueryObject||string} link DOM node or URL
     */
    RouteManager.prototype.isBackboneRoute = function(link) {
        link = _.isString(link)?link:$(link).attr('href'); // URL or DOM
        return link.indexOf('://') === -1;
    };

    /**
     * Navigate to the href
     * @param {string||HTMLObject} hrefOrLink
     * @param {string} [dispatchOrTargetLink] (default=true, undefined)
     * @param {string} [dispatch] (default=true)
     */
    RouteManager.prototype.goto = function(hrefOrLink, dispatchOrTarget, dispatch) {
        dispatch = _.isBoolean(dispatch)?dispatch:(_.isBoolean(dispatchOrTarget)?dispatchOrTarget:true);

        var target = _.isString(dispatchOrTarget)?dispatchOrTarget:undefined,
            href = _.isString(hrefOrLink)?hrefOrLink:$(hrefOrLink).attr('href');

        // Dom target
        if(!_.isString(hrefOrLink) && _.isUndefined(target)) {
            target = $(hrefOrLink).attr('target');
        }

        // Internal
        if(this.isInternalLink(hrefOrLink, target)) {
            // Backbone route
            if(this.isBackboneRoute(hrefOrLink) && _.isUndefined(target)) {
                Backbone.history.navigate(href, dispatch);
            }
            else {
                window.location.href = href;
            }
        }
        // External
        else {
            window.open(href);
        }

        return this;
    };

    /**
     * Get route URL by name
     * @param {string} name Route name
     * @param {*} [param1] Parameter 1
     * @param {*} [param2] Parameter 2
     * @param {*} [param3] Parameter 3, etc...
     * @return {string}
     */
    RouteManager.prototype.getRoute = function(name) {
        // Get route
        var route = '/'+this.reversedRoutes[name];

        // Setup
        arguments[0] = route;
        route = this.setUpRoute.apply(this, arguments);

        return route;
    };

    /**
     * Setup a route with parameter(s)
     * @param {string} route Route
     * @param {*} [param1] Parameter 1
     * @param {*} [param2] Parameter 2
     * @param {*} [param3] Parameter 3, etc...
     * @return {string}
     */
    RouteManager.prototype.setUpRoute = function(route) {
        // Parameters
        for(var i = 1, l = arguments.length; i < l; i++) {
            route = route.replace(/[:*][^\/]*/, arguments[i]);
        }
        
        // Clean
        route = route.replace(/[()]/g, ''); // optional
        route = route.replace(/\/?[:*][^\/]*/g, ''); // unused params

        return route;
    };


    /**
     * Get a route URL by name with a specific locale
     * @param {string} name Route name
     * @param {string} locale Locale key
     * @param {function} callback Call with route in first argument
     * @param {*} [param1] Parameter 1
     * @param {*} [param2] Parameter 2
     * @param {*} [param3] Parameter 3, etc...
     */
    RouteManager.prototype.getRouteWithLocale = function(name, locale, callback) {
        var self = this,
            currentLocale = localeManager.currentLocale,
            data = [],
            route;

        // Get route & parameters
        _.each(arguments, function(value, id) {
            if(id > 1) {
                data.push(value);
            }
        });

        // Route with locale
        localeManager.setLocale(locale, function() {
            self.reload();
            data[0] = name;
            route = self.getRoute.apply(self, data);

            // Reset locale
            localeManager.setLocale(currentLocale, function() {
                self.reload();
                callback(route);
            });
        });

        return this;
    };

    /**
     * Add <%route %> tag to underscore template
     */
    RouteManager.prototype.initRouteTemplate = function() {
        // <%route name, param1, param2 %>
        tagTemplate('route', function(content) {
            var data = content.split(/, ?/);
            for(var i = 1, l = data.length; i < l; i++) {
                data[i] = '<%= ('+data[i]+') %>';
            }
            return this.getRoute.apply(this, data);
        }, this);

        return this;
    };

    return new RouteManager();
})