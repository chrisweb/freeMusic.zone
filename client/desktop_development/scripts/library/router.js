/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * application router
 * 
 * @param {type} utilities
 * @param {type} ribsRouter
 * @param {type} ribsEventsManager
 * @param {type} routes
 * @param {type} UserLibrary
 * @param {type} configuration
 * 
 * @returns {_L18.Anonym$8}
 */
define([
    'chrisweb.utilities',
    'ribs.router',
    'ribs.eventsManager',
    'routes',
    'library.user',
    'configuration'
    
], function (utilities, ribsRouter, ribsEventsManager, routes, UserLibrary, configuration) {
    
    'use strict';

    var router;
    
    var initialize = function initializeFunction() {
        
        var Router = ribsRouter.extend({

            initialize: function initializeFunction() {

                utilities.log('[LIBRARY ROUTER] initializing ...');

            },
            routes: routes,
            execute: function routerExecute(callback, args, name) {

                // pre-route event
                ribsEventsManager.trigger('router:preRoute', { 'arguments': args, 'name': name });
                
                // for any page the user visits he needs to be loggged in
                // except the homepage
                // so we check if the user isn't already on the homepage
                if (name !== 'renderHomepage') {

                    UserLibrary.isLogged(function isLoggedCallback(error, isLogged) {

                        // if the user is not yet logged in, redirect him to
                        // the homepage
                        if (!isLogged) {

                            this.navigate('desktop', { trigger: true });

                            return;

                        }

                    });
                    
                }

                // execute the routing
                if (callback) {

                    callback.apply(this, args);

                }

                // post route event
                ribsEventsManager.trigger('router:postRoute', { 'arguments': args, 'name': name });
               
            }
            
        });
        
        return Router;
        
    };
    
    var startListening = function startListeningToRouteEventsFuntion(router) {
        
        router.on('route:renderHomepage', function() {
            
            var options = {};
            
            require(['controllers/homepage'], function(HomepageController) {
                
                var homepageController = new HomepageController(options, configuration, router);
                
                homepageController.indexAction();
                
            });

        });
        
        router.on('route:controllerActionDispatcher', function(controllerName, actionName) {
            
            utilities.log('route:controllerActionDispatcher, controller: ' + controllerName + ', action: ' + actionName);
            
            // if the action is not defined use the default value from
            // configuration
            if ($.type(actionName) === 'undefined') {
                
                actionName = configuration.client.defaults.action;
                
            }
            
            // filter symbols of action and controller name
            // remove everything that is not alpha numeric
            controllerName.replace(/[^a-zA-Z0-9]/g, '');
            actionName.replace(/[^a-zA-Z0-9]/g, '');
            
            var options = {};

            // load the controller and call the action
            require(['controllers/' + controllerName], function(Controller) {
                
                var controller = new Controller(options, configuration, router);

                controller[actionName + 'Action']();
                
            });

        });
        
        router.on('route:render404', function() {

            require(['controllers/error'], function(ErrorController) {
                
                ErrorController.notfoundAction();
                
            });

        });
        
        // event triggered before a route
        ribsEventsManager.on('router:preRoute', function bootstrapPreRoute(parameters) {
            
            utilities.log(parameters);
            
        });
        
    };
    
    var getInstance = function getInstanceFuntion() {

        if (router === undefined) {
            
            var Router = initialize();
            
            router = new Router();
            
            startListening(router);
            
        }

        return router;
        
    };

    return {
        getInstance: getInstance
    };
    
});