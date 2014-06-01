define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'eventsManager',
    'caretToggle'
], function ($, _, JST, utilities, View, eventsManager) {
    
    'use strict';

    var LeftNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[LEFT NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            eventsManager.on('menu:toggle', this.toggleMenu, this);
            
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