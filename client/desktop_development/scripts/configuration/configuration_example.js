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
                    
                break;

        }
        
        return configuration;
        
    };

    return {
        get: getConfiguration
    };
    
});