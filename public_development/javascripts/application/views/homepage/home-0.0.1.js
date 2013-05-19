/**
 * 
 * homepage view
 * 
 */
define([
    'configuration',
    'utilities',
    'backbone',
    'underscore',
    'jquery',
    // using require js text for templates
    'text!application/templates/homepage/home-0.0.1.html',
    'colorbox'
], function(configuration, utilities, Backbone, _, $, homeTemplate) {

    'use strict';

    return Backbone.View.extend({
        
        el: $('#content'),
        
        initialize: function() {
    
            utilities.log('[HOME VIEW] initialization...', 'blue');
    
        },
        
        events: {
    
            
    
        },
        
        render: function() {

            utilities.log('[HOME VIEW] rendering...', 'blue');

            var compiledTemplate = _.template(homeTemplate);
            
            this.$el.append(compiledTemplate);
            
        }

    });

});