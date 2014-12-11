pushStateHook = (url) ->
    path = require('path')
    request = require('request');
    return (req, res, next) ->
        ext = path.extname(req.url)
        if ((ext is "" or ext is ".html") && req.url != "/")
            req.pipe(request(url)).pipe(res)
        else
            next()

mountFolder = (connect, dir)->
    return connect.static(require('path').resolve(dir))

module.exports = (grunt)->
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-requirejs')
    grunt.loadNpmTasks('grunt-open')
    grunt.loadNpmTasks('grunt-usemin')
    grunt.loadNpmTasks('grunt-notify')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-text-replace')
    grunt.loadNpmTasks('grunt-connect-rewrite')
    grunt.loadNpmTasks('grunt-prompt')

    # configurable paths
    yeomanConfig = {
        app: 'assets'
        src: 'src'
        dist: 'dist'

        tmp: '.tmp'
        tmp_dist: '.tmp-dist'

        domain: 'yourdomain.com'
        domain_preprod: 'preprod.yourdomain.com'
    }

    #
    # Grunt configuration:
    #
    # https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
    #
    grunt.initConfig

        # Project configuration
        # ---------------------
        yeoman: yeomanConfig

        prompt:
            path:
                options:
                    questions: [
                        {
                            config: 'path'
                            type: 'input'
                            message: 'Enter project path:'
                            default: '/'
                        }
                    ]

        watch:
            js:
                files: ['<%= yeoman.src %>/{,**/}*.js']
                tasks: ['copy:js']
                options: 
                    livereload: true

            less:
                files: ['<%= yeoman.src %>/{,**/}*.less']
                tasks: ['less:dev','autoprefixer:dev']
                options: 
                    livereload: true

            html:
                files: ['<%= yeoman.src %>/{,**/}*.html']
                tasks: ['copy:html']
                options: 
                    livereload: true

            livereload:
                files: [
                    '<%= yeoman.tmp %>/{,**/}*.{css,js,html}'
                    '<%= yeoman.app %>/{,**/}*.html'
                    '<%= yeoman.app %>/css/{,**/}*.css'
                    '<%= yeoman.app %>/js/{,**/}*.js'
                    '<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg}'
                    '<%= yeoman.app %>/locales/{,**/}*.json'
                ]
                options:
                    livereload: true

        connect:
            rules: [
                {from: '.*/?((js|css|templates|locales|img|videos|uploads|swf)/.*)$', to: '/$1', redirect: 'permanent'}
                {from: '^/((/?[a-zA-Z0-9-?=&_.]+)+)/?$', to: '/#$1', redirect: 'permanent'}
            ]
            dev:
                options:
                    port: 9000
                    # Change this to 'localhost' to access the server only local.
                    hostname: '0.0.0.0'
                    middleware: (connect)->
                        return [
                            require('connect-livereload')()
                            mountFolder(connect, yeomanConfig.tmp)
                            mountFolder(connect, yeomanConfig.app)
                            require('grunt-connect-rewrite/lib/utils').rewriteRequest
                        ]
            dist:
                options:
                    port: 9001
                    # Change this to 'localhost' to access the server only local.
                    hostname: '0.0.0.0'
                    middleware: (connect)->
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ]

        open:
            dev:
                path: 'http://localhost:<%= connect.livereload.options.port %>'
            dist:
                path: 'http://localhost:<%= connect.dist.options.port %>'

        clean:
            dist: ['<%= yeoman.dist %>']
            tmp: ['<%= yeoman.tmp %>']
            tmp_dist: ['<%= yeoman.tmp_dist %>']
            components: ['<%= yeoman.dist %>/components']
            templates: ['<%= yeoman.dist %>/templates']
            css: ['<%= yeoman.dist %>/css/main.css']
            js: ['<%= yeoman.dist %>/js/main.js']

        less:
            dev:
                options:
                    compress: false
                    paths: ['<%= yeoman.src %>']
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/views'
                    src: ['**/*.less']
                    dest: '<%= yeoman.tmp %>/templates'
                    ext: '.css'
                }]
            dist:
                options:
                    compress: true
                    paths: ['<%= yeoman.src %>']
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/views'
                    src: ['**/*.less']
                    dest: '<%= yeoman.tmp %>/templates'
                    ext: '.css'
                }]

        autoprefixer:
            dev:
                expand: true
                src: '<%= yeoman.tmp %>/templates/**/*.css'
            dist:
                expand: true
                src: '<%= yeoman.tmp_dist %>/templates/**/*.css'
            # options:
            #   browsers: ['last 2 version', 'ie 8', 'ie 7']

        copy:
            dist:
                files: [
                    { expand: true, cwd: '<%= yeoman.tmp %>/', src: ['**','.*'], dest: '<%= yeoman.tmp_dist %>/' }
                    { expand: true, cwd: '<%= yeoman.app %>/', src: ['**','.*'], dest: '<%= yeoman.tmp_dist %>/' }
                    { expand: true, cwd: '<%= yeoman.src %>/', src: ['**/*.js'], dest: '<%= yeoman.tmp_dist %>/js/' }
                ]
            html:
                files: [
                    { expand: true, cwd: '<%= yeoman.src %>/views/', src: ['**/*.html'], dest: '<%= yeoman.tmp %>/templates/' }
                ]
            js:
                files: [
                    { expand: true, cwd: '<%= yeoman.src %>/', src: ['**/*.js'], dest: '<%= yeoman.tmp %>/js/' }
                ]

        usemin:
            html: ['<%= yeoman.dist %>/{,*/}*.html']
            css: ['<%= yeoman.dist %>/css/{,*/}*.css']
            options:
                dirs: ['<%= yeoman.dist %>']

        imagemin:
            dist:
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img'
                    src: '{,*/}*.{png,jpg,jpeg}'
                    dest: '<%= yeoman.dist %>/img'
                }]

        cssmin: 
            dist: 
                expand: true,
                cwd: '<%= yeoman.dist %>/css/'
                src: ['*.css', '!*.min.css']
                dest: '<%= yeoman.dist %>/css/'
                ext: '.css'

        htmlmin:
            dist:
                # options:
                #   removeCommentsFromCDATA: true
                #   # https://github.com/yeoman/grunt-usemin/issues/44
                #   collapseWhitespace: true
                #   collapseBooleanAttributes: true
                #   removeAttributeQuotes: true
                #   removeRedundantAttributes: true
                #   useShortDoctype: true
                #   removeEmptyAttributes: true
                #   removeOptionalTags: true
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'templates/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]

        uglify:
            dist:
                options:
                    beautify:
                        beautify: false,
                        ascii_only: true,
                        quote_keys: true
                files:[{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>'
                }]

        requirejs:
            compile:
                options:
                    # no minification, is done by the min task
                    baseUrl: 'js/'
                    mainConfigFile: '<%= yeoman.tmp_dist %>/js/main.js'
                    appDir: './<%= yeoman.tmp_dist %>/'
                    dir: './<%= yeoman.dist %>/'
                    wrap: true
                    removeCombined: true
                    keepBuildDir: true
                    inlineText: true
                    optimize: ""

                    modules: require('./modules.json')

                    done: (done, output) ->
                        duplicates = require('rjs-build-analysis').duplicates(output)
                        if (duplicates.length > 0)
                            grunt.log.subhead('Duplicates found in requirejs build:')
                            grunt.log.warn(duplicates)
                            done(new Error('r.js built duplicate modules, please check the excludes option.'))
                        done()

        replace:
            lessmap:
                src: ['<%= yeoman.tmp %>/css/main.css']
                overwrite: true
                replacements: [{ 
                    from: '.tmp/css/'
                    to: '' 
                }]
            pathcss:
                src: [
                    '<%= yeoman.tmp_dist %>/**/*.css'
                ]
                overwrite: true
                replacements: [{
                            from: '/img/'
                            to: ()->
                                grunt.config('path')+'img/'
                        }
                    ]
            path:
                src: [
                    '<%= yeoman.dist %>/index.html'
                    '<%= yeoman.dist %>/js/all.js'
                ]
                overwrite: true
                replacements: [{
                            from: 'path: "/"'
                            to: ()->
                                'path: "'+grunt.config('path')+'"'
                        },
                        {
                            from: 'src="/js/all.js"'
                            to: ()->
                                'src="'+grunt.config('path')+'js/all.js"'
                        },
                        {
                            from: "baseUrl: '/js'"
                            to: ()->
                                "baseUrl: '"+grunt.config('path')+"js'"
                        }
                    ]
        concat:
            dist:
                src: ['<%= yeoman.dist %>/components/requirejs/require.js', '<%= yeoman.dist %>/js/main.js']
                dest: '<%= yeoman.dist %>/js/all.js'

        'escaped-seo':
            preprod:
                options:
                    domain: '<%= yeoman.domain_preprod %>'
                    server: 'http://localhost:9001'
                    public: 'dist'
                    folder: 'seo'
                    changefreq: 'daily'
                    delay: 2000
                    replace: {}
            prod:
                options:
                    domain: '<%= yeoman.domain %>'
                    server: 'http://localhost:9001'
                    public: 'dist'
                    folder: 'seo'
                    changefreq: 'daily'
                    delay: 2000
                    replace: {}

        notify: 
            watch: 
                options: 
                    title: 'Task Complete',  # optional
                    message: 'Watch finished running', # required
                    
            server: 
                options:
                    message: 'Server is ready!' 

    grunt.registerTask('server', [
        'clean:tmp'
        'less:dev'
        'less:dist'
        'autoprefixer'
        'replace:lessmap'
        'copy:html'
        'copy:js'
        'configureRewriteRules'
        'connect:dev'
        'watch'
        'notify:server'
    ])

    grunt.registerTask('server-dist', [
        'connect:dist'
        'open:dist'
        'watch'
    ])

    grunt.registerTask('compile', [
        'less:dist'
        'autoprefixer'
    ])

    grunt.registerTask('seo', [
        'connect:dist'
        'escaped-seo:prod'
    ])

    grunt.registerTask('seo-preprod', [
        'connect:dist'
        'escaped-seo:preprod'
    ])

    grunt.registerTask('build', [
        'prompt:path'
        'clean:dist'
        'clean:tmp'
        'clean:tmp_dist'
        'less:dist'
        'autoprefixer:dist'
        'copy:html'
        'copy:dist'
        'imagemin'
        'htmlmin'
        'usemin'
        'replace:pathcss'
        'requirejs:compile'
        'concat'
        'replace:path'
        'clean:css'
        'cssmin'
        'clean:js'
        'clean:tmp_dist'
        'clean:components'
        'clean:templates'
        'uglify'
    ])
    grunt.option('force', true)

    grunt.registerTask('default', ['server'])   