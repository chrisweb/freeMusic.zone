/**
 * 
 * user controller
 * 
 * @param {type} $
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'chrisweb.utilities',
    'library.controller',
    'ribs.container'
    
], function ($, utilities, Controller, container) {
    
    'use strict';
    
    var UserController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[USER CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        profileAction: function profileActionFunction() {
            
            utilities.log('[USER CONTROLLER] controller: user,  action: profile', 'fontColor:blue');
            
            require(['views/pages/profile'], function(ProfileView) {
                
                container.clear('#core');
                
                var profileView = new ProfileView();
                
                container.add('#core', profileView);
                
                container.dispatch('#core');
                
            });
            
        }
        
    });
    
    return UserController;
    
});