define([
    'backbone',
    'underscore',
    'config',
    'text!templates/leftDiscover/leftDiscover.html',
    'css!templates/leftDiscover/leftDiscover.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "left_Content",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});