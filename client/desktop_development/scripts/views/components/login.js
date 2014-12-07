/**
 * 
 * login view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} Backbone
 * @param {type} JST
 * @param {type} utilities
 * @param {type} configurationModule
 * @param {type} view
 * @param {type} EventsManager
 * @param {type} libraryUser
 * @param {type} videoPlayer
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'chrisweb.utilities',
    'configuration',
    'ribs.view',
    'library.eventsManager',
    'library.user',
    'library.videoPlayer'
    
], function ($, _, Backbone, JST, utilities, configurationModule, view, EventsManager, libraryUser, videoPlayer) {
    
    'use strict';
    
    var LoginView = view.extend({
        
        onInitialize: function() {
            
            utilities.log('[LOGIN PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            var that = this;
            
            EventsManager.on(EventsManager.constants.OAUTH_CONNECTED, function loginOauthConnected() {

                // hide the oauth iframe
                that.$el.find('iframe.jamendo').addClass('hidden');
            
                // show the loading
                that.$el.find('.loading').removeClass('hidden');
                
                // fetch the user data from server
                libraryUser.fetchUserData(function userFetchedCallback(error) {
                
                    if (!error) {

                        EventsManager.trigger(EventsManager.constants.OAUTH_ISLOGGED, { isLogged: libraryUser.isLogged() });

                    } 
                
                });
                
            });
            
            // start the login view background video
            videoPlayer.start(this.$el);
            
        },
        
        template: JST['templates/partials/login'],
        
        // view events
        events: {
            'click .login button': 'loginClick'
        },
        
        loginClick: function loginClickFunction(event) {
            
            event.preventDefault();

            this.$el.find('form.login').addClass('hidden');
            
            this.$el.find('.loading').removeClass('hidden');
            
            var oauthIFrame = this.$el.find('iframe.jamendo');
            
            oauthIFrame.attr('src', this.options.oauthUrl);
            
            var that = this;
            
            oauthIFrame.ready(function oauthIFrameReady() {
            
                oauthIFrame.removeClass('hidden');
                
            });
                        
        }
        
    });
    
    return LoginView;
    
});