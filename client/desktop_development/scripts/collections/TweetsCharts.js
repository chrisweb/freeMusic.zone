/**
 * 
 * tweets charts collection
 * 
 * @param {type} utilities
 * @param {type} collection
 * @param {type} TweetModel
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'ribs.collection',
    'models.Tweet',
    'library.eventsManager'
    
], function (utilities, collection, TweetModel, EventsManager) {
    
    'use strict';
    
    var TweetsChartsCollection = collection.extend({

        url: '/api/tweet/charts/day',
        onInitialize: function() {
            
            utilities.log('[TWEETS CHARTS COLLECTION] initializing ...', 'fontColor:blue');
            
            // listen for tracks that get added
            this.listenTo(this, 'add', this.addToTracksCache);

        },
        model: TweetModel,
        addToTracksCache: function addToTracksCacheFunction(model) {
            
            // when a track gets added to the collection we have to inform
            // the "tracks cache manager" that a new track is available
            // the view of the track (row) will increment or decrement the
            // the usage counter in the "tracks cache manager"
            EventsManager.trigger(EventsManager.constants.TRACKS_MANAGER_ADD, { model: model });
            
        }

    });
    
    return TweetsChartsCollection;
    
});