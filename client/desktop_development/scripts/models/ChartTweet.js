/**
 * 
 * chart tweet model
 * 
 * @param {type} utilities
 * @param {type} model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'ribs.model'
    
], function (utilities, model) {
    
    'use strict';
    
    var ChartTweetModel = model.extend({
        
        onInitialize: function() {
            
            utilities.log('[CHART TWEET MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            id: null,
            count_total: 0,
            count_unique: 0,
            twitter_users: [],
            chart_position: 0,
            trackModel: null
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return ChartTweetModel;
    
});