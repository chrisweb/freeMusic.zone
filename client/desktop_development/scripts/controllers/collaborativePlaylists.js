/**
 * 
 * collaborative playlists controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} Ribs
 * @param {type} playlistsManager
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'chrisweb-utilities',
    'library.controller',
    'ribsjs',
    'manager.collaborativePlaylists',
    'manager.tracks',
    'manager.searchQueries',
    'collections.CollaborativePlaylists',
    'collections.ChatMessages',
    'collections.PlaylistTracks',
    'collections.Tracks',
    'models.Track',
    'models.CollaborativePlaylistTrack',
    'library.events',
    'moment'

], function (
    $,
    _,
    utilities,
    Controller,
    Ribs,
    collaborativePlaylistsManager,
    tracksManager,
    searchQueriesManager,
    CollaborativePlaylistsCollection,
    ChatMessagesCollection,
    CollaborativePlaylistTracksCollection,
    TracksCollection,
    TrackModel,
    CollaborativePlaylistTrackModel,
    EventsLibrary,
    Moment
) {
    
    'use strict';

    var CollaborativePlaylistsController = Controller.extend({
        
        onInitializeStart: function onInitializeStartFunction(options, configuration, router) {
            
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction(parameters) {
        
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] action: index', 'fontColor:blue');
            
            // TODO: really need to upgrade to ES6 ;)
            var that = this;

            // collaborative playlists page view
            require([
                'views/pages/collaborativePlaylists'
            ], function(CollaborativePlaylistsView) {
                
                var collaborativePlaylistsView = new CollaborativePlaylistsView();
                
                Ribs.Container.clear('#core');

                Ribs.Container.add('#core', collaborativePlaylistsView);
                
                Ribs.Container.dispatch('#core');
                
                if (parameters.collaborativePlaylistId !== null) {
                    
                    openCollaborativePlaylist(parameters);

                    return;

                }
                
                // show the button create a new collaborative playlist
                collaborativePlaylistsView.$el.find('.js-newCollaborativePlaylist').removeClass('hidden');
                
                // initialize the collaborative playlists collection
                var collaborativePlaylistsCollection = new CollaborativePlaylistsCollection();
                
                require([
                    'views/components/collaborativePlaylists/list',
                    'views/components/collaborativePlaylists/item'
                ], function (CollaborativePlaylistsListView, CollaborativePlaylistsItemView) {
                    
                    // initialize collaborative playlists list view
                    var collaborativePlaylistsListView = new CollaborativePlaylistsListView({
                        collection: collaborativePlaylistsCollection,
                        ModelView: CollaborativePlaylistsItemView,
                        ModelViewOptions: {
                            reRenderOnChange: true
                        },
                        listSelector: '.js-list'
                    });
                    
                    Ribs.Container.clear('#collaborativePlaylistsList');
                    
                    Ribs.Container.add('#collaborativePlaylistsList', collaborativePlaylistsListView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistsList');

                });
                
                // load existing collaborative playlists list from the server
                collaborativePlaylistsManager.fetchList(options, function fetchCollaborativePlaylistsListCallback(error, collaborativePlaylistsIds) {
                    
                    if (!error) {

                        collaborativePlaylistsManager.get();

                    } else {
                        
                        var message = 'error: Sorry we could not retrieve the collaborative playlists list, please try again later';

                        that.addMessage(message, true, 'error');

                        utilities.log(message + ', error: ' + error, 'fontColor:red');

                    }

                    collaborativePlaylistsManager.get();
                
                });
                
                // TODO: get the already existing collaborative playlist

                // listen for event user wants to create a new collaborative playlist (from client)
                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_NEW, function newCollaborativePlaylistCallback() {
                    
                    // collaborative playlists page view
                    require([
                        'views/components/collaborativePlaylists/createForm'
                    ], function (CreateCollaborativePlaylistView) {
                        
                        var createCollaborativePlaylistView = new CreateCollaborativePlaylistView();
                        
                        // clear previous error messages
                        $('#createCollaborativePlaylist').text('');
                        
                        Ribs.Container.clear('#createCollaborativePlaylist');
                        
                        Ribs.Container.add('#createCollaborativePlaylist', createCollaborativePlaylistView);
                        
                        Ribs.Container.dispatch('#createCollaborativePlaylist');

                    });
                
                });
                
                // listen for event user has created a new collaborative playlist (from client)
                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_CREATE, function createCollaborativePlaylistCallback(attributes) {
                    
                    // hide create form
                    Ribs.Container.clear('#createCollaborativePlaylist');
                    
                    // TODO: start loading animation
                    // TODO: create and use a loading animation plugin

                    var messageModel = that.addMessage('Creating new collaborative playlist...', false);
                    
                    // save the new collaborative playlist
                    var collaborativePlaylist = {
                        name: attributes.formValues.name.trim()
                    };
                    
                    collaborativePlaylistsManager.saveOne(collaborativePlaylist, function saveCollaborativePlaylistCallback(error, model) {
                        
                        // TODO: stop the loading animation
                        
                        that.removeMessage(messageModel);
                        
                        if (error) {
                            
                            // display error
                            var message = 'Oups sorry, error occured while creating the collaborative playlist ... we will fix it as soon as possible, please try again later';
                            
                            // TODO: log client errors and send them to the server, where we should record them

                            that.addMessage(message, true, 'error');

                            utilities.log(message + ', error: ' + error, 'fontColor:red');

                        } else {
                            
                            //console.log(model);
                            
                            // add the new playlist to the model, which will add to the list of collaborative playlists
                            collaborativePlaylistsCollection.add(model);

                        }
                    
                    });

                });
                
                // listen for event user wants to join a collaborative playlist (from client)
                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_JOIN, function joinCollaborativePlaylistCallback(attributes) {
                    
                    // clear the collaborative playlists list
                    collaborativePlaylistsCollection.reset();
                    
                    // hide the button create collaborative playlist
                    collaborativePlaylistsView.$el.find('.js-newCollaborativePlaylist').addClass('hidden');
                    
                    // show the button back to collaborative playlists list
                    collaborativePlaylistsView.$el.find('.js-listCollaborativePlaylists').removeClass('hidden');

                    // open the collaborative playlist
                    openCollaborativePlaylist(attributes);

                });

                // listen for event user wants to leave a collaborative playlist (from client)
                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_LEAVE, function joinCollaborativePlaylistCallback(attributes) {

                    // show the button create collaborative playlist
                    collaborativePlaylistsView.$el.find('.js-newCollaborativePlaylist').removeClass('hidden');
                    
                    // hide the button back to collaborative playlists list
                    collaborativePlaylistsView.$el.find('.js-listCollaborativePlaylists').addClass('hidden');

                    // TODO: redisplay the collaborative playlists list

                });

            });

        }
        
    });
    
    var openCollaborativePlaylist = function openCollaborativePlaylistFunction(attributes) {
        
        collaborativePlaylistsManager.get(attributes.collaborativePlaylistId, function getCollaborativePlayistCallback(error, collaborativePlaylistModels) {
            
            if (!error) {
                
                // get the collaborative playlist model
                var collaborativePlaylistModel = collaborativePlaylistModels[0];
                
                // connect with socket.io server
                var socketIONamespaceName = 'collaborativePlaylists';
                
                var socketIONamespace = io('http://127.0.0.1:35000/' + socketIONamespaceName);
                
                // inform server that user is joining a room
                socketIONamespace.emit('joinCollaborativePlaylist', {
                    collaborativePlaylistId: collaborativePlaylistModel.get('id')
                });
                
                socketIONamespace.on('connect', function () {
                    utilities.log('[CHAT] user is connected', 'fontColor:cyan');
                });
                
                // change url in address bar
                var routeUrl = '/desktop/collaborative-playlists/' + collaborativePlaylistModel.get('id');
                var routeOptions = {
                    trigger: false,
                    replace: false
                };
                
                var router = new Ribs.Router();
                
                router.navigate(routeUrl, routeOptions);
                
                // TODO: put the url to be shared in an input field
                
                // collaborative playlists page view
                require([
                    'views/components/chat/messageForm',
                    'views/components/chat/list',
                    'views/components/chat/item',
                    'views/components/search/bar',
                    'views/components/track/list',
                    'views/components/track/row'
                ], function (
                    ChatMessageFormView,
                    ChatMessagesListView,
                    ChatMessageItemView,
                    SearchBarView,
                    TracksListView,
                    TrackRowView
                ) {
                    
                    // chat message input form
                    var chatMessageFormView = new ChatMessageFormView();
                    
                    Ribs.Container.clear('#collaborativePlaylistChatMessageForm');
                    
                    Ribs.Container.add('#collaborativePlaylistChatMessageForm', chatMessageFormView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistChatMessageForm');
                    
                    // collaborative playlist search bar (track quries)
                    var searchBarView = new SearchBarView();
                    
                    Ribs.Container.clear('#collaborativePlaylistSearchForm');
                    
                    Ribs.Container.add('#collaborativePlaylistSearchForm', searchBarView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistSearchForm');
                    
                    // chat messages list collection
                    var chatMessagesCollection = new ChatMessagesCollection();
                    
                    // chat messages list view initialization
                    var chatMessagesListView = new ChatMessagesListView({
                        collection: chatMessagesCollection,
                        ModelView: ChatMessageItemView,
                        ModelViewOptions: {
                            reRenderOnChange: true
                        },
                        listSelector: '.js-list'
                    });
                    
                    Ribs.Container.clear('#collaborativePlaylistChatMessagesList');
                    
                    Ribs.Container.add('#collaborativePlaylistChatMessagesList', chatMessagesListView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistChatMessagesList');
                    
                    // collaborative playlist tracks list collection
                    var collaborativePlaylistTracksCollection = new CollaborativePlaylistTracksCollection([], { comparator: 'upVotes' });
                    
                    // collaborative playlist tracks list view initialization
                    var collaborativePlaylistTracksListView = new TracksListView({
                        collection: collaborativePlaylistTracksCollection,
                        ModelView: TrackRowView,
                        ModelViewOptions: {
                            reRenderOnChange: true
                        },
                        listSelector: '.js-list'
                    });
                    
                    Ribs.Container.clear('#collaborativePlaylistTracksList');
                    
                    Ribs.Container.add('#collaborativePlaylistTracksList', collaborativePlaylistTracksListView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistTracksList');
                    
                    // check if there are already tracks in this collaborative playlist
                    if (attributes.tracks !== undefined) {
                        
                        var tracksList = attributes.tracks;

                        var tracksIds = [];
                        
                        _.each(tracksList, function tracksListCallback(trackObject) {
                        
                            tracksIds.push(trackObject.track_id);
                        
                        });
                        
                        if (tracksIds.length > 0) {

                            // if the user has joined a collaborative playlist which already has tracks, fetch and display them
                            tracksManager.get(tracksIds, function getTracksCallback(error, trackModelsArray) {
                            
                                if (!error) {
                                    
                                    _.each(trackModelsArray, function eachTrackCallback(trackModel) {
                                        
                                        var trackId = trackModel.get('id');

                                        // get the track object, from collaborative playlist tracks list (server / mongodb)
                                        var trackObject = _.findWhere(tracksList, { track_id: trackId });

                                        // create a new collaborative playlist track model
                                        var collaborativePlaylistTrackModel = new CollaborativePlaylistTrackModel({
                                            id: trackId,
                                            dateAdded: Moment(trackObject.date_added).unix(),
                                            trackModel: trackModel,
                                            authorId: trackObject.author_id,
                                            upVotes: 0
                                        });
                                        
                                        collaborativePlaylistTracksCollection.add(collaborativePlaylistTrackModel);

                                    });

                                } else {
                                
                                    // TODO: create and use an error messages plugin
                                    // an error occured while getting the tracks data from the manager
                                    utilities.log('error while getting the tracks from manager, error: ' + error, 'fontColor:red');

                                }

                            });

                        }

                    }

                    // search results tracks list collection
                    var tracksSearchResultCollection = new TracksCollection();
                    
                    // search result tracks list view initialization
                    var searchResultTracksListView = new TracksListView({
                        collection: tracksSearchResultCollection,
                        ModelView: TrackRowView,
                        context: 'collaborativePlaylistSearch',
                        ModelViewOptions: {
                            reRenderOnChange: true,
                            context: 'collaborativePlaylistSearch'
                        },
                        listSelector: '.js-list'
                    });
                    
                    Ribs.Container.clear('#collaborativePlaylistSearchResults');
                    
                    Ribs.Container.add('#collaborativePlaylistSearchResults', searchResultTracksListView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistSearchResults');
                    
                    // listen for event new chat messages that the current user has typed (from client)
                    EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_SEND_MESSAGE, function createCollaborativePlaylist(attributes) {
                        
                        utilities.log('[SOCKETIO] sending a message', 'fontColor:cyan');

                        socketIONamespace.emit('messageCollaborativePlaylist', {
                            message: attributes.formValues.message.trim()
                        });

                    });
                    
                    // listen for event new incoming message (from server) add it to the messages collection (in client)
                    socketIONamespace.on('messageCollaborativePlaylist', function (attributes) {
                        
                        utilities.log('[SOCKETIO] received a message', 'fontColor:cyan');

                        chatMessagesCollection.add({
                            message: attributes.message
                        });

                    });
                    
                    // listen for event upvote by the current user (from client)
                    EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_UPVOTE, function upvoteCollaborativePlaylist(attributes) {
                        
                        utilities.log('[SOCKETIO] sending an upvote', 'fontColor:cyan');
                        
                        socketIONamespace.emit('upvoteCollaborativePlaylist', {
                            trackId: attributes.trackId
                        });

                    });
                    
                    // listen for event upvote (from server)
                    socketIONamespace.on('upvoteCollaborativePlaylist', function (attributes) {
                        
                        utilities.log('[SOCKETIO] received an upvote', 'fontColor:cyan');
                        
                        

                    });
                    
                    // only call the server once every second (debounced search queries)
                    var debouncedExecuteQuery = _.debounce(searchQueriesManager.get, 1000);

                    // listen for event user triggered a search query (in client)
                    EventsLibrary.on(EventsLibrary.constants.SEARCH_QUERY, function eventSearchQueryFunction(attributes) {
                        
                        // show the search result tracks list (still empty)
                        searchResultTracksListView.$el.show();

                        debouncedExecuteQuery(attributes.queryString, function queryGetCallback(error, results) {
                            
                            var searchResultModel = results[0];
                            
                            // clear the tracks search result collection (if any), before adding new results (from server)
                            tracksSearchResultCollection.reset();

                            var searchQueryTracksList = searchResultModel.get('tracksList');
                            
                            if (searchQueryTracksList.length > 0) {
                            
                                // get the tracks of the search result from the tracks manager (from server)
                                tracksManager.get(searchQueryTracksList.models, function getTracksCallback(error, searchQueryResultTracks) {
                                    
                                    if (!error) {
                                        
                                        // add the tracks to the list view collection (search results tracks list)
                                        tracksSearchResultCollection.add(searchQueryResultTracks);

                                    } else {

                                        // TODO: create and use an error messages plugin
                                        utilities.log('error while getting the tracks for the search result from manager, error: ' + error, 'fontColor:red');

                                    }

                                });

                            }
                        
                        });

                    });
                    
                    // listen for event (from server) a new track got added by any user
                    socketIONamespace.on('trackCollaborativePlaylist', function (attributes) {
                        
                        utilities.log('[SOCKETIO] received a track', 'fontColor:cyan');
                        
                        var collaborativePlaylistTrackObject = attributes.collaborativePlaylistTrack;
                        
                        // the track is object, convert the object into a collaborative playlist track model
                        // TODO: convert the object into a model
                        var trackModel = new TrackModel(attributes.collaborativePlaylistTrack.trackModel);
                        
                        collaborativePlaylistTrackObject.trackModel = trackModel;
                        
                        // update the clients collaborative playlist tracks collection
                        collaborativePlaylistTracksCollection.add(collaborativePlaylistTrackObject);

                    });
                    
                    // listen for add track to collaborative playlist events (from client / on click)
                    EventsLibrary.on(EventsLibrary.constants.TRACK_ADD_TO_COLLABORATIVE, function eventAddToCollaborativeFunction(attributes) {

                        // hide the search result tracks list
                        searchResultTracksListView.$el.hide();
                        
                        // empty the search input field of the search bar
                        searchBarView.$el.find('.js-searchBar-input').val('');
                        
                        // clear the tracks search result tracks collection
                        tracksSearchResultCollection.reset();
                        
                        // check if the model track is already in the collaborative playlist
                        var existingModel = collaborativePlaylistTracksCollection.get(attributes.trackId);
                        
                        if (existingModel === undefined) {

                            // get the track model from manager
                            // get the track now and send it to the server which will dispatch it to the other user
                            // so that NOT every user needs to do a fetchtrack himself
                            tracksManager.get(attributes.trackId, function getTracksCallback(error, tracksArray) {
                            
                                if (!error) {
                                    
                                    // get track model
                                    var trackModel = tracksArray[0];
                                    
                                    // create a new collaborative playlist track model
                                    var collaborativePlaylistTrackModel = new CollaborativePlaylistTrackModel({
                                        id: trackModel.get('id'),
                                        trackModel: trackModel
                                    });

                                    // send information to socket.io (to the server)
                                    socketIONamespace.emit('trackCollaborativePlaylist', {
                                        collaborativePlaylistTrack: collaborativePlaylistTrackModel
                                    });

                                } else {

                                    // TODO: create and use an error messages plugin
                                    // an error occured while getting the track data from the manager
                                    utilities.log('error while getting the track from manager, error: ' + error, 'fontColor:red');

                                }

                            });

                        } else {
                            
                            // TODO: create and use an error messages plugin
                            // error this track is already in the collaborative playlist (any track can only be once in a playlist / no duplicates allowed)
                            utilities.log('error track is already in collaborative playlist', 'fontColor:red');

                        }

                    });

                });

            } else {

                // TODO: collaborative playlist not found error
                // the collaborative playlist does not exist / it may have expired
                // TODO: if a collaborative playlist did not have any visitors for a while we could delete it
                utilities.log('error while getting the collaborative playlist from manager, error: ' + error, 'fontColor:red');

            }
                    
        });
    
    };

    return CollaborativePlaylistsController;
    
});