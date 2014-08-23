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
 * @param {type} user
 * @returns {_L18.Anonym$8}
 */
define([
    'chrisweb.utilities',
    'ribs.router',
    'ribs.eventsManager',
    'routes',
    'library.user',
    'configuration'
], function (utilities, ribsRouter, ribsEventsManager, routes, user, configuration) {
    
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

                if (!user.isLogged() && (args.length !== 1 && args[0] !== null)) {

                    this.navigate('desktop', { trigger: true });

                    return false;

                }

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
    
    var getRrouterInstance = function instantiateFuntion() {

        if (router === undefined) {
            
            var Router = initialize();
            
            router = new Router();
            
        }
        
        startListening(router);
        
        return router;
        
    };

    return {
        getRrouter: getRrouterInstance
    };
    
});