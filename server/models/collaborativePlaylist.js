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
 * @returns {collaborativePlaylistModel}
 * playlist model
 * 
 * @returns {collaborativePlaylistModel}
 */
var collaborativePlaylistModel = function collaborativePlaylistModelFunction(options) {
    
    var collection = 'collaborativeplaylist';
    
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
        wtimeout: 10000,
        toJSON: {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    };
    
    var defaultOptions = _.extend(schemaOptions, options || {});
    
    // possible values:
    // String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
    var schema = new Schema({
        // _id is created by default by mongoose
        creation_date: { type: Date },
        name: { type: String, trim: true, required: true },
        author_id: { type: Number, trim: true }
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
collaborativePlaylistModel.prototype.saveOne = function saveOneFunction(data, callback) {
    
    utilities.log('[COLLABORATIVE PLAYLIST MODEL] save a single object');
    
    this.Model.create(data, function saveCallback(error, model) {
        
        //utilities.log('create model: ', model);
        
        if (error) {
            
            utilities.log('[COLLABORATIVE PLAYLIST MODEL] save failed', error, 'fontColor:red');
            
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
collaborativePlaylistModel.prototype.updateOne = function updateOneFunction(jamendoUserId, dataToUpdate, callback) {
    
    utilities.log('[COLLABORATIVE PLAYLIST MODEL] update a single object');
    
    var query = { id: jamendoUserId };
    var options = { multi: false };
    
    this.Model.findOneAndUpdate(query, dataToUpdate, options, function(error, model) {
        
        //utilities.log('update model: ', model);
        
        if (error) {
            
            utilities.log('[COLLABORATIVE PLAYLIST MODEL] update failed', error, 'fontColor:red');
            
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
collaborativePlaylistModel.prototype.getOneById = function getOneFunction(id, callback) {
    
    utilities.log('[COLLABORATIVE PLAYLIST MODEL] get one by id');
    
    this.Model.findById(id, function(error, document) {
		
        if (error) {
            
            utilities.log('[COLLABORATIVE PLAYLIST MODEL] getOneById failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
        
            callback(false, document);
            
        }
        
    });
    
};

collaborativePlaylistModel.prototype.getMultipleById = function getMultipleByIdFunction(options, callback) {

    utilities.log('[COLLABORATIVE PLAYLIST MODEL] get multiple by id');
        
    this.Model.find({
        '_id': { $in: options.ids }
    }).exec(callback);
    
};

/**
 * 
 * get a single document by query
 * 
 * @param {type} query
 * @param {type} callback
 * @returns {undefined}
 */
collaborativePlaylistModel.prototype.getOneByQuery = function getOneFunction(query, callback) {
    
    utilities.log('[COLLABORATIVE PLAYLIST MODEL] get one by query');
    
    this.Model.findOne(query, function(error, document) {
		
        if (error) {
            
            utilities.log('[COLLABORATIVE PLAYLIST MODEL] getOneByQuery failed', error, 'fontColor:red');
            
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
collaborativePlaylistModel.prototype.getMultipleByQuery = function getAllFunction(query, callback) {
    
    utilities.log('[COLLABORATIVE PLAYLIST MODEL] get multiple by query');
    
    this.Model.find(query, function(error, document) {
        
        if (error) {
            
            utilities.log('[COLLABORATIVE PLAYLIST MODEL] getMultipleByQuery failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
        
            callback(false, document);
            
        }
        
    });
    
};

module.exports = collaborativePlaylistModel;