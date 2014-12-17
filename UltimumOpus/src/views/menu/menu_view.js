define([
    'signals/page_dom_added_signal',
    'utils/jquery-ui',
    'backbone',
    'underscore',
    'config',
    'text!templates/menu/menu.html',
    'css!templates/menu/menu.css'
], function(pageDomAddedSignal, UI, Backbone, _, Config, tpl, css)
{
    return Backbone.View.extend({
        className: "aside-menu",
        events: {},
        
        initialize: function(options) {

            pageDomAddedSignal.add(this.panel, this);
            pageDomAddedSignal.add(this.scroll, this);
            pageDomAddedSignal.add(this.drag, this);
            pageDomAddedSignal.add(this.css, this);
            
           
        },
        ratio: null,
        comparing:function(win, pos){
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
        },
        drag:function(){
            var grid = Math.floor(document.querySelector('#limitation').clientHeight/9),
            ratio = $('#limitation').height()/$('html').height(),
            move =0,
            self = this;

            $('.draggable').draggable({
                axis:'y',
                containment:'#limitation',
                //grid:[0, grid],
                start:function(){
                    $('html').css({'overflow':'auto'});
                    $('section').css({
                        'display':'block',
                    });
                    setTimeout(function(){
                        $('section').css({
                            'opacity':'1'
                        });
                    },200)
                },
                stop:function(){

                    $('section').css({
                        'opacity':'0'
                    });
                    setTimeout(function(){
                        $('section').css({
                            'display':'none',
                        });
                    },500)
                },
                drag:function(){
                    $('body').css({'overflow':'auto'});
                    var top = this.offsetTop;

                    move = Math.floor(top/ratio);
                    $(window).scrollTop(move);
                    /*win = $(window),
                    pos = self.positions;
                    if(top < grid){
                        win.animate({scrollTop: pos[8].position}, 600);
                        
                    }else if(top > grid && top < 3*grid){
                        win.scrollTop(pos[7].position);
                    }*/
                }

            })
        },
        positions:[],
        css:function(){
            $('#menu').css({'height':'0','width':'0'});
            $('aside').css({'position':'fixed'});
        },
        panel:function(){
            
            var panels = document.getElementsByClassName('panel');
            var positions = [];
            for(var i=panels.length - 1; i >= 0; i--){
                this.positions.push({element:panels[i].id, position:panels[i].offsetTop}); 
            };
            console.log(this.positions);
            
        },
        scroll:function(){
            this.ratio = $('#limitation').height()/$('html').height();
            var self = this,
            pos = this.positions;
            win = $(window);

            win.scroll(function(){
                $('.draggable').css({
                    'top': win.scrollTop()*self.ratio + 'px',
                });
                self.comparing(win, pos);
            });
        },
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});