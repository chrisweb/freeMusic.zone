define([
    
], function () {

    'use strict';

    var getConfiguration = function(environment) {

        if (environment === undefined) {
            
            environment = window._environment;
            
        }

        var configuration = {
            environment: environment
        };

        switch (environment) {

            case 'production':
                
                configuration.server = {
                    path: 'http://127.0.0.1:35000'
                };
                
                configuration.client = {
                    defaults: {
                        action: 'index'
                    }
                };
                
                configuration.soundmanager = {
                    flash: {
                        url: '/flash/soundmanager/',
                        version: 9
                    },
                    debugMode: false,
                    preferFlash: false // prefer HTML5 mode where supported
                };

                break;

            case 'staging':

                break;

            case 'development':

                configuration.server = {
                    path: 'http://127.0.0.1:35000'
                };
                
                configuration.client = {
                    defaults: {
                        action: 'index'
                    }
                };
                
                configuration.soundmanager = {
                    flash: {
                        url: '/flash/soundmanager/',
                        version: 9
                    },
                    debugMode: true,
                    preferFlash: false // prefer HTML5 mode where supported
                };
                    
                break;

        }
        
        return configuration;
        
    };

    return {
        get: getConfiguration
    };
    
});