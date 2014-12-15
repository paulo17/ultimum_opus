define([
    'backbone',
    'underscore',
    'config',
    'signals/page_dom_added_signal',
    'text!templates/home/home.html',
    'css!templates/home/home.css',
    'views/loader/loader_view',
    'views/footer/footer_view',
    'views/myShell/myShell_view',
    'views/myCab/myCab_view',
    'views/myADN/myADN_view',
    'views/myCell/myCell_view',
    'views/rightDiscover/rightDiscover_view',
    'views/leftDiscover/leftDiscover_view',
    'views/myFlower/myFlower_view',
    'gsap'

], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, LoaderView, FooterView,MyShellView,MyCabView, MyADNView, MyCellView, RightDiscoverView, LeftDiscoverView, MyFlowerView, TweenMax)
{
    return Backbone.View.extend({
        el: "#content",
        events: {
            'click .Sidebar':'closeSidebar',
            'keydown' : 'keydown',
            'mouseenter .LContentFlw':'imageAnimation'
        },

        initialize: function(options) {
            $(window).scroll(this.detect_scroll());
            window.setOpacity = 0;

            // Listen the DOM to set it when is loaded
            pageDomAddedSignal.add(this.getMyCover, this);

            // Init all views on my home
            this.myADNView = new MyADNView(options);
            this.myCellView = new MyCellView(options);
            this.myShellView = new MyShellView(options);
            this.myCabView = new MyCabView(options);
            this.myFlowerView = new MyFlowerView(options);
            this.rightDiscoverView = new RightDiscoverView(options);
            this.leftDiscoverView = new LeftDiscoverView(options);
            this.footerView = new FooterView(options);
            this.loaderVieww = new LoaderView(options);

        },

        remove: function() {
            this.myADNView.remove();
            this.myCellView.remove();
            this.myShellView.remove();
            this.myCabView.remove();
            this.myFlowerView.remove();
            this.rightDiscoverView.remove();
            this.leftDiscoverView.remove();
            this.footerView.remove();
            this.loaderView.remove();

            // remove signals listen Dom
            pageDomAddedSignal.remove(this.getMyCover, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        getMyCover: function(){
            //Set Scroll
            this.setScroll();

            // Set !div in current height and width
            $('#home').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#ADN').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Shell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cab').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Flower').css( { 'width' : $(window).width(), 'height' : $(window).height() } );

            // Go Bottom
            window.scrollTo(0,$(window).height()*$('.panel').length);
            console.log("goBot");

            // SVG
           // $(window).scroll(function() {
             //   drawLine( $('#route'),
               //     document.getElementById('path') );
           // });

            // init the line length
            //drawLine( $('#route'),
              //  document.getElementById('path') );

            //draw the line
            //function drawLine(container, line){

              //  var pathLength = line.getTotalLength(),
                //    maxScrollTop = $(document).height() - $(window).height(),
                  //  percentDone = $(window).scrollTop() / maxScrollTop,
                    //length = percentDone * pathLength;
                //line.style.strokeDasharray = [ length ,pathLength].join(' ');
            //}


            this.startHome();
        },

        setScroll: function(){

        },


        detect_scroll: function() {
            console.log($(this).scrollTop(),$(window).height()*$('.panel').length-$(window).height());
            //  Current Div

            var crtScroll = $(this).scrollTop(),
                mySetDiv = $(window).height()*$('.panel').length;


            console.log(crtScroll-(crtScroll-$(window).height()*$('.panel').length-$(window).height()))
            console.log('currentScroll', crtScroll, 'test',mySetDiv-$(window).height()*2.5,'autre', mySetDiv-$(window).height()*2 )
            if(crtScroll > mySetDiv-$(window).height()*2.5){
                console.log('zzz');
                var header = $('.LContentADN');
                var range = 1000;
                var st = $(this).scrollTop();
                header.each(function () {
                    var offset = $(this).offset().top;
                    var height = $(this).outerHeight();
                    offset = offset + height / 2;
                    $(this).css({ 'opacity': (1.3 - (st - offset + range) / range)+.48 });
                    console.log('maValeur',1.3 - (st - offset + range) / range);
                });
            }
            else {
                //$(".LContentADN").stop().fadeOut();
            }
            //this.getFooter();

        },

        keydown: function(e){
            switch(e.which) {
                  case 38: // up
                     console.log('up');
                      //this.nextPage('up');
                      break;
                 case 40: // down
                     console.log('down');
                      //this.nextPage('down');
                     break;
                  default: return;
              }
        },

        nextPage: function(animation){
            var inClass = '', outClass = '';

            var panelCurrent = $('.panel-current');

            switch(animation){
                case 'up':
                    outClass = 'pt-page-fade';
                    inClass = 'pt-page-moveFromTop pt-page-ontop';

                    if(panelCurrent.next().hasClass('panel')){

                        panelCurrent.removeClass().addClass('panel');

                        panelCurrent.next()
                            .removeClass()
                            .addClass('panel panel-current');

                        $('html, body').animate(
                            {scrollTop: Math.abs($(panelCurrent).next().offset().top) },
                            1250);

                        //panelCurrent.prev().removeClass(outClass);
                    }

                    break;
                case 'down':

                    outClass = 'pt-page-fade';
                    inClass = 'pt-page-moveFromBottom pt-page-ontop';
                    if(panelCurrent.prev().hasClass('panel')){

                        panelCurrent.removeClass().addClass('panel');
                        /*panelCurrent.removeClass().addClass('panel ' + outClass);*/

                        panelCurrent.prev()
                            .removeClass()
                            .addClass('panel panel-current');

                        /*
                        panelCurrent.next().removeClass(outClass);

                        */
                        console.log($(panelCurrent).prev().offset().top);

                        $('html, body').animate(
                            {scrollTop: Math.abs($(panelCurrent).prev().offset().top) },
                        1250);
                    }

                    break;
            }


        },

        closeSidebar: function(){
            $('body').css({'overflow-x':'auto','overflow-y':'auto'});
            TweenMax.to($("#car_title"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".flwTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".cellTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".shellTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            //Set


            if ($(".leftActive")[0]){
                TweenMax.to($("#leftSidebar"), 0.75, { "left": '-70%', ease: Expo.easeInOut });
                TweenMax.to($(".leftData"), 0.75, { "right": '0', ease: Expo.easeInOut });
                $('.leftData').removeClass('leftActive');
            } else {
                TweenMax.to($("#myRContent"), 0.75, { "left": '15%', ease: Expo.easeInOut });
                TweenMax.to($("#myCabContent"), 0.75, { "left": '15%', ease: Expo.easeInOut });
                TweenMax.to($("#rightSidebar"), 0.75, { "right": '-70%', ease: Expo.easeInOut });
                TweenMax.to($("#Cell .RContentCell #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });
                TweenMax.to($("#Cab .RContentCab #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });
            }

            // Set title in good position

        },

        getFooter: function(){
            console.log('footer');
            TweenMax.to($("#footer"), 0.85, { "bottom": '0px', ease: Expo.easeInOut });
        },

        startHome: function(){
            setTimeout(function() {
                $( "#loader" ).fadeOut( "slow", function(){
                    $('html,body').css({
                        'overflow':'auto'
                    });
                } );
                TweenMax.to($(".first"), 1.5, { "left": '0', ease: Expo.easeInOut });
                TweenMax.to($(".first"), 2.95, { "opacity": '1', ease: Expo.easeInOut });
                TweenMax.to($(".second"), 6.95, { "opacity": '1', ease: Expo.easeInOut });
            }, 3000);
            $(window).scroll(this.detect_scroll);
            var offset = $("#home").offset();
            $("html,body").animate({
                scrollTop: offset.top
            });

            $({blurRadius: 10}).animate({blurRadius: 0}, {
                duration: 3000,
                easing: 'swing', // or "linear"
                // use jQuery UI or Easing plugin for more options
                step: function() {
                    $('.second').css({
                        "-webkit-filter": "blur("+this.blurRadius+"px)",
                        "filter": "blur("+this.blurRadius+"px)"
                    });
                }
            });

            //Set TextShadow on Opus
            $.fx.step.textShadowBlur = function(fx) {
                $(fx.elem)
                    .prop('textShadowBlur', fx.now)
                    .css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px white'});
            };

            setInterval(function() {
                $(".second").animate({textShadowBlur:12}, {duration: 1500, complete: function() {
                    $(".second").animate({textShadowBlur:1}, {duration: 2500});
                }});
            }, 1000);

        },

        imageAnimation:function(){
            var overflow = {
                auto:function(){
                    setTimeout(function(){
                        $('html,body').css({'overflow':'auto'});
                    }, 100);
                },
                hidden:function(){
                    setTimeout(function(){
                        $('html,body').animate({scrollTop: $('.LContentFlw').offset().top}, 600);
                        $('html,body').css({'overflow':'hidden'});
                    }, 100);
                }
            };
            var flower = document.getElementById('animated-flower');
            var animate = {
                nb:1,
                init:function(){
                    var flowerContent = document.getElementsByClassName('LContentFlw');

                    flowerContent[0].addEventListener('mousewheel', animate.scroll, false);
                    flowerContent[0].addEventListener('DOMMouseScroll', animate.scroll, false);
                },
                scroll:function(e){
                    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                    var i = animate.nb;
                    if(delta === -1){

                        if(i > 1){
                            i = animate.nb--;
                            // overflow.hidden();
                            flower.src = "img/masterpiece/fleurs/flower ("+i+").png";
                        }else{
                            flower.src = "img/masterpiece/fleurs/flower (1).png";
                            i = animate.nb = 1;
                           overflow.auto();
                        }

                    }else{
                        if(i < 64){
                            //overflow.hidden();
                            i = animate.nb++;
                            flower.src = "img/masterpiece/fleurs/flower ("+i+").png";
                        }else{
                            //overflow.auto();
                            flower.src = "img/masterpiece/fleurs/flower (64).png";
                            i = animate.nb = 64;

                        }

                    }
                }
            };
            animate.init();
           overflow.hidden();
        },

        render: function() {
            this.$el.html(_.template(tpl, {}));

            // Set render on other views in home view
            this.myADNView.render();
            this.myCellView.render();
            this.myShellView.render();
            this.myCabView.render();
            this.myFlowerView.render();
            this.footerView.render();
            this.leftDiscoverView.render();
            this.rightDiscoverView.render();
            this.loaderVieww.render();

            // Set content on view on div choose

            this.$el.find('#ADN').append(this.myADNView.el);
            this.$el.find('#Cell').append(this.myCellView.el);
            this.$el.find('#Shell').append(this.myShellView.el);
            this.$el.find('#Cab').append(this.myCabView.el);
            this.$el.find('#Flower').append(this.myFlowerView.el);
            this.$el.find('#footer').append(this.footerView.el);
            this.$el.find('#leftSidebar').append(this.leftDiscoverView.el);
            this.$el.find('#rightSidebar').append(this.rightDiscoverView.el);
            this.$el.find('#loader').append(this.loaderVieww.el);

            // Dispatch all events in others views of this view
            this.delegateEvents();
        }
    });
});
