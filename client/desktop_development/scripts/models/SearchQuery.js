/**
 * 
 * search model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} Model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'underscore',
    'library.model'
    
], function (utilities, _, Model) {
    
    'use strict';

    var SearchQueryModel = Model.extend({
            
        onInitialize: function() {
            
            utilities.log('[SEARCH QUERY MODEL] initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            tracksList: null,
            query: ''
        },
        validate: function(attrs) {
            
        }

    });

    return SearchQueryModel;
    
});