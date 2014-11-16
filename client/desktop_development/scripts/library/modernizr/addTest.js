define([
    'Modernizr'
], function (
    Modernizr
) {

    'use strict';

    var addTest = function addTestFunction() {
        
        Modernizr.addTest.apply(Modernizr, arguments);
        
    };
    
    return addTest;

});
