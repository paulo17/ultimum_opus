define([
    'underscore',
    'config'
], function(_, Config) {
    var tasks = [],
        regexTpl = "<%{tag} ([^%]*) %>",
        _template = _.template;

    // Override backbone template
    _.mixin({
        template: function(text, data, settings) {
            // Tasks
            _.each(tasks, function(task) {
                text = text.replace(task.regex, function(match, content) {
                    if(content) {
                        return task.fn.call(task.scope, content);
                    }
                    else {
                        return match;
                    }
                });
            });

            // Underscore template
            try {
                return _template(text, data, settings);
            }
            catch(e) {
                throw 'Error in template: '+text;
            }
        }
    });

    return function(tag, fn, scope) {
        tasks.push({
            regex: new RegExp(regexTpl.replace('{tag}', tag), 'g'),
            fn: fn,
            scope: scope || this
       });
    }
});