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
    
    Modernizr.prototype.addTest = function addTestFunction(testsName, testFunction, autorun, callback) {
        
        this._tests[testsName] = testFunction;
        
        // if autorun isn't false run test asap
        // modernizr did always run tests asap, so we make it now optional to
        // run test when user thinks it needs to get run by checking if
        // autorun has been set to false, in which case we don't autorun the
        // test
        if (autorun !== false) {
            
            if (callback === undefined) {
                
                return this.runTest(testsName);
                
            } else {
            
                this.runTest(testsName, callback);
                
            }
            
        }
        
    };
    
    // TODO: deprecate this function and make all test async by default
    Modernizr.prototype.addAsyncTest = function addTestFunction(testFunction) {
        
        testFunction();
        
    };
    
    var timeoutHandler;
    
    Modernizr.prototype.runTest = function runTestFunction(testName, callback) {
        
        // async tests are not available imediatly
        if (testName in this._tests) {
            
            // async tests put the test result into the tests list and are not
            // a function
            if (typeof this._tests[testName] === 'function') {
                        
                var testResult = this._tests[testName]();
                
            } else {
                
                var testResult = this._tests[testName];
                
            }
            
        } else {
            
            // TODO: this is a hack as the original tests of modernizr dont
            // accept callbacks for asynchronous tests, if the tests get
            // updated this can be removed
            if (typeof timeoutHandler !== 'undefined') {
                
                clearTimeout(timeoutHandler);
                
            }
            
            var that = this;
            
            timeoutHandler = setTimeout(function() {
                
                that.runTest(testName, callback);
                
            }, 200);
            
        }
        
        // add test result to Modernizr
        // TODO: remove this feature, as it is problematic for asynchronous
        // tests anyway
        this.testName = testResult;
        
        // TODO: all tests should be async and have a callback if they dont
        // emit an event on the modernizr object using the test name and result
        // the user should not have to bother is a test is async or not, just
        // handle all tests the same way
        if (callback === undefined) {
        
            //throw 'error: add a callback as second parameter of this function';
        
            return testResult;
            
        } else {
            
            callback(false, testResult);
            
        }
        
    };
    
    Modernizr.prototype.removeTest = function removeTestFunction(testName) {
        
        delete this._tests[testName];
        
    };
    
    Modernizr.prototype.runTests = function runTestsFunction(testsNamesArray, callback) {
        
        var testsLength = testsNamesArray.length;
        
        var testsResults = {};
        
        var i;
        
        for (i = 0; i < testsLength; i++) {
            
            var testName = testsNamesArray[i];
            
            // TODO: see todo in function runTest above
            if (callback === undefined) {
            
                testsResults[testName] = this.runTest(testName);
                
            } else {
                
                // TODO: multiple asynchronous tests
                //this.runTest(testName, function () {
                //    
                //    
                //    
                //});
                
            }
            
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