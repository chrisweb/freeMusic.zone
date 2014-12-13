/**
 * 
 * homepage controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} UserLibrary
 * @param {type} modernizrTestsLoader
 * @param {type} Modernizr
 * @param {type} oauthLibrary
 * 
 * @returns {unresolved}
 * 
 */
define([
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'library.user',
    'modernizrTestsLoader',
    'Modernizr',
    'library.oauth'
    
], function (utilities, Controller, container, UserLibrary, modernizrTestsLoader, Modernizr, oauthLibrary) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');
            
            // check if the user is logged in
            UserLibrary.isLogged(function isLoggedCallback(error, isLogged) {

                // if the user is already logged in, send him to the welcome
                // page
                if (isLogged) {
                    
                    router.navigate('desktop/homepage/welcome', { trigger: true });
                    
                }

            });
            
            // check if video is supported by this browser
            modernizrTestsLoader([
                'test/video',
                'test/videoautoplay'
            ], function() {
                
                Modernizr.runTests(['video', 'videoautoplay'], function(error, testsResults) {

                    var videoFormat = chooseVideoFormat(testsResults);
                    
                    oauthLibrary.fetchOauthUrl(function(error, response) {
                        
                        var oauthUrl = response.url;
                        
                        // initialize the view
                        require(['views/components/login'], function(LoginView) {

                            var loginView = new LoginView({
                                oauthUrl: oauthUrl,
                                videoFormat: videoFormat
                            });

                            container.add('#core', loginView);

                            container.dispatch('#core');

                        });
                        
                    });
                    
                });
                
            });

        },
        
        welcomeAction: function welcomeActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: welcome', 'fontColor:blue');
            
            var that = this;
            
            // get the login view
            require(['views/components/welcome'], function(WelcomeView) {

                var welcomeView = new WelcomeView();

                container.add('#core', welcomeView);

                that.dispatch();

            });
            
        }
        
    });
    
    /**
     * 
     * choose the video format based on the tests results
     * 
     * @param {type} testsResults
     * @returns {String}
     */
    var chooseVideoFormat = function chooseVideoFormatFunction(testsResults) {

        var videoFormat;

        // is the webm format supported
        if (testsResults.video.webm === 'probably') {

            // is autoplay supported
            if (testsResults.videoautoplay === true) {

                // both webm and autoplay are supported so we will
                // use webm videos as background
                videoFormat = 'webm';

            } else {

                // webm is supported but not autoplay, so we use
                // an animated gif instead (probably a mobile
                // device)
                videoFormat = 'gif';

            }

        // is the h264 format supported
        } else if (testsResults.video.h264 === 'probably') {

            // is autoplay supported
            if (testsResults.videoautoplay === true) {

                // both h264 and autoplay are supported so we will
                // use h264 videos as background
                videoFormat = 'mp4';

            } else {

                // h264 is supported but not autoplay, so we use
                // an animated gif instead (probably a mobile
                // device)
                videoFormat = 'gif';

            }

        } else {

            // neither webm nor h264 are supported, we use the
            // animated gif as fallback
            videoFormat = 'gif';

        }
        
        return videoFormat;
        
    };

    return HomepageController;
    
});