define([
    'Modernizr'
], function (
    Modernizr
) {

    'use strict';

    var addTest = function addTestFunction() {
        
        Modernizr.addTest(arguments);
        
    };
    
    return addTest;

});
