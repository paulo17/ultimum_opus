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
                    var pos = this.positions;
                    var win = $(window);
                    win.scroll(function(){
                        if(win.scrollTop() > pos[1].position){
                            console.log(pos[0].element)
                        }else if(win.scrollTop() > pos[2].position && win.scrollTop() < pos[0].position){
                            console.log(pos[1].element)
                        }else if(win.scrollTop() > pos[3].position && win.scrollTop() < pos[1].position){
                            console.log(pos[2].element)
                        }else if(win.scrollTop() > pos[4].position && win.scrollTop() < pos[2].position){
                            console.log(pos[3].element)
                        }else if(win.scrollTop() > pos[5].position && win.scrollTop() < pos[3].position){
                            console.log(pos[4].element)
                        }else if(win.scrollTop() > pos[6].position && win.scrollTop() < pos[4].position){
                            console.log(pos[5].element)
                        }else if(win.scrollTop() > pos[7].position && win.scrollTop() < pos[5].position){
                            console.log(pos[6].element)
                        }else if(win.scrollTop() > pos[8].position && win.scrollTop() < pos[6].position){
                            console.log(pos[7].element)
                        }else if(win.scrollTop() < pos[7].position){
                            console.log(pos[7].element)
                        };
                    });
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