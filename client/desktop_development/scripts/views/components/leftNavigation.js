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
    'library.EventsManager',
    
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
            
            //utilities.log(headerNavigationView.$el);
            
            var $leftNavigationButton = headerNavigationView.$el.find('#left_navigation_button');
            
            // toggle arrow of button
            var $leftNavigationButtonCaret = $leftNavigationButton.find('.caret');
            
            //utilities.log($leftNavigationButtonCaret);
            
            $leftNavigationButtonCaret.caretToggle();
            
            // toggle open class of left navigation element
            this.$el.toggleClass('open');
            
        }
        
    });
    
    return LeftNavigationView;
    
});