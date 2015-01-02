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
 * @param {type} limit
 * @returns results
 */
tweetsChartsDayModel.prototype.findMultiple = function(limit) {

    console.log('find multiple objects');
    
    if (limit !== undefined) {
        
        limit = 0;
        
    };
    
    var results = this.Model.find().sort({ 'value.count_unique': -1 }).limit(limit);
    
    return results;

};

module.exports = tweetsChartsDayModel;