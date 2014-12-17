define([
    'backbone',
    'underscore',
    'config',
    'text!templates/app/app.html',
    'css!templates/app/app.css',
    'signals/page_dom_added_signal',
], function(Backbone, _, Config, tpl, css, pageDomAddedSignal)
{
    var AppView = Backbone.View.extend({
        el: "#main",
        percent: 0,
        events: {

        },

        initialize: function(options) {
            // $(window).scroll(this.animationParallax);
        },

        animationParallax: function(){
            var filtre = $('.filtre');
            var scrollPercent = 100 - (100 * $(window).scrollTop() / ($(document).height() - $(window).height()));
            filtre.css({top: scrollPercent + '%'});
        },

        resize: function(){
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
            pageDomAddedSignal.dispatch();
        },

        render: function(){
        	this.animationParallax();

            this.$el.html(_.template( tpl, {  } ));
            this.$content = this.$el.find('#content');
            if(this.content) {
                this.content.render();
            }
        }
    });

    return new AppView();
});