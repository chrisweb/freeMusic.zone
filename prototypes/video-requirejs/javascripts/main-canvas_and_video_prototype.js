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
    
    var runFunction = function runFunctionFunction(context, windowWidth, windowHeight) {
        
        context.drawImage(this, 0, 0, windowWidth, windowHeight);
                    
    };

    $(document).ready(function() {
        
        var $video = $('video');
        
        $video.hide();
        
        var video = $video.get(0);
        
        var $canvas = $('canvas');

        var canvas = $canvas.get(0);

        var context = canvas.getContext('2d');
        
        var windowWidth = $(window).width();
        
        var windowHeight = $(window).height();
        
        canvas.width = windowWidth;
        
        canvas.height = windowHeight;
        
        //$video.on('play', function() {
          
            var interval = setInterval(runFunction.bind(video, context, windowWidth, windowHeight), 100);
            
        //});
    
    });

});