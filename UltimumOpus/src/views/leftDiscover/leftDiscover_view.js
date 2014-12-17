define([
'backbone',
'underscore',
'config',
'text!templates/leftDiscover/leftDiscover.html',
'css!templates/leftDiscover/leftDiscover.css',
'models/API_model'
], function(Backbone, _, Config, tpl, css, APIModel)
{
	return Backbone.View.extend({
		className: "left_Content",
		events: {},

			initialize: function(options) {
				this.Masterpiece = new APIModel();
				this.getByFeature(options.feature);
			},

			find: function(){
				var self = this;
				this.Masterpiece.url = "http://apiultimumopus.maximeberthelot.fr/masterpieces.json";
				this.Masterpiece.fetch({
					success: function(model, response, options){
						console.log(response);
					},
					error: function(error){
						console.log(error);
					}
				});
			},

			getById: function(id){
				var self = this;
				this.Masterpiece.url = "http://apiultimumopus.maximeberthelot.fr/masterpieces/" + id + ".json";
				this.Masterpiece.fetch({
					success: function(model, response, options){
						data.toJSON();
					},
					error: function(error){
						console.log(error);
					}
				})
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