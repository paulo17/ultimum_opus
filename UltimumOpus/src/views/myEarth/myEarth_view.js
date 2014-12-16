define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myEarth/myEarth.html',
    'css!templates/myEarth/myEarth.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentEarth leftData",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});