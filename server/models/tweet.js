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
 * tweet model
 * 
 * @param {type} options
 * @returns {tweetsModel}
 */
var tweetModel = function tweetModelFunction(options) {

    var collection = 'tweet';
    
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
    var tweetSchema = new Schema({
        jamendo_unit_id: {type: Number, trim: true, required: true},
		jamendo_unit: {type: String, trim: true, required: true},
        twitter_user_id: {type: String, trim: true, required: true},
        twitter_user_name: {type: String, trim: true},
        twitter_user_image: {type: String, trim: true},
        twitter_tweet_date: Date,
        twitter_tweet_id: {type: String, trim: true, required: true, index: {unique: true}},
        twitter_tweet_original_text: {type: String, trim: true}
    },
    schemaOptions);

	tweetSchema.index({ jamendo_unit: 1, jamendo_unit_id: 1});

    // should mongoose checks if indexes exist on every startup?
    tweetSchema.set('autoIndex', true);

    return schema;

};

/**
 * 
 * save a single object
 * 
 * @param {type} data
 * @param {type} callback
 * @returns {undefined}
 */
tweetModel.prototype.saveOne = function(data, callback) {

    utilities.log('save a single object');

    var tweet = new this.Model(data);

    tweet.save(callback);

};

/**
 * 
 * save multiple objects
 * 
 * @returns {undefined}
 */
tweetModel.prototype.saveAll = function() {

    console.log('save multiple objects');

};

/**
 * 
 * delete a single object
 * 
 * @returns {undefined}
 */
tweetModel.prototype.deleteOne = function() {

    console.log('delete a single object');

};

/**
 * 
 * delete multiple objects
 * 
 * @returns {undefined}
 */
tweetModel.prototype.deleteAll = function() {

    console.log('delete multiple objects');

};

/**
 * 
 * find a single object
 * 
 * @returns {undefined}
 */
tweetModel.prototype.findOne = function() {

    console.log('find a single object');

};

/**
 * 
 * find multiple objects
 * 
 * @returns {undefined}
 */
tweetModel.prototype.findAll = function() {

    console.log('find multiple objects');

};


/**
 * 
 * tweets map function
 * 
 * @returns {unresolved}
 */
var tweetsMap = function() {

	var reduceVal = {
		id: this.jamendo_unit_id, 
		unit: this.jamendo_unit, 
		count_total: 1, 
		count_unique: 1, 
		twitter_users: [this.twitter_user_id]
	};

	return emit(this.jamendo_unit + '-' + this.jamendo_unit_id, reduceVal);

};

/**
 * 
 * tweets reduce function
 * 
 * @param {type} jamendo_full_id
 * @param {type} reduceVal
 * @returns {tweetsReduce._reduceVal}
 */
var tweetsReduce = function(jamendo_full_id, reduceVal) {

	jamendo_full_id = jamendo_full_id.split('-');
	var jamendo_unit = jamendo_full_id[0];
	var jamendo_unit_id = jamendo_full_id[1];
	var _reduceVal = {
		id: jamendo_unit_id, 
		unit: jamendo_unit, 
		count_total: 0, 
		count_unique: 0, 
		twitter_users: []
	};

	for (var i=0; i < reduceVal.length; i++) {
        
		if (_reduceVal.twitter_users.indexOf(reduceVal[i].twitter_users[0]) === -1) {
            
			_reduceVal.twitter_users.push(reduceVal[i].twitter_users[0]);
			_reduceVal.count_unique++;
            
		}
        
		_reduceVal.count_total ++;
        
	}

	return _reduceVal;

};

/**
 * 
 * tweets map_reduce
 * 
 * @param {type} options
 * @param {type} callback
 * @returns {undefined}
 */
tweetModel.prototype.mapReduceList = function(options, callback) {

    console.log('tweetModel -> mapReduce');

    var mapReduceContainer = {};
    
    var dateOject = new Date();
    
    var oneDayAgo = dateOject.getDate()-1;
    var oneWeekAgo = dateOject.getDate()-7;
    
    mapReduceContainer.map = tweetsMap;
    mapReduceContainer.reduce = tweetsReduce;
    mapReduceContainer.query = { twitter_tweet_date : { $gt : oneDayAgo }};

    this.Model.mapReduce(mapReduceContainer, callback);

};

module.exports = tweetModel;