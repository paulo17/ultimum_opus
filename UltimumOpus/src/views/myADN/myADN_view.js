define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myADN/myADN.html',
    'css!templates/myADN/myADN.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "ADN_Content",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});