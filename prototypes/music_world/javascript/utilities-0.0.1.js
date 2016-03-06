/**
 * 
 */
define([
	'jquery',
	'configuration'
], function(
	$,
	configuration
) {

    /**
     * 
     * @returns {undefined}
     */
    var logger = function() {
        
        // iOS: http://developer.apple.com/library/ios/#DOCUMENTATION/AppleApplications/Reference/SafariWebContent/DebuggingSafarioniPhoneContent/DebuggingSafarioniPhoneContent.html
        // firefox: https://developer.mozilla.org/en-US/docs/DOM/console.log
        // chrome: https://developers.google.com/chrome-developer-tools/docs/console
        // nodejs: http://nodejs.org/api/stdio.html
        
        var configurationObject = configuration.get();

        if (typeof(console) === 'undefined' || typeof(arguments) === 'undefined' || configurationObject.application.debugging !== true) {
            
            return;
            
        }
        
        var errorObject = new Error();
        var lineNumber;
        var fileName;
        
        //console.log(errorObject.stack.split('\n'));
 
        if (errorObject.stack.split('\n')[0] === 'Error') {
 
            var errorLine = errorObject.stack.split('\n')[2];
        
        } else {
            
            var errorLine = errorObject.stack.split('\n')[1];
            
        }
        
        var errorParts = errorLine.split(':');
        var fileNameParts = errorParts[2].split('/');

        fileName = fileNameParts[fileNameParts.length-1];
        lineNumber = errorParts[3];
            
        $.each(arguments, function(index, value) {

            console.log(fileName + ' (line ' + lineNumber + '): ' + value);
        
        });

    };
    
    var getDocumentWidth = function() {

        //utilities.log('getClient width $(document) ... ' + $(document).width());

        return $(document).width();
        
    };
    
    var getDocumentHeight = function() {

        //utilities.log('getClient height $(document) ... ' + $(document).height());

        return $(document).height();
        
    };

    var getCanvasElementWidth = function() {

        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id);

        //utilities.log('getClient width canvasElement ... ' + canvasElement.width);

        return canvasElement.width();

    };

    var getCanvasElementHeight = function() {

        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id);

        //utilities.log('getClient height canvasElement ... ' + canvasElement.height);

        return canvasElement.height();

    };

    /**
     * 
     */
    return {
        'log': logger,
        'getDocumentWidth': getDocumentWidth,
        'getDocumentHeight': getDocumentHeight,
        'getCanvasElementWidth': getCanvasElementWidth,
        'getCanvasElementHeight': getCanvasElementHeight
    };

});