define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myADN/myADN.html',
    'css!templates/myADN/myADN.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentADN leftData",
        events: {
            'click #leftDiADN':'leftSidebarADN'
        },

        initialize: function(options) {
                $(window).scroll(this.animateADN);
        },


        animateADN: function(){
            if(window.percentDone<.92){
                $(".LContentADN").fadeIn(1000);
            }
            if(window.percentDone<.89 && window.percentDone>.87){
                TweenMax.to($(".title_ADN"), 0.45, { "left": '16%', ease: Expo.easeInOut });
            }
            // Hide block
            if(window.percentDone>.95 &&  $('.title_ADN').position().left > 0){
                $('.title_ADN').css({'left':'-30.5%'});
                $(".LContentADN").fadeOut(700);
            }
        },


        leftSidebarADN: function(){
            $('html,body').css({'overflow':'hidden'});

            this.getADN();
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".LContentADN"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
            TweenMax.to($(".title_ADN"), 1.25, { "left": '73.5%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '50%', ease: Expo.easeInOut });
        },

        getADN: function(){

            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }

            scrollToElement('.LContentADN', 600);
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});