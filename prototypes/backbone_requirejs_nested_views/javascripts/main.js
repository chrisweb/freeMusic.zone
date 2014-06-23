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
        'library.container': 'library/container',
        'library.view.loader': 'library/view/loader',
        'library.view': 'library/view'
    }
    
});

require([
    'library.container',
    'library.view.loader'
], function (container, viewLoader) {

    'use strict';

    viewLoader([
        'views/viewA',
        'views/viewB'
    ], function(ViewA, ViewB, c) {
        
        //console.log(ViewA);
        //console.log(ViewB);
        
        var viewA = new ViewA();
        
        container.add('#page', viewA);
        
        container.dispatch();
        
        var viewB = new ViewB();
        
        container.add('.viewB', viewB);
        
        container.dispatch('.viewB');
        
    });
    
});