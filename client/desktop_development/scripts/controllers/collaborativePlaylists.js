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
    'library.events'

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
    EventsLibrary
) {
    
    'use strict';

    var CollaborativePlaylistsController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction(parameters) {
        
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] action: index', 'fontColor:blue');

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
                
                // load existing collaborative playlists from the server
                var collaborativePlaylistsListCollection = new CollaborativePlaylistsCollection();
                
                require([
                    'views/components/collaborativePlaylists/list',
                    'views/components/collaborativePlaylists/item'
                ], function (CollaborativePlaylistsListView, CollaborativePlaylistsItemView) {
                    
                    // the dom
                    var collaborativePlaylistsListView = new CollaborativePlaylistsListView({
                        collection: collaborativePlaylistsListCollection,
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

                // listen for event new collaborative playlist
                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_NEW, function newCollaborativePlaylist() {
                    
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
                
                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_CREATE, function createCollaborativePlaylist(attributes) {
                    
                    // hide create form
                    Ribs.Container.clear('#createCollaborativePlaylist');
                    
                    // start loading animation
                    // TODO: create and use a loading animation plugin
                    $('#createCollaborativePlaylist').text('Loading...');
                    
                    // save the new collaborative playlist
                    var collaborativePlaylist = {
                        name: attributes.formValues.name.trim()
                    };
                    
                    collaborativePlaylistsManager.saveOne(collaborativePlaylist, function saveCollaborativePlaylistCallback(error, model) {
                        
                        // stop loading animation
                        $('#createCollaborativePlaylist').text('');
                        
                        if (error) {
                            
                            // display error
                            // TODO: create and use an error messages plugin
                            $('#createCollaborativePlaylist').text('error creating new collaborative playlist');

                        } else {
                            
                            //console.log(model);
                            
                            collaborativePlaylistsListCollection.add(model);

                        }
                    
                    });

                });

                EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_JOIN, function createCollaborativePlaylist(attributes) {
                    
                    openCollaborativePlaylist(attributes);

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
                    
                    // chat message form
                    var chatMessageFormView = new ChatMessageFormView();
                    
                    Ribs.Container.clear('#collaborativePlaylistChatMessageForm');
                    
                    Ribs.Container.add('#collaborativePlaylistChatMessageForm', chatMessageFormView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistChatMessageForm');
                    
                    // collaborative playlist track search
                    var searchBarView = new SearchBarView();
                    
                    Ribs.Container.clear('#collaborativePlaylistSearchForm');
                    
                    Ribs.Container.add('#collaborativePlaylistSearchForm', searchBarView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistSearchForm');
                    
                    // chat messages list
                    var chatMessagesCollection = new ChatMessagesCollection();

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
                    
                    // collaborative playlist tracks list
                    var collaborativePlaylistTracksCollection = new CollaborativePlaylistTracksCollection();

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
                    
                    // search results list
                    var tracksSearchResultCollection = new TracksCollection();

                    var tracksListView = new TracksListView({
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
                    
                    Ribs.Container.add('#collaborativePlaylistSearchResults', tracksListView);
                    
                    Ribs.Container.dispatch('#collaborativePlaylistSearchResults');
                    
                    // listen for chat messages by the user
                    EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_SEND_MESSAGE, function createCollaborativePlaylist(attributes) {
                        
                        utilities.log('[CHAT] sending a message', 'fontColor:cyan');

                        socketIONamespace.emit('messageCollaborativePlaylist', {
                            message: attributes.formValues.message.trim()
                        });

                    });
                    
                    // on new message add it to the messages collection
                    socketIONamespace.on('messageCollaborativePlaylist', function (attributes) {
                        
                        utilities.log('[CHAT] received a message', 'fontColor:cyan');

                        chatMessagesCollection.add({
                            message: attributes.message
                        });

                    });
                    
                    // only call the server once every second
                    var debouncedExecuteQuery = _.debounce(searchQueriesManager.get, 1000);

                    // listen for search events
                    EventsLibrary.on(EventsLibrary.constants.SEARCH_QUERY, function (attributes) {
                        
                        debouncedExecuteQuery(attributes.queryString, function queryGetCallback(error, results) {
                            
                            var searchResultModel = results[0];
                            
                            // clear the tracks search result collection, before adding new results
                            tracksSearchResultCollection.reset();

                            var searchQueryTracksList = searchResultModel.get('tracksList');
                            
                            if (searchQueryTracksList.length > 0) {
                            
                                // TODO: get the tracks from tracks manager
                                // searchResultModel.tracksList.models
                                tracksManager.get(searchQueryTracksList.models, function getTracksCallback(error, searchQueryResultTracks) {
                                    
                                    if (!error) {

                                        tracksSearchResultCollection.add(searchQueryResultTracks);

                                    } else {

                                        // TODO: create and use an error messages plugin

                                    }

                                });

                            }
                        
                        });

                    });

                });

            } else {

                // TODO: collaborative playlist not found error

            }
                    
        });
    
    };

    return CollaborativePlaylistsController;
    
});