/**
 * 
 * left navigation component view
 * 
 * @param {type} $
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsManager
 * @param {type} RouterLibrary
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager',
    'library.router',
    
    'library.jquery.plugin.caretToggle'
], function ($, JST, utilities, View, EventsManager, RouterLibrary) {
    
    'use strict';
    
    var LeftNavigationView = View.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[LEFT NAVIGATION COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            EventsManager.on(EventsManager.constants.MENU_TOGGLE, this.toggleMenu, this);
            
        },

        template: JST['templates/components/left/navigation'],
        
        // view events
        events: {
            'click a': 'menuClick'
        },
        
        onRender: function() {
            
            // set the navigation bar element to active for the currently
            // opened page
            var routerLibrary = new RouterLibrary();
            
            switch(routerLibrary.getCurrentRoute()) {
                case 'desktop/collaborative-playlists':
                    this.$el.find('.playlist').addClass('active');
                    break;
                case 'desktop/twitter-charts':
                    this.$el.find('.tweet').addClass('active');
                    break;
                case 'desktop/quiz-games':
                    this.$el.find('.games').addClass('active');
                    break;
                case 'desktop/desktop/remote-control':
                    this.$el.find('.remote').addClass('active');
                    break;
            }
            
        },
        
        toggleMenu: function toggleMenuFunction(headerNavigationView) {
            
            // toggle "open" class of the navigation pusher
            var $body = $('body');
            
            var $navigationPusher = $body.find('#pageContainer');
            
            $navigationPusher.toggleClass('open');
            
        },
        
        menuClick: function menuClickFunction(event) {
            
            event.preventDefault();
            
            this.$el.find('a').each(function() {
                
                if ($(this).hasClass('active')) {
                    
                    $(this).removeClass('active');
                    
                }
                
            });
            
            $(event.currentTarget).addClass('active');
            
        }
        
    });
    
    return LeftNavigationView;
    
});