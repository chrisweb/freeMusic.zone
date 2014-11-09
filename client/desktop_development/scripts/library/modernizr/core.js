define([
    
], function(
    
) {

    'use strict';
    
    var tests = {};
    
    var Modernizr = function modernizrConstructor() {
        
        this.tests = tests;
        
    };
    
    Modernizr.prototype.addTest = function addTestFunction(testsName, testFunction) {
        
        tests[testsName] = testFunction;
        
    };
    
    Modernizr.prototype.runTest = function runTestFunction(testsName) {
        
        return tests[testsName]();
        
    };

    var modernizr;

    var getInstance = function getInstanceFunction() {
        
        if (modernizr === undefined) {
            
            modernizr = new Modernizr();
            
        }
        
        return modernizr;
        
    };

    return getInstance();

});