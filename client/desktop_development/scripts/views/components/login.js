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
            'click .login button': 'loginClick'
        },
        
        loginClick: function loginClickFunction(event) {
            
            event.preventDefault();

            this.$el.find('form.login').hide();
            
            this.$el.find('loading').show();
            
            var oauthIFrame = this.$el.find('.jamendo');
            
            var that = this;
            
            oauthIFrame.ready(function oauthIFrameReady() {
                
                oauthIFrame.attr('src', that.options.oauthUrl);
            
                oauthIFrame.show();
                
            });
            
            
            
        }
        
    });
    
    return LoginView;
    
});