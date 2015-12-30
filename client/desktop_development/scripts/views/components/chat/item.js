/**
 * 
 * chat item component view
 * 
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} EventsLibrary
 * 
 * @returns {unresolved}
 */
define([
    'library.view',
    'templates',
    'chrisweb-utilities',
    'library.events'

], function (
    view,
    JST,
    utilities,
    EventsLibrary
) {
    
    'use strict';
    
    var ChatItemView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[CHAT ITEM COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/components/chat/item'],
        
        // view events
        events: {
            
        }
        
    });

    return ChatItemView;
    
});