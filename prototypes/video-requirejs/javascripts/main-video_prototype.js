/**
 * 
 * http://requirejs.org/
 * 
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'underscore': '../node_modules/underscore/underscore',
        'modernizr': 'vendor/modernizr_build/modernizr'
    }

});

require([
    'jquery',
    'underscore',
    'modernizr'

], function (
    $,
    _
) {

    'use strict';

    var $button = $('button');

    $button.on('click', function(event) {
        
        event.preventDefault();
        
        playPause();
        
    });

    var playPause = function playPauseFunction() {

        var $video = $('video');
        
        var video = $video.get(0);

        if (video.paused) {

            video.play();

        } else {

            video.pause();

        }

    };
    
});