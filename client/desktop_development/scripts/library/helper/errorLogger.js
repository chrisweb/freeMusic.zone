define([
    'chrisweb.utilities',
    'jquery'
], function(utilities, $) {

    'use strict';
    
    var initialize = function initializeErrorLoggerFunction() {
        
        if (window.onerror !== undefined) {

            // uncaught exceptions
            window.onerror = function(errorMsg, url, lineNumber) {

                var request = $.ajax({
                    url: '/log/error',
                    type: 'POST',
                    data: {
                        errorMessage: errorMessage,
                        url: url,
                        lineNumber: lineNumber
                    },
                    dataType: 'json'
                });

                request.done(function(response) {



                });

                request.fail(function(jqXHR, textStatus) {



                });

            };

        }
        
    };

    return {
        initialize: initialize
    };

});