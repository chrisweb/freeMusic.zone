/**
 * 
 * routes definitions
 * 
 */
define([], function () {
    
    'use strict';
    
    var routesDefinitions = {
        'desktop': 'renderHomepage',
        '*other': 'render404'
    };
    
    return routesDefinitions;
    
});