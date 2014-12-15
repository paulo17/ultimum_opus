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
            $('body').css({'overflow-x':'hidden','overflow-y':'hidden'});
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


/*var flower = document.getElementsByClassName('LContentFlw');

flower[0].addEventListener('mouseover', function(){alert('yo')}, false);

var image = {
    nb:1,
    init:function(){
        flower.addEventListener('mousewheel', image.scroll, false);
        flower.addEventListener('DOMMouseScroll', image.scroll, false);
    }, 
    scroll:function(e){
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        var i = image.nb;       
        if(delta === -1){
            
            if(i > 1){
                i = image.nb--;
                console.log(image.nb);      
                flower.src = "fleur/fleur ("+i+").png";
            }else{
                flower.src = "fleur/fleur (1).png";
                i = image.nb = 1;
            }
            
        }else{
            if(i < 65){
                i = image.nb++; 
                //console.log(image.nb);        
                flower.src = "fleur/fleur ("+i+").png";
            }else{
                flower.src = "fleur/fleur (65).png";
                i = image.nb = 65;
            }

        }
    }
};

image.init();*/


