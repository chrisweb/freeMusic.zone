/**
 * 
 * chat messages collection
 * 
 * @param {type} utilities
 * @param {type} Collection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.collection',
    'models.ChatMessage'
    
], function (utilities, Collection, ChatMessageModel) {
    
    'use strict';
    
    var ChatMessagesCollection = Collection.extend({

        onInitialize: function() {
            
            utilities.log('[CHAT MESSAGES COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: ChatMessageModel,
        //url: '/api/chatMessages'

    });
    
    return ChatMessagesCollection;
    
});