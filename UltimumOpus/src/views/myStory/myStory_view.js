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

        /**
        *    Constructor for initialize the view
        *    @param object options
        **/
        events: {
        },

        initialize: function(options) {
            $(window).scroll(this.myEndAnim);
        },


        /**
        *    Stop the parallax animation at the end of the page
        **/
        animate: function(){
            console.log('ee');
        },

        myEndAnim: function(){
            if(window.percentDone<0.05) {
                TweenMax.to($("#paralax"), .85, {"opacity": '0', ease: Expo.easeInOut});

                $("#end_1").fadeIn(3000, function () {
                    $("#end_2").fadeIn(3000)
                })
            }

            if(window.percentDone>0.05){
                TweenMax.to($("#paralax"), .85, { "opacity": '.2', ease: Expo.easeInOut });
            }
        },

        render: function(){
            this.delegateEvents();
            this.$el.html(_.template( tpl ));
        }

    });

});