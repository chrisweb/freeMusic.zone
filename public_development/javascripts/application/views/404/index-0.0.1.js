/**
 * 
 * 404 view
 * 
 */
define([
    'configuration',
    'utilities',
    'backbone',
    'underscore',
    'jquery',
    // using require js text for templates
    'text!application/templates/404/index-0.0.1.html'
], function(configuration, utilities, Backbone, _, $, notfoundTemplate) {

    'use strict';

    return Backbone.View.extend({
        
        el: $('#content'),
        
        initialize: function(options) {
    
            utilities.log('[404 VIEW] initialization...', 'blue');
    
        },
        
        events: {
    
            
    
        },
        
        render: function() {

            utilities.log('[404 VIEW] rendering...', 'blue');

            var compiledTemplate = _.template(notfoundTemplate);
            
            this.$el.append(compiledTemplate);
            
        }

    });

});