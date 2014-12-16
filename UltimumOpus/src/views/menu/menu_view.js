define([
    'backbone',
    'underscore',
    'config',
    'text!templates/menu/menu.html',
    'css!templates/menu/menu.css'
], function(Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "aside-menu",
        events: {
            'scrollTop body':'compare'
        },
        
        initialize: function(options) {
            var self = this;
            //$('.draggable').draggable();
            setTimeout(function(){
                self.panel(function(){
                    
                })
            },3500);
           
        },
        
        onDrag:function(){
            console.log('yo');
        },
        positions:[],
        panel:function(callback){
            var panels = document.getElementsByClassName('panel');
            var positions = [];
            for(var i=panels.length - 1; i >= 0; i--){
                this.positions.push({element:panels[i].id, position:panels[i].offsetTop}); 
            };
            console.log(this.positions);
            callback.call(this);
        },
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});