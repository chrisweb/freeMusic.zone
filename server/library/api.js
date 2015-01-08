'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// tweets charts day model
var TweetsChartsDayModel = require('../models/tweetsChartsDay');

// track model
var TrackModel = require('../models/track');

var _ = require('underscore');

// jamendo vendor module
var JamendoAPI = require('./jamendoAPI');

module.exports.start = function initialize(configuration, app, apiRouter) {

	apiRouter.use(function(request, response, next) {
    
        utilities.log('/api, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
    
        next();
    
    });
    
    apiRouter.get('/search', function(request, response, next) {
		
        utilities.log('[API] /api/search hit');
        
        //utilities.log(request);
        //utilities.log(request.query.q);
        
        var jamendoAPI = new JamendoAPI();
        
        var callback = function(error, tracksResult) {
            
            if (error) {
                
                response.status(500);
                
                if (process.env.NODE_ENV === 'development') {
                    
                    utilities.log('[API] ' + error, 'fontColor:red');

                    response.json({ error: '[API] ' + error });
                    
                } else {
                    
                    response.json({ error: '[API] failed to retrieve the tracks using the jamendo api' });
                    
                }
                
            } else {
                
                // TODO: put the tracks in our database
                
                response.status(200);
                response.json(tracksResult);
                
            }
            
        };

        jamendoAPI.getTracksByQuery({
            namesearch: request.query.q,
            include: ['musicinfo', 'lyrics'],
            audioformat: 'ogg'
        }, callback);
        
	});
    
    apiRouter.get('/user', function(request, response, next) {
        
        //utilities.log('[API] session user: ', request.session.user);
        
        var userSessionData = request.session.user;
        
        if (userSessionData === undefined) {
            
            var defaultUserData = {
                isLogged: false,
                lastFetchDate: Date.now()
            };
        
            response.status(200);
            response.json(defaultUserData);
            
        } else {
            
            userSessionData.lastFetchDate = Date.now();
            userSessionData.isLogged = true;
            
            response.status(200);
            response.json(userSessionData);
            
        }
        
    });
    
    apiRouter.get('/tweet/charts/day', function(request, response, next) {
        
        utilities.log('[API] fetching tweet charts day');
        
        // TODO: fix the callback hell
        
        var tweetsChartsDayModel = new TweetsChartsDayModel();
        
        var options = {
            limit: 0
        };
        
        // get the map reduced results for the charts
        tweetsChartsDayModel.findMultiple(options, function(error, tweetsChartsResults) {
            
            
            if (error) {
            
                utilities.log('[API] ' + error, 'fontColor:red');
                
            }
            
            //utilities.log(tweetsChartsResults);
            
            if (!error) {
                
                var tracksIds = [];
                
                _.each(tweetsChartsResults, function(tweetsChartsResult) {
                    
                    tracksIds.push(tweetsChartsResult.value.id);
                    
                });
                
                // get the tracks that are already in our database
                var trackModel = new TrackModel();
                
                options.ids = tracksIds;
                
                trackModel.findMultipleByJamendoId(options, function(error, mongoTracksResults) {
                    
                    if (error) {
                        
                        // if the db query fails all tracks will get fetched
                        // using the API
                        utilities.log('[API] ' + error, 'fontColor:red');
                        
                    } else {
                        
                        //utilities.log(mongoTracksResults);
                        
                        // if our database did find some tracks in the database
                        // we remove their id from the tracksIds list, so that
                        // only those who are not yet in the database get
                        // fetched via the jamendo API
                        _.each(mongoTracksResults, function(mongoTracksResult) {
                            
                            // TODO: remove the ids we found in the db
                            
                            /*var index = tracksIds.indexOf(5);
                            
                            if (index > -1) {
                                tracksIds.splice(index, 1);
                            }*/
                            
                        });
                        
                        // for the tracks that were not yet in our db we need to make
                        // and API call to jamendo to retrieve them and add them to
                        // our database
                        var jamendoAPI = new JamendoAPI();
                        
                        jamendoAPI.getTracksByQuery({
                            id: tracksIds,
                            include: ['musicinfo', 'lyrics'],
                            audioformat: 'ogg'
                        }, function getTracksByQueryCallback(error, apiTracksResults) {
                            
                            if (error) {
                                
                                utilities.log('[API] ' + error);
                                
                            } else {
                                
                                //utilities.log(apiTracksResults);
                                
                                var tracksForMongodb = [];
                                
                                _.each(apiTracksResults.results, function(apiTracksResult) {
                                    
                                    var trackForMongodb = convertApiTrackToMatchMongodbSchema(apiTracksResult);
                                    
                                    tracksForMongodb.push(trackForMongodb);
                                    
                                });
                                
                                // save the tracks into the database
                                trackModel.saveMultiple(tracksForMongodb, function(error, insertedDocuments) {
                                    
                                    if (error) {
                                        
                                        utilities.log('[API] ' + error, 'fontColor:red');
                                        
                                    }
                                    
                                });
                                
                                // now merge the tracks from mongodb and api
                                var allTracks = tracksForMongodb.concat(apiTracksResults);
                                
                                var tracksResponse = [];
                                
                                var position = 1;
                                
                                // add the informations from map reduce and send
                                // everything as response back to the client
                                _.each(tweetsChartsResults, function(tweetsChartsResult) {
                                    
                                    var jamendoTrackData = _.findWhere(allTracks, { jamendo_id: tweetsChartsResult.value.id });
                                    
                                    jamendoTrackData.chart_position = position;
                                    
                                    position = position++;
                                    
                                    jamendoTrackData.count_total = tweetsChartsResult.value.count_total;
                                    jamendoTrackData.count_unique = tweetsChartsResult.value.count_unique;
                                    jamendoTrackData.twitter_users = tweetsChartsResult.value.twitter_users;
                                    
                                    tracksResponse.push(jamendoTrackData);
                                    
                                });
                                
                                // send the response back to the client (don't wait for 
                                // the database query response as it does not matter if
                                // it fails to save the tracks)
                                response.status(200);
                                response.json(tracksResponse);
                                
                            }

                        });
                        
                    }
                    
                });
                
            } else {
                
                response.status(500);
                
                if (process.env.NODE_ENV === 'development') {
                    
                    utilities.log('[API] ' + error, 'fontColor:red');

                    response.json({ error: '[API] ' + error });
                    
                } else {
                    
                    response.json({ error: '[API] failed to retrieve the tracks for the daily charts' });
                    
                }
                
            }
            
        });
        
    });
    
    /**
     * 
     * converts a jamendo Api Track result to the format used in mongodb
     * 
     * @param {type} apiTrack
     * @returns {unresolved}
     */
    var convertApiTrackToMatchMongodbSchema = function convertApiTrackToMatchMongodbSchemaFunction(apiTrack) {
        
        var jamendoDate = apiTrack.releasedate;
        
        var year = jamendoDate.substring(0,4);
        var month = jamendoDate.substring(5,7);
        var day = jamendoDate.substring(8,10);
        
        var releaseDate = new Date(year, month-1, day);
        
        var mongodbTrack = {
            jamendo_id: apiTrack.id,
            jamendo_name: apiTrack.name,
            jamendo_duration: apiTrack.duration,
            jamendo_artist_id: apiTrack.artist_id,
            jamendo_artist_name: apiTrack.artist_name,
            jamendo_artist_idstr: apiTrack.artist_idstr,
            jamendo_album_name: apiTrack.album_name,
            jamendo_album_id: apiTrack.album_id,
            jamendo_license_cc_url: apiTrack.license_ccurl,
            jamendo_position: apiTrack.position,
            jamendo_release_date: releaseDate,
            jamendo_album_image: apiTrack.album_image,
            jamendo_stream_url: apiTrack.audio,
            jamendo_download_url: apiTrack.audiodownload,
            jamendo_pro_url: apiTrack.prourl,
            jamendo_short_url: apiTrack.shorturl,
            jamendo_share_url: apiTrack.shareurl,
            jamendo_music_info: apiTrack.musicinfo,
            jamendo_lyrics: apiTrack.name
        };
        
        return mongodbTrack;
        
    };
    
    app.use('/api', apiRouter);

};