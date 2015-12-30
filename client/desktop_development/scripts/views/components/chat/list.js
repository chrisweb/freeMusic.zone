/**
 * 
 * chat messages list component view
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
    
    var ChatMessagesListComponentView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[CHAT MESSAGES LIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },

        template: JST['templates/components/chat/list'],
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
        }
        
    });

    return ChatMessagesListComponentView;
    
});