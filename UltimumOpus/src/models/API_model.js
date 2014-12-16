define([
    'backbone',
    'config'
], function(Backbone, Config) {
    return Backbone.Model.extend({
    		urlRoot: 'http://apiultimumopus.maximeberthelot.fr/masterpieces.json',

    		routeUrl: {
    			'read': 'masterpieces.json',
    		},

    		initialize: function(){},

    		sync: function(method, model, options){
    			options = options || {};
    			options.crossDomain = true;
    			options.xhrFields = {
          			withCredentials: false
        		};

		    	Backbone.sync(method, model, options);
		},

		getMasterpieces: function(){
			this.fetch({
				success: function(data){
					console.log(data);
				},
				error: function(error){
					console.log(error);
				}
			})
		},

		getMasterpiecesById: function(id){

		}
    });
});
