define([
  'backbone',
  'underscore',
  'config',
  'signals/page_dom_added_signal',
  'text!templates/home/home.html',
  'css!templates/home/home.css',
  'utils/fullPage',
  'views/footer/footer_view',
  'views/myShell/myShell_view',
  'views/myCab/myCab_view',
  'views/myADN/myADN_view',
  'views/myCell/myCell_view',
  'views/rightDiscover/rightDiscover_view',
  'views/leftDiscover/leftDiscover_view',
  'views/myFlower/myFlower_view',
  'gsap',
  'utils/scrollLock'
  ], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, fullPage,
    FooterView,MyShellView,MyCabView, MyADNView, MyCellView, RightDiscoverView,
    LeftDiscoverView, MyFlowerView, TweenMax, scrollLock)
    {
      return Backbone.View.extend({
        el: "#content",
        lastScrollTop: 0,
        events: {
          'scroll': 'detect_scroll',
          'click .Sidebar':'closeSidebar'
        },

        initialize: function(options) {
          _.bindAll(this, 'detect_scroll');
          // bind to window
          $(window).scroll(this.detect_scroll);

          var winHeight = $(window).innerHeight();
          $(document).ready(function () {
            console.log(winHeight);
            $(".panel").height(winHeight);

          });

          window.addEventListener('resize', function (event) {
            $(".panel").height($(window).innerHeight());
          });
          $(window).on('scroll',function(){
            $("#main").css('bottom',$(window).scrollTop()*-1);
          });


          $(window).on('scroll',function(){
            $("#main").css('bottom',$(window).scrollTop()*-1);
          });


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
          $("body").height($(window).height()*$(".panel").length);
        },

        detect_scroll: function(e) {
          var st = $(window).scrollTop();
          console.log(st);
          console.log(this.lastScrollTop);

          if (st > this.lastScrollTop){
            console.log('down');
            this.nextPage('down');
          } else {
            console.log('up');
            this.nextPage('up');
          }

          this.lastScrollTop = st;
          this.getFooter();

        },

        nextPage: function(animation){
          var inClass = '', outClass = '';

          var panelCurrent = $('.panel-current');

          switch(animation){
            case 'up':
              outClass = 'pt-page-fade';
              inClass = 'pt-page-moveFromTop pt-page-ontop';

              if(panelCurrent.next().hasClass('panel')){
                panelCurrent.removeClass().addClass('panel ' + outClass);

                panelCurrent.next()
                .removeClass()
                .addClass('panel panel-current ' + inClass);

                panelCurrent.prev().removeClass(outClass);
                // $.scrollLock( false );
                //console.log('unlocked');
              }else{
                // $.scrollLock( true );
                //console.log('locked');
              }

              break;
              case 'down':

                outClass = 'pt-page-fade';
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                if(panelCurrent.prev().hasClass('panel')){
                  panelCurrent.removeClass().addClass('panel ' + outClass);

                  panelCurrent.prev()
                  .removeClass()
                  .addClass('panel panel-current ' + inClass);

                  panelCurrent.next().removeClass(outClass);
                  // $.scrollLock( false );
                  // console.log('unlocked');
                }else{
                  // $.scrollLock( true );
                  // console.log('locked');
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
              //console.log('footer');
              TweenMax.to($("#footer"), 0.85, { "bottom": '0px', ease: Expo.easeInOut });
            },

            startHome: function(){

              TweenMax.to($(".first"), 1.5, { "left": '0', ease: Expo.easeInOut });
              TweenMax.to($(".first"), 2.95, { "opacity": '1', ease: Expo.easeInOut });
              TweenMax.to($(".second"), 6.95, { "opacity": '1', ease: Expo.easeInOut });
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

              // Set content on view on div choose

              this.$el.find('#ADN').append(this.myADNView.el);
              this.$el.find('#Cell').append(this.myCellView.el);
              this.$el.find('#Shell').append(this.myShellView.el);
              this.$el.find('#Cab').append(this.myCabView.el);
              this.$el.find('#Flower').append(this.myFlowerView.el);
              this.$el.find('#footer').append(this.footerView.el);
              this.$el.find('#leftSidebar').append(this.leftDiscoverView.el);
              this.$el.find('#rightSidebar').append(this.rightDiscoverView.el);

              // Dispatch all events in others views of this view
              this.delegateEvents();
            }
          });
        });
