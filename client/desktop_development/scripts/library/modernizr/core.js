define([
    
], function(
    
) {

    'use strict';
    
    var tests = {};
    
    // The current version, dummy
    var version = 'v3.0.0pre';

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    var configuration = {
      classPrefix: '',
      enableClasses: true,
      usePrefixes: true
    };
    
    var Modernizr = function modernizrConstructor() {
        
        this._tests = tests;
        
        this._version = version;
        
        this._config = configuration;
        
    };
    
    Modernizr.prototype.addTest = function addTestFunction(testsName, testFunction) {
        
        this._tests[testsName] = testFunction;
        
    };
    
    Modernizr.prototype.runTest = function runTestFunction(testName) {
        
        return this._tests[testName]();
        
    };
    
    Modernizr.prototype.removeTest = function removeTestFunction(testName) {
        
        delete this._tests[testName];
        
    };
    
    Modernizr.prototype.runTests = function runTestsFunction(testsNamesArray) {
        
        var testsLength = this._tests.length;
        
        var testsResults = {};
        
        var i;
        
        for (i = 0; i < testsLength; i++) {
            
            var testName = testsNamesArray[i];
            
            testsResults[testName] = this._tests[testName]();
            
        }
        
        return testsResults;
        
    };
    
    // TODO: put all configuration related stuff in own module
    Modernizr.prototype.configurationGet = function configurationGetFunction(name) {
        
        if (name === undefined) {
        
            return this._config;
            
        } else {
            
            return this._config[name];
            
        }
        
    };
    
    Modernizr.prototype.configurationSet = function configurationSetFunction(name, value) {
        
        this._config[name] = value;
        
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