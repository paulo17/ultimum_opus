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
	        api_key: '7ea18fda70d7e47eae5d09df409c13a7'
    	};

    	return _.extend(config, window.Config);
});