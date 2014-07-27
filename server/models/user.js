'use strict';

// mongoose module
// https://github.com/LearnBoost/mongoose
var mongoose = require('mongoose');

// utilities module
var utilities = require('../library/shared/utilities');

// underscore module
var _ = require('underscore');

/**
 * 
 * user model
 * 
 * @returns {userModel}
 */
var userModel = function userModelFunction() {
    
    var collection = 'user';
    
    if (_.indexOf(mongoose.modelNames(), collection) === -1) {
    
        var schema = createSchema();
        
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
var createSchema = function createSchemaFunction() {
    
    var Schema = mongoose.Schema;
    var mixedType = Schema.Types.Mixed;
    
    // possible values:
    // String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
    var schema = new Schema({
        nickname: {type: String, trim: true, index: { unique: true }, required: true},
        createdAt: {type: Date},
        language: {type: String},
        avatar: {type: String},
        lastupdateAt: {type: Date, default: Date.now},
        id: {type: Number, trim: true, index: { unique: true }, required: true},
        oauth: {
            access_token: {type: String, trim: true, required: true},
            expires_in: {type: Number, trim: true, required: true},
            token_type: {type: String, trim: true},
            scope: {type: String, trim: true, required: true},
            refresh_token: {type: String, trim: true, required: true}
        }
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout
    
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
 * @returns {undefined}
 */
userModel.prototype.saveOne = function saveOneFunction(data, callback) {
    
    utilities.log('[USER MODEL] save a single object');
    
    this.Model.create(data, function saveCallback(error, model) {
        
        //utilities.log('create model: ', model);
        
        if (error) {
            
            utilities.log('[USER MODEL] save failed', error, 'fontColor:red');
            
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
userModel.prototype.updateOne = function updateOneFunction(jamendoUserId, dataToUpdate, callback) {
    
    utilities.log('[USER MODEL] update a single object');
    
    var query = { id: jamendoUserId };
    var options = { multi: false };
    
    this.Model.findOneAndUpdate(query, dataToUpdate, options, function(error, model) {
        
        //utilities.log('update model: ', model);
        
        if (error) {
            
            utilities.log('[USER MODEL] update failed', error, 'fontColor:red');
            
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
 * exists, check if a document exists
 * 
 * @param {type} query
 * @param {type} callback
 * @returns {undefined}
 */
userModel.prototype.exists = function existsFunction(query, callback) {
    
    utilities.log('[USER MODEL] exists');
    
    this.Model.count(query, function(error, count) {
		
        if (error) {
            
            utilities.log('[USER MODEL] exists failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
            
            //utilities.log(count);
        
            if (count > 0) {
        
                callback(false, true);
                
            } else {
                
                callback(false, false);
                
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
userModel.prototype.getOneById = function getOneFunction(id, callback) {
    
    utilities.log('[USER MODEL] get one by id');
    
    this.Model.findById(id, function(error, document) {
		
        if (error) {
            
            utilities.log('[USER MODEL] getOneById failed', error, 'fontColor:red');
            
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
userModel.prototype.getOneByQuery = function getOneFunction(query, callback) {
    
    utilities.log('[USER MODEL] get one by query');
    
    this.Model.findOne(query, function(error, document) {
		
        if (error) {
            
            utilities.log('[USER MODEL] getOneByQuery failed', error, 'fontColor:red');
            
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
userModel.prototype.getMultipleByQuery = function getAllFunction(query, callback) {
    
    utilities.log('[USER MODEL] get multiple by query');
    
    this.Model.find(query, function(error, document) {
        
    if (error) {
            
            utilities.log('[USER MODEL] getMultipleByQuery failed', error, 'fontColor:red');
            
            callback(error);
            
        } else {
        
            callback(false, document);
            
        }
        
    });
    
};

module.exports = userModel;