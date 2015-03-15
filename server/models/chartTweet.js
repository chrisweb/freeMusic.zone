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
 * chart tweet model constructor
 * 
 * @param {type} options
 * @returns {chartTweetModel}
 */
var chartTweetModel = function chartTweetModelFunction(options) {

    var collection;

    switch (options.period) {
        case 'day':
            collection = 'tweets_charts_day';
            break;
        default:
            throw 'no period defined in options';
    }

    if (_.indexOf(mongoose.modelNames(), collection) === -1) {

        var schema = createSchema(options);

        // mongoose pluralizes the model name by default as well as converts
        // this to lowercase and other rules. To override the name mongoose
        // creates pass as third argument the name you want to use
        this.Model = mongoose.model(collection, schema, collection);

    } else {

        this.Model = mongoose.model(collection);

    }

};


/**
 * 
 * chart tweet schema
 * 
 * @param {type} options
 * @returns {chartTweetSchema}
 */
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
    var chartTweetSchema = new Schema({
        value: {
            id: {type: Number, trim: true, required: true},
            unit: {type: String, trim: true, required: true},
            count_total: {type: Number, trim: true, required: true},
            count_unique: {type: Number, trim: true, required: true},
            twitter_users: {type: Array, required: true},
            position: 0
        }
    },
    schemaOptions);

    // should mongoose checks if indexes exist on every startup?
    chartTweetSchema.set('autoIndex', false);

    return chartTweetSchema;

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
chartTweetModel.prototype.findMultiple = function (options, callback) {

    utilities.log('[CHART TWEET MODEL] get the tweets chart for a given period');

    var limit;

    if (options !== undefined && _.has(options, 'limit')) {

        limit = options.limit;

    } else {

        limit = 0; // means unlimited

    }

    this.Model.find()
        .sort({'value.count_unique': -1})
        .limit(limit)
        .exec(callback);

};

module.exports = chartTweetModel;