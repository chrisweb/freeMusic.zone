module.exports = function (grunt) {

    'use strict';

    // grunt
    grunt.initConfig({
        packageJson: grunt.file.readJSON('package.json'),
        config: {
            'environment': 'development'
        },
        // grunt modernizr
        // https://github.com/Modernizr/grunt-modernizr
        modernizr: {
            dist: {
                "crawl": false,
                "dest": "./javascripts/vendor/modernizr_build/modernizr.js",
                "parseFiles": true,
                "customTests": [],
                "devFile": "./javascripts/vendor/modernizr_build/modernizr-dev.js",
                "tests": [
                    "video",
                    "videoautoplay"
                ],
                "options": [
                    "setClasses"
                ],
                "uglify": true
            }
        },
        // watches files for changes and runs tasks based on the changed files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {

        }
    });

    grunt.loadNpmTasks('grunt-modernizr');

    // default task, just lint js files
    grunt.registerTask('default', ['modernizr']);

};