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

		    	Backbone.sync(method, model, options);
		},

		/**
		*	Find all masterpieces into API
		**/
		find: function(){
			var masterpieces;
			this.urlRoot = this.apiUrl + this.routeUrl.find;
			this.fetch({
				success: function(data){
					masterpieces = data.toJSON();
				},
				error: function(error){
					console.log(error);
				}
			})
			return masterpieces;
		},

		/**
		*	Get specific masterpiece from API
		*	@param int id
		**/
		getById: function(id){
			this.urlRoot = this.apiUrl + this.routeUrl.get + id;
			this.fetch({
				success: function(data){
					console.log(data);
				},
				error: function(error){
					console.log(error);
				}
			})
		}
    });
});
