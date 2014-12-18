define([
    'backbone',
    'underscore',
    'config',
    'text!templates/myADN/myADN.html',
    'css!templates/myADN/myADN.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "LContentADN leftData myPanel",
        events: {
            'click #leftDiADN':'leftSidebarADN'
        },
        
        initialize: function(options) {
            $(window).scroll(this.animateADN);
        },

        animateADN: function(){
            //console.log(1-$(window).scrollTop()/($(document).height()-$(window).height()));
           // var myScroll =(((1-$(window).scrollTop()/($(document).height()-$(window).height()))*2)*10)-.6;
           // var myTitle =((((1-$(window).scrollTop()/($(document).height()-$(window).height()))*2)*10)*100)-120;

         //   console.log(myTitle);
           // $('.LContentADN').css({'opacity':myScroll})
            //$('.title_ADN').css({'right':''+myTitle+'%'});


        },

        leftSidebarADN: function(){
            $('html,body').css({'overflow':'hidden'});

            this.getADN();
            $('.leftData').addClass('leftActive');
            TweenMax.to($("#leftSidebar"), 0.75, { "left": '0px', ease: Expo.easeInOut });
            TweenMax.to($(".LContentADN"), 0.75, { "right": '-50%', ease: Expo.easeInOut });
            TweenMax.to($(".title_ADN"), 0.75, { "left": '48.5%', ease: Expo.easeInOut });
        },

        getADN: function(){

            var scrollToElement = function(el, ms){
                var speed = (ms) ? ms : 600;
                $('html,body').animate({scrollTop: $(el).offset().top}, speed);
            }

            scrollToElement('.LContentADN', 600);
        },
            
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});