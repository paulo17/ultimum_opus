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
        events: {
            'click #rightDiCell':'rightSidebarCell'
        },


        initialize: function(options) {
            $(window).scroll(this.animateCell);
        },

        animateCell: function(){
            if(window.percentDone<0.831){
                $(".RContentCell").fadeIn(1000);
            }
            if(window.percentDone<.78){
                TweenMax.to($(".cellTitle"), 0.65, { "left": '16%',"opacity": '1', ease: Expo.easeInOut });
            }

            if(window.percentDone>.84 &&  $('.cellTitle').position().left > 0){
                $('.cellTitle').css({'left':'-23.5%'});
                $(".RContentCell").fadeOut(700);
            }
            console.log(window.percentDone)
        },

        rightSidebarCell: function(){
            //Block Scroll
            $('html,body').css({'overflow':'hidden'});

            this.getCell();

            TweenMax.to($("#rightSidebar"), 0.75, { "right": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".cellTitle"), 0.85, { "left": '12.5%', ease: Expo.easeInOut });
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