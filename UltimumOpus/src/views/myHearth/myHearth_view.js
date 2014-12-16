define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myHearth/myHearth.html',
    'css!templates/myHearth/myHearth.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "RContentHearth",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});