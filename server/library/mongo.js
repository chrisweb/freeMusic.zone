'use strict';

// utilities module
var utilities = require('./shared/utilities');

// mongoose module
// https://github.com/LearnBoost/mongoose
var mongoose = require('mongoose');

// get configuration
var configurationModule = require('../configuration/configuration.js');
var configuration = configurationModule.get(process.env.NODE_ENV);

/**
 * 
 * get a redis client instance
 * 
 * @param {type} callback
 * @returns {unresolved}
 */
module.exports.getClient = function getClientFunction(callback) {

    utilities.log('[MONGO_DB] getClient', 'fontColor:cyan');
    
    var userAndPasswordPart = '';
    
    if (configuration.mongodb.user !== undefined
        && configuration.mongodb.user !== ''
        && configuration.mongodb.password !== undefined
        && configuration.mongodb.password !== '') {
        
        userAndPasswordPart = user + ':' + password + '@';
        
    }
    
    var portPart = '';
    
    if (configuration.mongodb.port !== undefined && configuration.mongodb.port !== '') {
        
        portPart = ':' + configuration.mongodb.port;
        
    }
    
    var connectionParameters = 'mongodb://' + userAndPasswordPart + configuration.mongodb.host + portPart;
    
    //utilities.log('[MONGO_DB] ' + connectionParameters, 'fontColor:cyan');
    
    mongoose.connect(connectionParameters);
    
    var mongooseConnection = mongoose.connection;
    
    mongooseConnection.on('open', function () {
        
        callback(false);
        
    });
    
    mongooseConnection.on('error', function (error) {
        
        callback(error);
        
    });

    

};