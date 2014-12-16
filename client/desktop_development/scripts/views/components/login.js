/**
 * 
 * login view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * @param {type} EventsManager
 * @param {type} libraryUser
 * @param {type} videoPlayer
 * 
 * @returns {unresolved}
 */
define([
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager',
    'library.user',
    'library.videoPlayer'
    
], function (JST, utilities, view, EventsManager, libraryUser, videoPlayer) {
    
    'use strict';
    
    var LoginView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[LOGIN PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options;
            
            var that = this;
            
            // as soon as the user has been redirected back to the app, from
            // the jamendo website, a page will get loaded that will trigger
            // the oauth connected event
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
            
        },
        
        onRender: function() {

            // start the login view background video
            videoPlayer.initialize(this.$el, { format: this.options.videoFormat });
            
        },
        
        template: JST['templates/partials/login'],
        
        // view events
        events: {
            'click .login .btn:not(.noclick)': 'loginClick'
        },
        
        loginClick: function loginClickFunction(event) {
            
            event.preventDefault();
            
            var $login = this.$el.find('.login');

            var $loginButton = $login.find('#loginButton');
            
            // disqble the login button to avoid more clicks
            $loginButton.addClass('noclick');
            
            $loginButton.find('span').text('');
            
            $loginButton.velocity({ width: 454, height: 404, padding: '0px' }, 'easeInSine');
            
            var $oauthIFrame = this.$el.find('iframe.jamendo');
            
            $oauthIFrame.attr('src', this.options.oauthUrl);
            
            $oauthIFrame.ready(function oauthIFrameReady() {
                
                $oauthIFrame.removeClass('hidden');
                
            });
                        
        }
        
    });
    
    return LoginView;
    
});