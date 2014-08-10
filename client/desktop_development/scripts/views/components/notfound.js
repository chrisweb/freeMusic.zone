/**
 * 
 * 404 notfound view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} Backbone
 * @param {type} JST
 * @param {type} utilities
 * @param {type} configurationModule
 * @param {type} view
 * @returns {_L12.Anonym$2}
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'chrisweb.utilities',
    'configuration',
    'ribs.view'
], function ($, _, Backbone, JST, utilities, configurationModule, view) {
    
    'use strict';
    
    var NotfoundView = view.extend({
        
        onInitialize: function() {
            
            utilities.log('[NOTFOUND PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/partials/notfound'],
        
        // view events
        events: {
            
        },

        // render
        render: function() {

            // put the searcj template into the section#main
            this.$el.html(this.template);
            
            // enables chainability
            return this;

        }
        
    });
    
    var insertInto = function insertIntoFunction(element) {
        
        var notfoundView = new NotfoundView();
        
        $(element).append(notfoundView.create());
        
    };
    
    return {
        insertInto: insertInto
    };
    
});