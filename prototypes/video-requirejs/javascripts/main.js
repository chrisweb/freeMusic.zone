/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery-2.1.1/jquery',
        'backbone': 'vendor/backbone-1.1.2/backbone',
        'underscore': 'vendor/underscore-1.6.0/underscore',
        'trackModel': 'library/trackModel',
        'tracksCollection': 'library/tracksCollection'
    }
    
});

require([
    
], function () {

    'use strict';

    
    
});