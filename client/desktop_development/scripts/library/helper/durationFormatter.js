define([
    'chrisweb-utilities',
    'moment'
], function(utilities, moment) {

    'use strict';
    
    var format = function formatDurationFunction(durationInSeconds) {
        
        var formattedDuration = '';

        var momentDuration = moment.duration(parseInt(durationInSeconds), 'seconds');

        var hours = momentDuration.get('hours');
        var minutes = momentDuration.get('minutes');
        var seconds = momentDuration.get('seconds');

        if (seconds < 10 && durationInSeconds > 60) {

            formattedDuration += '0' + seconds;

        } else {

            formattedDuration += seconds;

        }

        if (minutes < 10 && durationInSeconds > 3600) {

            formattedDuration = '0' + minutes + ':' + formattedDuration;

        } else if (minutes > 0 || (minutes = 0 && hours > 0)) {

            formattedDuration = minutes + ':' + formattedDuration;

        }

        if (hours > 0) {

            formattedDuration = hours + ':' + formattedDuration;

        }

        return formattedDuration;
        
    };

    return {
        format: format
    };

});