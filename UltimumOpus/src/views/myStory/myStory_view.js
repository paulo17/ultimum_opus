define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myStory/myStory.html',
    'css!templates/myStory/myStory.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        events: {},
        
        initialize: function(options) {
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});