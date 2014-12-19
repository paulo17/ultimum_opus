define([
    'backbone',
    'underscore',
    'config',
    'text!templates/app/app.html',
    'css!templates/app/app.css',
    'signals/page_dom_added_signal'
], function(Backbone, _, Config, tpl, css, pageDomAddedSignal)
{
    var AppView = Backbone.View.extend({
        el: "#main",
        percent: 0,

        // Backbone Event object
        events: {
        },

        /**
        *    View constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            pageDomAddedSignal.add(this.detectMob, this);

            $(document).ready(function($){
                $('#Parallax').mousemove(
                    function(e){
                        /* Work out mouse position */
                        var offset = $(this).offset();
                        var xPos = e.pageX - offset.left;
                        var yPos = e.pageY - offset.top;

                        /* Get percentage positions */
                        var mouseXPercent = Math.round(xPos / $(this).width() * 100);
                        var mouseYPercent = Math.round(yPos / $(this).height() * 100);

                        /* Position Each Layer */
                        $(this).children('img').each(
                            function(){
                                var diffX = $('#Parallax').width() - $(this).width();
                                var diffY = $('#Parallax').height() - $(this).height();
                                var myX = diffX * (mouseXPercent / 100); //) / 100) / 2;
                                var myY = diffY * (mouseYPercent / 100);

                                var cssObj = {
                                    'left': myX + 'px',
                                    'top': myY + 'px'
                                }
                                //$(this).css(cssObj);
                                $(this).animate({left: myX, top: myY},{duration: 50, queue: false, easing: 'linear'});

                            }
                        );
                    }
                );
            });
        },

        detectMob: function () {
            if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
                || window.innerWidth <= 750
                || window.innerHeight <= 640
            ){
                $('.m-notif').show();
            }
            else {
                $('.m-notif').hide();
            }
        },

        /**
        *    Remove init View
        **/
        remove: function() {
            if(this.content) {
                this.content.remove();
            }
            Backbone.View.prototype.remove.apply(this, arguments);
        },

        setContent: function(view) {
            if(this.content) {
                this.content.remove();
            }
            this.$content.append(view.el);
            this.content = view;
            pageDomAddedSignal.dispatch();
        },

        render: function(){

            this.$el.html(_.template( tpl, {  } ));
            this.$content = this.$el.find('#content');
            if(this.content) {
                this.content.render();
            }
        }

    });
    return new AppView();
});