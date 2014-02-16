module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // less
        // https://github.com/gruntjs/grunt-contrib-less
        // https://github.com/twbs/bootstrap/blob/master/Gruntfile.js
        
        // css lint?
        // https://github.com/gruntjs/grunt-contrib-csslint
        
        // jslint
        // jshint
        // https://github.com/gruntjs/grunt-contrib-jshint
        // https://github.com/jquery/jquery/blob/master/Gruntfile.js
        
        // require js
        // https://github.com/gruntjs/grunt-contrib-requirejs
        
        // optimize images?
        // https://github.com/gruntjs/grunt-contrib-imagemin
        
        // copy files
        // https://github.com/gruntjs/grunt-contrib-copy
        
        // html5 lint
        // https://github.com/alicoding/grunt-lint5
        
        
        
    });

    grunt.loadNpmTasks('grunt-contrib-less');

};