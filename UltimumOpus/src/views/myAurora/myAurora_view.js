define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myAurora/myAurora.html',
    'css!templates/myAurora/myAurora.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentAur",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});