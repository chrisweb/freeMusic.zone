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
    'text!application/templates/homepage/home.html'
], function(configuration, utilities, Backbone, _, $, homeTemplate) {

    'use strict';

    var view = Backbone.View.extend({
        
        el: $('#content'),
        
        initialize: function() {
    
            utilities.log('[HOME VIEW] initialization...', 'blue');
    
        },
        
        events: {
    
            'click #connect': 'connectClick'
    
        },
        
        render: function() {

            utilities.log('[HOME VIEW] rendering...', 'blue');

            var compiledTemplate = _.template(homeTemplate);
            
            this.$el.append(compiledTemplate);
            
        },
                
        connectClick: function() {
    
            
    
        }

    });
    
    var homepageView = new view();
    
    return homepageView;

});