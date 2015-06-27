/**
 * 
 * user controller
 * 
 * @param {type} $
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} Ribs
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'chrisweb-utilities',
    'library.controller',
    'ribsjs'
    
], function ($, utilities, Controller, Ribs) {
    
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
                
                Ribs.Container.clear('#core');
                
                var profileView = new ProfileView();
                
                Ribs.Container.add('#core', profileView);
                
                Ribs.Container.dispatch('#core');
                
            });
            
        }
        
    });
    
    return UserController;
    
});