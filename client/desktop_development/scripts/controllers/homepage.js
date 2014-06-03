define([
    'underscore',
    'utilities',
    'controller',
    'container',
    'backbone'
], function (_, utilities, Controller, container, Backbone) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function() {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
        },
        
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');

            // chat message input form
            require(['views/components/login'], function(LoginView) {

                var loginView = new LoginView();

                container.add('main', loginView);
                
                this.dispatch();

            });

        }
        
    });

    return HomepageController;
    
});