define([
    
], function(
    
) {

    'use strict';
    
    var documentElement;
    
    var getDocumentElement = function getDocumentElementFunction() {
    
        if (typeof documentElement === 'undefined') {

            documentElement = document.documentElement;

        }
        
        return documentElement;
        
    };
    
    return getDocumentElement();

});