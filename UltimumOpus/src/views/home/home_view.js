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
    'gsap'

], function(Backbone, _, Config,pageDomAddedSignal, tpl, css, fullPage, FooterView, MyADNView, MyCellView,TweenMax)
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
            this.footerView = new FooterView(options);

        },

        detect_scroll: function() {
            console.log('detected');
        },

        getMyCover: function(){
            $('#home').css( { 'width' : $(window).width(), 'height' : $(window).height()+21 } );
            $('#ADN').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
            $('#Cell').css( { 'width' : $(window).width(), 'height' : $(window).height() } );
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

            // Set content on view on div choose
            this.$el.find('#ADN').append(this.myADNView.el);
            this.$el.find('#Cell').append(this.myCellView.el);
            this.$el.find('#footer').append(this.footerView.el);

            // Dispatch all events in others views of this view
            this.delegateEvents();
        }
    });
});