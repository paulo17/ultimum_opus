define([
    'backbone',
    'underscore',
    'config',
    'text!templates/app/app.html',
    'css!templates/app/app.css',
    'signals/page_dom_added_signal',
], function(Backbone, _, Config, tpl, css, pageDomAddedSignal)
{
    var AppView = Backbone.View.extend({
        el: "#main",
        percent: 0,
        events: {
        },

        initialize: function(options) {
            $(document).ready(function($){
                $('#Parallax').mousemove(
                    function(e){
                        console.log("ddddd");
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



        resize: function(){
        },

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