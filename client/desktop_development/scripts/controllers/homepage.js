define([
    'underscore',
    'utilities',
    'controller',
    'container',
    'backbone',
    'jquery',
    'configuration'
], function (_, utilities, Controller, container, Backbone, $, configuration) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function() {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
        },
        
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');
            
            var oauthUrl = this.getOAuthRequestUrl();
            
            var that = this;

            // chat message input form
            require(['views/components/login'], function(LoginView) {

                var loginView = new LoginView({ oauthUrl: oauthUrl });

                container.add('main', loginView);
                
                that.dispatch();

            });

        },
        
        getOAuthRequestUrl: function getOAuthRequestUrlFunction() {
            
            var configurationObject = configuration.get();
            var jamendoApiConfiguration = configurationObject.jamendoApi;
            
            var requestUrl = '';
            
            // protocol
            requestUrl += 'https://';
            
            // host
            requestUrl += jamendoApiConfiguration.apiHost;
            
            // port
            if (
                $.type(jamendoApiConfiguration.apiPort) !== 'undefined' &&
                jamendoApiConfiguration.apiPort !== '' &&
                jamendoApiConfiguration.apiPort !== 80
            ) {
                
                requestUrl += ':' + jamendoApiConfiguration.apiPort;
                
            }
            
            // api version and authorize resource path
            requestUrl += jamendoApiConfiguration.apiVersionPath;
            requestUrl += jamendoApiConfiguration.resources.authorize;
            
            // parameters
            requestUrl += '?client_id=' + jamendoApiConfiguration.clientId;
            requestUrl += '&redirect_uri=' + jamendoApiConfiguration.redirect_uri;
            requestUrl += '&scope=' + jamendoApiConfiguration.scope;
            
            // TODO: create a secret state string and store it in LocalStorage
            var state = '';
            
            // state
            requestUrl += '&state=' + state;
            
            utilities.log('[APPLICATION] requestUrl: ' + requestUrl, 'green');
            
            return requestUrl;
            
        }
        
    });

    return HomepageController;
    
});