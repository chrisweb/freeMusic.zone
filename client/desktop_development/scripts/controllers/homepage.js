/**
 * 
 * homepage controller
 * 
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} Backbone
 * @param {type} $
 * @param {type} configurationModule
 * @param {type} user
 * @param {type} eventsManager
 * @returns {unresolved}
 */
define([
    'underscore',
    'library.utilities',
    'library.controller',
    'library.container',
    'backbone',
    'jquery',
    'configuration',
    'library.user',
    'library.eventsManager'
], function (_, utilities, Controller, container, Backbone, $, configurationModule, user, eventsManager) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function() {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
            eventsManager.on('oauth:connected', function oauthConnected() {
                
                Backbone.history.navigate('desktop/homepage/welcome', true);
                
            });
            
        },
        
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');
            
            var isLogged = user.getAttribute('isLogged');
            
            if (!isLogged) {
            
                var that = this;

                this.getOauthUrl(function getOauthUrlCallback(error, dataJson) {

                    if (!error) {

                        var oauthUrl = dataJson.url;

                        // get the login view
                        require(['views/components/login'], function(LoginView) {

                            var loginView = new LoginView({ oauthUrl: oauthUrl });

                            container.add('main', loginView);

                            that.dispatch();

                        });

                    } else {

                        utilities.log('[CONTROLLER HOMEPAGE] getOauthUrl error', error, 'fontColor:red');

                    }

                });
                
            } else {
                
                // TODO: if user is already logged
                
            }

        },
        
        welcomeAction: function welcomeActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: welcome', 'fontColor:blue');
            
            var that = this;
            
            // get the login view
            require(['views/components/welcome'], function(WelcomeView) {

                var welcomeView = new WelcomeView();

                container.add('main', welcomeView);

                that.dispatch();

            });
            
        },
        
        getOauthUrl: function getOauthUrlFunction(callback) {
            
            var configuration = configurationModule.get();
            
            var jqXHR = $.ajax({
                url: configuration.server.path + '/oauth/url',
                type: 'GET',
                dataType: 'json'
            });

            jqXHR.done(function(dataJson, textStatus, jqXHR) {

                utilities.log(dataJson);
                utilities.log(textStatus);
                utilities.log(jqXHR);
                
                callback(false, dataJson);

            });

            jqXHR.fail(function(jqXHR, textStatus, errorThrown) {

                utilities.log(jqXHR);
                utilities.log(textStatus);
                utilities.log(errorThrown);

                callback(errorThrown);

            });
            
        }
        
    });
    
    // the oauth iframe will call this from within the iframe on successfull
    // connection
    window.connected = function() {
        
        utilities.log('oauth connected');
        
        eventsManager.trigger('oauth:connected');
        
    };

    return HomepageController;
    
});