'use strict';

// utilities module
var utilities = require('./shared/utilities');

// redis vendor module
// node_redis module: https://github.com/mranney/node_redis
var redis = require('redis');

// get configuration
var configurationModule = require('../configuration/configuration.js');
var configuration = configurationModule.get(process.env.NODE_ENV);

var cachedClient = null;
var cachedDatabases = {};

/**
 * 
 * module.exports the redis module
 * 
 * @returns {redis}
 */
module.exports.getModule = function getModuleFunction() {
    
    return redis;
    
};

/**
 * 
 * get a redis client instance
 * 
 * @param {type} fromCache
 * @param {type} callbackFunction
 * @returns {unresolved}
 */
module.exports.getClient = function getClientFunction(fromCache, callbackFunction) {

    utilities.log('[REDIS_DB] getRedisClient', 'fontColor:cyan');

    // check if we have cached instance of client
    if (fromCache !== false && cachedClient !== null) {
        
        return callbackFunction(false, cachedClient);
        
    }
    
    var redisPort = configuration.redis.port;
    var redisHost = configuration.redis.host;

    // TODO: does redis have a pool like mongodb, can we define its size
    // TODO: does redis auto reconnect like mongodb, can we set that option

    // get redis client instance
    var redisDBClient = redis.createClient(redisPort, redisHost);
    
    // NOTE: Your call to client.auth() should not be inside the ready handler
    var redisAuth = configuration.redis.auth;

    if (redisAuth.length > 0) {

        // This command is magical.  Client stashes the password and will issue on every connect.
        redisDBClient.auth(redisAuth, function(error) {
            
            if (error !== null) {
            
                utilities.log('[REDIS_DB] auth error: ' + error, 'error');
                
            } else {
                
                utilities.log('[REDIS_DB] auth success', 'fontColor:cyan');
                
            }
            
        });

    }

    // authentificate
    redisDBClient.on('connect', function () {

        utilities.log('[REDIS_DB] redisDBClient on connect', 'fontColor:cyan');

    });
    
    // if error
    redisDBClient.on('error', function(error) {

        return callbackFunction('[REDIS_DB] redisDBClient on error (port: ' + redisPort + ', host: ' + redisHost + ') error: ' + error, null);

    });
    
    // if client is ready
    redisDBClient.on('ready', function (error) {
        
        utilities.log('[REDIS_DB] on ready', 'fontColor:cyan');
        
        if (error) {

            return callbackFunction('[REDIS_DB] redisDBClient on ready error: ' + error, null);

        }
        
        // cache the client instance
        cachedClient = redisDBClient;
        
        return callbackFunction(false, redisDBClient);
        
    });
    
    redisDBClient.on('reconnecting', function (error) {
        
        utilities.log('[REDIS_DB] redisDBClient on reconnecting', 'fontColor:cyan');

        var redisAuth = configuration.redis.auth;

        if (redisAuth.length > 0) {

            // This command is magical.  Client stashes the password and will issue on every connect.
            redisDBClient.auth('somepass');
            
        }
        
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
 * @param {type} callbackFunction
 * @returns {undefined}
 */
var redisSelectDatabase = function redisSelectDatabaseFunction(databaseIndex, redisDBClient, callbackFunction) {   

    utilities.log('[REDIS_DB] redisSelectDatabase', 'fontColor:cyan');

    if (typeof(databaseIndex) === 'undefined' || databaseIndex === null) {

        databaseIndex = configuration.redis.databases.default;

    }

    // select database
    redisDBClient.select(databaseIndex, function(error) {

        if (error) {

            return callbackFunction('[REDIS_DB] redisDBClient select database error: ' + error);

        }
            
        return callbackFunction(false);

    });

};

/**
 * 
 * returns a redis client for a selected database
 * 
 * @param {type} databaseIndex
 * @param {type} redisDBClient
 * @param {type} fromCache
 * @param {type} callbackFunction
 * @returns {unresolved}
 */
module.exports.selectDatabase = function selectDatabaseFunction(databaseIndex, redisDBClient, fromCache, callbackFunction) {
    
    utilities.log('[REDIS_DB] selectDatabase, databaseIndex: ' + databaseIndex, 'fontColor:cyan');
    
    // check if we have cached instance of database
    if (fromCache !== false && typeof(cachedDatabases.databaseIndex) !== 'undefined') {
        
        redisDBClient = cachedDatabases.databaseIndex;
        
        return callbackFunction(false, redisDBClient);
        
    }

    if (typeof(redisDBClient) === 'undefined' || redisDBClient === null) {

        this.getRedisClient(true, function(error, redisDBClient) {

            if (error) {
                
                return callbackFunction(error, null);
                
            }
            
            redisSelectDatabase(databaseIndex, redisDBClient, function(error) {
                
                if (error) {

                    return callbackFunction(error, null);

                }
                
                // cache redis client
                cachedDatabases.databaseIndex = redisDBClient;
                    
                return callbackFunction(false, redisDBClient);
                
            });
            
        });

    } else {
        
        redisSelectDatabase(databaseIndex, redisDBClient, function(error) {

            if (error) {

                return callbackFunction(error, null);

            }
            
            // cache redis client
            cachedDatabases.databaseIndex = redisDBClient;

            return callbackFunction(false, redisDBClient);

        });
        
    }
    
};

/**
 * 
 * disconnect redis database
 * 
 * @param {type} redisDBClient
 * @returns {undefined}
 */
module.exports.disconnect = function disconnectFunction(redisDBClient) {

    utilities.log('[REDIS_DB] disconnect', 'fontColor:cyan');

    setTimeout(function() {

        redisDBClient.quit();
        
        // clear cache variables
        cachedClient = null;
        cachedDatabases = {};

    }, 0);

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
 * @param {type} callbackFunction
 * @returns {undefined}
 */
module.exports.keyExists = function keyExistsFunction(redisDBClient, key, callbackFunction) {

    utilities.log('[REDIS_DB] keyExists, key: ' + key, 'fontColor:cyan');

    redisDBClient.exists(key, function(error, existsResponse) {

        if (error) {
            
            callbackFunction('redis exists error: ' + error, null);

        }

        return callbackFunction(false, existsResponse);

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
 * @param {type} callbackFunction
 * @returns {undefined}
 */
module.exports.readString = function readStringFunction(redisDBClient, key, callbackFunction) {

    utilities.log('[REDIS_DB] readString', 'fontColor:cyan');

    redisDBClient.get(key, function(error, string) {
        
        if (error) {
            
            return callbackFunction('[REDIS_DB] error while retrieving redis string by key, key: ' + key + ', error: ' + error, null);
            
        }
        
        return callbackFunction(false, string);
        
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
 * @param {type} callbackFunction
 * @returns {undefined}
 */
module.exports.isTimestampValid = function isTimestampValidFunction(redisDBClient, timestampKey, secondsBack, callbackFunction) {

    utilities.log('[REDIS_DB] isTimestampValid, timestampKey: ' + timestampKey + ', secondsBack: ' + secondsBack, 'fontColor:cyan');

    // does the timestamp key exist
    var isTimestampValid = true;

    this.keyExists(redisDBClient, timestampKey, function(error, keyExists) {
        
        if (error) {
            
            return callbackFunction(error, null);
            
        }
        
        if (keyExists) {

            this.readString(redisDBClient, timestampKey, function(error, timestampString) {

                if (error) {

                    return callbackFunction(error, null);

                }
                
                var timstampTimeNow = new Date().getTime();

                var timestampPeriodAgo = timstampTimeNow - secondsBack;

                // is the timestamp  < secondsBack
                if (timestampString < timestampPeriodAgo) {

                    isTimestampValid = false;

                }
                
                return callbackFunction(false, isTimestampValid);
                
            });
        
        } else {
            
            isTimestampValid = false;
            
            return callbackFunction(false, isTimestampValid);
            
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
 * @param {type} callbackFunction
 * @returns {undefined}
 */
module.exports.getCachedObjectByKey = function getCachedObjectByKeyFunction(redisDBClient, key, callbackFunction) {

    utilities.log('[REDIS_DB] getCachedObjectByKey, key: ' + key, 'fontColor:cyan');

    var doesCacheExist = true;

    this.keyExists(redisDBClient, key, function(error, keyExists) {
        
        if (error) {
            
            return callbackFunction('[REDIS_DB] getCachedValueByKey redisKeyExists error: ' + error, null);
            
        }
        
        if (keyExists) {

            this.readString(redisDBClient, key, function(error, cacheString) {

                if (error) {

                    return callbackFunction('[REDIS_DB] getCachedValueByKey this.readString error: ' + error, null);

                }
                
                var cacheObject;

                try {

                    cacheObject = JSON.parse(cacheString);

                } catch (exception) {

                    return callbackFunction('[REDIS_DB] getCachedValueByKey parse json error: ' + exception, null);

                }
                
                return callbackFunction(false, cacheObject);

            });
            
        } else {
            
            return callbackFunction(false, null);

        }
        
    });

};
