define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myFlower/myFlower.html',
    'css!templates/myFlower/myFlower.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "RContentFlw myPanel",

        // Backbone event object
        events: {
            'click #rightDiFlw':'rightSidebarFlw'
        },

        /**
        *    Constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            $(window).scroll(this.animateFlw);
        },

        /**
        *    Animate Flower title and content using transition
        **/
        animateFlw: function(){
            if(window.percentDone<0.525){
                $(".RContentFlw").fadeIn(1000);
            }
            if(window.percentDone<.498 && window.percentDone>.48){
                TweenMax.to($(".title_flw"), 0.65, { "left": '16%', ease: Expo.easeInOut });
            }
            // Hide block
            if(window.percentDone>.542 &&  $('.title_flw').position().left > 0){
                $('.title_flw').css({'left':'30.5%'});
                $(".RContentFlw").fadeOut(700);
            }
        },

        /**
        *    Print right sidebar
        **/
        rightSidebarFlw: function(){
            //Block Scroll
            $('html,body').css({'overflow':'hidden'});

            this.getFlw();

            TweenMax.to($("#rightSidebar"), 0.75, { "right": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".title_flw"), 1.25, { "left": '15.5%', ease: Expo.easeInOut });
            TweenMax.to($("#myFlwContent"), 0.75, { "left": '-100%', ease: Expo.easeInOut });
            TweenMax.to($("#Flower .RContentFlw #rightBlock"), 0.75, { "left": '-46%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '-50.2%', ease: Expo.easeInOut });
        },

        /**
        *
        **/
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


