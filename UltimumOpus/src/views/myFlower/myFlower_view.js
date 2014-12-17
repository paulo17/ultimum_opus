define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myFlower/myFlower.html',
    'css!templates/myFlower/myFlower.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "RContentFlw",
        events: {
            'click #rightDiFlw':'rightSidebarFlw'
        },


        initialize: function(options) {
        },

        rightSidebarFlw: function(){
            //Block Scroll
            $('html,body').css({'overflow':'hidden'});

            this.getFlw();

            TweenMax.to($("#rightSidebar"), 0.75, { "right": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".title_flw"), 0.85, { "left": '28.5%', ease: Expo.easeInOut });
            TweenMax.to($("#myFlwContent"), 0.75, { "left": '-100%', ease: Expo.easeInOut });
            TweenMax.to($("#Flower .RContentFlw #rightBlock"), 0.75, { "left": '-46%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '-50.2%', ease: Expo.easeInOut });
        },

        getFlw: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }
            scrollToElement('.RContentFlw', 600);
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        },
    });

});


