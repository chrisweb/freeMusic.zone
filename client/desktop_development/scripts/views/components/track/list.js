/**
 * 
 * track list component view
 * 
 * @param {type} utilities
 * @param {type} $
 * @param {type} _
 * @param {type} view
 * @param {type} JST
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'jquery',
    'underscore',
    'ribs.view',
    'templates'
], function (utilities, $, _, view, JST) {
    
    'use strict';
    
    var TracksListView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[TRACK LIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            //this.listenTo(this.collection, 'add', this.addModel);
            
            //this.listenTo(this.collection, 'reset', this.clear);
            
        },

        template: JST['templates/components/track/list'],
        
        listId: 'trackSearchResults',
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
            
            
        }
        
    });

    return TracksListView;
    
});