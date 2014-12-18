define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myShell/myShell.html',
    'css!templates/myShell/myShell.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentShell leftData myPanel",
        events: {
            'click #leftDiShell':'leftSidebarShell'
        },
        
        initialize: function(options) {
            $(window).scroll(this.animLineShell);
        },

        leftSidebarShell: function(){
            $('html,body').css({'overflow':'hidden'});
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

        animLineShell: function(){
            if(window.length > 6298.35){
                TweenMax.to($("#anim-shell path"), .05, { "stroke-dasharray": "1412.9, 424.8", ease: Expo.easeInOut });
            }
            if(window.length < 6298.35){
               TweenMax.to($("#anim-shell path"),.20, { "stroke-dasharray": "0, 424.8", ease: Expo.easeInOut });
            }
            if(window.percentDone<0.66){
                $(".LContentShell").fadeIn(1000);
                console.log(window.percentDone);
            }
            if(window.percentDone<.63){
                TweenMax.to($(".shellTitle"), 0.35, { "left": '16%',"opacity": '1', ease: Expo.easeInOut });
            }
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});