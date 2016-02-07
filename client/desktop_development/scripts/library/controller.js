/**
 * 
 * controller library
 *
 * @param {type} utilities 
 * @param {type} Ribs
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb-utilities',
    'ribsjs',
    'library.plugin.messages'

], function (
    utilities,
    Ribs,
    messagesPlugin
) {
    
    'use strict';
    
    var LibraryController = Ribs.Controller.extend({
        
        onInitialize: function onInitializeFunction(options, configuration, router) {
            
            utilities.log('[LIBRARY CONTROLLER] initializing ...', 'fontColor:blue');

            // initialize the messages plugin
            messagesPlugin.initialize();
            
        },

        addMessage: function addMessageFunction(message, closeByUser, type, timer) {
    
            return messagesPlugin.add(message, closeByUser, type, timer);

        },

        removeMessage: function removeMessageFunction(messageModel) {
            
            messagesPlugin.remove(messageModel);

        },

        clearMessages: function clearMessagesFunction() {
            
            messagesPlugin.clear();

        },
        
    });
    
    return LibraryController;
    
});