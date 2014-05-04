define([
    'underscore',
    'collection',
    'TrackSearchResultModel'
], function (_, collection, TrackSearchResultModel) {
    
    'use strict';

    var TrackSearchResultCollection = collection.extend({
            
        initialize: function() {

        },
        model: TrackSearchResultModel

    });
    
    return TrackSearchResultCollection;
    
});