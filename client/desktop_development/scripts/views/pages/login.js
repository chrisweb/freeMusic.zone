/**
 * 
 * login page view
 * 
 * @param {type} $
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * @param {type} EventsLibrary
 * @param {type} UserLibrary
 * @param {type} videoPlayer
 * @param {type} libraryOauth
 * @param {type} RouterLibrary
 * @param {type} skrollr
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'templates',
    'chrisweb-utilities',
    'library.view',
    'library.events',
    'library.user',
    'library.videoPlayer',
    'library.oauth',
    'library.router',
    'skrollr',
    
    'velocity'
], function (
    $,
    JST,
    utilities,
    view,
    EventsLibrary,
    UserLibrary,
    videoPlayer,
    libraryOauth,
    RouterLibrary,
    skrollr
) {
    
    'use strict';
    
    var LoginView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[LOGIN PAGE VIEW] initializing ...', 'fontColor:blue');
            
            var that = this;
            
            var routerLibrary = RouterLibrary();
            
            // as soon as the user has been redirected back to the app, from
            // the jamendo website, a page will get loaded that will trigger
            // the oauth connected event
            EventsLibrary.on(EventsLibrary.constants.OAUTH_CONNECTED, function loginOauthConnected() {
                
                var $loginBox = that.$el.find('.loginBox');

                var $loginButton = $loginBox.find('.loginButton');
                
                var $loginLegend = $loginBox.find('legend');
                
                var $oauthIFrame = that.$el.find('iframe.jamendo');
                
                $oauthIFrame.addClass('hidden');
                
                $loginButton.find('span').text('Loading...');
                
                $loginButton.velocity({ width: 162, height: 49, padding: '10px 16px 16px 10px' }, 'easeInSine');
                
                // hide the create an account and lost password links, we dont
                // need them as the user has successfully logged in
                var $loginBottom = $loginBox.find('.loginBottom');
                
                $loginBottom.addClass('hidden');
                
                var userLibrary = new UserLibrary();
                
                // fetch the user data from server
                userLibrary.fetchUserData(function userFetchedCallback(error, userModel) {
                    
                    if (!error) {
                        
                        $loginButton.find('span').text('Let\'s rock!');
                        
                        $loginLegend.text('Welcome ' + userModel.get('nickname'));
                        
                        EventsLibrary.trigger(EventsLibrary.constants.OAUTH_ISLOGGED, { isLogged: userModel.get('isLogged') });
                        
                        // listen for click on "let's rock" button
                        $loginButton.one('click', function(event) {
                            
                            event.preventDefault();
                            
                            routerLibrary.navigate('desktop/homepage/welcome', { trigger: true });
                            
                        });
                        
                    } 
                    
                });
                
            });
            
            // initialize skrollr 
            EventsLibrary.once(EventsLibrary.constants.SPLASHSCREEN_OFF, function() {
            
                if (routerLibrary.getCurrentRoute() === 'desktop') {
                    
                    initializeSkrollr();
                    
                }
                
            });
            
        },
        
        onRender: function() {

            // start the login view background video
            videoPlayer.initialize(this.$el, { format: this.options.videoFormat });
            
        },
        
        template: JST['templates/pages/login'],
        
        // view events
        events: {
            'click .loginBox .btn:not(.noclick)': 'loginClick',
            'click .fa-angle-down': 'scrollToScene'
        },
        
        loginClick: function loginClickFunction(event) {
            
            event.preventDefault();
            
            $('.hideOnConnect').addClass('hidden');
            
            var $loginBox = this.$el.find('.loginBox');

            var $loginButton = $loginBox.find('.loginButton');
            
            // disable the login button to avoid more clicks and that
            // its gets triggered again after a successfull login
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
                        
        },
        
        scrollToScene: function(event) {
            
            event.preventDefault();
            
            var scrollInPixel = 0;
            
            var sceneId = $(event.currentTarget).attr('data-fmz-scene');
            
            if (sceneId === 'scene2') {
                scrollInPixel = 750;
            } else {
                scrollInPixel = 1750;
            }
            
            $('body').velocity('scroll', { duration: 1000, easing: 'easeInSine', offset: scrollInPixel + 'px', mobileHA: false }) 
                .velocity({ opacity: 1 });
            
        }
        
    });
    
    /**
     * 
     * initialize skrollr
     * 
     * @returns {undefined}
     */
    var initializeSkrollr = function initializeSkrollrFunction() {
        
        // initialize skrollr
        var skrollrInstance = skrollr.init({
            smoothScrollingDuration: 1000,
            smoothScrolling: true,
            easing: 'swing',
            render: function(data) {

                //utilities.log('skrollr on render', data);

            },
            beforerender: function(data) {

                //utilities.log('skrollr on beforerender', data);

            },
            keyframe: function(data) {

                //utilities.log('skrollr on keyframe', data);

            }
        });
        
        // sometimes the initialisation is done a little bit too early so
        // we do a refresh to ensure everything is ready
        setTimeout(function() {
            skrollrInstance.refresh();
        }, 10);
        
        // if the screen gets resized refresh skrollr
        $(window).resize(function() {
            skrollrInstance.refresh();
        });
        
    };
    
    return LoginView;
    
});