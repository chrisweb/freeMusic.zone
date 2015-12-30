/**
 * 
 * oauth
 * 
 * @param {type} $
 * @param {type} Configuration
 * @param {type} utilities
 * @param {type} EventsLibrary
 * 
 * @returns {oauth_L9.oauthAnonym$1}
 */
define([
    'jquery',
    'configuration',
    'chrisweb-utilities',
    'library.events'

], function (
    $,
    Configuration,
    utilities,
    EventsLibrary
) {

    'use strict';
    
    /**
     * 
     * listen for connected
     * 
     * @returns {undefined}
     */
    var listenForConnected = function () {
        
        // the oauth page that is in the iframe will trigger the "connected"
        // event from within the iframe on successfull oauth connection, we
        // listen for that event and trigger an app event to inform the app
        // that the oauth process has come to an end
        window.connected = function() {

            utilities.log('oauth connected');

            EventsLibrary.trigger(EventsLibrary.constants.OAUTH_CONNECTED);

        };
        
    };
    
    /**
     * 
     * fetch the oauth url from server
     * it contains a secret state variable that is also in the session to
     * verify the oauth response, thats why its build on the server
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    var fetchOauthUrl = function fetchOauthUrlFunction(callback) {
        
        
        var configuration = Configuration.get();
        
        var jqXHR = $.ajax({
            url: configuration.server.path + '/oauth/url',
            type: 'GET',
            dataType: 'json'
        });

        jqXHR.done(function(dataJson, textStatus, jqXHR) {

            //utilities.log(dataJson);
            //utilities.log(textStatus);
            //utilities.log(jqXHR);

            callback(false, dataJson);

        });

        jqXHR.fail(function(jqXHR, textStatus, errorThrown) {

            //utilities.log(jqXHR);
            //utilities.log(textStatus);
            //utilities.log(errorThrown);

            callback(errorThrown);

        });

    };

    return {
        listenForConnected: listenForConnected,
        fetchOauthUrl: fetchOauthUrl
    };

});