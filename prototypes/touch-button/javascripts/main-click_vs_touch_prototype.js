/**
 * 
 * http://requirejs.org/
 * 
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'underscore': '../node_modules/underscore/underscore'
    }

});

require([
    'jquery',
    'underscore'

], function (
    $,
    _
) {

    'use strict';

    var initialize = function initializeFunction() {

        var startTime;

        // https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp

        $('#default_button').on('touchstart', function (event) {

            // I wanted to use the timeStamp to not create any overhead that would alter the time result
            // but on iOS the click event timestamp is always zero
            startTime = +new Date();
            //startTime = event.timeStamp;

            $('#output').append($('<li>').text('touchstart: ' + startTime));

        });

        $('#default_button').on('click', function (event) {

            // I wanted to use the timeStamp to not create any overhead that would alter the time result
            // but on iOS the click event timestamp is always zero
            var endTime = +new Date();
            //var endTime = event.timeStamp;

            $('#output').append($('<li>').text('click: ' + endTime));

            if (startTime !== undefined) {

                var timeDifference = endTime - startTime;

                var message = 'time difference is: ' + timeDifference + 'ms';

                console.log(message);

                $('#output').append($('<li>').text(message));

            } else {

                var message = 'could not measure as NO touchstart event got fired';

                console.log(message);

                $('#output').append($('<li>').text(message));

            }

        });

        $('#touch_button').on('touchstart', function (event) {

            startTime = event.timeStamp;

            $('#output').append($('<li>').text('touchstart: ' + startTime));

        });

        $('#touch_button').on('touchend', function (event) {

            var endTime = event.timeStamp;

            $('#output').append($('<li>').text('touchend: ' + endTime));

            var timeDifference = endTime - startTime;

            var message = 'time difference is: ' + timeDifference + 'ms';

            console.log(message);

            $('#output').append($('<li>').text(message));

        });

    };

    initialize();

});