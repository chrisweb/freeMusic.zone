define([
    
], function () {

    'use strict';

    var getConfiguration = function() {



        switch (environment) {

            case 'production':
                
                configuration.server = {
                    // server bootstrap will dynmaically add the current port
                    // if you don't want to use a port set this to empty
                    port: '__PORT__',
                    hostname: '127.0.0.1',
                    prototcol: 'http'
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
                    // server bootstrap will dynmaically add the current port
                    // if you don't want to use a port set this to empty
                    port: '__PORT__',
                    hostname: '127.0.0.1',
                    prototcol: 'http'
                };
                
                configuration.client = {
                    defaults: {
                        action: 'index'
                    }
                };
                    
                break;

        }

        // use proxy when working with ES6
        var getServerRootUrl = function getServerRootUrlFunction() {

            var serverRootUrl = '';

            serverRootUrl += configuration.server.prototcol + '://';
            serverRootUrl += configuration.server.hostname;

            if ('port' in configuration.server && configuration.server.port !== undefined && configuration.server.port !== '') {
                serverRootUrl += ':' + configuration.server.port;
            }

            return serverRootUrl;

        };

        configuration.server.rootUrl = getServerRootUrl();
        
        return configuration;
        
    };

    return {
        get: getConfiguration
    };
    
});