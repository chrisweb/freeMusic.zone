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
    'text!application/templates/connect/connect-0.0.1.html',
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

            var configurationObject = configuration.get();
            var jamendoApiConfiguration = configurationObject.jamendoApi;

            var requestUrl = '';

            // protocol
            requestUrl += 'https://';

            // host
            requestUrl += jamendoApiConfiguration.apiHost;

            // port
            if (
                typeof(jamendoApiConfiguration.apiPort) !== 'undefined'
                && jamendoApiConfiguration.apiPort !== ''
                && jamendoApiConfiguration.apiPort != 80
            ) {

                requestUrl += ':' + jamendoApiConfiguration.apiPort;

            }

            // api version and authorize resource path
            requestUrl += jamendoApiConfiguration.apiVersionPath;
            requestUrl += jamendoApiConfiguration.resources.authorize;

            // parameters
            requestUrl += '?client_id=' + jamendoApiConfiguration.clientId;
            requestUrl += '&redirect_uri=' + jamendoApiConfiguration.redirect_uri;
            requestUrl += '&scope=' + jamendoApiConfiguration.scope;

            // TODO: create a secret state string and store it in LocalStorage
            var state = '';

            // state
            requestUrl += '&state=' + state;

            utilities.log('[APPLICATION] requestUrl: ' + requestUrl, 'green');

            // http://www.jacklmoore.com/colorbox/
            $.colorbox({
                href: requestUrl,
                iframe: true,
                fastIframe: false,
                width: '50%',
                height: '50%',
                onOpen:function() {
                    utilities.log('[CONNECT VIEW] colorbox opened', 'blue');
                },
                onLoad:function() {
                    utilities.log('[CONNECT VIEW] colorbox loaded', 'blue');
                },
                onComplete:function() {
                    utilities.log('[CONNECT VIEW] colorbox completed', 'blue');
                },
                onCleanup:function() {
                    utilities.log('[CONNECT VIEW] colorbox cleanedup', 'blue');
                },
                onClosed:function() {
                    utilities.log('[CONNECT VIEW] colorbox closed', 'blue');
                }        
            });
    
        }

    });

});