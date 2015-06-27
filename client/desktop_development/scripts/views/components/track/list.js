/**
 * 
 * tracks list component view
 * 
 * @param {type} utilities
 * @param {type} view
 * @param {type} JST
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.view',
    'templates'
    
], function (utilities, view, JST) {
    
    'use strict';
    
    var TracksListView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[TRACKS LIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },

        template: JST['templates/components/track/list'],
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
        }
        
    });

    return TracksListView;
    
});