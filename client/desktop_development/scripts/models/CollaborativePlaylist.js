/**
 * 
 * collaborative playlist model
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

    var CollaborativePlaylistModel = Model.extend({
            
        onInitialize: function() {
            
            utilities.log('[COLLABORATIVE PLAYLIST MODEL] initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            tracksList: null,
            id: null,
        },
        url: '/api/collaborativeplaylist',
        validate: function(attrs) {
            
        }

    });

    return CollaborativePlaylistModel;
    
});