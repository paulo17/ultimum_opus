define([
    'backbone',
    'underscore',
    'config',
    'text!templates/home/home.html',
    'css!templates/home/home.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        events: {},
        
        initialize: function(options) {
        },
            
        render: function() {
            this.$el.html(_.template(tpl, {}));
        }
    });
});