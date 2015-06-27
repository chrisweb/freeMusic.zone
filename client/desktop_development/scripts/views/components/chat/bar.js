/**
 * 
 * chat bar component view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * 
 * @returns {unresolved}
 */
define([
    'templates',
    'chrisweb-utilities',
    'library.view'
    
], function (JST, utilities, View) {
    
    'use strict';

    var ChatBarView = View.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[CHAT BAR COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },

        template: JST['templates/components/chat/bar'],
        
        // view events
        events: {
            
        }
        
    });
    
    return ChatBarView;
    
});