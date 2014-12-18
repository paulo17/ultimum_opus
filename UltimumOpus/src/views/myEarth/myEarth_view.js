define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myEarth/myEarth.html',
    'css!templates/myEarth/myEarth.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentEarth leftData myPanel",

        // Backbone event object
        events: {
            'click #leftDiEarth':'leftSidebarEarth'
        },

        /**
        *    Constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            $(window).scroll(this.animLineEarth);

        },

        /**
        *    Animate Earth title and content using transition
        **/
        animLineEarth: function(){
            if(window.percentDone<.164){
                $(".LContentEarth").fadeIn(1000);
            }

            if(window.percentDone<.15 && window.percentDone>.13){
                TweenMax.to($(".earthTitle"), 0.35, { "left": '16%',"opacity": '1', ease: Expo.easeInOut });
            }

            if(window.percentDone>.165 && $('.earthTitle').position().left > 0){
                $('.earthTitle').css({'left':'-30.5%'});
                $(".LContentEarth").fadeOut(700);
            }
        },

        /**
        *    Print left sidebar
        **/
        leftSidebarEarth: function(){
            $('html,body').css({'overflow':'hidden'});
            TweenMax.to($(".earthTitle"), 1.25, { "left": '73%', ease: Expo.easeInOut });

            this.getEarth();
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '50%', ease: Expo.easeInOut });
            TweenMax.to($(".LContentEarth"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
        },

        /**
        *
        **/
        getEarth: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }

            scrollToElement('.LContentEarth', 600);
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});