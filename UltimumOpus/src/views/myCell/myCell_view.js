define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myCell/myCell.html',
    'css!templates/myCell/myCell.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "RContentCell myPanel",

        // Backbone event object
        events: {
            'click #rightDiCell':'rightSidebarCell'
        },

        /**
        *    Constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            $(window).scroll(this.animateCell);
        },

        /**
        *    Animate Cellule title and content using transition
        **/
        animateCell: function(){
            if(window.percentDone<0.831){
                $(".RContentCell").fadeIn(1000);
            }
            if(window.percentDone<.78 && window.percentDone>.77){
                TweenMax.to($(".cellTitle"), 0.35, { "left": '16%',"opacity": '1', ease: Expo.easeInOut });
            }

            if(window.percentDone>.84 &&  $('.cellTitle').position().left > 0){
                $('.cellTitle').css({'left':'-30.5%'});
                $(".RContentCell").fadeOut(700);
            }
        },

        /**
        *    Print right sidebar
        **/
        rightSidebarCell: function(){
            //Block Scroll
            $('html,body').css({'overflow':'hidden'});

            this.getCell();


            TweenMax.to($("#route_home"), 0.75, { "left": '-40%', ease: Expo.easeInOut });
            TweenMax.to($("#rightSidebar"), 0.75, { "right": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".cellTitle"), 1.25, { "left": '11%', ease: Expo.easeInOut });
            TweenMax.to($("#myRContent"), 0.75, { "left": '-100%', ease: Expo.easeInOut });
            TweenMax.to($("#Cell .RContentCell #rightBlock"), 0.75, { "left": '-46%', ease: Expo.easeInOut });
        },

        getCell: function(){
            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }
            scrollToElement('.RContentCell', 600);
        },


        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});