define([
    'backbone',
    'underscore',
    'config',
    'text!templates/about/about.html',
    'css!templates/about/about.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "content",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});