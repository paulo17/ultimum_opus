define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myCab/myCab.html',
    'css!templates/myCab/myCab.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentCab leftData myPanel",
        events: {
            'click #leftDiCab':'leftSidebarCab'
        },

        initialize: function(options) {
            $(window).scroll(this.animLineCab);
        },

        leftSidebarCab: function(){
            $('html,body').css({'overflow':'hidden'});
            TweenMax.to($(".cabTitle"), 0.75, { "left": '49.5%', ease: Expo.easeInOut });

            this.getCab();
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '50%', ease: Expo.easeInOut });
            TweenMax.to($(".LContentCab"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
        },

        getCab: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }

            scrollToElement('.LContentCab', 600);
        },

        animLineCab: function(){
          if(window.length > 11384.637220818546){
              TweenMax.to($(".line_1"), .45, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_2"), .85, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_3"), 1.05, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_4"), 1.25, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_5"), 1.45, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_6"), 1.65, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_7"), 1.85, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
              TweenMax.to($(".line_8"),.65, { "stroke-dasharray": "711.4, 713.8", ease: Expo.easeInOut });
          }
            if(window.length < 11384.637220818546){
                TweenMax.to($(".line_1"),1.45, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_2"), 1.05, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_3"), .95, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_4"), .85, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_5"), .65, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_6"), .45, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_7"), .25, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
                TweenMax.to($(".line_8"),1.25, { "stroke-dasharray": "0, 713.8", ease: Expo.easeInOut });
            }
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});