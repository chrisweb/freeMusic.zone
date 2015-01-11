'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// mongoose module
// https://github.com/LearnBoost/mongoose
var mongoose = require('mongoose');

// get configuration
var configurationModule = require('../configuration/configuration.js');
var configuration = configurationModule.get(process.env.NODE_ENV);

/**
 * 
 * open a mongodb connection
 * 
 * @param {type} callback
 * @returns {unresolved}
 */
module.exports.getClient = function getClientFunction(callback) {

    utilities.log('[MONGO_DB] getClient', 'fontColor:cyan');
    
    var userAndPasswordPart = '';
    
    var missingConfiguration = false;
    
    if (configuration.hasOwnProperty('mongodb')
        && configuration.mongodb.hasOwnProperty('user')
        && configuration.mongodb.user !== ''
        && configuration.mongodb.hasOwnProperty('password')
        && configuration.mongodb.password !== '') {
        
        userAndPasswordPart = configuration.mongodb.user + ':' + configuration.mongodb.password + '@';
        
    } else {
        
        missingConfiguration = true;
        
    }
    
    var portPart = '';
    
    if (configuration.hasOwnProperty('mongodb')
        && configuration.mongodb.hasOwnProperty('port')
        && configuration.mongodb.port !== '') {
        
        portPart = ':' + configuration.mongodb.port;
        
    } else {
        
        missingConfiguration = true;
        
    }
    
    if (configuration.hasOwnProperty('mongodb')
        && configuration.mongodb.hasOwnProperty('host')
        && configuration.mongodb.host !== ''
        && configuration.mongodb.hasOwnProperty('database')
        && configuration.mongodb.database.hasOwnProperty('name')
        && configuration.mongodb.database.name !== '') {
    
        var connectionParameters = 'mongodb://' + userAndPasswordPart + configuration.mongodb.host + portPart + '/' + configuration.mongodb.database.name;
        
    }
    
    if (missingConfiguration) {
        
        throw 'the mongodb configuration is missing, check out /server/configuration/configuration.js';
        
    } else {
        
        //utilities.log('[MONGO_DB] ' + connectionParameters, 'fontColor:cyan');
        
        mongoose.connect(connectionParameters);
        
    }
    
    var mongooseConnection = mongoose.connection;
    
    mongooseConnection.on('open', function () {
        
        callback(false, mongooseConnection);
        
    });
    
    mongooseConnection.on('error', function (error) {
        
        callback(error);
        
    });

    mongooseConnection.on('disconnect', function () {
        
        utilities.log('[MONGO_DB] mongodb disconnect');
        
    });

};

/**
 * 
 * disconnect mongo database
 * 
 * @param {type} mongooseConnection
 * @param {type} callback
 * @returns {undefined}
 */
module.exports.disconnect = function disconnectFunction(mongooseConnection, callback) {

    utilities.log('[MONGO_DB] disconnect', 'fontColor:cyan');
    
    if (mongooseConnection !== undefined) {

        setTimeout(function() {

            mongooseConnection.close(function() {

                callback(false);

            });

        }, 0);
        
    } else {
        
        callback('mongooseConnection is undefined');
        
    }

};