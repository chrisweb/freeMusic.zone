/**
 * 
 * login page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * @param {type} EventsManager
 * @param {type} UserLibrary
 * @param {type} videoPlayer
 * @param {type} libraryOauth
 * @param {type} RouterLibrary
 * @param {type} skrollr
 * 
 * @returns {unresolved}
 */
define([
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager',
    'library.user',
    'library.videoPlayer',
    'library.oauth',
    'library.router',
    'skrollr'
    
], function (JST, utilities, view, EventsManager, UserLibrary, videoPlayer, libraryOauth, RouterLibrary, skrollr) {
    
    'use strict';
    
    var LoginView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[LOGIN PAGE VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options;
            
            var that = this;
            
            // as soon as the user has been redirected back to the app, from
            // the jamendo website, a page will get loaded that will trigger
            // the oauth connected event
            EventsManager.on(EventsManager.constants.OAUTH_CONNECTED, function loginOauthConnected() {
                
                var $login = that.$el.find('.login');

                var $loginButton = $login.find('#loginButton');
                
                var $loginLegend = $login.find('legend');
                
                var $oauthIFrame = that.$el.find('iframe.jamendo');
                
                $oauthIFrame.addClass('hidden');
                
                $loginButton.find('span').text('Loading...');
                
                $loginButton.velocity({ width: 162, height: 49, padding: '10px 16px 16px 10px' }, 'easeInSine');
                
                var userLibrary = UserLibrary();
                
                // fetch the user data from server
                userLibrary.fetchUserData(function userFetchedCallback(error, userModel) {
                    
                    if (!error) {
                        
                        $loginButton.find('span').text('Let\'s rock!');
                        
                        $loginLegend.text('Welcome ' + userModel.get('nickname'));
                        
                        EventsManager.trigger(EventsManager.constants.OAUTH_ISLOGGED, { isLogged: userModel.get('isLogged') });
                        
                        // listen for click on "let's rock" button
                        $loginButton.on('click', function() {
                            
                            var routerLibrary = RouterLibrary();
                            
                            routerLibrary.navigate('desktop/homepage/welcome', { trigger: true });
                            
                        });
                        
                    } 
                    
                });
                
            });
            
        },
        
        onRender: function() {

            // start the login view background video
            videoPlayer.initialize(this.$el, { format: this.options.videoFormat });
            
            // initialize skrollr
            var skrollrInstance = skrollr.init({
                smoothScrollingDuration: 1000,
                smoothScrolling: true,
                easing: 'swing'
            });
            
        },
        
        template: JST['templates/pages/login'],
        
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
            
            // listen for the oauth response
            libraryOauth.listenForConnected();
                        
        }
        
    });
    
    return LoginView;
    
});