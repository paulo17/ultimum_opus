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
    'views/myEarth/myEarth_view',
    'views/myStory/myStory_view',
    'views/menu/menu_view',
    'gsap',
    'utils/visible',
    'models/API_model'
], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, LoaderView, FooterView,MyShellView,MyCabView, MyADNView, MyCellView, RightDiscoverView, LeftDiscoverView, MyFlowerView, MyAuroraView, MyEarthView, MyStoryView, MenuView, TweenMax, visible, API)

{
    return Backbone.View.extend({
        el: "#content",
        events: {
            'click .Sidebar':'closeSidebar',
            'click .btnDiscover':'lowerSound',
            'click .leftBtn':'leftBtn',
            'click .rightBtn':'rightBtn',
            'keydown':'keydown',
            'mouseenter .RContentFlw': function(){this.imageAnimation($('.RContentFlw'))},
            'mouseenter .LContentADN' : function(){this.imageAnimation($('.LContentADN'))}
            //'mouseleave .LContentADN' : 'killAdnAnimation'
        },

        initialize: function(options) {

            $(window).load(function () {
               console.log('page loaded');

            });
            // Listen the DOM to set it when is loaded
            pageDomAddedSignal.add(this.getMyCover, this);

            // Init all views on my home
            this.myADNView = new MyADNView(options);
            this.myCellView = new MyCellView(options);
            this.myShellView = new MyShellView(options);
            this.myCabView = new MyCabView(options);
            this.myFlowerView = new MyFlowerView(options);
            this.myEarthView = new MyEarthView(options);
            this.myAuroraView = new MyAuroraView(options);
            this.myStoryView = new MyStoryView(options);
            this.menuView = new MenuView(options);
            this.rightDiscoverView = new RightDiscoverView(options);
            this.leftDiscoverView = new LeftDiscoverView(options);
            this.footerView = new FooterView(options);
            this.loaderVieww = new LoaderView(options);

            // Init Model
            this.API = new API();

        },

        remove: function() {
            // Remove view after his init
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
            this.myEarthView.remove();
            this.myStoryView.remove();

            // remove signals listen Dom
            pageDomAddedSignal.remove(this.getMyCover, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        startHome: function(){
            //setSound to 10%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 1);

            setTimeout(function() {
                $( "#loader" ).fadeOut( "slow", function(){
                    $('html,body').css({'overflow':'auto'});

                });
                TweenMax.to($(".first"), 1.5, { "left": '0', ease: Expo.easeInOut });
                TweenMax.to($(".first"), 2.95, { "opacity": '1', ease: Expo.easeInOut });
                TweenMax.to($(".second"), 6.95, { "opacity": '1', ease: Expo.easeInOut });
                $('body').scrollTop($(window).height()*$('.panel').length);
            }, 5000);
            //$(window).scroll(this.detect_scroll);


            // Make shine on title
            $({blurRadius: 10}).animate({blurRadius: 0}, {
                duration: 3000,
                easing: 'swing',
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

        // Set DOM in current Window
        getMyCover: function(){

            // Set !div in current height and width
            $('#menu').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#home').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#ADN').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Shell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cab').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Flower').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Story').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Earth').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Aurora').css( { 'width' : $(window).width(), 'height' : $(window).height() } );

            // Go Bot  tom
            window.scrollTo(0,$(window).height()*$('.panel').length);

            this.startHome();
            $(window).scroll(this.detect_scroll);
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

        detect_scroll:function(){

            var  maxScrollTop = $(document).height() - $(window).height(),
                percentDone = $(window).scrollTop() / maxScrollTop;
            var myOpac = (1-percentDone)*5;
               // console.log('myOpac',myOpac, 'percentDone', percentDone,'$(window).scrollTop()', $(document).scrollTop());

            // set Anim Scroll with SVG % render
                drawLine( $('#route_home'),document.getElementById('path_home') );
                function drawLine(container, line){

                    var pathLength = line.getTotalLength(),
                        maxScrollTop = $(document).height() - $(window).height(),
                        percentDone = $(window).scrollTop() / maxScrollTop;
                        window.length = (pathLength-(percentDone *pathLength));
                        window.length = pathLength-length;
                        window.length = pathLength-length;

                    // Set anim with % done on DOM
                    if(percentDone<0.32602){
                        window.length = window.length + 140;
                    }
                    if(percentDone<0.3633){
                        window.length = window.length + 210;
                    }
                    if(percentDone<0.325){
                        window.length = window.length + 600;
                    }
                    if(percentDone<0.275){
                        window.length = window.length + 240;
                    }
                    if(percentDone<0.270){
                        window.length = window.length + 180;
                    }
                    if(percentDone<0.208){
                        window.length = window.length + 500;
                    }

                    //draw the line

                //    console.log('original',window.length, 'percentDone', percentDone);
                    line.style.strokeDasharray = [ window.length ,pathLength].join(' ');

                }



            if(percentDone<0.99){
                TweenMax.to($("#route_home"), 0.75, { "opacity": '1', ease: Expo.easeInOut });
            }
            if(percentDone<0.95 && percentDone>0.78){
               TweenMax.to($("#route_home"), 0.75, { "opacity": '1', ease: Expo.easeInOut });
               window.setDiv = window.setDiv+.05;
                  //  console.log('window.setDiv',window.setDiv);
               if(percentDone<0.92) {
                   TweenMax.to($(".LContentADN #leftBlock"), 1.75, {"opacity": '1', ease: Expo.easeInOut});

                        //Get footer on scroll
                     TweenMax.to($("#footer"), 2.85, { "top": '0px', ease: Expo.easeInOut });
               }
              $('.LContentADN').css({'opacity':myOpac});
            }
        },

        closeSidebar: function(){
            $('html,body').css({'overflow':'auto'});

            //Set footer color


            // Set Sound to 60%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 750);

            TweenMax.to($("#car_title"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '0%', ease: Expo.easeInOut });
            TweenMax.to($(".title_flw"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".cellTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".shellTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".title_Aur"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });
            TweenMax.to($(".cabTitle"), 0.75, { "left": '32.5%', ease: Expo.easeInOut });

            setTimeout(function() {
                $('#footer').removeClass('bgFooter');
                $('#player').css({'color':'white'});
                $('#logo').css({'color':'white'});
                $('.volumn').css({'fill':'white'});
            }, 400);
            //Set sound to volume 100%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 750);

            //---- Come back -----//
            if ($(".leftActive")[0]){
                TweenMax.to($("#leftSidebar"), 0.75, { "left": '-70%', ease: Expo.easeInOut });
                TweenMax.to($(".leftData"), 0.75, { "right": '0', ease: Expo.easeInOut });
                $('.leftData').removeClass('leftActive');
            } else {
                TweenMax.to($("#myRContent"), 0.75, { "left": '15%', ease: Expo.easeInOut });
                TweenMax.to($("#myAurContent"), 0.75, { "left": '15%', ease: Expo.easeInOut });
                TweenMax.to($("#myCabContent"), 0.75, { "left": '15%', ease: Expo.easeInOut });
                TweenMax.to($("#Flower .RContentFlw #leftBlock .txt_content"), 0.75, { "left": '15%', ease: Expo.easeInOut });
                TweenMax.to($("#rightSidebar"), 0.75, { "right": '-70%', ease: Expo.easeInOut });
                TweenMax.to($(".RContentCell #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });
                TweenMax.to($(".RContentFlw #rightBlock"), 0.75, { "left": '4.3%', ease: Expo.easeInOut });
                TweenMax.to($("#Cab .RContentCab #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });;
                TweenMax.to($(".RContentAur #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });;
            }

        },



        imageAnimation:function(el){

            console.log('myAnimation')
            var view = this,
            self = el[0],
            object,type;
            this.overflowHidden(function(){
                 $('html,body').animate({scrollTop: $(self).offset().top}, 600);
            });
            if(self.classList.contains('scrollable')){
                return;
            }else{
                this.cpt = 1;
                if(self.classList.contains('LContentADN')){
                    object = document.querySelector('#animated-adn');
                    type = 'adn';
                }else if(self.classList.contains('RContentFlw')){
                    object = document.querySelector('#animated-flower');
                    type = 'flower';
                }else{
                    console.log('ca marche pas')
                }

                el[0].addEventListener('mousewheel', function(e){
                    view.scrollAnimation(e, self, object, type);
                }, false);
                el[0].addEventListener('DOMMouseScroll', function(e){
                    view.scrollAnimation(e, self, object, type);
                }, false);
                el[0].classList.add('scrollable');
            };
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

            // testing model API
            this.API.find();
            this.API.getById(1);


            // Set render on other views in home view
            this.myADNView.render();
            this.myCellView.render();
            this.myShellView.render();
            this.myCabView.render();
            this.myFlowerView.render();
            this.myAuroraView.render();
            this.myEarthView.render();
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
            this.$el.find('#Earth').append(this.myEarthView.el);
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
