define([
'backbone',
'config'
], function(Backbone, Config) {
	return Backbone.Model.extend({

		url: function(){
			return "http://apiultimumopus.maximeberthelot.fr/masterpieces.json"
		}
	});

});
