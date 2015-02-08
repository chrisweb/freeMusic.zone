/**
 * 
 * chart tweets collection
 * 
 * @param {type} utilities
 * @param {type} collection
 * @param {type} ChartTweetModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'ribs.collection',
    'models.ChartTweet'
    
], function (utilities, collection, ChartTweetModel) {
    
    'use strict';
    
    var ChartTweetsCollection = collection.extend({

        url: function() {
            return '/api/charts/tweets/' + this.options.period;
        },
        onInitialize: function() {
            
            utilities.log('[CHART TWEETS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: ChartTweetModel

    });
    
    return ChartTweetsCollection;
    
});