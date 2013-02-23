/**
 * 
 */
define(['jquery', 'configuration'], function($, configuration) {

    /**
     * 
     * @returns {undefined}
     */
    var logger = function(arguments, color) {
        
        // iOS: http://developer.apple.com/library/ios/#DOCUMENTATION/AppleApplications/Reference/SafariWebContent/DebuggingSafarioniPhoneContent/DebuggingSafarioniPhoneContent.html
        // firefox: https://developer.mozilla.org/en-US/docs/DOM/console.log
        // chrome: https://developers.google.com/chrome-developer-tools/docs/console
        // nodejs: http://nodejs.org/api/stdio.html
        
        var configurationObject = configuration.get();
        
        if (typeof(console) === 'undefined' || typeof(arguments) === 'undefined' || configurationObject.application.debugging === false) {
            
            return;
            
        }
        
        $.each(Array.prototype.slice.call(arguments), function(index, value) {
            
            if (typeof(color) !== 'undefined' && typeof(value) === 'String') {
            
                console.log('%c' + value, 'color:' + color + ';');
                
            } else {
                
                console.log(value);
                
            }
        
        });

    };

    /**
     * 
     */
    return {
        'logger': logger
    };

});