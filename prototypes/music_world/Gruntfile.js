module.exports = function(grunt) {

  grunt.initConfig({
	modernizr: {
	  dist: {
		"crawl": false,
		"dest" : "./javascript/vendor/modernizr_build/modernizr.js",
		"parseFiles": true,
		"customTests": [],
		"devFile": "./javascript/vendor/modernizr_build/modernizr-dev.js",
		"tests": [
	      "audio",
		  "canvas",
		  "history",
		  "fontface",
		  "localstorage"
		],
		"options": [
		  "setClasses"
		],
		"uglify": true
	  }
	}
  });

  grunt.loadNpmTasks('grunt-modernizr');

  grunt.registerTask('default', ['modernizr']);

};