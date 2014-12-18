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

        /**
        *    Constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            $(window).scroll(this.myEndAnim);
        },

        /**
        *    Stop the parallax animation at the end of the page
        **/
        myEndAnim: function(){
          console.log(window.percentDone);
            if(window.percentDone<0.05){
                TweenMax.to($("#paralax"), .85, { "opacity": '0', ease: Expo.easeInOut });
            }
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }

    });

});