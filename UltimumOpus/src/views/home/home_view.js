define([
    'backbone',
    'underscore',
    'config',
    'signals/page_dom_added_signal',
    'text!templates/home/home.html',
    'css!templates/home/home.css',
    'utils/fullPage',
    'views/footer/footer_view',
    'views/myADN/myADN_view',
    'views/myCell/myCell_view',
    'views/discover/discover_view',
    'gsap'

], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, fullPage, FooterView, MyADNView, MyCellView, DiscoverView,TweenMax)
{
    return Backbone.View.extend({
        el: "#content",
        events: {
        },
        
        initialize: function(options) {
            //detect if user scroll
            _.bindAll(this, 'detect_scroll');
            // bind to window
            $(window).scroll(this.detect_scroll);

            // Listen the DOM to set it when is loaded
            pageDomAddedSignal.add(this.getMyCover, this);
            // Init all views on my home
            this.myADNView = new MyADNView(options);
            this.myCellView = new MyCellView(options);
            this.discoverView = new DiscoverView(options);
            this.footerView = new FooterView(options);

        },

        detect_scroll: function() {

            var body = $("html, body");
           // body.animate({scrollTop:1000}, $(window).height(), 'swing');

            this.getFooter();
        },

        getFooter: function(){
            console.log('footer');
            TweenMax.to($("#footer"), 0.85, { "bottom": '0px', ease: Expo.easeInOut });
        },

        getMyCover: function(){
            $('#home').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#ADN').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );

            $(window).scroll(function() {
                drawLine( $('#route'),
                    document.getElementById('path') );
            });

            // init the line length
            drawLine( $('#route'),
                document.getElementById('path') );

            //draw the line
            function drawLine(container, line){

                var pathLength = line.getTotalLength(),
                    maxScrollTop = $(document).height() - $(window).height(),
                    percentDone = $(window).scrollTop() / maxScrollTop,
                    length = percentDone * pathLength;
                line.style.strokeDasharray = [ length ,pathLength].join(' ');
            }

            this.centerBlock();
        },

        centerBlock: function(){
            var getCenter = $( window ).height();
            var centerStep = $(".brand").height();
            var mytop;

            getCenter = getCenter - centerStep;
            mytop = (getCenter/2)-50;

            $( '.brand').css( { 'top' : mytop+41} );


        },

        remove: function() {
            pageDomAddedSignal.remove(this.getMyCover, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        },



        render: function() {
            this.$el.html(_.template(tpl, {}));

            // Set render on other views in home view
            this.myADNView.render();
            this.myCellView.render();
            this.footerView.render();
            this.discoverView.render();

            // Set content on view on div choose
            this.$el.find('#discover').append(this.discoverView.el);
            this.$el.find('#ADN').append(this.myADNView.el);
            this.$el.find('#Cell').append(this.myCellView.el);
            this.$el.find('#footer').append(this.footerView.el);

            // Dispatch all events in others views of this view
            this.delegateEvents();
        }
    });
});