var modelHelper = {
	apiUrl: 'http://apiultimumopus.maximeberthelot.fr/masterpieces',

    		// API route
    		routeUrl: {
    			'find': 'masterpieces.json',
    			'get': 'masterpieces/',
    			'feature': 'masterpieces/feature/'
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
			var self = this;
			this.urlRoot = this.apiUrl + this.routeUrl.find;
			this.fetch({
				success: function(model, response, options){
					self.masterpiece = response;
				},
				error: function(error){
					console.log(error);
				}
			});
			console.log(this);
			console.log(this.masterpiece);
			console.log(this);
			return self;
		},

		/**
		*	Get specific masterpiece from API
		*	@param int id
		**/
		getById: function(id){
			this.urlRoot = this.apiUrl + this.routeUrl.get + id + '.json';
			this.fetch({
				success: function(data){
					data.toJSON();
				},
				error: function(error){
					console.log(error);
				}
			})
		},

		/**
		*	Get specific masterpiece by feature from API
		*	@param string feature
		**/
		getByFeature: function(feature){
			this.urlRoot = this.apiUrl + this.routeUrl.feature + feature
			this.fetch({
				success: function(data){
					return data.toJSON();
				},
				error: function(error){
					console.log(error);
				}
			})
		}
}