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
            console.log("goBot")

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



            //console.log(st);
            //console.log(this.lastScrollTop);

            //if (st > this.lastScrollTop){
                //console.log('down');
               // this.nextPage('down');
            //} else {
                //console.log('up');
                //this.nextPage('up');
           // }

            //this.lastScrollTop = st;
            //this.getFooter();


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
<<<<<<< HEAD
                            .addClass('panel panel-current');

                        $('html, body').animate(
                            {scrollTop: Math.abs($(panelCurrent).next().offset().top) },
                            1250);

                        //panelCurrent.prev().removeClass(outClass);
=======
                            .addClass('panel panel-current ' + inClass);

                        panelCurrent.prev().removeClass(outClass);
                        // $.scrollLock( false );
                        //console.log('unlocked');
                        $(document.body).removeClass('disable-scroll');
                    }else{
                        $(document.body).addClass('disable-scroll');
                        // $.scrollLock( true );
                        //console.log('locked');
>>>>>>> FETCH_HEAD
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
<<<<<<< HEAD
                        */
                        console.log($(panelCurrent).prev().offset().top);

                        $('html, body').animate(
                            {scrollTop: Math.abs($(panelCurrent).prev().offset().top) },
                        1250);

=======
                        // $.scrollLock( false );
                        // console.log('unlocked');
                        $(document.body).removeClass('disable-scroll');
                    }else{
                        $(document.body).addClass('disable-scroll');
                        // $.scrollLock( true );
                        // console.log('locked');
>>>>>>> FETCH_HEAD
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
                $( "#loader" ).fadeOut( "slow" );
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
            var animate = {
                nb:1,
                init:function(){
                    var flower = document.getElementsByClassName('LContentFlw')
                    flower[0].addEventListener('mousewheel', animate.scroll, false);
                    flower[0].addEventListener('DOMMouseScroll', animate.scroll, false);
                }, 
                scroll:function(e){
                    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                    var i = animate.nb;       
                    if(delta === -1){
                        
                        if(i > 1){
                            i = animate.nb--;
                            console.log(animate.nb);      
                            this.src = "img/masterpiece/fleurs/flower ("+i+").png";
                        }else{
                            this.src = "img/masterpiece/fleurs/flower (1).png";
                            i = animate.nb = 1;
                           /*setTimeout(function(){
                                $('html,body').css({'overflow':'auto'});

                            }, 2000) ;*/
                        }
                        
                    }else{
                        if(i < 65){
                            i = animate.nb++; 
                            //console.log(image.nb);        
                            this.src = "img/masterpiece/fleurs/flower ("+i+").png";
                        }else{
                            this.src = "img/masterpiece/fleurs/flower (65).png";
                            i = animate.nb = 65;
                            /*setTimeout(function(){
                                $('html,body').css({'overflow':'auto'});

                            }, 2000) ;*/
                        }

                    }
                }
            };
            animate.init();
           /*setTimeout(function(){
                $('html,body').css({'overflow':'hidden'});

            }, 2000) ;*/
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