// Add project configuration here
define([
    'underscore'
], function(_)
{
	var config = {
        pushState: true,
        locales: ["fr"],
        localizedFiles: ["routes", "main"]
    };
    
    return _.extend(config, window.Config);
});