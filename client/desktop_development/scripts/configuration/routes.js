/**
 * 
 * routes definitions
 * 
 */
define([], function () {
    
    var routesDefinitions = {
        'desktop': 'renderHomepage',
        '*other': 'render404'
    };
    
    return routesDefinitions;
    
});