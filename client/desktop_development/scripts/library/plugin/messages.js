/**
 * 
 * messages plugin
 * 
 * @param {type} utilities
 * @param {type} Ribs
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb-utilities',
    'ribsjs'
    
], function (
    utilities,
    Ribs
) {
    
    'use strict';
    
    var messagesCollection = new Ribs.Collection([]);
    
    /**
     * 
     * initialize the messages plugin
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        utilities.log('[MESSAGES PLUGIN] initializing ...', 'fontColor:blue');

        require([
            'views/components/messages/list',
            'views/components/messages/message'
        ], function(MessagesListView, MessageView) {
            
            // initialize the messages list view
            var messagesListView = new MessagesListView({
                collection: messagesCollection,
                ModelView: MessageView,
                ModelViewOptions: {
                    reRenderOnChange: true
                },
                listSelector: '.js-list'
            });
            
            Ribs.Container.clear('#appMessages');
            
            Ribs.Container.add('#appMessages', messagesListView);
            
            Ribs.Container.dispatch('#appMessages');

        });
        
    };
    
    var add = function addMessageFunction(message, closableByUser, type, timer) {
        
        if (message === undefined) {
            message = '';
        }
        
        if (closableByUser === undefined) {
            closableByUser = false;
        }

        if (type === undefined) {
            type = 'info';
        }

        if (timer === undefined) {
            timer = 0;
        }

        var messageModel = new Ribs.Model({
            message: message,
            closableByUser: closableByUser,
            type: type,
            timer: timer
        })

        messagesCollection.add(messageModel);

        return messageModel;

    };
    
    var remove = function removeMessageFunction(messageModel) {

        messagesCollection.remove(messageModel);

    };
    
    var clear = function clearMessagesFunction() {

        messagesCollection.reset();

    };

    return {
        initialize: initialize,
        add: add,
        remove: remove,
        clear: clear
    };
    
});