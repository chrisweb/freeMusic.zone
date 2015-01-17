/**
 * 
 * left navigation component view
 * 
 * @param {type} $
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager',
    
    'library.jquery.plugin.caretToggle'
], function ($, JST, utilities, View, EventsManager) {
    
    'use strict';
    
    var LeftNavigationView = View.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[LEFT NAVIGATION COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            EventsManager.on(EventsManager.constants.MENU_TOGGLE, this.toggleMenu, this);
            
        },

        template: JST['templates/components/left/navigation'],
        
        // view events
        events: {
            
        },
        
        onRender: function() {
            
        },
        
        toggleMenu: function toggleMenuFunction(headerNavigationView) {
            
            // toggle "open" class of the navigation pusher
            var $body = $('body');
            
            var $navigationPusher = $body.find('#pageContainer');
            
            $navigationPusher.toggleClass('open');
            
        }
        
    });
    
    return LeftNavigationView;
    
});