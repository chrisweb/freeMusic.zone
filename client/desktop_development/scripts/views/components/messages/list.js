/**
 * 
 * messages list component view
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
    
    var MessagesListView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[MESSAGES LIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },

        template: JST['templates/components/messages/list'],
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
        }
        
    });

    return MessagesListView;
    
});