/**
 * 
 * left navigation view
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
    'library.eventsManager',
    
    'library.jquery.plugin.caretToggle'
], function ($, _, JST, utilities, View, EventsManager) {
    
    'use strict';

    var LeftNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[LEFT NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            EventsManager.on(EventsManager.constants.MENU_TOGGLE, this.toggleMenu, this);
            
        },

        template: JST['templates/partials/left_navigation'],
        
        // view events
        events: {
            
        },
        
        onRender: function() {
            
        },
        
        toggleMenu: function toggleMenuFunction(headerNavigationView) {
            
            var $leftNavigationButton = headerNavigationView.$el.find('#leftNavigationButton');
            
            // toggle arrow of button
            var $leftNavigationButtonCaret = $leftNavigationButton.find('.caret');
            
            $leftNavigationButtonCaret.caretToggle();
            
            // toggle "open" class of the navigation pusher
            var $body = $('body');
            
            var $navigationPusher = $body.find('#navigationPusher');
            
            $navigationPusher.toggleClass('open');
            
        }
        
    });
    
    return LeftNavigationView;
    
});