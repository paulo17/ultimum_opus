define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myStory/myStory.html',
    'css!templates/myStory/myStory.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "myEnd",
        events: {},
        
        initialize: function(options) {
            $(window).scroll(this.myEndAnim);
        },

        myEndAnim: function(){
            if(window.percentDone<0.05){
                TweenMax.to($("#paralax"), .85, { "opacity": '0', ease: Expo.easeInOut });
            }

            if(window.percentDone>0.05){
                TweenMax.to($("#paralax"), .85, { "opacity": '1', ease: Expo.easeInOut });
            }
        },
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});