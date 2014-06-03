define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utilities',
    'configuration',
    'view'
], function ($, _, Backbone, JST, utilities, configurationModule, view) {
    
    'use strict';
    
    var LoginView = view.extend({
        
        onInitialize: function() {
            
            utilities.log('[LOGIN PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/partials/login'],
        
        // view events
        events: {
            
        }
        
    });
    
    return LoginView;
    
});