/**
 *
 * video player (fullscreen background)
 *   
 * @param {type} utilities
 * @param {type} EventsLibrary
 * 
 * @returns {_L7.Anonym$1}
 */
define([
    'jquery',
    'chrisweb-utilities',
    'library.events'

], function (
    $,
    utilities,
    EventsLibrary
) {
    
    'use strict';

    /**
     * 
     * initialize
     * 
     * @param {type} $element
     * @param {type} videoFormat
     * @returns {undefined}
     */
    var initialize = function initializeFunction($element, videoFormat) {
        
        utilities.log('initializing the video player', 'fontColor:green');
        
        var videoPlayer = '';
        videoPlayer += '<div class="videoContainer">';

        if (videoFormat === 'gif') {
            
            videoPlayer += '<div class="backgroundVideo"></div>';
            
        } else {
            
            videoPlayer += '<video class="backgroundVideo" poster="/videos/hompage-thumbnail_1_1.png" autoplay="autoplay" loop>';
            videoPlayer += '<source src="/videos/hompage-video_1.webm" type=\'video/webm;codecs="vp8, vorbis"\'/>';
            videoPlayer += '<source src="/videos/hompage-video_1.mp4" type=\'video/mp4;codecs="avc1.42E01E, mp4a.40.2"\'/>';
            videoPlayer += '</video>';
            
        }
        
        videoPlayer += '</div>';
        
        var $videoPlayer = $(videoPlayer);
        
        $element.append($videoPlayer);
        
        /**
         * Note to self: very good article on MDN about buffering:
         * https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges
         * 
         * List of html5 video events
         * https://www.w3.org/TR/html5/embedded-content-0.html#event-media-ended
         */
        
        $videoPlayer.find('video').on('progress', onProgress);

        $videoPlayer.find('video').one('canplaythrough', onCanPlayThrough);
        
    };
    
    var onProgress = function onProgressFunction(jqueryProgressEvent) {
        
        var bufferedTimeRanges = this.buffered;
        
        if (bufferedTimeRanges.length > 0) {
            
            var bufferedEnd = bufferedTimeRanges.end(bufferedTimeRanges.length - 1);
            
            var percentageBuffered = 0;
            
            if (this.duration > 0) {
                percentageBuffered = ((bufferedEnd / this.duration) * 100);
            }
            
            EventsLibrary.trigger(EventsLibrary.WELCOME_VIDEO_PLAYER_PROGRESS, { percentageBuffered: percentageBuffered });

        }
        
    };
    
    var onCanPlayThrough = function onCanPlayThroughFunction(jqueryEvent) {
    
        EventsLibrary.trigger(EventsLibrary.WELCOME_VIDEO_PLAYER_PROGRESS, { percentageBuffered: 100 });

    };
    
    var close = function closeFunction($element) {
        
        $element.find('.videoContainer');

        $videoPlayer.find('video').off('progress', onProgress);
        
    }

    return {
        initialize: initialize,
        close: close
    };
    
});