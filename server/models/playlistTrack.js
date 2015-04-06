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
 * playlist track model constructor
 * 
 * @param {type} options
 * @returns {playlistTrackModel}
 */
var playlistTrackModel = function chartTweetModelFunction(options) {

    var collection;

    collection = 'playlist_tracks';

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
 * playlist track schema
 * 
 * @param {type} options
 * @returns {playlistTrackSchema}
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
    var playlistTrackSchema = new Schema({
        value: {
            id: { type: Number, trim: true, required: true },
            playlistId: { type: Number, trim: true, required: true },
            position: { type: Number, default: 0 }
        }
    },
    schemaOptions);

    // should mongoose checks if indexes exist on every startup?
    playlistTrackSchema.set('autoIndex', false);

    return playlistTrackSchema;

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
playlistTrackModel.prototype.findMultiple = function (options, callback) {

    utilities.log('[PLAYLIST TRACK MODEL] get the playlist tracks for a given playlistId');

    var limit;

    if (options !== undefined && _.has(options, 'limit')) {

        limit = options.limit;

    } else {

        limit = 0; // means unlimited

    }

    this.Model.find()
        .sort({
            'position': -1
        })
        .limit(limit)
        .exec(callback);

};

module.exports = playlistTrackModel;