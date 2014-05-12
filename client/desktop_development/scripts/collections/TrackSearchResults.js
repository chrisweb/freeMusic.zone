define([
    'underscore',
    'collection',
    'models/TrackSearchResult'
], function (_, collection, TrackSearchResultModel) {
    
    'use strict';
    
    var TrackSearchResultsCollection = collection.extend({

        initialize: function() {
            
            

        },
        model: TrackSearchResultModel

    });
    
    return TrackSearchResultsCollection;
    
});