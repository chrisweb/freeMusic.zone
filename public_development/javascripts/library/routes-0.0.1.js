/**
 * 
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define('routes', ['configuration', 'utilities', 'backbone'], function(configuration, utilities, Backbone) {

    'use strict';

    var router = Backbone.Router.extend({
        
        initialize: function() {
            
            utilities.log('[ROUTER] initialization...', 'blue');
            
            this.eventAggregator = _.extend({}, Backbone.Events);
            
        },
        
        routes: {
            '': 'renderHomepage',
            'playlist': 'renderPaylist',
            '*other': 'render404'
        }

    });
    
    var dispatch = function() {
        
        var that = this;

        var applicationRoutes = new router();
        
        // check if user is logged in
        // TODO: create a session model for the user
        // TODO: check login status on every view not just during routes dispatch
        var isLogged = false;
        
        if (!isLogged) {
            
            // if user isnt logged in redirect him to homepage
            applicationRoutes.navigate('/', true);
            
        }
        
        // route events that retrieve data from models and then call the view render
        applicationRoutes.on('route:renderHomepage', function() {
            
            utilities.log('[APPLICATION] user is not logged, load connect/index view', 'blue');
            
            require(['application/views/connect/index-0.0.1'], function(connectViewModule) {
                
                var options = { eventAggregator: that.eventAggregator};
                
                var connectView = new connectViewModule(options);
                
                connectView.render();
                
            });

        });
        
        applicationRoutes.on('route:renderPaylist', function() {
            
            utilities.log('[APPLICATION] user is logged, load playlist/index view', 'blue');
            
            require(['application/views/playlist/index-0.0.1'], function(playlistViewModule) {
                
                var options = { eventAggregator: that.eventAggregator};
                
                var playlistView = new playlistViewModule(options);
                
                playlistView.render();
                
            });

        });

        applicationRoutes.on('route:render404', function() {

            // default route if none of the previous ones matched
            utilities.log('[APPLICATION] page not found', 'blue');
            
            require(['application/views/404/index-0.0.1'], function(notfoundViewModule) {
                
                var options = { eventAggregator: that.eventAggregator};
                
                var notfoundView = new notfoundViewModule(options);
                
                notfoundView.render();
                
            });

        });

        Backbone.history.start({
            pushState: true,
            root: '/'
        });
        
    }
    
    return {
        dispatch: dispatch
    };

});