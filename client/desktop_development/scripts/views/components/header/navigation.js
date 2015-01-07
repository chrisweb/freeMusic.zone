/**
 * 
 * header navigation component view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsManager
 * @param {type} UserLibrary
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager',
    'library.user'
    
], function ($, _, JST, utilities, View, EventsManager, UserLibrary) {
    
    'use strict';
    
    var HeaderNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[HEADER NAVIGATION COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            var userLibrary = new UserLibrary();
            
            this.options.variables = {
                username: userLibrary.getAttribute('nickname')
            };
            
        },
        
        model: userModel,
        
        template: JST['templates/components/header/navigation'],
        
        // view events
        events: {
            'click #leftNavigationButton': 'toggleMenuEvent'
        },
        
        onRender: function() {
            
        },
        toggleMenuEvent: function toggleMenuEventFunction(event) {
            
            event.preventDefault();
            
            var $menuButton = this.$el.find('#leftNavigationButton');
            
            $menuButton.toggleClass('active');
            
            EventsManager.trigger(EventsManager.constants.MENU_TOGGLE, this);
            
        }
        
    });
    
    return HeaderNavigationView;
    
});