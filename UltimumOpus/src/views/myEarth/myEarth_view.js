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
        events: {
            'click #leftDiEarth':'leftSidebarEarth'
        },

        initialize: function(options) {
        },

        leftSidebarEarth: function(){
            $('html,body').css({'overflow':'hidden'});
            TweenMax.to($(".earthTitle"), 0.75, { "left": '49.5%', ease: Expo.easeInOut });

            this.getEarth();
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '50%', ease: Expo.easeInOut });
            TweenMax.to($(".LContentEarth"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
        },

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