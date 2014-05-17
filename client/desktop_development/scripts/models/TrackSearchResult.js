define([
    'utilities',
    'underscore',
    'model'
], function (utilities, _, model) {
    
    'use strict';

    var TrackSearchResultModel = model.extend({
            
        initialize: function() {

        },
        defaults: {

        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return TrackSearchResultModel;
    
});