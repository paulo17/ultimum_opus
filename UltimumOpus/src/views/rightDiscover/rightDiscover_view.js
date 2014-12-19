define([
    'backbone',
    'underscore',
    'config',
    'text!templates/rightDiscover/rightDiscover.html',
    'css!templates/rightDiscover/rightDiscover.css',
    'models/API_model'
], function(Backbone, _, Config, tpl, css, APIModel)
{
    return Backbone.View.extend({
        className: "content_right",
        events: {},

        /**
        *    View constructor for initialize the view
        *    @param object options
        **/
        initialize: function(options) {
            console.log('initialize');

            _.bindAll(this, 'render');

            // init model
            this.Masterpiece = new APIModel();

            var _this = this;
            var feature = options.feature;

            this.render = _.wrap(this.render, function(render) {
                // get data before render
                _this.beforeRender(feature, function(){
                    render();
                });
                return _this;
            });

            this.render();
        },

        /**
        *    Get Data using model Masterpiece
        *    @param string feature
        *    @param function callback
        **/
        getByFeature: function(feature, callback){
                var self = this;
                this.Masterpiece.url = "http://apiultimumopus.maximeberthelot.fr/masterpieces/feature/" + feature;
                this.Masterpiece.fetch({
                    success: function(model, response, options){
                        // Store data in View object
                        self.tplData = response[0];
                        window.myData = self.tplData;
                        callback.call(this);
                    },
                    error: function(error){
                        console.log(error);
                    }
                })
        },

        /**
        *    Call getByFeature before render the view
        *    @param string feature
        *    @param function callback
        **/
        beforeRender: function(feature, callback) {
            this.getByFeature(feature, function(){
                callback.call(this);
            });
        },

        /**
        *    Render the view and put parameter for template
        **/
        render: function(){
            if (typeof this.tplData == 'undefined'){
                this.$el.html(_.template( tpl ) );
            }else{

                $('#img').on('load', function(){
                    $('.masterpiece').fadeIn();
                });

                this.$el.html(_.template( tpl, {
                        titre: this.tplData.titre,
                        legend: this.tplData.legend,
                        text: this.tplData.text,
                        feature: this.tplData.feature,
                        image: this.tplData.image,
                        image2: this.tplData.image3,
                        image2: this.tplData.image3,
                        date: this.tplData.date,
                        video: this.tplData.video
                }));
            }
            return this;
        }

    });

});