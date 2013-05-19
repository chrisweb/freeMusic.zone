/**
 * 
 * connect view
 * 
 */
define([
    'configuration',
    'utilities',
    'backbone',
    'underscore',
    'jquery',
    // using require js text for templates
    'text!application/templates/connect/connect.html',
    'colorbox'
], function(configuration, utilities, Backbone, _, $, connectTemplate) {

    'use strict';

    return Backbone.View.extend({
        
        el: $('#content'),
        
        initialize: function() {
    
            utilities.log('[CONNECT VIEW] initialization...', 'blue');
    
        },
        
        events: {
    
            'click #connect': 'connectClick'
    
        },
        
        render: function() {

            utilities.log('[CONNECT VIEW] rendering...', 'blue');

            var compiledTemplate = _.template(connectTemplate);
            
            this.$el.append(compiledTemplate);
            
        },
                
        connectClick: function(event) {
    
            event.preventDefault();
    
            utilities.log('[CONNECT VIEW] connect got clicked', 'blue');

            $.colorbox({
                href: '#connectBox',
                inline: true,
                onOpen:function(){ 
                    utilities.log('[CONNECT VIEW] colorbox opened', 'blue');
                },
                onLoad:function(){ 
                    utilities.log('[CONNECT VIEW] colorbox loaded', 'blue');
                },
                onComplete:function(){ 
                    utilities.log('[CONNECT VIEW] colorbox completed', 'blue');
                },
                onCleanup:function(){ 
                    utilities.log('[CONNECT VIEW] colorbox cleanedup', 'blue');
                },
                onClosed:function(){ 
                    utilities.log('[CONNECT VIEW] colorbox closed', 'blue');
                }
            });
    
        }

    });

});