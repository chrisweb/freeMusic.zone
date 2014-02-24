module.exports = function(grunt) {

    'use strict';
    
    // this replaces all the grunt.loadNpmTasks, by automatically loading
    // all packages listed in the devDependencies of the package.json
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        // js hint
        // ! run this first, if linting fails the script will abort
        // https://github.com/gruntjs/grunt-contrib-jshint
        // https://github.com/jquery/jquery/blob/master/Gruntfile.js
        // ! js hint options: http://www.jshint.com/docs/options/

        jshint: {
            src: [
                'Gruntfile.js',
                'audio-data-analyzer.js',
                'mapreduce_cron.js',
                'server.js',
                'twitter_harvester.js',
                'application/*.js',
                'application/**/*.js',
                'library/**/*.js',
                'public_development/javascripts/application/*.js',
                'public_development/javascripts/application/**/*.js',
                'public_development/javascripts/library/*.js'
            ],
            grunt: {
                options: {
					jshintrc: '.jshintrc',
					reporter: require('jshint-stylish')
				},
                globals: {
                    require: true,
                    define: true,
                    requirejs: true,
                    describe: true,
                    expect: true,
                    it: true,
                    module: true,
                    process: true,
                    __dirname: true,
                    exports: true,
                    emit: true,
                    console: true
                }
            }
        },
        
        // less
        // https://github.com/gruntjs/grunt-contrib-less
        // https://github.com/twbs/bootstrap/blob/master/Gruntfile.js

        // css lint?
        // https://github.com/gruntjs/grunt-contrib-csslint
        
        // images minification
        // imagemin
        
        // require js
        // https://github.com/gruntjs/grunt-contrib-requirejs

        requirejs: {
            compile: {
                options: {
                    baseUrl: './public_development/javascripts',
                    mainConfigFile: './public_development/javascripts/main-0.0.1.js',
                    dir: './public/javascripts',
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./,
                    inlineText: true,
                    modules:[
                        {
                            name: 'main-0.0.1'
                        }
                    ],
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

        // html5 lint
        // https://github.com/alicoding/grunt-lint5
        
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['application/views/*.html']
            }
        },
        
        // watchers
        watch: {
            js: {
                files: '<%= jshint.src %>',
                tasks: ['jshint']
            },
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            }
            /*css: {}*/
        }

    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'htmlhint', 'requirejs']);
    
    // task for only hinting js and html
    grunt.registerTask('onlyhint', ['jshint', 'htmlhint']);

};