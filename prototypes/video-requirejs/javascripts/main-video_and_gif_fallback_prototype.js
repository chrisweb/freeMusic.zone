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

    var startup = function startupFunction() {

        var $button = $('button');

        $button.on('click', function (event) {

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

        var Modernizr = window.Modernizr;

        Modernizr.on('videoautoplay', function (result) {

            // as long as nothing has happend here the image defined in the video element will be used

            if (result) {

                console.log('video autoplay is supported');

                // autoplay is supported so no need to do anything

            } else {

                console.log('video autplay is NOT supported');

                var $imageAnimatedGif = $('.gifvideo');

                // autoplay is NOT supported so now we should use the animated gif
                $('.video_container').find('.realvideo').replaceWith($imageAnimatedGif);

            }

        });

    }
    
    startup();
    
});