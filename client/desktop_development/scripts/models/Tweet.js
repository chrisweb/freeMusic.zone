/**
 * 
 * tweet model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.model'
    
], function (utilities, _, model) {
    
    'use strict';
    
    var TweetModel = model.extend({
        
        onInitialize: function() {
            
            utilities.log('[TWEET MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            id: null,
            unit: '', // track, playlist, album
            count_total: 0,
            count_unique: 0,
            twitter_users: []
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return TweetModel;
    
});