/**
 * 
 * tweets charts collection
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} collection
 * @param {type} TweetModel
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.collection',
    'models.Tweet',
    'library.eventsManager'
    
], function (utilities, _, collection, TweetModel, EventsManager) {
    
    'use strict';
    
    var TweetsChartsCollection = collection.extend({

        url: '/api/tweet/charts/day',
        onInitialize: function() {
            
            utilities.log('[TWEETS CHARTS COLLECTION] initializing ...', 'fontColor:blue');
            
            this.listenTo(this, 'add', this.addToTracksCache);

        },
        model: TweetModel,
        addToTracksCache: function addToTracksCacheFunction(model) {
            
            EventsManager.trigger(EventsManager.constants.TRACKSCACHE_TRACK_ADD, { model: model });
            
        }

    });
    
    return TweetsChartsCollection;
    
});