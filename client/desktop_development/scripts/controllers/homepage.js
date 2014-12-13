/**
 * 
 * homepage controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} EventsManager
 * @param {type} UserLibrary
 * @param {type} modernizrTestsLoader
 * @param {type} Modernizr
 * 
 * @returns {unresolved}
 * 
 */
define([
    'jquery',
    'underscore',
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'library.eventsManager',
    'library.user',
    'modernizrTestsLoader',
    'Modernizr'
    
], function ($, _, utilities, Controller, container, EventsManager, UserLibrary, modernizrTestsLoader, Modernizr) {
    
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
            
            
            
            modernizrTestsLoader([
                'test/video',
                'test/videoautoplay'
            ], function() {
                
                Modernizr.runTests(['video', 'videoautoplay'], function(error, testsResults) {
                    
                    console.log(error);
                    
                    console.log(testsResults);
                    
                    var useAnimatedGif = false;
                    var videoExtension;
                    
                    if (testsResults.video.webm === 'probably') {
                        
                        if (testsResults.videoautoplay === true) {
                            
                            videoExtension = 'webm';
                            
                        } else {
                            
                            useAnimatedGif = false;
                            
                        }
                        
                    } else if (testsResults.video.h264 === 'probably') {
                        
                        if (testsResults.videoautoplay === true) {
                            
                            videoExtension = 'mp4';
                            
                        } else {
                            
                            useAnimatedGif = false;
                            
                        }
                        
                    } else {
                        
                        useAnimatedGif = false;
                        
                    }
                    
                    if (useAnimatedGif) {
                        
                        // video or autoplay are not supported, use the
                        // animated gif
                        
                        
                    } else {
                        
                        
                        
                    }
                    
                });
                
            });
            
            /*var isLogged = user.getAttribute('isLogged');
            
            if (!isLogged) {
            
                var that = this;

                this.getOauthUrl(function getOauthUrlCallback(error, dataJson) {

                    if (!error) {

                        var oauthUrl = dataJson.url;

                        // get the login view
                        require(['views/components/login'], function(LoginView) {

                            var loginView = new LoginView({ oauthUrl: oauthUrl });

                            container.add('#core', loginView);

                            that.dispatch();

                        });

                    } else {

                        utilities.log('[CONTROLLER HOMEPAGE] getOauthUrl error', error, 'fontColor:red');

                    }

                });
                
            } else {
                
                // TODO: if user is already logged
                
            }*/

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
            
        },
        
        getOauthUrl: function getOauthUrlFunction(callback) {
            
            var jqXHR = $.ajax({
                url: this.configuration.server.path + '/oauth/url',
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