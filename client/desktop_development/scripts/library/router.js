/**
 * 
 * application router
 * 
 * @param {type} utilities
 * @param {type} ribsRouter
 * @param {type} EventsManager
 * @param {type} routes
 * @param {type} UserLibrary
 * @param {type} Configuration
 * @param {type} Backbone
 * 
 * @returns {_L18.Anonym$8}
 */
define([
    'chrisweb.utilities',
    'ribs.router',
    'library.eventsManager',
    'routes',
    'library.user',
    'configuration',
    'backbone'
    
], function (utilities, ribsRouter, EventsManager, routes, UserLibrary, Configuration, Backbone) {
    
    'use strict';

    var router;
    
    /**
     * 
     * initialize the router
     * 
     * @returns {unresolved}
     */
    var getRouter = function getRouterFunction() {
        
        var Router = ribsRouter.extend({
            
            initialize: function initializeFunction() {
                
                utilities.log('[LIBRARY ROUTER] initializing ...');
                
            },
            routes: routes,
            execute: function routerExecute(callback, routeArguments, routeName, internalCallback) {
                
                // pre-route event
                EventsManager.trigger(EventsManager.constants.ROUTER_PREROUTE, { 'routeArguments': routeArguments, 'routeName': routeName });
                
                var userLibrary = UserLibrary();
                
                var that = this;
                
                // for any page the user visits he needs to be loggged in
                // except the homepage
                // so we check if the user isn't already on the homepage
                if (routeName !== 'renderHomepage') {
                    
                    // check if the user is logged in
                    userLibrary.isLogged(function isLoggedCallback(error, isLogged) {
                        
                        // if the user is not yet logged in, redirect him to
                        // the homepage
                        if (!isLogged) {
                            
                            // stop the dispatcher
                            internalCallback(false);
                            
                            // redirect to the homapage
                            that.navigate('desktop', { trigger: true });
                            
                        } else {
                            
                            if (callback) callback.apply(this, routeArguments);
                            
                            // post route event
                            EventsManager.trigger(EventsManager.constants.ROUTER_POSTROUTE, { 'routeArguments': routeArguments, 'routeName': routeName });
                            
                            internalCallback(true);
                            
                        }
                        
                    });
                    
                } else {
                    
                    // the user wants to access the homepage, but if he is
                    // already logged we redirect him to the welcome page
                    userLibrary.isLogged(function isLoggedCallback(error, isLogged) {
                        
                        // if the user is already logged in, send him to the welcome
                        // page
                        if (isLogged) {
                            
                            // stop the dispatcher
                            internalCallback(false);
                            
                            // redirect to the welcome page
                            that.navigate('desktop/homepage/welcome', { trigger: true });
                            
                        } else {
                            
                            if (callback) callback.apply(this, routeArguments);
                            
                            // post route event
                            EventsManager.trigger(EventsManager.constants.ROUTER_POSTROUTE, { 'routeArguments': routeArguments, 'routeName': routeName });
                            
                            internalCallback(true);
                            
                        }
                        
                    });
                    
                }
                
            }
            
        });
        
        return Router;
        
    };
    
    /**
     * 
     * add the event listeners
     * 
     * @param {type} router
     * @returns {undefined}
     */
    var startListening = function startListeningToRouteEventsFuntion(router) {
        
        var configuration = Configuration.get();
        
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
            if (actionName === null) {
                
                actionName = configuration.client.defaults.action;
                
            }
            
            // filter symbols of action and controller name
            // remove everything that is not alpha numeric
            controllerName.replace(/[^a-zA-Z0-9]/g, '');
            actionName.replace(/[^a-zA-Z0-9]/g, '');
            
            // transform the controller url name into the real file name
            var controllerFileName = controllerName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            
            var options = {};

            // load the controller and call the action
            require(['controllers/' + controllerFileName], function(Controller) {
                
                // check if the controller exists
                if (Controller !== undefined) {
                
                    var controller = new Controller(options, configuration, router);

                    // check if the action exists
                    if (controller[actionName + 'Action'] !== undefined) {

                        controller[actionName + 'Action']();
                        
                    } else {
                        
                        // action not found trigger 404
                        router.trigger('route:render404');
                        
                    }
                    
                } else {
                    
                    // controller not found trigger 404
                    router.trigger('route:render404');
                    
                }
                
            });

        });
        
        router.on('route:render404', function() {

            require(['controllers/error'], function(ErrorController) {
                
                var errorController = new ErrorController();
                
                errorController.notfoundAction();
                
            });

        });
        
        // event triggered before a route
        EventsManager.on(EventsManager.constants.ROUTER_PREROUTE, function bootstrapPreRoute(attributes) {
            
            utilities.log(attributes);
            
        });
        
    };
    
    /**
     * 
     * get an instance (singleton)
     * 
     * @returns {BSONSE.BSON.require|Function.require|bson.require|bson_L1.require|Router}
     */
    var getInstance = function getInstanceFuntion() {

        if (router === undefined) {
            
            var Router = getRouter();
            
            router = new Router();
            
            startListening(router);
            
        }

        return router;
        
    };

    return getInstance;
    
});