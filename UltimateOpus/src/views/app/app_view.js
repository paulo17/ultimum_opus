define([
    'backbone',
    'underscore',
    'config',
    'text!templates/app/app.html',
    'css!templates/app/app.css'
], function(Backbone, _, Config, tpl, css)
{
    var AppView = Backbone.View.extend({
        el: "#main",

        events: {}, 
        
        initialize: function(options) {

        },

        remove: function() {
            if(this.content) {
                this.content.remove();
            }
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        setContent: function(view) {
            if(this.content) {
                this.content.remove();
            }
            this.$content.append(view.el);
            this.content = view;
        },

        render: function(){
            this.$el.html(_.template( tpl, {  } ));
            this.$content = this.$el.find('#content');

            if(this.content) {
                this.content.render();
            }
        }
    });

    return new AppView();
});