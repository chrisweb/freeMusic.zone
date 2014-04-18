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
                    }
                },
                build: {
                    root: 'client/desktop_build',
                    stylesheets: {
                        path: '<%= config.desktop.build.root %>/stylesheets'
                    },
                    scripts: {
                        path: '<%= config.desktop.build.root %>/scripts'
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
                    out: '<%= config.desktop.build.scripts.path %>/main-<%= bowerJson.version %>.js',
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

        // optimize images?
        // https://github.com/gruntjs/grunt-contrib-imagemin

        // copy files
        // https://github.com/gruntjs/grunt-contrib-copy

        // html5 (templates) lint
        // https://github.com/alicoding/grunt-lint5

        // QUnit
        // https://github.com/gruntjs/grunt-contrib-qunit
        // http://api.qunitjs.com/
        // https://qunitjs.com/cookbook/ 
        qunit: {
            all: ['<%= config.test.client.root %>/**/*.html']
        },
        
        // css lint?
        // https://github.com/gruntjs/grunt-contrib-csslint
        
        // remove comments, vendor prefixes, css minify, gzip
        
        // compiles sass to css and generate the necessary files
        // https://github.com/gruntjs/grunt-contrib-sass
        sass: {
            options: {
                unixNewlines: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.desktop.development.bootstrap.path %>',
                    src: ['main.scss'],
                    dest: '<%= config.desktop.build.stylesheets.path %>',
                    ext: '-<%= bowerJson.version %>.css'
                }]
            }
        },
        
        // watches files for changes and runs tasks based on the changed files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            sass: {
                files: ['<%= config.desktop.development.stylesheets %>/*.scss', '<%= config.desktop.development.bootstrap.path %>/stylesheets/*.scss', '<%= config.desktop.development.bootstrap.path %>/stylesheets/**/*.scss'],
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

    // Default task.
    grunt.registerTask('default', ['jshint', 'requirejs', 'qunit', 'sass']);

};