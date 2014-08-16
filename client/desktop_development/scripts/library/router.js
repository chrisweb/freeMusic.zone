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
    'library.user'
], function (utilities, ribsRouter, ribsEventsManager, routes, user) {
    
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
    
    var getRrouter = function instantiateFuntion() {

        if (router === undefined) {
            
            var Router = initialize();
            
            router = new Router();
            
        }
        
        return router;
        
    };

    return {
        start: getRrouter
    };
    
});