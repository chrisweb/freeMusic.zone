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
 * @param {type} options
 * @returns {playlistModel}
 * playlist model
 * 
 * @returns {playlistModel}
 */
var playlistModel = function playlistModelFunction(options) {
    
    var collection = 'playlist';
    
    if (_.indexOf(mongoose.modelNames(), collection) === -1) {
    
        var schema = createSchema(options);
        
        this.Model = mongoose.model(collection, schema);
        
    } else {
        
        this.Model = mongoose.model(collection);
        
    }
    
};

/**
 * 
 * create a schema for this model
 * 
 * @returns {module.exportsexports@new;Mongoose.Schema|_L1.exports.require|Function.require|createSchemaFunction.schema|Schema|bson.require.Schema}
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
    var schema = new Schema({
        id: { type: Number, trim: true, index: { unique: true }, required: true },
        jamendo_id: { type: Number, trim: true, required: true },
        jamendo_creation_date: { type: Date },
        jamendo_name: { type: String, trim: true, required: true },
        jamendo_user_id: { type: Number, trim: true },
        jamendo_user_name: { type: String, trim: true },
        jamendo_zip: { type: String, trim: true },
        jamendo_shorturl: { type: String, trim: true },
        jamendo_shareurl: { type: String, trim: true },
        last_fetch_date: { type: Date, default: Date.now }
    },
    defaultOptions);
    
    // avoid that mongoose checks if indexes exist on every startup
    schema.set('autoIndex', false);
    
    return schema;
    
};

/**
 * 
 * save a single document
 * 
 * @param {type} data
 * @param {type} callback
 * 
 * @returns {undefined}
 */
playlistModel.prototype.saveOne = function saveOneFunction(data, callback) {
    
    utilities.log('[PLAYLIST MODEL] save a single object');
    
    this.Model.create(data, function saveCallback(error, model) {
        
        //utilities.log('create model: ', model);
        
        if (error) {
            
            utilities.log('[PLAYLIST MODEL] save failed', error, 'fontColor:red');
            
            if (callback !== undefined) {
            
                callback(error);
                
            }
            
        } else {
            
            if (callback !== undefined) {
            
                callback(false, model);
                
            }
            
        }
        
    });
    
};

/**
 * 
 * update a single document
 * 
 * @param {type} jamendoUserId
 * @param {type} dataToUpdate
 * @param {type} callback
 * @returns {undefined}
 */
playlistModel.prototype.updateOne = function updateOneFunction(jamendoUserId, dataToUpdate, callback) {
    
    utilities.log('[PLAYLIST MODEL] update a single object');
    
    var query = { id: jamendoUserId };
    var options = { multi: false };
    
    this.Model.findOneAndUpdate(query, dataToUpdate, options, function(error, model) {
        
        //utilities.log('update model: ', model);
        
        if (error) {
            
            utilities.log('[PLAYLIST MODEL] update failed', error, 'fontColor:red');
            
            if (callback !== undefined) {
            
                callback(error);
                
            }
            
        } else {
            
            if (callback !== undefined) {
            
                callback(false, model);
                
            }
            
        }
        
    });
    
};

/**
 * 
 * get a single document by mongodb _id
 * 
 * @param {type} id
 * @param {type} callback
 * @returns {undefined}
 */
playlistModel.prototype.getOneById = function getOneFunction(id, callback) {
    
    utilities.log('[PLAYLIST MODEL] get one by id');
    
    this.Model.findById(id, function(error, document) {
		
        if (error) {
            
            utilities.log('[PLAYLIST MODEL] getOneById failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
        
            callback(false, document);
            
        }
        
    });
    
};

/**
 * 
 * get a single document by query
 * 
 * @param {type} query
 * @param {type} callback
 * @returns {undefined}
 */
playlistModel.prototype.getOneByQuery = function getOneFunction(query, callback) {
    
    utilities.log('[PLAYLIST MODEL] get one by query');
    
    this.Model.findOne(query, function(error, document) {
		
        if (error) {
            
            utilities.log('[PLAYLIST MODEL] getOneByQuery failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
        
            callback(false, document);
            
        }
        
    });
    
};

/**
 * 
 * get multiple documents by query
 * 
 * @param {type} query
 * @param {type} callback
 * @returns {undefined}
 */
playlistModel.prototype.getMultipleByQuery = function getAllFunction(query, callback) {
    
    utilities.log('[PLAYLIST MODEL] get multiple by query');
    
    this.Model.find(query, function(error, document) {
        
        if (error) {
            
            utilities.log('[PLAYLIST MODEL] getMultipleByQuery failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
        
            callback(false, document);
            
        }
        
    });
    
};

playlistModel.prototype.findMultipleByJamendoId = function(options, callback) {
    
    utilities.log('[PLAYLIST MODEL] get multiple playlists by jamendo id');
    
    this.Model.find({
        'jamendo_id': { $in: options.ids }
    }).exec(callback);

};

module.exports = playlistModel;