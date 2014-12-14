define([
    'backbone',
    'underscore',
    'config',
    'text!templates/discover/discover.html',
    'css!templates/discover/discover.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});