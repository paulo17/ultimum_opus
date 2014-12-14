define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myCell/myCell.html',
    'css!templates/myCell/myCell.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "Cell_Content",
        events: {},

        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});