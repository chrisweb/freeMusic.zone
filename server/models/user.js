'use strict';

// mongoose module
// https://github.com/LearnBoost/mongoose
var mongoose = require('mongoose');

// utilities module
var utilities = require('../library/shared/utilities');

/**
 * 
 * user model
 * 
 * @returns {userModel}
 */
var userModel = function() {
    
    var collection = 'user';
    var Schema = mongoose.Schema;
    var mixedType = Schema.Types.Mixed;
    
    /**
     * possible values:
     * String / Number / Date / Buffer / Boolean / Mixed / ObjectId / Array
     * 
     * @type tweetsModel.Schema
     */
    var userSchema = new Schema({
        nickname: {type: String, trim: true, index: { unique: true }, required: true},
        createdAt: {type: String},
        language: {type: String},
        avatar: {type: String},
        lastupdateAt: {type: Date, default: Date.now},
        id: {type: String, trim: true, index: { unique: true }, required: true},
        oauth: {
            access_token: {type: String, trim: true, required: true},
            expires_in: {type: Number, trim: true},
            token_type: {type: String, trim: true},
            scope: {type: String, trim: true, required: true},
            refresh_token: {type: String, trim: true, required: true}
        }
    },
    {safe: true, wtimeout: 10000}); // return errors and 10 seconds timeout
    
    // avoid that mongoose checks if indexes exist on every startup
    userSchema.set('autoIndex', false);
    
    this.model = mongoose.model(collection, userSchema);
    
};

/**
 * 
 * save a single user
 * 
 * @param {type} data
 * @param {type} callback
 * @returns {undefined}
 */
userModel.prototype.saveOne = function(data, callback) {
    
    console.log('save a single object');
    
    this.model.save(data, function (error) {
        
        if (error) {
            
            utilities.log('[USER MODEL] save failed', error, 'fontColor:red');
            
        } else {
            
            // TODO: on success return id?
            
        }
        
    });
    
};

/**
 * 
 * get a single user by id
 * 
 * @param {type} id
 * @param {type} callback
 * @returns {undefined}
 */
userModel.prototype.getOne = function(id, callback) {
    
    this.model.findById(id, function(error, userData) {
		
        if (error) {
            
            utilities.log('[USER MODEL] get failed', error, 'fontColor:red');
            
            callback(error);
            
        }
        
        callback(false, userData);
        
    });
    
};

/**
 * 
 * get multiple users
 * 
 * @param {type} ids
 * @param {type} callback
 * @returns {undefined}
 */
userModel.prototype.getAll = function(ids, callback) {
    
    console.log('get all objects');
    
    //this.model.
    
};

module.exports = userModel;