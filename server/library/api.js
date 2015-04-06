'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// tweets charts day model
var ChartTweetModel = require('../models/chartTweet');

// track model
var TrackModel = require('../models/track');

// playlist model
var PlaylistModel = require('../models/playlist');

// underscore vendor module
var _ = require('underscore');

// jamendo vendor module
var JamendoAPI = require('./jamendoAPI');

module.exports.start = function initialize(configuration, app, apiRouter) {

    apiRouter.use(function (request, response, next) {

        utilities.log('/api, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);

        next();

    });

    apiRouter.get('/search', function (request, response, next) {

        utilities.log('[API] /api/search hit');

        //utilities.log(request);
        //utilities.log(request.query.q);

        var jamendoAPI = new JamendoAPI();

        var callback = function (error, searchResults) {

            if (error) {

                response.status(500);

                if (process.env.NODE_ENV === 'development') {

                    utilities.log('[API] ' + error, 'fontColor:red');

                    response.json({error: '[API] ' + error});

                } else {

                    response.json({error: '[API] failed to retrieve the tracks using the jamendo api'});

                }

            } else {

                response.status(200);
                response.json(searchResults);

            }

        };

        jamendoAPI.getTracksByQuery({
            namesearch: request.query.q,
            include: ['musicinfo', 'lyrics'],
            audioformat: 'ogg'
        }, callback);
        
    });
    
    apiRouter.get('/user', function (request, response, next) {
        
        //utilities.log('[API] session user: ', request.session.user);
        
        // clone the original object to avoid modifying the original object
        // on delete later on
        var userSessionData = _.clone(request.session.user);
        
        utilities.log('userSessionData: ', userSessionData);
        
        if (userSessionData === undefined) {
            
            var defaultUserData = {
                isLogged: false,
                lastFetchDate: Date.now()
            };
            
            response.status(200);
            response.json(defaultUserData);
            
        } else {
            
            // add some fields usefull for the client
            userSessionData.lastFetchDate = Date.now();
            userSessionData.isLogged = true;
            
            // remove the oauth data, from the clone, dont send it to the client
            delete userSessionData.oauth;
            
            response.status(200);
            response.json(userSessionData);
            
        }
        
    });
    
    apiRouter.get('/playlists', function (request, response, next) {
        
        utilities.log('[API] fetching playlists');
        
        var options = {
            
        };
        
        options.ids = request.query.playlistsIds;
        
        // get the playlists that are already in our database
        var playlistModel = new PlaylistModel();
        
        playlistModel.findMultipleByJamendoId(options, function (error, mongoPlaylistsResults) {
            
            if (error) {
                
                // if the db query fails all playlists will get fetched
                // using the API
                utilities.log('[API] playlistModel -> findMultipleByJamendoId -> ' + error, 'fontColor:red');
                
            } else {
                
                //utilities.log(mongoPlaylistsResults);
                
                // if our database did find some playlists in the database
                // we remove their id from the playlistsIds list, so that
                // only those who are not yet in the database get
                // fetched via the jamendo API
                _.each(mongoPlaylistsResults, function (mongoTracksResult) {
                    
                    // TODO: remove the ids we found in the db
                    
                    /*var index = playlistsIds.indexOf(5);
                    
                     if (index > -1) {
                     playlistsIds.splice(index, 1);
                     }*/
                    
                });
                
                // for the playlists that were not yet in our db we need to make
                // and API call to jamendo to retrieve them and add them to
                // our database
                var jamendoAPI = new JamendoAPI();
                
                // TODO: if all playlists have been found int he db dont do api call
                jamendoAPI.getPlaylistsByQuery({
                    id: options.ids,
                    limit: 100,
                    audioformat: 'mp32' // no ogg yet!?
                }, function getPlaylistsByQueryCallback(error, apiResponse) {
                    
                    if (error) {
                        
                        utilities.log('[API] ' + error);
                        
                        response.status(500);
                        response.json('error while fetching the playlists');
                        
                    } else {
                        
                        //utilities.log(apiResponse);
                        
                        var playlistsForMongodb = [];
                        
                        _.each(apiResponse.results, function(apiPlaylistsResult) {
                            
                            var playlistForMongodb = convertApiPlaylistToMatchMongodbSchema(apiPlaylistsResult);
                            
                            playlistsForMongodb.push(playlistForMongodb);
                            
                        });
                        
                        // save the playlists into the database
                        //TODO: uncomment as soon as fetching playlists from mongodb instead of API has been implemented
                        /*playlistModel.saveMultiple(playlistsForMongodb, function (error, insertedDocuments) {
                            
                            if (error) {
                                
                                utilities.log('[API] ' + error, 'fontColor:red');
                                
                            }
                            
                        });*/
                        
                        // now merge the playlists that were already in the
                        // mongodb database and the ones that got
                        // returned by the playlists api call
                        var allPlaylists = playlistsForMongodb.concat(mongoPlaylistsResults);
                        
                        response.status(200);
                        //response.json(allPlaylists); // TODO: uncomment as soon as playlists from mongodb can get returned
                        response.json(playlistsForMongodb);
                        
                    }
                    
                });
                
            }
            
        });
        
    });
    
    apiRouter.get('/playlists/list', function (request, response, next) {
        
        if (request.query.whereKey === 'user') {
            
            var queryData = {
                limit: '200',
                order: 'name'
            };
            
            if (request.query.whereValue === 'me') {
                
                var userSessionData = request.session.user;
                
                if (userSessionData === undefined) {
                    
                    var error = 'user is not logged';
                    
                    utilities.log('[API] error: ' + error, 'fontColor:red');
                    
                    response.status(401);
                    response.json({
                        error: error
                    });
                    
                } else {
                    
                    queryData.access_token = userSessionData.oauth.token;
                    
                }
                
            } else {
                
                queryData.user_id = request.query.whereKey;
                
            }
            
        } else {
            
            // TODO: retrieve playlists
            
        }
        
        var callback = function (error, playlistsResult) {
            
            if (error) {
                
                response.status(500);
                
                if (process.env.NODE_ENV === 'development') {
                    
                    utilities.log('[API] error: ' + error, 'fontColor:red');
                    
                    response.json({
                        code: 300,
                        error: '[API] error: ' + error
                    });
                    
                } else {
                    
                    response.json({
                        code: 300,
                        error: '[API] error: failed to retrieve the user playlists using the jamendo api'
                    });
                    
                }
                
            } else {
                
                // TODO: put the playlists in our database
                
                response.status(200);
                response.json(playlistsResult.results);
                
            }
            
        };
        
        var jamendoAPI = new JamendoAPI();
        
        jamendoAPI.getPlaylistsByQuery(queryData, callback);
        
    });
    
    apiRouter.get('/playlists/tracks/:playlistid', function (request, response, next) {
        
        utilities.log('[API] fetching playlist tracks');
        
        if (request.params.playlistid === 'twitter_charts_day') {
            
            var period = 'day';
            
            // TODO: fix the callback hell
            
            var chartTweetModel = new ChartTweetModel({
                period: period
            });
            
            var options = {
                limit: 100
            };
            
            // get the map reduced results for the charts
            chartTweetModel.findMultiple(options, function (error, chartTweets) {
                
                if (error) {
                    
                    utilities.log('[API] ' + error, 'fontColor:red');
                    
                    response.status(500);
                    response.json({
                        errorMessage: 'server error while fetching the charts tweets'
                    });
                    
                } else {
                
                    var chartTweetsResponse = [];
                    var i;

                    for (i = 0; i < chartTweets.length; i++) {

                        var chartTweet = chartTweets[i].value;

                        console.log(chartTweet);

                        chartTweet.position = i+1;

                        chartTweetsResponse.push(chartTweet);

                    }

                    response.status(200);
                    response.json(chartTweetsResponse);
                    
                }
                
            });
            
        } else {
            
            var playlistModel = new PlaylistModel({
                period: period
            });
            
            var options = {
                limit: 100
            };
            
            // get the playlist tracks
            playlistModel.findMultiple(options, function (error, mongoPlaylistTracksResults) {
                
                if (error) {
                    
                    utilities.log('[API] ' + error, 'fontColor:red');
                    
                    response.status(500);
                    response.json({
                        errorMessage: 'server error while fetching the playlist tracks'
                    });
                    
                } else {
                    
                    // if our database did find some playlist tracks in the
                    // database we remove their id from the playlistsIds list,
                    // so that only those who are not yet in the database get
                    // fetched via the jamendo API
                    _.each(mongoPlaylistTracksResults, function (mongoPlaylistTracksResult) {

                        // TODO: remove the ids we found in the db
                        
                        
                        
                    });
                    
                    // for the playlists that were not yet in our db we need to make
                    // and API call to jamendo to retrieve them and add them to
                    // our database
                    var jamendoAPI = new JamendoAPI();
                    
                    // TODO: if all playlists have been found int he db dont do api call
                    jamendoAPI.getPlaylistTracksByQuery({
                        id: options.ids,
                        limit: 100,
                        audioformat: 'mp32' // no ogg yet!?
                    }, function getPlaylistTracksByQueryCallback(error, apiResponse) {
                        
                        if (error) {
                            
                            utilities.log('[API] ' + error);
                            
                            response.status(500);
                            response.json('error while fetching the playlist tracks');
                            
                        } else {
                            
                            //utilities.log(apiResponse);
                            
                            var playlistTracksForMongodb = [];
                            
                            _.each(apiResponse.results, function(apiPlaylistTracksResult) {
                                
                                var playlistTrackForMongodb = convertApiPlaylistTrackToMatchMongodbSchema(apiPlaylistTracksResult);
                                
                                playlistTracksForMongodb.push(playlistTrackForMongodb);
                                
                            });
                            
                            // save the playlist tracks into the database
                            // TODO: uncomment as soon as fetching playlist
                            // tracks from mongodb instead of API has been
                            // implemented
                            /*playliTrackstModel.saveMultiple(playlistTracksForMongodb, function (error, insertedDocuments) {
                                
                                if (error) {
                                    
                                    utilities.log('[API] ' + error, 'fontColor:red');
                                    
                                }
                                
                            });*/
                            
                            // now merge the playlist tracks that were already
                            // in the mongodb database and the ones that got
                            // returned by the playlist tracks api call
                            var allPlaylistTracks = playlistTracksForMongodb.concat(mongoPlaylistTracksResults);
                            
                            response.status(200);
                            //response.json(allPlaylistTracks); // TODO: uncomment as soon as playlist tracks from mongodb can get returned
                            response.json(playlistTracksForMongodb);
                            
                        }
                        
                    });
                    
                }
                
            });
            
        }

    });
    
    /**
     * 
     */
    apiRouter.get('/tracks', function fetchTracksFunction(request, response, next) {
        
        utilities.log('[API] fetching tracks');
        
        var options = {};
        
        options.ids = request.query.tracksIds;
        
        // get the tracks that are already in our database
        var trackModel = new TrackModel();
        
        trackModel.findMultipleByJamendoId(options, function (error, mongoTracksResults) {
            
            if (error) {
                
                // if the db query fails all tracks will get fetched
                // using the API
                utilities.log('[API] trackModel -> findMultipleByJamendoId -> ' + error, 'fontColor:red');
                
            } else {
                
                //utilities.log(mongoTracksResults);
                
                // if our database did find some tracks in the database
                // we remove their id from the tracksIds list, so that
                // only those who are not yet in the database get
                // fetched via the jamendo API
                _.each(mongoTracksResults, function (mongoTracksResult) {
                    
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
                
                // TODO: if all tracks have been found int he db dont do api call
                
                jamendoAPI.getTracksByQuery({
                    id: options.ids,
                    include: ['musicinfo', 'lyrics'],
                    audioformat: 'ogg'
                }, function getTracksByQueryCallback(error, apiResponse) {
                    
                    if (error) {
                        
                        utilities.log('[API] ' + error);
                        
                        response.status(500);
                        response.json('error while fetching the tracks');
                        
                    } else {
                        
                        //utilities.log(apiResponse);
                        
                        var tracksForMongodb = [];
                        
                        _.each(apiResponse.results, function (apiTracksResult) {
                            
                            var trackForMongodb = convertApiTrackToMatchMongodbSchema(apiTracksResult);
                            
                            tracksForMongodb.push(trackForMongodb);
                            
                        });
                        
                        // save the tracks into the database
                        //TODO: uncomment as soon as fetching tracks from mongodb instead of API has been implemented
                        /*trackModel.saveMultiple(tracksForMongodb, function (error, insertedDocuments) {
                            
                            if (error) {
                                
                                utilities.log('[API] ' + error, 'fontColor:red');
                                
                            }
                            
                        });*/
                        
                        // now merge the tracks that were already in the
                        // mongodb database and the ones that got
                        // returned by the tracks api call
                        var allTracks = tracksForMongodb.concat(mongoTracksResults);
                        
                        response.status(200);
                        //response.json(allTracks); // TODO: uncomment as soon as tracks from mongodb can get returned
                        response.json(tracksForMongodb);
                        
                    }
                    
                });
                
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

        var year = jamendoDate.substring(0, 4);
        var month = jamendoDate.substring(5, 7);
        var day = jamendoDate.substring(8, 10);

        var releaseDate = new Date(year, month - 1, day);

        var mongodbTrack = {
            id: apiTrack.id,
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
            jamendo_image: apiTrack.image,
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
    
    var convertApiPlaylistToMatchMongodbSchema = function convertApiPlaylistToMatchMongodbSchemaFunction(apiPlaylist) {
        
        var jamendoDate = apiPlaylist.creationdate;
        
        var year = jamendoDate.substring(0, 4);
        var month = jamendoDate.substring(5, 7);
        var day = jamendoDate.substring(8, 10);
        
        var creationDate = new Date(year, month - 1, day);
        
        var mongodbTrack = {
            id: apiPlaylist.id,
            jamendo_id: apiPlaylist.id,
            jamendo_creation_date: creationDate,
            jamendo_name: apiPlaylist.name,
            jamendo_user_id: apiPlaylist.user_id,
            jamendo_user_name: apiPlaylist.user_name,
            jamendo_zip: apiPlaylist.zip,
            jamendo_shorturl: apiPlaylist.shorturl,
            jamendo_shareurl: apiPlaylist.shareurl
        };
        
        return mongodbTrack;
        
    };
    
    app.use('/api', apiRouter);
    
};