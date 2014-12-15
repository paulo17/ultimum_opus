define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myShell/myShell.html',
    'css!templates/myShell/myShell.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentShell leftData",
        events: {
            'click #leftDiShell':'leftSidebarShell'
        },
        
        initialize: function(options) {
        },

        leftSidebarShell: function(){
            $('body').css({'overflow-x':'hidden','overflow-y':'hidden'});
            TweenMax.to($(".shellTitle"), 0.75, { "left": '42.5%', ease: Expo.easeInOut });

            this.getShell();
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".LContentShell"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
        },

        getShell: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }

            scrollToElement('.LContentShell', 600);
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});