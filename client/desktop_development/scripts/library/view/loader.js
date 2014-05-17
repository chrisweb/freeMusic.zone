/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * views loader
 * 
 * @returns {_L14.ViewsLoader}
 */
define([

], function () {
    
    'use strict';

    var ViewsLoader = function(views, callback) {

        // improve views loader using promises?
        // http://www.joezimjs.com/javascript/lazy-loading-javascript-with-requirejs/
        // http://tech.adroll.com/blog/web/2013/11/12/lazyloading-backbone-collection-with-promises.html
        // es6 promises:
        // https://github.com/jakearchibald/es6-promise
        // http://www.html5rocks.com/en/tutorials/es6/promises/
        // TODO: howto tell requirejs which views to include into build

        require(views, function() {
            
            callback(arguments);
            
        });
        
    };

    return ViewsLoader;
    
});