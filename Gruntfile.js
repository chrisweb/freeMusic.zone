module.exports = function(grunt) {

    'use strict';

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
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                nonbsp: true,
                nonew: true,
                quotmark: 'single',
                sub: true,
                undef: true,
                //unused: true,
                boss: true,
                eqnull: true,
                browser: true,
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
        
        // require js
        // https://github.com/gruntjs/grunt-contrib-requirejs

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'path/to/base',
                    mainConfigFile: 'path/to/config.js',
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
        }

        // optimize images?
        // https://github.com/gruntjs/grunt-contrib-imagemin

        // copy files
        // https://github.com/gruntjs/grunt-contrib-copy

        // html5 lint
        // https://github.com/alicoding/grunt-lint5



    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', 'jshint');

};