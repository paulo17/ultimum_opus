define([
    'backbone',
    'underscore',
    'config',
    'text!templates/menu/menu.html',
    'css!templates/menu/menu.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "aside-menu",
        events: {
        },
        
        initialize: function(options) {
            $('.draggable').draggable();
        },
        
        onDrag:function(){
            console.log('yo');
        },
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});