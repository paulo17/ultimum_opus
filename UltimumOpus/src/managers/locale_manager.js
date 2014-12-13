define([
    "underscore",
    "config",
    "utils/tag.template.backbone",
    "utils/array.polyfill"
], function(_, Config, tagTemplate) {

    /**
     * Route manager
     */
    var LocaleManager = function() {
        // Set locale
        requirejs.config({
            locale: this.getURLLocale()
        });

        // Localized files
        this.addFiles();

        // Template
        this.addTemplateTags();
    };

    /**
     * Get locale of the URL
     * @param {number} [defaultLocaleId] Default locale index in Config.locales, -1 for no default (default: 0)
     * @return {string}
     */
    LocaleManager.prototype.getURLLocale = function(defaultLocaleId) {
        defaultLocaleId = _.isUndefined(defaultLocaleId)?0:defaultLocaleId;

        var hash;
        if(window.location.hash.indexOf('#') != -1) {
            hash = window.location.hash.replace('#', '');
        }
        else {
            hash = window.location.pathname.replace(/^\//, '');
        }
        
        var path = Config.path.replace(/^\//, ''),
           localesRegex = new RegExp("^"+path+"({locales})(/.*)?$".replace("{locales}", Config.locales.join("|")));

        // Found in URL or anchor
        if(hash.search(localesRegex) > -1) {
            return hash.replace(localesRegex, "$1");
        }
        // Default lang
        else if(defaultLocaleId > -1) {
            return Config.locales[defaultLocaleId];
        }

        // Not found
        return null;
    };

    /**
     * Set locale
     * @param {string} locale
     */
    LocaleManager.prototype.setLocale = function(locale, callback) {
        if(this.currentLocale != locale) {
            // Test locale
            if(Config.locales.indexOf(locale) < 0) {
                throw 'Unregistered locale "'+locale+'" in Config.locales';
            }

            // Set
            this.currentLocale = locale;

            // Clear
            var files = [];
            _.each(Config.localizedFiles, function(file) {
                file = 'i18n!nls/'+file;
                files.push(file);
                require.undef(file);
            });

            // Set
            requirejs.config({
                locale: locale
            });

            // Load new files
            require(files, function() {
                if(callback) {
                    callback();
                }
            });
        }
        else if(callback) {
            callback();
        }

        return this;
    };

    /**
     * Get text with current locale
     * @param {string} key
     * @param {string} [file] Localized file name (default: main)
     * @param {*} [param1] Parameter 1 replace {0}
     * @param {*} [param2] Parameter 2 replace {1}
     * @param {*} [param3] Parameter 3 replace {2}, etc...
     * @return {string}
     */
    LocaleManager.prototype.getText = function(key, file) {
        var data = this.getFile(file||"main"),
            output = data[key]?data[key]:key;

        // Parameters
        for(var i = 2, l = arguments.length; i < l; i++) {
            output = output.replace(new RegExp("\\\{"+(i-2)+"\\\}", "g"), arguments[i]);
        }

        return output;
    };

    /**
     * Get a localized file
     * @param {string} file Localized file name
     */
    LocaleManager.prototype.getFile = function(file) {
        return require("i18n!nls/"+file);
    };

    /**
     * Add all localized files
     */
    LocaleManager.prototype.addFiles = function() {
        var config = {
            "root": false
        };

        // Add locales
        _.each(Config.locales, function(locale) {
            config[locale] = true;
        });

        _.each(Config.localizedFiles, function(file) {
            define('nls/'+file, config);
        }, this);

        return this;
    };

    /**
     * Add <%i18n %> tag to underscore template
     */
    LocaleManager.prototype.addTemplateTags = function() {
        tagTemplate('i18n', function(content) {
            var data = content.split(/, ?/),
                output = this.getText(data[0]);

            // Parameters
            for(var i = 1, l = data.length; i < l; i++) {
                output = output.replace(new RegExp("\\\{"+(i-1)+"\\\}", "g"), '<%= '+data[i]+' %>');
            }

            return output;
        }, this);

        return this;
    };

    return new LocaleManager();
})