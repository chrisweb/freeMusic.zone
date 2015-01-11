'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// redis vendor module
// node_redis module: https://github.com/mranney/node_redis
var redis = require('redis');

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

    utilities.log('[REDIS_DB] getClient', 'fontColor:cyan');

    if (configuration.hasOwnProperty('redis')
        && configuration.redis.hasOwnProperty('port')
        && configuration.redis.port !== ''
        && configuration.redis.hasOwnProperty('host')
        && configuration.redis.host !== '') {

        var redisPort = configuration.redis.port;
        var redisHost = configuration.redis.host;
        
    } else {
        
        throw 'the redis configuration is missing, check out /server/configuration/configuration.js';
        
    }

    // get redis client instance
    var redisDBClient = redis.createClient(redisPort, redisHost);
    
    if (configuration.redis.hasOwnProperty('auth')) {
    
        // NOTE: your call to client.auth() should not be inside the ready handler
        var redisAuth = configuration.redis.auth;

        if (redisAuth !== '') {

            // this command is magical, client stashes the password and will issue it on every connect
            redisDBClient.auth(redisAuth, function(error) {

                if (error !== null) {

                    utilities.log('[REDIS_DB] auth error: ' + error, 'error');

                } else {

                    utilities.log('[REDIS_DB] auth success', 'fontColor:cyan');

                }

            });

        }
        
    }

    // authentificate
    redisDBClient.on('connect', function () {

        utilities.log('[REDIS_DB] redisDBClient on connect', 'fontColor:cyan');

    });
    
    // if error
    redisDBClient.on('error', function(error) {

        return callback('[REDIS_DB] redisDBClient on error (port: ' + redisPort + ', host: ' + redisHost + ') error: ' + error);

    });
    
    // if client is ready
    redisDBClient.on('ready', function (error) {
        
        utilities.log('[REDIS_DB] on ready', 'fontColor:cyan');
        
        if (error) {

            return callback('[REDIS_DB] redisDBClient on ready error: ' + error);

        }
        
        return callback(false, redisDBClient);
        
    });
    
    redisDBClient.on('reconnecting', function (error) {
        
        utilities.log('[REDIS_DB] redisDBClient on reconnecting', 'fontColor:cyan');
        
    });
    
    redisDBClient.on('end', function (error) {
        
        utilities.log('[REDIS_DB] redisDBClient on end', 'fontColor:cyan');
        
    });
    
};

/**
 * 
 * callback for redis select database
 * 
 * @param {type} databaseIndex
 * @param {type} redisDBClient
 * @param {type} callback
 * @returns {undefined}
 */
var redisSelectDatabase = function redisSelectDatabaseFunction(databaseIndex, redisDBClient, callback) {   

    utilities.log('[REDIS_DB] redisSelectDatabase', 'fontColor:cyan');

    if (typeof(databaseIndex) === 'undefined' || databaseIndex === null) {

        databaseIndex = configuration.redis.databases.default;

    }

    // select database
    redisDBClient.select(databaseIndex, function(error) {

        if (error) {

            return callback('[REDIS_DB] redisDBClient select database error: ' + error);

        }
            
        return callback(false);

    });

};

/**
 * 
 * returns a redis client for a selected database
 * 
 * @param {type} databaseIndex
 * @param {type} redisDBClient
 * @param {type} callback
 * @returns {unresolved}
 */
module.exports.selectDatabase = function selectDatabaseFunction(databaseIndex, redisDBClient, callback) {
    
    utilities.log('[REDIS_DB] selectDatabase, databaseIndex: ' + databaseIndex, 'fontColor:cyan');

    if (typeof(redisDBClient) === 'undefined' || redisDBClient === null) {

        this.getRedisClient(true, function(error, redisDBClient) {

            if (error) {
                
                return callback(error);
                
            }
            
            redisSelectDatabase(databaseIndex, redisDBClient, function(error) {
                
                if (error) {

                    return callback(error);

                }

                return callback(false, redisDBClient);
                
            });
            
        });

    } else {
        
        redisSelectDatabase(databaseIndex, redisDBClient, function(error) {

            if (error) {

                return callback(error);

            }

            return callback(false, redisDBClient);

        });
        
    }
    
};

/**
 * 
 * disconnect redis database
 * 
 * @param {type} redisDBClient
 * @param {type} callback
 * @returns {undefined}
 */
module.exports.disconnect = function disconnectFunction(redisDBClient, callback) {

    utilities.log('[REDIS_DB] disconnect', 'fontColor:cyan');
    
    if (redisDBClient !== undefined) {

        setTimeout(function() {

            redisDBClient.quit(function() {

                callback(false);

            });

        }, 0);
        
    } else {
        
        callback('redisDBClient is undefined');
        
    }

};

