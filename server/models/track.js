'use strict';

// mongoose module
// https://github.com/LearnBoost/mongoose
var mongoose = require('mongoose');

// utilities module
var utilities = require('chrisweb-utilities');

// underscore module
var _ = require('underscore');

/**
 * 
 * track model
 * 
 * @param {type} options
 * @returns {tweetsModel}
 */
var trackModel = function trackModelFunction(options) {

    var collection = 'track';
    
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
    var trackSchema = new Schema({
        jamendo_id: { type: Number, trim: true, required: true },
        jamendo_name: { type: String, trim: true, required: true },
        jamendo_duration: { type: Number, trim: true },
        jamendo_artist_id: { type: Number, trim: true },
        jamendo_artist_name: { type: String, trim: true },
        jamendo_artist_idstr: { type: String, trim: true },
        jamendo_album_name: { type: String, trim: true },
        jamendo_album_id: { type: Number, trim: true },
        jamendo_license_cc_url: { type: String, trim: true },
        jamendo_position: { type: Number, trim: true },
        jamendo_release_date: { type: Date },
        jamendo_image: { type: String, trim: true },
        jamendo_stream_url: { type: String, trim: true },
        jamendo_download_url: { type: String, trim: true },
        jamendo_pro_url: { type: String, trim: true },
        jamendo_short_url: { type: String, trim: true },
        jamendo_share_url: { type: String, trim: true },
        jamendo_music_info: {
            'vocalinstrumental': { type: String, trim: true },
            'lang': { type: String, trim: true },
            'gender': { type: String, trim: true },
            'acousticelectric': { type: String, trim: true },
            'speed': { type: String, trim: true },
            'tags': { type: Array, default: [] }
        },
        jamendo_lyrics: { type: String, trim: true },
        last_fetch_date: { type: Date, default: Date.now }
    },
    schemaOptions);
    
    trackSchema.index({ jamendo_id: 1 });
    
    // should mongoose checks if indexes exist on every startup?
    trackSchema.set('autoIndex', true);
    
    return trackSchema;
    
};

/**
 * 
 * save a single object
 * 
 * @param {type} document
 * @param {type} callback
 * @returns {undefined}
 */
trackModel.prototype.saveOne = function saveOneFunction(document, callback) {

    this.Model.create(document, function saveCallback(error, insertedDocument) {

        if (error) {

            utilities.log('[TRACK MODEL] save one failed', error, 'fontColor:red');

            if (callback !== undefined) {

                callback(error);

            }

        } else {

            if (callback !== undefined) {

                callback(null, insertedDocument);

            }

        }

    });

};

/**
 * 
 * save multiple at once
 * 
 * @param {type} documents
 * @param {type} callback
 * @returns {undefined}
 */
trackModel.prototype.saveMultiple = function saveMultipleFunction(documents, callback) {

    var options = {};

    this.Model.collection.insert(documents, options, function(error, insertedDocuments) {
        
        if (error) {

            utilities.log('[TRACK MODEL] save multiple failed', error, 'fontColor:red');

            if (callback !== undefined) {

                callback(error);

            }

        } else {

            if (callback !== undefined) {

                callback(null, insertedDocuments);

            }

        }
        
    });
    
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
trackModel.prototype.findMultipleByJamendoId = function(options, callback) {
    
    utilities.log('[TRACK MODEL] get multiple tracks by jamendo id');
    
    this.Model.find({
        'jamendo_id': { $in: options.ids }
    }).exec(callback);

};

/**
 * 
 * find one
 * 
 * @param {type} options
 * @param {type} callback
 * 
 * @returns {undefined}
 */
trackModel.prototype.findOneByJamendoId = function(options, callback) {
    
    utilities.log('[TRACK MODEL] get one track by jamendo id');
    
    this.Model.find({
        'jamendo_id': options.ids
    }).exec(callback);

};

module.exports = trackModel;