/**
 * 
 * @param object $
 * @param object configuration
 * @param object utilities
 * @returns object
 */
define(['jquery', 'configuration', 'utilities', 'angular', 'angular-bootstrap', 'colorbox'], function($, configurationModule, utilities, angular) {
    
    'use strict';
    
    /**
     * 
     * start application
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {
        
        utilities.log('[APPLICATION] initializeApplication...', 'blue');
        
        var configuration = configurationModule.get();
        
        $(document).ready(function() {
            
            // 
            //angular.module(configuration.application.name, [controllers, services, filters, directives]);
            
            // compile the template into an executable, bi-directionally bound application
            //angular.bootstrap(document, [configuration.application.name]);
            
            
        });
        
    };

    /**
     * 
     */
    return {
        initialize: initializeApplication
    };

});