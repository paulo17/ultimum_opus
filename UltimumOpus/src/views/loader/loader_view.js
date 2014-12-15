define([
    'backbone',
    'underscore',
    'config',
    'text!templates/loader/loader.html',
    'css!templates/loader/loader.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LoaderContent",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});