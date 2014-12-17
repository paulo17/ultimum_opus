define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myCab/myCab.html',
    'css!templates/myCab/myCab.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentCab leftData",
        events: {
            'click #leftDiCab':'leftSidebarCab'
        },

        initialize: function(options) {
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

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});