'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// underscore vendor module
var _ = require('underscore');

// jamendo vendor module
var Jamendo = require('jamendo');

// configuration module
var configurationModule = require('../configuration/configuration');

var configuration = configurationModule.get(process.env.NODE_ENV);

/**
 * 
 * get a jamendo api instance
 * 
 * @returns {undefined}
 */
var jamendoAPI = function initializeJamendoAPIFunction() {

    jamendoAPI = new Jamendo({
        client_id : configuration.jamendoApi.clientId,
        protocol  : configuration.jamendoApi.protocol,
        version   : configuration.jamendoApi.version,
        debug     : false,
        rejectUnauthorized: false
    });

};

jamendoAPI.prototype.getTracksByQuery = function getTracksFunction(query, callback) {
    
    // by default return both album tracks and also singles
    if (!_.has(query, 'type')) {
        
        query.type = ['single', 'albumtrack'];
        
    }
    
    jamendoAPI.tracks(query, function(error, data) {

        //utilities.log('*******');
        //utilities.log(error);
        //utilities.log(data);
        //utilities.log('*******');
        
        if (!_.isObject(data) && _.isNull(error)) {
            
            callback('invalid jamendo api server response');
            
        } else if (_.has(data, 'headers') && data.headers.error_message !== '') {
            
            callback(data.headers.error_message);
            
        } else if (_.has(data, 'headers') && data.headers.warnings !== '') {
            
            callback(data.headers.warnings);
            
        } else if (error) {
            
            callback(error);
            
        } else {
            
            var newData = {};
            
            newData.results = [];
            
            _.each(data.results, function(value) {
                
                // string to integer for ids
                value.album_id = parseInt(value.album_id);
                value.id = parseInt(value.id);
                value.artist_id = parseInt(value.artist_id);
                
                newData.results.push(value);
                
            });
            
            callback(false, newData);
            
        }
        
    });
    
};

jamendoAPI.prototype.getPlaylists = function getPlaylistsFunction(query, callback) {
    
    jamendoAPI.playlists(query, function(error, data) {
        
        //utilities.log('*******');
        //utilities.log(error);
        //utilities.log(data);
        //utilities.log('*******');
        
        if (!_.isObject(data) && _.isNull(error)) {
            
            callback('invalid jamendo api server response');
            
        } else if (_.has(data, 'headers') && data.headers.error_message !== '') {
            
            callback(data.headers.error_message);
            
        } else if (_.has(data, 'headers') && data.headers.warnings !== '') {
            
            callback(data.headers.warnings);
            
        } else if (error) {
            
            callback(error);
            
        } else {
            
            var newData = {};
            
            newData.results = [];
            
            _.each(data.results, function(value) {
                
                // string to integer for ids
                value.id = parseInt(value.id);
                value.user_id = parseInt(value.user_id);
                
                newData.results.push(value);
                
            });
            
            callback(false, newData);
            
        }
        
    });
    
};

module.exports = jamendoAPI;