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
        className: "right_Content",
        events: {},

        initialize: function(options) {
            this.Masterpiece = new APIModel();
            this.getByFeature(options.feature);
        },

        getByFeature: function(feature){
                var self = this;
                this.Masterpiece.url = "http://apiultimumopus.maximeberthelot.fr/masterpieces/feature/" + feature;
                this.Masterpiece.fetch({
                    success: function(model, response, options){
                        console.log(response);
                    },
                    error: function(error){
                        console.log(error);
                    }
                })
        },

        render: function(){
            this.$el.html(_.template( tpl ));
        }
    });

});