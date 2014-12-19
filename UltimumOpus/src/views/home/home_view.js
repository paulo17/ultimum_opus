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
    'views/about/about_view',
    'views/menu/menu_view',
    'gsap',
    'utils/visible'
], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, LoaderView, FooterView,MyShellView,MyCabView, MyADNView, MyCellView, RightDiscoverView, LeftDiscoverView, MyFlowerView, MyAuroraView, MyEarthView, MyStoryView,AboutView, MenuView, TweenMax, visible)
{
    return Backbone.View.extend({
        el: "#content",

        // Backbone Event object
        events: {
            'click #logo':'closeSidebar',
            'click .btnDiscover':'lowerSound',
            'click .leftBtn':'leftBtn',
            'click .rightBtn':'rightBtn',
            'keydown':'keydown',
            'click #btn-about':'showAbout',
            'click #about':'hideAbout',
            'mouseenter .RContentFlw': function(){ this.imageAnimation($('.RContentFlw')) },
            'mouseenter .LContentADN' : function(){ this.imageAnimation($('.LContentADN')) },
            'mouseenter .RContentAur' : function(){ this.imageAnimation($('.RContentAur')) }
        },

        /**
        *    View constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {

            // Listen the DOM to set it when is loaded
            pageDomAddedSignal.add(this.getMyCover, this);
            pageDomAddedSignal.add(this.paralax, this);
            pageDomAddedSignal.add(this.settingData, this);

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
            this.aboutView = new AboutView(options);
            this.footerView = new FooterView(options);
            this.loaderVieww = new LoaderView(options);


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
            pageDomAddedSignal.remove(this.paralax, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        /**
        *    Set view size height and width
        *    to Window size
        **/
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
            $('#about').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Aurora').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#paralax').css( { 'width' : $(window).width(), 'height' : $('html').height()- 2 * $(window).height()});
          //  $('#effect').css( { 'width' : $(window).width(), 'height' : $(window).height()})

            // Go Bot  tom
            window.scrollTo(0,$(window).height()*$('.panel').length);

            // Starting Home
            this.startHome();

            // Adding Scroll event using jQuery
            $(window).scroll(this.myAnimScroll);
            $(window).scroll(this.detect_scroll);
        },

        /**
        *    Setting data value at 1
        *    for LContentADN, RContentAur and RcontentFlw div
        **/
        settingData: function(){
            $('.LContentADN').data('value', 1);
            $('.RContentAur').data('value', 1);
            $('.RContentFlw').data('value', 1);
        },

        /**
        *    Initialize and start the home page
        *    Adding music and animation
        **/
        startHome: function(){
            //setSound to 10%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 1);

            setTimeout(function() {
                $( "#loader" ).fadeOut( "slow", function(){
                    $('html,body').css({'overflow':'auto'});
                    var li = document.getElementsByClassName('step-animation');

                    for(var i = 0; i < li.length; i++){
                        $('#limitation ul li:nth-child('+i+')').animate({'opacity':'0'}, i*500);
                    };
                });
                TweenMax.to($(".first"), 1.5, { "left": '0', ease: Expo.easeInOut });
                TweenMax.to($(".first"), 2.95, { "opacity": '1', ease: Expo.easeInOut });
                TweenMax.to($(".second"), 6.95, { "opacity": '1', ease: Expo.easeInOut });
                $('body').scrollTop($(window).height()*$('.panel').length);
            }, 5000);

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

        showAbout: function(){
            $('#about').fadeIn(600);
        },

        hideAbout: function(){
            $('#about').fadeOut(600);
        },

        /**
        *    Lower sound when user click for show masterpiece content
        **/
        lowerSound: function(){
            //Lower sound
            var mySound = $('#mySound');
            mySound.animate({volume:.02}, 750);
            $('#footer').addClass('bgFooter');
        },

        /**
        *    Event left button click for showing feature information
        *    @param event e
        **/
        leftBtn: function(e){
            $('.content_left').remove();
            // get feature data
            var feature = $(e.target.parentNode.parentNode).attr('data-feature');
            // init LeftView and pass feature parameter
            this.leftDiscoverView = new LeftDiscoverView({'feature': feature});
            this.$el.find('#leftSidebar').append(this.leftDiscoverView.el);

            $('#logo').css({'color':'black'});
        },

        /**
        *    Event right button click for showing feature information
        *    @param event e
        **/
        rightBtn: function(e){
            $('.content_right').remove();
            // get feature data
            var feature = $(e.target.parentNode.parentNode).attr('data-feature');
            // init RightView and pass feature parameter
            this.rightDiscoverView = new RightDiscoverView({'feature': feature});
            this.$el.find('#rightSidebar').append(this.rightDiscoverView.el);

            $('#player').css({'color':'black'});
            $('.volumn').css({'fill':'black'});
        },

        /**
        *    Event callback when detecting scroll event
        *    Set SVG animation using scroll percent
        *    and render the line on the screen
        **/
        detect_scroll: function(){

            var  maxScrollTop = $(document).height() - $(window).height();
            var percentDone = $(window).scrollTop() / maxScrollTop;
            var myOpac = (1-percentDone)*5;

            // set Anim Scroll with SVG % render
                drawLine( $('#route_home'),document.getElementById('path_home') );
                function drawLine(container, line){

                    var pathLength = line.getTotalLength(),
                        maxScrollTop = $(document).height() - $(window).height();
                        window.percentDone = $(window).scrollTop() / maxScrollTop;
                        window.length = (pathLength-(window.percentDone *pathLength));
                        window.length = pathLength-length;
                        window.length = pathLength-length;

                    // Set anim with % done on DOM

                    if(window.percentDone<0.488){
                        window.length = window.length + 510;
                    }
                    if(window.percentDone<0.32602){
                        window.length = window.length + 140;
                    }
                    if(window.percentDone<0.3633){
                        window.length = window.length + 210;
                    }
                    if(window.percentDone<0.355){
                        window.length = window.length + 600;
                    }
                    if(window.percentDone<0.275){
                        window.length = window.length + 240;
                    }
                    if(window.percentDone<0.270){
                        window.length = window.length + 180;
                    }
                    if(window.percentDone<0.208){
                        window.length = window.length + 500;
                    }
                    //draw the line
                    line.style.strokeDasharray = [ window.length ,pathLength].join(' ');
                }

            if(percentDone<0.99){
                //Show line
                TweenMax.to($("#route_home"), 0.75, { "opacity": '1', ease: Expo.easeInOut });

            }

            if(percentDone>0.985){
                //Hide line
                TweenMax.to($("#route_home"), 0.75, { "opacity": '0', ease: Expo.easeInOut });
            }

            if(percentDone<0.92) {
                //Get footer on scroll
                TweenMax.to($("#footer"), 2.85, { "top": '0px', ease: Expo.easeInOut });
            }
        },

        /**
        *    Callback function for click event closeSidebar
        **/
        closeSidebar: function(){
            $('html,body').css({'overflow':'auto'});

            // Set Sound to 60%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 750);

            TweenMax.to($("#car_title"), 0.75, { "left": '16%', ease: Expo.easeInOut });
            TweenMax.to($("#route_home"), 0.75, { "left": '0%', ease: Expo.easeInOut });
            TweenMax.to($(".title_flw"), 0.75, { "left": '16%', ease: Expo.easeInOut });
            TweenMax.to($(".cellTitle"), 0.75, { "left": '16%', ease: Expo.easeInOut });
            TweenMax.to($(".shellTitle"), 0.75, { "left": '16%', ease: Expo.easeInOut });
            TweenMax.to($(".title_Aur"), 0.75, { "left": '16%', ease: Expo.easeInOut });
            TweenMax.to($(".cabTitle"), 0.75, { "left": '16%', ease: Expo.easeInOut });
            TweenMax.to($(".title_ADN"), 0.75, { "left": '16%', ease: Expo.easeInOut });

            setTimeout(function() {
                $('#footer').removeClass('bgFooter');
                $('#player').css({'color':'white'});
                $('#logo').css({'color':'white'});
                $('.volumn').css({'fill':'white'});
            }, 400);

            //Set sound to volume 100%
            var mySound = $('#mySound');
            mySound.animate({volume:.1}, 750);

            // Come back
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
                TweenMax.to($("#Cab .RContentCab #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });
                TweenMax.to($(".RContentAur #rightBlock"), 0.75, { "left": '10%', ease: Expo.easeInOut });
            }

        },

        /**
        *    Image view on scroll ADN & Flower
        *    Use scroll percent for showing multiple image
        *    @param el
        **/
        imageAnimation:function(el){
            var view = this,
            self = el[0],
            object,type;
            this.overflowHidden(function(){
                 $('html,body').animate({scrollTop: $(self).offset().top}, 600);
            });
            if(self.classList.contains('scrollable')){
                return;
            }else{

                if(self.classList.contains('LContentADN')){
                    object = document.querySelector('#animated-adn');
                    type = 'adn',
                    self= $('.LContentADN');

                }else if(self.classList.contains('RContentFlw')){
                    object = document.querySelector('#animated-flower');
                    type = 'flower',
                    self= $('.RContentFlw');

                }else if(self.classList.contains('RContentAur')){
                    object = document.querySelector('#animated-aurore');
                    type = 'aurore',
                    self= $('.RContentAur');

                };

                el[0].addEventListener('mousewheel', function(e){
                    view.scrollAnimation(e, self, object, type);
                }, false);
                el[0].addEventListener('DOMMouseScroll', function(e){
                    view.scrollAnimation(e, self, object, type);
                }, false);
                el[0].classList.add('scrollable');
            };
        },

        /**
        *    Set the html page to automatic overflow
        **/
        overflowAuto: function(){
            setTimeout(function(){
                $('html,body').css({'overflow':'auto'});
            }, 100);
        },

        /**
        *    Set the html page to hidden overflow
        **/
        overflowHidden: function(callback){
            setTimeout(function(){
                $('html,body').css({'overflow':'hidden'});
            }, 100);
            callback.call(this);
        },

        /**
        *    Scroll animation for Flower and ADN
        *    using multiple image render
        *    @param e
        *    @param el
        *    @param object
        *    @param type
        **/
        scrollAnimation: function(e, el, object, type){
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            var data = el.data();


            var cpt = data.value;
            if(delta === -1){
                if(cpt > 1){
                    cpt--;
                    object.src = "img/masterpiece/sequences/"+type+" ("+cpt+").png";
                    el.data('value', cpt);
                }else{
                    cpt = 1;
                    object.src = "img/masterpiece/sequences/"+type+" ("+cpt+").png";
                    el.data('value', cpt);
                    this.overflowAuto();
                };

            }else{
                
                if(cpt < 64){
                    cpt++;
                    object.src = "img/masterpiece/sequences/"+type+" ("+cpt+").png";
                    el.data('value', cpt);
                }else{
                    object.src = "img/masterpiece/sequences/"+type+" (64).png";
                    cpt = 64;
                    el.data('value', cpt);
                    this.overflowAuto();
                };
            };
        },

        /**
        *    Parallax background
        **/
        paralax: function(){
            var width = $(window).width()/2,
            height = $(window).height()/2,
            rate1 = 0.02;
            rate2 = 0.008;
            $(window).mousemove(function(e){
                var x = e.clientX - width,
                y = e.clientY - height;
                $('#filter1').css({
                    'transform': 'rotateY('+(-Math.floor(x*rate2))+'deg)'
                });
                $('#filter3').css({
                    'transform': 'rotateY('+(-Math.floor(x*rate2))+'deg)'
                });
                $('#filter2').css({
                    'left': Math.floor(x*rate1)+'px',
                    'transform' : 'translateY('+Math.floor(y*rate1) + 'px)',
                    /*'transition' : 'bottom 0s'*/
                });
            });

            $(window).scroll(function(){
                var percent = (($('html').height()-$(window).scrollTop())*10)/($('html').height());

                $('#filter2').css({
                    'bottom': -percent + '%'
                })
            });
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
            this.myEarthView.render();
            this.myStoryView.render();
            this.menuView.render();
            this.footerView.render();
            this.loaderVieww.render();
            this.aboutView.render();

            // Set content on view on div choose
            this.$el.find('#menu').append(this.menuView.el);
            this.$el.find('#about').append(this.aboutView.el);
            this.$el.find('#ADN').append(this.myADNView.el);
            this.$el.find('#Cell').append(this.myCellView.el);
            this.$el.find('#Shell').append(this.myShellView.el);
            this.$el.find('#Cab').append(this.myCabView.el);
            this.$el.find('#Flower').append(this.myFlowerView.el);
            this.$el.find('#Story').append(this.myStoryView.el);
            this.$el.find('#Earth').append(this.myEarthView.el);
            this.$el.find('#Aurora').append(this.myAuroraView.el);
            this.$el.find('#footer').append(this.footerView.el);
            this.$el.find('#loader').append(this.loaderVieww.el);

            // Dispatch all events in others views of this view
            this.delegateEvents();
        }

    });
});
