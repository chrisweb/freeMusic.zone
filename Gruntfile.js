module.exports = function(grunt) {

    'use strict';

    // grunt
    grunt.initConfig({
        
        packageJson: grunt.file.readJSON('package.json'),
        bowerJson: grunt.file.readJSON('bower.json'),
        
        config: {
            desktop: {
                development: {
                    root: 'client/desktop_development',
                    stylesheets: {
                        path: '<%= config.desktop.development.root %>/stylesheets'
                    },
                    scripts: {
                        path: '<%= config.desktop.development.root %>/scripts',
                        templates: {
                            path: '<%= config.desktop.development.scripts.path %>/templates'
                        }
                    },
                    bootstrap: {
                        path: 'bower_components/bootstrap-sass-official/vendor/assets'
                    },
                    fontawesome: {
                        path: 'bower_components/fontawesome'
                    },
                    requirejs: {
                        path: 'bower_components/requirejs'
                    },
                    images: {
                        path: '<%= config.desktop.development.root %>/images'
                    }
                },
                build: {
                    root: 'client/desktop_build',
                    stylesheets: {
                        path: '<%= config.desktop.build.root %>/stylesheets'
                    },
                    scripts: {
                        path: '<%= config.desktop.build.root %>/scripts'
                    },
                    images: {
                        path: '<%= config.desktop.build.root %>/images'
                    },
                    fonts: {
                        path: '<%= config.desktop.build.root %>/fonts'
                    }
                }
            },
            server: {
                root: 'server',
                templates: {
                    path: '<%= config.server.root %>/templates'
                }
            },
            test: {
                client: {
                    root: 'test/client'
                }
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
                '<%= config.desktop.development.scripts.path %>/*.js',
                '<%= config.desktop.development.scripts.path %>/**/*.js',
                '!<%= config.desktop.development.scripts.path %>/templates/*.js'
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
                    processName: function(filepath) {
                        return filepath.slice(filepath.indexOf('/')+1, filepath.lastIndexOf('.'));
                    }
                },
                files: {
                    '<%= config.desktop.development.scripts.templates.path %>/templates.js': ['<%= config.server.templates.path %>/*.ejs', '<%= config.server.templates.path %>/**/*.ejs']
                }
            }
        },

        // require js
        // https://github.com/gruntjs/grunt-contrib-requirejs
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= config.desktop.development.scripts.path %>',
                    mainConfigFile: '<%= config.desktop.development.scripts.path %>/main.js',
                    name: 'main',
                    out: '<%= config.desktop.build.scripts.path %>/main.js',
                    findNestedDependencies: true,
                    optimize: 'uglify2',
                    useStrict: false, // TODO: set to true for build if enough support by browsers
                    done: function(done, output) {
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

        // QUnit
        // https://github.com/gruntjs/grunt-contrib-qunit
        // http://api.qunitjs.com/
        // https://qunitjs.com/cookbook/ 
        qunit: {
            all: ['<%= config.test.client.root %>/**/*.html']
        },
        
        // TODO: css lint?
        // https://github.com/gruntjs/grunt-contrib-csslint
        
        // TODO: remove comments, vendor prefixes?
        
        // compiles sass to css and generate the necessary files
        // https://github.com/gruntjs/grunt-contrib-sass
        sass: {
            options: {
                unixNewlines: true,
                precision: 10
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.desktop.development.stylesheets.path %>',
                    src: ['main.scss'],
                    dest: '<%= config.desktop.build.stylesheets.path %>',
                    ext: '.css'
                }]
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
                    '<%= config.desktop.build.stylesheets.path %>/main.min.css': '<%= config.desktop.build.stylesheets.path %>/main.css'
                }
            }
        },
        
        // uglify requirejs
        // https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            requirejs: {
                files: {
                    '<%= config.desktop.build.scripts.path %>/require.min.js': '<%= config.desktop.development.requirejs.path %>/require.js'
                }
            }
        },
        
        // copy files
        // https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            favicon: {
                expand: true,
                cwd: '<%= config.desktop.development.root %>/',
                src: 'favicon.ico',
                dest: '<%= config.desktop.build.root %>/'
            },
            robotstxt: {
                expand: true,
                cwd: '<%= config.desktop.development.root %>/',
                src: 'robots.txt',
                dest: '<%= config.desktop.build.root %>/'
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.desktop.development.images.path %>/',
                        src: ['**'],
                        dest: '<%= config.desktop.build.images.path %>/'
                    }
                ]
            },
            glyphiconsfont: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.desktop.development.bootstrap.path %>/fonts/',
                        src: ['**'],
                        dest: '<%= config.desktop.build.fonts.path %>/'
                    }
                ]
            },
            fontawesomefont: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.desktop.development.fontawesome.path %>/fonts/',
                        src: ['**'],
                        dest: '<%= config.desktop.build.fonts.path %>/fontawesome/'
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
                src: '<%= config.desktop.build.stylesheets.path %>/main.min.css',
                dest: '<%= config.desktop.build.stylesheets.path %>/main.min.css'
            },
            mainjs: {
                options: {
                    mode: 'gzip'
                },
                src: '<%= config.desktop.build.scripts.path %>/main.js',
                dest: '<%= config.desktop.build.scripts.path %>/main.js'
            },
            requirejs: {
                options: {
                    mode: 'gzip'
                },
                src: '<%= config.desktop.build.scripts.path %>/require.min.js',
                dest: '<%= config.desktop.build.scripts.path %>/require.min.js'
            }
        },
        
        // watches files for changes and runs tasks based on the changed files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            sass: {
                files: ['<%= config.desktop.development.stylesheets.path %>/*.scss', '<%= config.desktop.development.bootstrap.path %>/stylesheets/*.scss', '<%= config.desktop.development.bootstrap.path %>/stylesheets/**/*.scss'],
                tasks: ['sass:dist']
            },
            jst: {
                files: ['<%= config.server.templates.path %>/*.ejs', '<%= config.server.templates.path %>/**/*.ejs'],
                tasks: ['jst']
            },
            configFiles: {
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
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // default task, just lint js files
    grunt.registerTask('default', ['jshint']);
    
    // build for production export
    grunt.registerTask('buildprod', ['jshint', 'jst', 'requirejs', 'qunit', 'sass', 'copy', 'cssmin', 'uglify', 'compress']);
    
    // templates and css for development
    grunt.registerTask('builddev', ['jst', 'sass', 'copy']);

};