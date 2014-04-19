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
                        path: '<%= config.desktop.development.root %>/scripts'
                    },
                    bootstrap: {
                        path: 'bower_components/bootstrap-sass-official/vendor/assets'
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
                    }
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
        jshint: {
            src: [
                'Gruntfile.js',
                '<%= config.desktop.development.scripts.path %>/*.js',
                '<%= config.desktop.development.scripts.path %>/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
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

        // TODO: optimize images?
        // https://github.com/gruntjs/grunt-contrib-imagemin

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
                unixNewlines: true
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
                    mode: 'deflate'
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
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task.
    grunt.registerTask('default', ['jshint', 'requirejs', 'qunit', 'sass', 'copy', 'cssmin','uglify', 'compress']);

};