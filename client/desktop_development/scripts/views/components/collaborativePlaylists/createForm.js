/**
 * 
 * create collaborative playlist form component view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsLibrary
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb-utilities',
    'library.view',
    'library.events'

], function (
    $,
    _,
    JST,
    utilities,
    View,
    EventsLibrary
) {
    
    'use strict';

    var CreateCollaborativePlaylistView = View.extend( {
        
        onInitializeStart: function () {
            
            utilities.log('[CREATE COLLABORATIVE PLAYLIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/components/collaborativePlaylists/createForm'],
        
        // view events
        events: {
            'submit': 'createCollaborativePlaylist'
        },
        
        onRender: function () {
            
            
            
        },
        createCollaborativePlaylist: function createCollaborativePlaylistFunction(event) {
            
            event.preventDefault();
            
            var collaborativePlaylistFormValues = this.$el.serializeArray();

            EventsLibrary.trigger(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_CREATE, {
                formValues: {
                    name: collaborativePlaylistFormValues[0].value
                }
            });
        
        }
        
    });
    
    return CreateCollaborativePlaylistView;
    
});