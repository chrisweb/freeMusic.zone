define([
    'chrisweb-utilities',
    'library.events',
    'models.User',
    'moment',
    'collections.PlaylistsList'

], function (
    utilities,
    EventsLibrary,
    UserModel,
    moment,
    PlaylistsListCollection
) {
    
    'use strict';
    
    var instance = null;

    /**
     * user singleton
     * 
     * @constructor
     * @alias module library/user
     */
    var UserSingleton = function UserSingletonFunction() {
        
        if (instance !== null) {
            throw new Error('singleton has already been instantiated, use getInstance()');
        }
        
        this.model = new UserModel();
        
    };
    
    UserSingleton.prototype = {

        /**
         * 
         * fetch the user data from server
         * 
         * @param requestCallback userDataCallback
         */
        fetchUserData: function fetchUserDataFunction(userDataCallback) {

            this.model.fetch({
                success: function(model, response, options) {
                    
                    if (userDataCallback !== undefined) {
                    
                        userDataCallback(false, model);
                        
                    }
                    
                },
                error: function(model, response, options) {
                    
                    utilities.log(response);
                    
                    if (userDataCallback !== undefined) {
                    
                        userDataCallback(true);
                        
                    }
                    
                }
            });
            
        },
        
        /**
         * 
         * get an attribute
         * 
         * @param {string} attributeName
         */
        getAttribute: function getAttributeFunction(attributeName, getAttributeCallback) {

            var attributeValue = this.model.get(attributeName);
            
            if (getAttributeCallback !== undefined) {

                getAttributeCallback(false, attributeValue);

            } else {

                return attributeValue;

            }

        },
        
        /**
         * 
         * set an attribute
         * 
         * @param {string} attributeName
         * @param {*} attributeValue
         */
        setAttribute: function setAttributeFunction(attributeName, attributeValue, setAttributeCallback) {

            this.model.set(attributeName, attributeValue);
            
            if (setAttributeCallback !== undefined) {
            
                setAttributeCallback(false);
            
            }

        },
        
        /**
         * check if the user is logged
         * 
         * @param requestCallback isLoggedCallback
         * 
         */
        isLogged: function isLoggedFunction(isLoggedCallback) {

            var isLogged;

            // fetch the user data from server if the user data is not already
            // in the model
            if (this.model.get('id') === null) {
                
                this.fetchUserData(function(error, model) {
                    
                    isLogged = model.get('isLogged');
                    
                    if (isLoggedCallback !== undefined) {
                    
                        // check if the user is logged
                        isLoggedCallback(false, isLogged);
                        
                    }
                    
                    EventsLibrary.trigger(EventsLibrary.constants.USER_ISLOGGED, { isLogged: isLogged });
                    
                });
                
            } else {
                
                isLogged = this.model.get('isLogged');
                
                if (isLoggedCallback !== undefined) {
                
                    isLoggedCallback(false, isLogged);
                    
                }
                
                EventsLibrary.trigger(EventsLibrary.constants.USER_ISLOGGED, { isLogged: isLogged });
                
            }
            
        },

        getPlaylistsList: function getPlaylistsListFunction(getPlaylistsListCallback) {
            
            var attributeName = 'playlistsList';
            
            var that = this;

            this.getAttribute(attributeName, function getAttributeCallback(error, playlistsList) {
                
                if (!error && playlistsList !== undefined) {
                    
                    // TODO: check the age of the data, if too old redo query

                    getPlaylistsListCallback(false, playlistsList);

                } else {
                    
                    var playlistsListCollection = new PlaylistsListCollection();
                    var queryData = {
                        whereKey: 'user',
                        whereValue: 'me'
                    };

                    playlistsListCollection.fetch({
                        data: queryData,
                        success: function (collection, response, options) {
                            
                            getPlaylistsListCallback(false, collection);
                            
                            that.setAttribute(attributeName, collection, function setAttributeCallback(error) {
                                
                                if (error) {

                                    utilities.log('failed to set user model attribute playlistsList', 'fontColor:red');

                                }
                                
                            });
                    
                        },
                        error: function (collection, response, options) {
                            
                            utilities.log(response, 'fontColor:red');
                            
                            getPlaylistsListCallback(true);
                    
                        }
                    });

                }

            });

        }
        
    };
    
    /**
     * get an instance of the user class
     */
    var getInstance = function getInstanceFunction() {
        
        if (instance === null) {
            
            utilities.log('[USER] initialized...');
            
            instance = new UserSingleton();
            
        }
        
        return instance;
        
    };

    return getInstance;
    
});