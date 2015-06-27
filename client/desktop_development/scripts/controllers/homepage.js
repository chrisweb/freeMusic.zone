/**
 * 
 * homepage controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} Ribs
 * @param {type} modernizrTestsLoader
 * @param {type} Modernizr
 * @param {type} oauthLibrary
 * 
 * @returns {unresolved}
 * 
 */
define([
    'chrisweb-utilities',
    'library.controller',
    'ribsjs',
    'modernizrTestsLoader',
    'Modernizr',
    'library.oauth'
    
], function (utilities, Controller, Ribs, modernizrTestsLoader, Modernizr, oauthLibrary) {
    
    'use strict';
    
    var HomepageController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[HOMEPAGE CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        // indexAction that gets triggered by the renderHomepage route
        indexAction: function indexActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: index', 'fontColor:blue');

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
                        require(['views/pages/login'], function(LoginView) {

                            var loginView = new LoginView({
                                oauthUrl: oauthUrl,
                                videoFormat: videoFormat
                            });

                            Ribs.Container.clear('#core');

                            Ribs.Container.add('#core', loginView);

                            Ribs.Container.dispatch('#core');

                        });

                    });

                });

            });

        },
        
        welcomeAction: function welcomeActionFunction() {
        
            utilities.log('[CONTROLLER HOMEPAGE] action: welcome', 'fontColor:blue');
            
            var that = this;
            
            // get the login view
            require(['views/pages/welcome'], function(WelcomeView) {

                var welcomeView = new WelcomeView();

                Ribs.Container.clear('#core');

                Ribs.Container.add('#core', welcomeView);

                Ribs.Container.dispatch('#core');

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