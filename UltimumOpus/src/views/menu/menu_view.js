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
            pageDomAddedSignal.add(this.css, this);
            pageDomAddedSignal.add(this.panel, this);
            pageDomAddedSignal.add(this.stepsPos, this); 
            pageDomAddedSignal.add(this.scroll, this);
            pageDomAddedSignal.add(this.drag, this); 
           
        },
        height:null,
        ratio: null,
        ratioMenu:null,
        comparing:function(win, pos){
            $('.panel-menu').removeClass('viewing');
            if(win.scrollTop() > pos[1].position){
                //console.log(pos[0].element);
                $('#menu-'+pos[0].element).addClass('viewing');
            }else if(win.scrollTop() > pos[2].position && win.scrollTop() < pos[0].position){
                //console.log(pos[1].element);
                $('#menu-'+pos[1].element).addClass('viewing');
            }else if(win.scrollTop() > pos[3].position && win.scrollTop() < pos[1].position){
                $('#menu-'+pos[2].element).addClass('viewing');
                console.log(pos[2].element);
            }else if(win.scrollTop() > pos[4].position && win.scrollTop() < pos[2].position){
                 $('#menu-'+pos[3].element).addClass('viewing');
                 console.log(pos[3].element);
            }else if(win.scrollTop() > pos[5].position && win.scrollTop() < pos[3].position){
                 $('#menu-'+pos[4].element).addClass('viewing');
                 console.log(pos[4].element);
            }else if(win.scrollTop() > pos[6].position && win.scrollTop() < pos[4].position){
                $('#menu-'+pos[5].element).addClass('viewing');
                console.log(pos[5].element);
            }else if(win.scrollTop() > pos[7].position && win.scrollTop() < pos[5].position){
                $('#menu-'+pos[6].element).addClass('viewing');
                console.log(pos[6].element);
            }else if(win.scrollTop() > 0 && win.scrollTop() < pos[6].position){
                $('#menu-'+pos[7].element).addClass('viewing');
                console.log(win.scrollTop());
                console.log(pos[8].position);
            }else if(win.scrollTop() == 0){
                $('#menu-'+pos[8].element).addClass('viewing');
                console.log(pos[8].element);
            };
        },
        drag:function(){
            var grid = Math.floor(document.querySelector('#limitation').clientHeight/9),
            ratio = $('#limitation').height()/$('html').height(),
            move =0,
            moveUl=0,
            self = this;

            $('.draggable').draggable({
                axis:'y',
                containment:'#limitation',
                //grid:[0, grid],
                start:function(){
                    this.style.left = 0;
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
                    this.style.left = 0;
                    var top = this.offsetTop;
                    var percent =  ((($('#limitation').height() - top)-$('.draggable').height())*150)/($('#limitation').height()-$('.draggable').height()); //création du poin 0
                    console.log(percent);
                    move = Math.floor(top/ratio);
                    $(window).scrollTop(move);
                }

            })
        },
        positions:[],
        css:function(){
            $('#menu').css({'height':'0','width':'0'});
            $('aside').css({'position':'fixed'});

            this.height = $('#ul-menu').height();
            setTimeout(function(){
                $('section').css({
                    'opacity':0,
                    'display':'none'
                })
            },100);
        },
        panel:function(){
            var panels = document.getElementsByClassName('panel');
            var positions = [];
            for(var i=panels.length - 1; i >= 0; i--){
                this.positions.push({element:panels[i].id, position:panels[i].offsetTop}); 
                console.log(this.positions);
            };
            
        },
        scroll:function(){
            this.ratio = $('#limitation').height()/$('html').height();
            this.ratioMenu = $('#limitation').height()/(this.height);
            

            var self = this,
            pos = this.positions;
            win = $(window);
            

            win.scroll(function(){
                var percent = (($('html').height()-win.scrollTop())*150)/($('html').height());
                $('.draggable').css({
                    'top': win.scrollTop()*self.ratio + 'px',
                });
                $('section ul').css({
                    'bottom': 50 - percent+'%'
                });

                self.comparing(win, pos);
            });
        },
        stepsPos:function(){
            var margin = ($('#steps').height()-(9*10)+5)/9;
            console.log(margin);
            $('.step-menu').css({
               'margin-top' : margin + 'px'
            })
        },
        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});