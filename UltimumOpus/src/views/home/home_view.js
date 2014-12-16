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
    'views/myAurora/myAurora_view',
    'views/myHearth/myHearth_view',
    'views/myStory/myStory_view',
    'views/menu/menu_view',
    'gsap',
    'utils/visible'

], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, LoaderView, FooterView,MyShellView,MyCabView, MyADNView, MyCellView, RightDiscoverView, LeftDiscoverView, MyFlowerView, MyAuroraView, MyHearthView, MyStoryView, MenuView, TweenMax, visible)
{
    return Backbone.View.extend({
        el: "#content",
        events: {
            'click .Sidebar':'closeSidebar',
            'click .btnDiscover':'lowerSound',
            'click .leftBtn':'leftBtn',
            'click .rightBtn':'rightBtn',
            'keydown':'keydown',

            'mouseenter .LContentFlw':'flowerAnimation',
            'mouseenter .LContentADN' : 'adnAnimation',
            'mouseleave .LContentADN' : 'killAdnAnimation'
        },

        initialize: function(options) {
            $(window).scroll(this.detect_scroll());
            window.setDiv = 0;

            // Listen the DOM to set it when is loaded
            pageDomAddedSignal.add(this.getMyCover, this);

            // Init all views on my home
            this.myADNView = new MyADNView(options);
            this.myCellView = new MyCellView(options);
            this.myShellView = new MyShellView(options);
            this.myCabView = new MyCabView(options);
            this.myFlowerView = new MyFlowerView(options);
            this.myHearthView = new MyHearthView(options);
            this.myAuroraView = new MyAuroraView(options);
            this.myStoryView = new MyStoryView(options);
            this.menuView = new MenuView(options);
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
            this.menuView.remove();
            this.myAuroraView.remove();
            this.myHearthView.remove();
            this.myStoryView.remove();

            // remove signals listen Dom
            pageDomAddedSignal.remove(this.getMyCover, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        getMyCover: function(){
            //Set Scroll
            this.setScroll();

            // Set !div in current height and width
            $('#menu').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#home').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#ADN').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Shell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cab').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Flower').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Story').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Hearth').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Aurora').css( { 'width' : $(window).width(), 'height' : $(window).height() } );

            // Go Bot  tom
            // window.scrollTo(0,$(window).height()*$('.panel').length);
            // console.log("goBot");

            // SVG
            // $(window).scroll(function() {
            //  drawLine( $('#route'),document.getElementById('path') );});

            // init the line length
            //    drawLine( $('#route'),
            //      document.getElementById('path') );

            //draw the line
            //   function drawLine(container, line){

            //     var pathLength = line.getTotalLength(),
            //        maxScrollTop = $(document).height() - $(window).height(),
            //         percentDone = $(window).scrollTop() / maxScrollTop,
            //         length = percentDone * pathLength;
//
            //       console.log('pathlen',pathLength);
            //      line.style.strokeDasharray = [ length ,pathLength].join(' ');
            //    }


            this.startHome();
        },

        setScroll: function(){

        },

        // setVolum on click btn Discover
        lowerSound: function(){
            //Lower sound
            var mySound = $('#mySound');
            mySound.animate({volume:.02}, 750);

            $('#footer').addClass('bgFooter');

        },

        //set css on click btn left discvoer

        leftBtn: function(){
            $('#logo').css({'color':'black'});
        },

        rightBtn: function(){
            $('#player').css({'color':'black'});
            $('.volumn').css({'fill':'black'});
        },

        //
        detect_scroll:function(){
            var  maxScrollTop = $(document).height() - $(window).height(),
                percentDone = $(window).scrollTop() / maxScrollTop;
            var myOpac = (1-percentDone)*5;
                console.log('myOpac',myOpac, 'percentDone', percentDone);

            if(percentDone<0.95 && percentDone>0.78){
                window.setDiv = window.setDiv+.05;
                console.log('window.setDiv',window.setDiv);
                if(percentDone<0.92) {
                    TweenMax.to($(".LContentADN #leftBlock"), 1.75, {"opacity": '1', ease: Expo.easeInOut});
                    console.log('zzz');
                }
                $('.LContentADN').css({'opacity':myOpac});
            }
        },

        out_scroll: function() {
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
            $('html,body').css({'overflow':'auto'});

            //Set footer color



            // Set Sound to 60%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 750);

            TweenMax.to($("#car_title"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".flwTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".cellTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".shellTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            setTimeout(function() {
                $('#footer').removeClass('bgFooter');
                $('#player').css({'color':'white'});
                $('#logo').css({'color':'white'});
                $('.volumn').css({'fill':'white'});
            }, 400);
            //Set sound to volume 100%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 750);
            ///

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

        },

        startHome: function(){
            //setSound to 60%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 1);

            setTimeout(function() {
                $( "#loader" ).fadeOut( "slow", function(){
                    $('html,body').css({
                        'overflow':'auto'
                    });
                } );
                TweenMax.to($(".first"), 1.5, { "left": '0', ease: Expo.easeInOut });
                TweenMax.to($(".first"), 2.95, { "opacity": '1', ease: Expo.easeInOut });
                TweenMax.to($(".second"), 6.95, { "opacity": '1', ease: Expo.easeInOut });
                TweenMax.to($("#footer"), 4.85, { "top": '0px', ease: Expo.easeInOut });
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
                $(".second").animate({textShadowBlur:20}, {duration: 1500, complete: function() {
                    $(".second").animate({textShadowBlur:1}, {duration: 2500});
                }});
            }, 1000);

        },

        adnAnimation:function(){
            var el = document.querySelector('.LContentADN'),
            animatedObject = document.querySelector('#animated-adn'),
            type = 'adn';
            var self = this;
            this.overflowHidden(function(){
                 $('html,body').animate({scrollTop: $(el).offset().top}, 600);
            });
            if(el.className != 'LContentADN leftData scrollable'){
                el.addEventListener('mousewheel', function(e){
                    self.scrollAnimation(e, el, animatedObject, type);
                }, false);
                el.addEventListener('DOMMouseScroll', function(e){
                    self.scrollAnimation(e, el, animatedObject, type);
                }, false);
                el.classList.add('scrollable');
            }else{
                return;
            }
        },
        flowerAnimation:function(){
            var el = document.querySelector('.LContentFlw'),
            animatedObject = document.querySelector('#animated-flower'),
            type = 'flower';
            var self = this;
            this.overflowHidden(function(){
                 $('html,body').animate({scrollTop: $(el).offset().top}, 600);
            });
            if(el.className != 'LContentFlw leftData scrollable'){
                this.cpt = 1;
                el.addEventListener('mousewheel', function(e){
                    self.scrollAnimation(e, el, animatedObject, type);
                }, false);
                el.addEventListener('DOMMouseScroll', function(e){
                    self.scrollAnimation(e, el, animatedObject, type);
                }, false);
                el.classList.add('scrollable');
            }else{
                return;
            }
        },
        overflowAuto:function(){
            setTimeout(function(){
                $('html,body').css({'overflow':'auto'});
            }, 100);
        },
        overflowHidden:function(callback){
            setTimeout(function(){
                //$('html,body').animate({scrollTop: $(el).offset().top}, 600);
                $('html,body').css({'overflow':'hidden'});
            }, 100);
            callback.call(this);
        },
        cpt:1,
        scrollAnimation:function(e, el, object, type){
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            
            if(delta === -1){
                console.log(this.cpt);

                if(this.cpt > 1){
                    this.cpt--;
                    //overflow.hidden();
                    object.src = "img/masterpiece/sequences/"+type+" ("+this.cpt+").png";
                }else{
                    object.src = "img/masterpiece/sequences/"+type+" (1).png";
                    this.cpt = 1;
                    this.overflowAuto();
                };

            }else{
                console.log(this.cpt);
                if(this.cpt < 64){
                    this.cpt++;
                    object.src = "img/masterpiece/sequences/"+type+" ("+this.cpt+").png";
                }else{
                    object.src = "img/masterpiece/sequences/"+type+" (64).png";
                    this.cpt = 64;
                    this.overflowAuto();
                };

            };
        },
        render: function() {
            this.$el.html(_.template(tpl, {}));

            // Set render on other views in home view
            this.myADNView.render();
            this.myCellView.render();
            this.myShellView.render();
            this.myCabView.render();
            this.myFlowerView.render();
            this.myAuroraView.render();
            this.myHearthView.render();
            this.myStoryView.render();
            this.menuView.render();
            this.footerView.render();
            this.leftDiscoverView.render();
            this.rightDiscoverView.render();
            this.loaderVieww.render();

            // Set content on view on div choose

            this.$el.find('#menu').append(this.menuView.el);
            this.$el.find('#ADN').append(this.myADNView.el);
            this.$el.find('#Cell').append(this.myCellView.el);
            this.$el.find('#Shell').append(this.myShellView.el);
            this.$el.find('#Cab').append(this.myCabView.el);
            this.$el.find('#Flower').append(this.myFlowerView.el);
            this.$el.find('#Story').append(this.myStoryView.el);
            this.$el.find('#Hearth').append(this.myHearthView.el);
            this.$el.find('#Aurora').append(this.myAuroraView.el);
            this.$el.find('#footer').append(this.footerView.el);
            this.$el.find('#leftSidebar').append(this.leftDiscoverView.el);
            this.$el.find('#rightSidebar').append(this.rightDiscoverView.el);
            this.$el.find('#loader').append(this.loaderVieww.el);

            // Dispatch all events in others views of this view
            this.delegateEvents();
        }
    });
});
