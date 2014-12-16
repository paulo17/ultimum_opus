define([
    'jquery',
    'backbone',
    'underscore',
    'config',
    'text!templates/footer/footer.html',
    'css!templates/footer/footer.css'
], function($,Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "Footer_Content",
        events: {
            'mouseenter #player':'myPlayer'
        },
        
        initialize: function(options) {
        },


        myPlayer: function(){
            var mySound = $('#mySound');

            if (mySound.prop("volume") == 0) {
                $('#Off').css({'display':'none'});
                $('#On').css({'display':'block'});
                mySound.animate({volume:.1}, 750);
            }
            else {
                $('#On').css({'display':'none'});
                $('#Off').css({'display':'block'});
                mySound.animate({volume: 0}, 750);
            }
        },
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});