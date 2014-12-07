/**
 * 
 * header navigation view
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
            
            utilities.log('[HEADER NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/header_navigation'],
        
        // view events
        events: {
            'click #left_navigation_button': 'toggleMenuEvent'
        },
        
        onRender: function() {
            
        },
        toggleMenuEvent: function toggleMenuEventFunction(event) {
            
            //utilities.log(event);
            
            event.preventDefault();
            
            eventsManager.trigger('menu:toggle', this);
            
        }
        
    });
    
    return HeaderNavigationView;
    
});