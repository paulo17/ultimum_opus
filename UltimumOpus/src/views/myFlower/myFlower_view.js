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
            'click #leftSidebarFlw':'leftSidebarFlw'
            
        },
        
        initialize: function(options) {
        },

        leftSidebarFlw: function(){
            console.log('coucou');
            $('html,body').css({'overflow':'hidden'});
            TweenMax.to($(".flwTitle"), 0.75, { "left": '50%', ease: Expo.easeInOut });

            // Top div
            this.getFlw();
            ///
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".title_flw"), 0.75, { "left": '148%', ease: Expo.easeInOut });
            TweenMax.to($("#rightBlock"), 0.75, { "left": '12.3%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '8%', ease: Expo.easeInOut });
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


