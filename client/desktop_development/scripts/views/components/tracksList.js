/**
 * 
 * track list view
 * 
 * @param {type} utilities
 * @param {type} $
 * @param {type} _
 * @param {type} view
 * @param {type} JST
 * @returns {unresolved}
 */
define([
    'library.utilities',
    'jquery',
    'underscore',
    'library.view',
    'templates'
], function (utilities, $, _, view, JST) {
    
    'use strict';
    
    var TracksListView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[TRACKSLIST VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            _.bindAll(this, 'addModel');
            
            this.listenTo(this.collection, 'add', this.addModel);
            
            this.listenTo(this.collection, 'reset', this.clear);
            
        },

        template: JST['templates/partials/tracksList'],
        
        listId: 'trackSearchResults',
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
            
            
        }
        
    });

    return TracksListView;
    
});