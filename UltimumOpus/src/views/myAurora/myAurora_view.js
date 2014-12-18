define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myAurora/myAurora.html',
    'css!templates/myAurora/myAurora.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "RContentAur myPanel",
        events: {
            'click #rightDiAur':'rightSidebarAur'
        },


        initialize: function(options) {
            $(window).scroll(this.animateAur);
        },

        animateAur: function(){
            if(window.percentDone<.2709){
                $(".RContentAur").fadeIn(1000);
            }
            if(window.percentDone<.268 && window.percentDone<.26) {
                TweenMax.to($(".title_Aur"), 0.35, { "left": '16%', ease: Expo.easeInOut });
            }

            if(window.percentDone>.2709 && $('.title_Aur').position().left > 0){
                $('.title_Aur').css({'left':'-23.5%'});
                $(".RContentAur").fadeOut(700);
            }
        },

        rightSidebarAur: function(){
            //Block Scroll
            $('html,body').css({'overflow':'hidden'});

            this.getAur();

            TweenMax.to($("#rightSidebar"), 0.75, { "right": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".title_Aur"), 1.25, { "left": '22%', ease: Expo.easeInOut });
            TweenMax.to($("#myAurContent"), 0.75, { "left": '-100%', ease: Expo.easeInOut });
            TweenMax.to($("#Aurora .RContentAur #rightBlock"), 0.75, { "left": '-46%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '-50.2%', ease: Expo.easeInOut });
        },

        getAur: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }
            scrollToElement('.RContentAur', 600);
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});