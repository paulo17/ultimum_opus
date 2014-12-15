define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myCab/myCab.html',
    'css!templates/myCab/myCab.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "RContentCab",
        events: {
            'click #rightDiCell':'rightSidebarCab'
        },
        
        initialize: function(options) {
        },

        rightSidebarCab: function(){
            //Block Scroll
            $('body').css({'overflow-x':'hidden','overflow-y':'hidden'});

            this.getCab();

            TweenMax.to($("#rightSidebar"), 0.75, { "right": '0px', ease: Expo.easeInOut });
            TweenMax.to($("#myCabContent"), 0.75, { "left": '-100%', ease: Expo.easeInOut });
            TweenMax.to($("#Cab .RContentCab #rightBlock"), 0.75, { "left": '-32%', ease: Expo.easeInOut });
        },

        getCab: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }
            scrollToElement('.RContentCab', 600);
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});