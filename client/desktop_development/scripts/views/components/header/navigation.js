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
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager'
    
], function ($, _, JST, utilities, View, EventsManager) {
    
    'use strict';

    var HeaderNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[HEADER NAVIGATION COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/components/header/navigation'],
        
        // view events
        events: {
            'click #leftNavigationButton': 'toggleMenuEvent'
        },
        
        onRender: function() {
            
        },
        toggleMenuEvent: function toggleMenuEventFunction(event) {
            
            event.preventDefault();
            
            EventsManager.trigger(EventsManager.constants.MENU_TOGGLE, this);
            
        }
        
    });
    
    return HeaderNavigationView;
    
});