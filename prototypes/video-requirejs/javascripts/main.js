/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery-2.1.1/jquery',
        'backbone': 'vendor/backbone-1.1.2/backbone',
        'underscore': 'vendor/underscore-1.6.0/underscore',
        'trackModel': 'library/trackModel',
        'tracksCollection': 'library/tracksCollection'
    }
    
});

require([
    'jquery'
], function($) {

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