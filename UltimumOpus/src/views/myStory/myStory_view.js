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

        myEndAnim: function(){
            if(window.percentDone<0.05) {
                TweenMax.to($("#paralax"), .85, {"opacity": '0', ease: Expo.easeInOut});

                $("#end_2").fadeIn(3000, function () {
                    $("#end_1").fadeIn(3000, function(){
                        //Set TextShadow on Opus
                        $.fx.step.textShadowBlur = function(fx) {
                            $(fx.elem)
                                .prop('textShadowBlur', fx.now)
                                .css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px white'});
                        };

                        setInterval(function() {
                            $(".endctnt").animate({textShadowBlur:20}, {duration: 1500, complete: function() {
                                $(".endctnt").animate({textShadowBlur:1}, {duration: 2500});
                            }});
                        }, 1000);
                    })
                })
            }

            if(window.percentDone>0.05){
                TweenMax.to($("#paralax"), .85, { "opacity": '.2', ease: Expo.easeInOut });
            }

            // Make shine on title


        },

        render: function(){
            this.delegateEvents();
            this.$el.html(_.template( tpl ));
        }

    });

});