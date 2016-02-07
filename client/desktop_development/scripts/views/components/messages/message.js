/**
 * 
 * message component view
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
    
    var MessageComponentView = view.extend({
        
        onInitializeStart: function onInitializeStartFunction() {
            
            utilities.log('[MESSAGE COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');

            if (typeof this.model.get('timer') === Number && this.model.get('timer') !== 0) {
                
                setTimeout(function () {

                    this.close();

                }, this.model.get('timer'));

            }
            
        },
        
        template: JST['templates/components/messages/message'],
        
        // view events
        events: {
            'button .js-closeMessage': 'onClickCloseMessage'
        },
        
        onClickCloseMessage: function onClickCloseMessage() {

            this.close();

        },

        onCloseStart: function onCloseStartFunction() {
            
            
            
        }
        
    });

    return MessageComponentView;
    
});