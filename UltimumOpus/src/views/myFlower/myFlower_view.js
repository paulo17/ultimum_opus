define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myFlower/myFlower.html',
    'css!templates/myFlower/myFlower.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentFlw leftData",
        events: {
            'click #leftDiFlw':'leftSidebarFlw',
            
        },
        
        initialize: function(options) {
        },

        leftSidebarFlw: function(){
            $('html,body').css({'overflow':'hidden'});
            TweenMax.to($(".flwTitle"), 0.75, { "left": '50%', ease: Expo.easeInOut });

            // Top div
            this.getFlw();
            ///
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".LContentFlw"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
        },

        getFlw: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }

            scrollToElement('.LContentFlw', 600);
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        },
    });

});


