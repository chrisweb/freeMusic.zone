/**
 * 
 * chat bar view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb.utilities',
    'ribs.view',
    'library.eventsManager'
    
], function ($, _, JST, utilities, View, EventsManager) {
    
    'use strict';

    var SearchBarView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[CHAT BAR PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/components/chat/bar'],
        
        // view events
        events: {
            
        }
        
    });
    
    return SearchBarView;
    
});