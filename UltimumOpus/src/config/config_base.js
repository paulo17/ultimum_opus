// Add project configuration here
define([
    'underscore'
], function(_)
{
	var config = {
	        pushState: true,
	        locales: ["fr"],
	        localizedFiles: ["routes", "main"],
	        api_url: 'http://apiultimumopus.maximeberthelot.fr',
	        api_key: '9e320380f16dd5c013011034915bba41'
    	};

    	return _.extend(config, window.Config);
});