define([
    'underscore',
    'utilities',
    'controller',
    'container',
    'backbone',
    'jquery',
    'configuration'
], function (_, utilities, Controller, container, Backbone, $, configurationModule) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function() {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
        },
        
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');
            
            var that = this;

            this.getOauthUrl(function getOauthUrlCallback(error, dataJson) {
                
                if (!error) {
                    
                    var oauthUrl = dataJson.url;
                    
                    // chat message input form
                    require(['views/components/login'], function(LoginView) {

                        var loginView = new LoginView({ oauthUrl: oauthUrl });

                        container.add('main', loginView);

                        that.dispatch();

                    });
                    
                } else {
                    
                    utilities.log('[CONTROLLER HOMEPAGE] getOauthUrl error', error, 'fontColor:red');
                    
                }
                
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

    return HomepageController;
    
});