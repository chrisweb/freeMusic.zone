define([
    
], function(
    
) {

    'use strict';
    
    var createElement = function () {
        
        // TODO: remove this to deprecate IE7 support
        if (typeof document.createElement !== 'function') {
            
            // This is the case in IE7, where the type of createElement is "object".
            // For this reason, we cannot call apply() as Object is not a Function.
            //return document.createElement(arguments[0]);
            
        } else {
            
            return document.createElement.apply(document, arguments);
            
        }
        
    };
    
    return createElement;

});