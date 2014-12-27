module.exports = function (grunt) {

    'use strict';

    // grunt
    grunt.initConfig({
        packageJson: grunt.file.readJSON('package.json'),
        bowerJson: grunt.file.readJSON('bower.json'),
        config: {
            client: {
                desktop: {
                    development: {
                        root: 'client/desktop_development',
                        stylesheets: {
                            path: '<%= config.client.desktop.development.root %>/stylesheets'
                        },
                        fonts: {
                            path: '<%= config.client.desktop.development.root %>/fonts'
                        },
                        scripts: {
                            path: '<%= config.client.desktop.development.root %>/scripts',
                            templates: {
                                path: '<%= config.client.desktop.development.scripts.path %>/templates'
                            }
                        },
                        images: {
                            path: '<%= config.client.desktop.development.root %>/images'
                        }
                    },
                    build: {
                        root: 'client/desktop_build',
                        stylesheets: {
                            path: '<%= config.client.desktop.build.root %>/stylesheets'
                        },
                        fonts: {
                            path: '<%= config.client.desktop.build.root %>/fonts'
                        },
                        scripts: {
                            path: '<%= config.client.desktop.build.root %>/scripts',
                            templates: {
                                path: '<%= config.client.desktop.build.scripts.path %>/templates'
                            }
                        },
                        images: {
                            path: '<%= config.client.desktop.build.root %>/images'
                        }
                    }
                },
                vendor: {
                    bootstrap: {
                        path: 'bower_components/bootstrap-sass-official/assets'
                    },
                    fontawesome: {
                        path: 'bower_components/fontawesome'
                    },
                    almond: {
                        path: 'bower_components/almond'
                    }
                }
            },
            server: {
                root: 'server',
                templates: {
                    path: '<%= config.server.root %>/templates'
                },
                views: {
                    path: '<%= config.server.root %>/views'
                }
            },
            test: {
                client: {
                    root: 'test/client'
                }
            },
            'sass_source': 'auto',
            'environment': 'development'
        },
        // grunt git info (git revision)
        // https://github.com/damkraw/grunt-gitinfo
        gitinfo: {
            options: {
                cwd: './'
            }
        },
        // js hint
        // ! run this first, if linting fails the script will abort
        // https://github.com/gruntjs/grunt-contrib-jshint
        // ! js hint options: http://www.jshint.com/docs/options/
        // templates directory gets ignored as templates get build by
        // grunt-contrib-jst which creates files that don't follow our rules
        jshint: {
            src: [
                'Gruntfile.js',
                '<%= config.client.desktop.development.scripts.path %>/*.js',
                '<%= config.client.desktop.development.scripts.path %>/**/*.js',
                '!<%= config.client.desktop.development.scripts.path %>/templates/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },
        // jst templates file
        // https://github.com/gruntjs/grunt-contrib-jst/
        jst: {
            compile: {
                options: {
                    amd: true,
                    processName: function (filepath) {
                        return filepath.slice(filepath.indexOf('/') + 1, filepath.lastIndexOf('.'));
                    }
                },
                files: {
                    '<%= config.client.desktop.development.scripts.templates.path %>/templates.js': ['<%= config.server.templates.path %>/*.ejs', '<%= config.server.templates.path %>/**/*.ejs']
                }
            }
        },
        // require js
        // https://github.com/gruntjs/grunt-contrib-requirejs
        requirejs: {
            app_build: {
                options: {
                    baseUrl: '<%= config.client.desktop.development.scripts.path %>',
                    mainConfigFile: '<%= config.client.desktop.development.scripts.path %>/main.js',
                    include: '<%= config.client.desktop.development.scripts.path %>/main.js',
                    name: '<%= config.client.desktop.development.almond.path %>/almond',
                    out: '<%= config.client.desktop.build.scripts.path %>/<%= gitinfo.local.branch.current.lastCommitNumber %>/main.js',
                    findNestedDependencies: true,
                    optimize: 'uglify2',
                    uglify2: {
                        //Example of a specialized config. If you are fine
                        //with the default options, no need to specify
                        //any of these properties.
                        output: {
                            beautify: true
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false,
                        mangle: false
                    },
                    useStrict: true,
                    done: function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }

                        done();
                    }
                }
            }
        },
        // TODO: optimize images? svgmin?
        // https://github.com/gruntjs/grunt-contrib-imagemin
        // read: http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/


        // TODO: html5 (templates) lint?
        // https://github.com/alicoding/grunt-lint5

        // TODO: Mocha testing
        // https://github.com/pghalliday/grunt-mocha-test

        // TODO: css lint?
        // https://github.com/gruntjs/grunt-contrib-csslint

        // TODO: remove comments, vendor prefixes?

        // replaces the font name in sass files to bust browser cache of fonts
        // https://github.com/outaTiME/grunt-replace
        replace: {
            sass_fonts_version: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= gitinfo.local.branch.current.lastCommitNumber %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= config.client.desktop.development.stylesheets.path %>/_fonts-pathes@@version.scss'],
                        rename: function (destination, source) {
                            return destination + source.replace('@@version.scss', '.scss');
                        },
                        dest: '<%= config.client.desktop.development.stylesheets.path %>/'
                    }
                ]
            },
            desktop_html_development: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= gitinfo.local.branch.current.lastCommitNumber %>'
                        },
                        {
                            match: 'environment',
                            replacement: '<%= config.environment %>'
                        }
                    ]
                },
                files: [
                    {
                        src: '<%= config.server.views.path %>/desktop_development@@.html',
                        dest: '<%= config.server.views.path %>/desktop_development.html'
                    }
                ]
            },
            desktop_html_build: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: '<%= gitinfo.local.branch.current.lastCommitNumber %>'
                        },
                        {
                            match: 'environment',
                            replacement: '<%= config.environment %>'
                        }
                    ]
                },
                files: [
                    {
                        src: '<%= config.server.views.path %>/desktop_build@@.html',
                        dest: '<%= config.server.views.path %>/desktop_build.html'
                    }
                ]
            }
        },
        // compiles sass to css and generate the necessary files
        // https://github.com/gruntjs/grunt-contrib-sass
        sass: {
            options: {
                unixNewlines: true,
                trace: true,
                quiet: false,
                precision: 10,
                sourcemap: '<%= config.sass_source %>'
            },
            desktop: {
                files: [
                    {
                        nonull: true,
                        expand: true,
                        cwd: '<%= config.client.desktop.development.stylesheets.path %>/',
                        src: ['main.scss'],
                        dest: '<%= config.client.desktop.build.stylesheets.path %>/<%= gitinfo.local.branch.current.lastCommitNumber %>/',
                        ext: '.css'
                    }
                ]
            }
        },
        // TODO: autoprefixer? after sass

        // css minification
        // https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            maincss: {
                options: {
                    banner: '/* <%= packageJson.name %> <%= packageJson.version %>  css */'
                },
                files: {
                    '<%= config.client.desktop.build.stylesheets.path %>/main-<%= gitinfo.local.branch.current.lastCommitNumber %>.min.css': '<%= config.client.desktop.build.stylesheets.path %>/main-<%= gitinfo.local.branch.current.lastCommitNumber %>.css'
                }
            }
        },
        // copy files
        // https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            favicon: {
                expand: true,
                cwd: '<%= config.client.desktop.development.root %>/',
                src: 'favicon.ico',
                dest: '<%= config.client.desktop.build.root %>/'
            },
            robotstxt: {
                expand: true,
                cwd: '<%= config.client.desktop.development.root %>/',
                src: 'robots.txt',
                dest: '<%= config.client.desktop.build.root %>/'
            },
            // TODO: add also a watch on the images folder, if an image changes we need to change the images path in the configuration.js with replace
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.client.desktop.development.images.path %>/',
                        src: ['**'],
                        dest: '<%= config.client.desktop.build.images.path %>/<%= packageJson.version %>/'
                    }
                ]
            },
            glyphiconsfont_desktop: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.client.vendor.bootstrap.path %>/fonts/bootstrap/',
                        src: ['**'],
                        dest: '<%= config.client.desktop.build.fonts.path %>/bootstrap/<%= gitinfo.local.branch.current.lastCommitNumber %>/'
                    }
                ]
            },
            fontawesomefont_desktop: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.client.vendor.fontawesome.path %>/fonts/',
                        src: ['**'],
                        dest: '<%= config.client.desktop.build.fonts.path %>/fontawesome/<%= gitinfo.local.branch.current.lastCommitNumber %>/'
                    }
                ]
            }
        },
        // gzip compression of javascript and css builds
        // https://github.com/gruntjs/grunt-contrib-compress
        compress: {
            maincss: {
                options: {
                    mode: 'gzip'
                },
                src: '<%= config.client.desktop.build.stylesheets.path %>/main-<%= gitinfo.local.branch.current.lastCommitNumber %>.min.css',
                dest: '<%= config.client.desktop.build.stylesheets.path %>/main-<%= gitinfo.local.branch.current.lastCommitNumber %>.min.css.gz'
            },
            mainjs: {
                options: {
                    mode: 'gzip'
                },
                src: '<%= config.client.desktop.build.scripts.path %>/main.min.js',
                dest: '<%= config.client.desktop.build.scripts.path %>/main-<%= gitinfo.local.branch.current.lastCommitNumber %>.min.js.gz'
            }
        },
        // watches files for changes and runs tasks based on the changed files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            fonts: {
                files: [
                    '<%= config.client.vendor.bootstrap.path %>/fonts/bootstrap/*.eot',
                    '<%= config.client.vendor.bootstrap.path %>/fonts/bootstrap/*.svg',
                    '<%= config.client.vendor.bootstrap.path %>/fonts/bootstrap/*.ttf',
                    '<%= config.client.vendor.bootstrap.path %>/fonts/bootstrap/*.woff',
                    '<%= config.client.vendor.fontawesome.path %>/fonts/*.eot',
                    '<%= config.client.vendor.fontawesome.path %>/fonts/*.svg',
                    '<%= config.client.vendor.fontawesome.path %>/fonts/*.ttf',
                    '<%= config.client.vendor.fontawesome.path %>/fonts/*.woff',
                    '<%= config.client.desktop.development.stylesheets.path %>/_fonts-pathes@@version.scss'
                ],
                tasks: ['updatefonts']
            },
            sass_main: {
                files: [
                    '<%= config.client.desktop.development.stylesheets.path %>/main.scss'
                ],
                tasks: ['gitinfo', 'development-replace', 'sass']
            },
            sass_dependencies: {
                files: [
                    '!<%= config.client.desktop.development.stylesheets.path %>/main.scss',
                    '!<%= config.client.desktop.development.stylesheets.path %>/_fonts-pathes@@version.scss',
                    '!<%= config.client.desktop.development.stylesheets.path %>/_fonts-pathes.scss',
                    '<%= config.client.desktop.development.stylesheets.path %>/*.scss',
                    '<%= config.client.desktop.development.stylesheets.path %>/**/*.scss'
                ],
                tasks: ['gitinfo', 'sass']
            },
            jst: {
                files: [
                    '<%= config.server.templates.path %>/*.ejs',
                    '<%= config.server.templates.path %>/**/*.ejs'
                ],
                tasks: ['jst']
            },
            views: {
                files: [
                    '<%= config.server.views.path %>/desktop_development@@.html'
                ],
                tasks: ['development-replace']
            },
            watchReload: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-gitinfo');

    // update the fonts, takes the fonts in the original directory and then
    // copies them into a directory which name is the latest git revision number
    // this a maintenance task that needs to run after a font has been updated,
    // either the bootstrap or the fontawesome font, watch will execute this
    // task if the fonts change
    grunt.registerTask('updatefonts', [
        'gitinfo',
        'copy:glyphiconsfont_desktop',
        'copy:fontawesomefont_desktop',
        'replace:sass_fonts_version',
        'sass'
    ]);

    // regroups all the development copy tasks
    grunt.registerTask('copy_desktop', [
        'copy:glyphiconsfont_desktop',
        'copy:fontawesomefont_desktop',
        'copy:favicon',
        'copy:robotstxt',
        'copy:favicon'
    ]);

    // this task just changes the sass configuration for production builds by disbaling the source maps generation
    grunt.registerTask('production-sass', 'change configuration values for production sass', function () {

        // no source maps for prod
        grunt.config.set('config.sass_source', 'none');

        grunt.task.run('sass');

    });

    // development replace
    grunt.registerTask('development-replace', 'set the environment variable to development in desktop.html', function () {

        // no source maps for prod
        grunt.config.set('config.environment', 'development');

        grunt.task.run('gitinfo', 'replace:desktop_html_development');

    });

    // beta replace
    grunt.registerTask('beta-replace', 'set the environment variable to beta in desktop.html', function () {

        // no source maps for prod
        grunt.config.set('config.environment', 'beta');

        grunt.task.run('gitinfo', 'replace:desktop_html_build');

    });

    // production replace
    grunt.registerTask('production-replace', 'set the environment variable to production in desktop.html', function () {

        // no source maps for prod
        grunt.config.set('config.environment', 'production');

        grunt.task.run('gitinfo', 'replace:desktop_html_build');

    });

    // default task, just lint js files
    grunt.registerTask('default', ['jshint']);

    // build for production export
    grunt.registerTask('buildprod', ['production-replace', 'jst', 'requirejs', 'production-sass', 'copy', 'cssmin', 'uglify', 'compress']);

    grunt.registerTask('buildbeta', ['beta-replace', 'jshint', 'jst', 'requirejs', 'sass', 'copy', 'cssmin', 'uglify', 'compress']);

    // templates and css for development
    grunt.registerTask('builddev', ['development-replace', 'jst', 'sass', 'copy_desktop']);

};