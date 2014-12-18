define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myShell/myShell.html',
    'css!templates/myShell/myShell.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentShell leftData myPanel",

        // Backbone event object
        events: {
            'click #leftDiShell':'leftSidebarShell'
        },

        /**
        *    Constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            $(window).scroll(this.animLineShell);
        },

        /**
        *    Print sidebar left
        **/
        leftSidebarShell: function(){

            $('html,body').css({'overflow':'hidden'});
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
                TweenMax.to($(".shellTitle"), 1.25, { "left": '70%', ease: Expo.easeInOut });

                $('.leftData').addClass('leftActive');


                TweenMax.to($("#route_home"), 0.75, { "left": '50%', ease: Expo.easeInOut });
                TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
                TweenMax.to($(".LContentShell"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
            }

            scrollToElement('.LContentShell', 600);

        },

        /**
        *    Main SVG animation line
        **/
        animLineShell: function(){
            if(window.length > 6298.35){
                TweenMax.to($("#anim-shell path"), .05, { "stroke-dasharray": "1412.9, 424.8", ease: Expo.easeInOut });
            }
            if(window.length < 6298.35){
               TweenMax.to($("#anim-shell path"),.20, { "stroke-dasharray": "0, 424.8", ease: Expo.easeInOut });
            }
            if(window.percentDone<0.66){
                $(".LContentShell").fadeIn(1000);
            }
            if(window.percentDone<.65 && window.percentDone<.64){
                TweenMax.to($(".shellTitle"), 0.35, { "left": '16%', ease: Expo.easeInOut });
            }
            if(window.percentDone>.70 && $('.shellTitle').position().left > 0){
                $('.shellTitle').css({'left':'-30.5%'});
                $(".LContentShell").fadeOut(700);
            }
        },

        /**
        *    Render the view
        **/
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});