/**
 * 
 * @param {type} redisDBClient
 * @param {type} key
 * @param {type} ttl
 * @returns {undefined}
 */
module.exports.setExpiry = function setExpiryFunction(redisDBClient, key, ttl) {

    utilities.log('[REDIS_DB] setExpiry key: ' + key + ', ttl: ' + ttl, 'fontColor:cyan');

    redisDBClient.expire(key, ttl);

};

/**
 * 
 * @param {type} redisDBClient
 * @param {type} key
 * @param {type} callback
 * @returns {undefined}
 */
module.exports.keyExists = function keyExistsFunction(redisDBClient, key, callback) {

    utilities.log('[REDIS_DB] keyExists, key: ' + key, 'fontColor:cyan');

    redisDBClient.exists(key, function(error, existsResponse) {

        if (error) {
            
            callback('redis exists error: ' + error);

        }

        return callback(false, existsResponse);

    });

};

/**
 * 
 * @param {type} redisDBClient
 * @param {type} key
 * @param {type} string
 * @returns {undefined}
 */
module.exports.insertString = function insertStringFunction(redisDBClient, key, string) {

    utilities.log('[REDIS_DB] insertString, key: ' + key + ', string: ' + string, 'fontColor:cyan');

    redisDBClient.set(key, string);

};

/**
 * 
 * @param {type} redisDBClient
 * @param {type} key
 * @param {type} callback
 * @returns {undefined}
 */
module.exports.readString = function readStringFunction(redisDBClient, key, callback) {

    utilities.log('[REDIS_DB] readString', 'fontColor:cyan');

    redisDBClient.get(key, function(error, string) {
        
        if (error) {
            
            return callback('[REDIS_DB] error while retrieving redis string by key, key: ' + key + ', error: ' + error);
            
        }
        
        return callback(false, string);
        
    });

};

/**
 * 
 * helper function, to check for timestamp key/values to see if timestamp
 * exists and is not older then a defined limit of time, the response then gets
 * passed to the callback function
 * 
 * @param {type} redisDBClient
 * @param {type} timestampKey
 * @param {type} secondsBack
 * @param {type} callback
 * @returns {undefined}
 */
module.exports.isTimestampValid = function isTimestampValidFunction(redisDBClient, timestampKey, secondsBack, callback) {

    utilities.log('[REDIS_DB] isTimestampValid, timestampKey: ' + timestampKey + ', secondsBack: ' + secondsBack, 'fontColor:cyan');

    // does the timestamp key exist
    var isTimestampValid = true;

    this.keyExists(redisDBClient, timestampKey, function(error, keyExists) {
        
        if (error) {
            
            return callback(error);
            
        }
        
        if (keyExists) {

            this.readString(redisDBClient, timestampKey, function(error, timestampString) {

                if (error) {

                    return callback(error);

                }
                
                var timstampTimeNow = new Date().getTime();

                var timestampPeriodAgo = timstampTimeNow - secondsBack;

                // is the timestamp  < secondsBack
                if (timestampString < timestampPeriodAgo) {

                    isTimestampValid = false;

                }
                
                return callback(false, isTimestampValid);
                
            });
        
        } else {
            
            isTimestampValid = false;
            
            return callback(false, isTimestampValid);
            
        }

    });

};

/**
 * 
 * helper function to retrieve a cached string and check if it can be
 * transformed back into an object 
 * 
 * @param {type} redisDBClient
 * @param {type} key
 * @param {type} callback
 * @returns {undefined}
 */
module.exports.getCachedObjectByKey = function getCachedObjectByKeyFunction(redisDBClient, key, callback) {

    utilities.log('[REDIS_DB] getCachedObjectByKey, key: ' + key, 'fontColor:cyan');

    var doesCacheExist = true;

    this.keyExists(redisDBClient, key, function(error, keyExists) {
        
        if (error) {
            
            return callback('[REDIS_DB] getCachedValueByKey redisKeyExists error: ' + error);
            
        }
        
        if (keyExists) {

            this.readString(redisDBClient, key, function(error, cacheString) {

                if (error) {

                    return callback('[REDIS_DB] getCachedValueByKey this.readString error: ' + error);

                }
                
                var cacheObject;

                try {

                    cacheObject = JSON.parse(cacheString);

                } catch (exception) {

                    return callback('[REDIS_DB] getCachedValueByKey parse json error: ' + exception);

                }
                
                return callback(false, cacheObject);

            });
            
        } else {
            
            return callback(false);

        }
        
    });

};