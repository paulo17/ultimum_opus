define([
	'backbone',
	'config'
	], function(Backbone, Config) {
		return Backbone.Model.extend({
			apiUrl: 'http://apiultimumopus.maximeberthelot.fr/',

    		// API route
    		routeUrl: {
    			'find': 'masterpieces.json',
    			'get': 'masterpieces/'
    		},

    		initialize: function(){
    		},

    		sync: function(method, model, options){
    			options = options || {};
    			options.crossDomain = true;
    			options.xhrFields = {
    				withCredentials: false
    			};
    			options.beforeSend = function (xhr) {
    				// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    				// xhr.setRequestHeader('Authorization', 'Token token="' + Config.api_key + '"');
    			};
    			Backbone.sync(method, model, options);
    		},

		/**
		*	Find all masterpieces into API
		**/
		find: function(){
			this.urlRoot = this.apiUrl + this.routeUrl.find;
			this.fetch({
				success: function(data){
					return data.toJSON();
				},
				error: function(error){
					console.log(error);
				}
			})
		},

		/**
		*	Get specific masterpiece from API
		*	@param int id
		**/
		getById: function(id){
			this.urlRoot = this.apiUrl + this.routeUrl.get + id + '.json';
			this.fetch({
				success: function(data){
					return data.toJSON();
				},
				error: function(error){
					console.log(error);
				}
			})
		}
	});
});
