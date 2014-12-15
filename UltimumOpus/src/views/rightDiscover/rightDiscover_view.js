define([
    'backbone',
    'underscore',
    'config',
    'text!templates/rightDiscover/rightDiscover.html',
    'css!templates/rightDiscover/rightDiscover.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "right_Content",
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});