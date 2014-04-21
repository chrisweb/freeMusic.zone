define([

], function () {
    
    'use strict';
    
    // TODO: check for environment variable and decide which confiration to return

    var developmentConfiguration = {
        serverPath: 'http://127.0.0.1:35000/desktop'
    };

    return {
        configuration: developmentConfiguration
    };
    
});


