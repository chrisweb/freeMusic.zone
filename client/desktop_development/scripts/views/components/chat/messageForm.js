/**
 * 
 * chat message form component view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsLibrary
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb-utilities',
    'library.view',
    'library.events'

], function (
    $,
    _,
    JST,
    utilities,
    View,
    EventsLibrary
) {
    
    'use strict';

    var ChatMessageComponentView = View.extend( {
        
        onInitializeStart: function () {
            
            utilities.log('[CHAT MESSAGE COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/components/chat/messageForm'],
        
        // view events
        events: {
            'submit': 'sendChatMessage'
        },
        
        onRender: function () {
            
            
            
        },
        sendChatMessage: function sendChatMessageFunction(event) {
            
            event.preventDefault();
            
            // get the form values
            var chatMessageFormValues = this.$el.serializeArray();
            
            // clear the chat message input field
            this.$el.find('.js-chat-message').val('');

            EventsLibrary.trigger(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_SEND_MESSAGE, {
                formValues: {
                    message: chatMessageFormValues[0].value
                }
            });
        
        }
        
    });
    
    return ChatMessageComponentView;
    
});