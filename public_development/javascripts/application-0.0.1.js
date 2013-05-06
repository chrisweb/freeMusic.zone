/**
 * 
 * 
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'colorbox'], function($, configuration) {

    var loopHandler = null;
    
    /**
     * 
     * start application
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {
        
        utilities.log('[APPLICATION] initializeApplication...');
        
        var configurationObject = configuration.get();
        
    };

    /**
     * 
     */
    return {
        initialize: initializeApplication
    };

});