/**
 * 
 * chat message model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} Model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'underscore',
    'library.model'
    
], function (utilities, _, Model) {
    
    'use strict';

    var ChatMessageModel = Model.extend({
            
        onInitialize: function() {
            
            utilities.log('[CHAT MESSAGE MODEL] initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            message: ''
        },
        //url: '',
        validate: function(attrs) {
            
        }

    });

    return ChatMessageModel;
    
});