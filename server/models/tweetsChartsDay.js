'use strict';

// mongoose module
// https://github.com/LearnBoost/mongoose
var mongoose = require('mongoose');

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// underscore module
var _ = require('underscore');

/**
 * 
 * tweets_charts_day model
 * 
 * @param {type} options
 * @returns {tweetsModel}
 */
var tweetsChartsDayModel = function tweetsChartsDayModelFunction(options) {

    var collection = 'tweets_charts_day';
    
    if (_.indexOf(mongoose.modelNames(), collection) === -1) {

        var schema = createSchema(options);

        this.Model = mongoose.model(collection, schema);

    } else {

        this.Model = mongoose.model(collection);

    }
    
};
    
var createSchema = function createSchemaFunction(options) {
    
    var Schema = mongoose.Schema;
    var mixedType = Schema.Types.Mixed;

    // return errors and 10 seconds timeout
    var schemaOptions = {
        safe: true,
        wtimeout: 10000
    };

    var defaultOptions = _.extend(schemaOptions, options || {});
    
    // possible values:
    // String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
    var tweetsChartsDaySchema = new Schema({
        value: {
            id : {type: Number, trim: true, required: true},
            unit : {type: String, trim: true, required: true},
            count_total : {type: Number, trim: true, required: true},
            count_unique : {type: Number, trim: true, required: true},
            twitter_users : {type: Array, required: true}
        }
    },
    schemaOptions);

    // should mongoose checks if indexes exist on every startup?
    tweetsChartsDaySchema.set('autoIndex', false);

    return tweetsChartsDaySchema;

};

/**
 * 
 * find multiple objects
 * 
 * @param {type} options
 * @param {type} callback
 * 
 * @returns results
 */
tweetsChartsDayModel.prototype.findMultiple = function(options, callback) {
    
    utilities.log('[TWEETS CHARTS DAY MODEL] get the tweets of the charts of the last 24 hours (day)');
    
    var limit;
    
    if (options !== undefined && _.has(options, 'limit')) {
        
        limit = options.limit;
        
    } else {
        
        limit = 0; // means unlimited
        
    }
    
    this.Model.find()
        .sort({ 'value.count_unique': -1 })
        .limit(limit)
        .exec(callback);

};

module.exports = tweetsChartsDayModel;