/**
 * 
 * tweets charts collection
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} collection
 * @param {type} TweetModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.collection',
    'models.Tweet'
    
], function (utilities, _, collection, TweetModel) {
    
    'use strict';
    
    var TweetsChartsCollection = collection.extend({

        url: '/api/tweet/charts/day',
        onInitialize: function() {
            
            utilities.log('[TWEETS CHARTS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: TweetModel

    });
    
    return TweetsChartsCollection;
    
});