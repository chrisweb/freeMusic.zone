/**
 * 
 * require js setup
 * 
 * @param object param
 */
require.config({
    
    baseUrl: '/javascripts',

    paths: {
        'text': 'vendor/text-2.0.6',
        'utilities': 'library/utilities-0.0.1',
        'configuration': 'application/configurations/configuration-0.0.1',
        'bootstrap': 'application/bootstrap-0.0.1',
        'routes': 'library/routes-0.0.1',
        'jquery': 'vendor/jquery-2.0.0', // http://jquery.com/
        'modernizr': 'vendor/modernizr.custom.42019', // http://modernizr.com/
        'colorbox': 'vendor/jquery.colorbox-1.4.10',
        'twitter-bootstrap-affix': 'vendor/bootstrap-3.0.0-wip/bootstrap-affix',
        'twitter-bootstrap-alert': 'vendor/bootstrap-3.0.0-wip/bootstrap-alert',
        'twitter-bootstrap-button': 'vendor/bootstrap-3.0.0-wip/bootstrap-button',
        'twitter-bootstrap-carousel': 'vendor/bootstrap-3.0.0-wip/bootstrap-carousel',
        'twitter-bootstrap-collapse': 'vendor/bootstrap-3.0.0-wip/bootstrap-collapse',
        'twitter-bootstrap-dropdown': 'vendor/bootstrap-3.0.0-wip/bootstrap-dropdown',
        'twitter-bootstrap-modal': 'vendor/bootstrap-3.0.0-wip/bootstrap-modal',
        'twitter-bootstrap-popover': 'vendor/bootstrap-3.0.0-wip/bootstrap-popover',
        'twitter-bootstrap-scrollspy': 'vendor/bootstrap-3.0.0-wip/bootstrap-scrollspy',
        'twitter-bootstrap-tab': 'vendor/bootstrap-3.0.0-wip/bootstrap-tab',
        'twitter-bootstrap-tolltip': 'vendor/bootstrap-3.0.0-wip/bootstrap-tolltip',
        'twitter-bootstrap-transition': 'vendor/bootstrap-3.0.0-wip/bootstrap-transition',
        'twitter-bootstrap-typehead': 'vendor/bootstrap-3.0.0-wip/bootstrap-typehead',
        'underscore': 'vendor/underscore-1.4.4',
        'backbone': 'vendor/backbone-1.0.0'
    },
    
    shim: {
        'bootstrap-affix': { deps: ['jquery'] },
        'bootstrap-alert': { deps: ['jquery'] },
        'bootstrap-button': { deps: ['jquery'] },
        'bootstrap-carousel': { deps: ['jquery'] },
        'bootstrap-collapse': { deps: ['jquery'] },
        'bootstrap-dropdown': { deps: ['jquery'] },
        'bootstrap-modal': { deps: ['jquery'] },
        'bootstrap-popover': { deps: ['jquery'] },
        'bootstrap-scrollspy': { deps: ['jquery'] },
        'bootstrap-tab': { deps: ['jquery'] },
        'bootstrap-tolltip': { deps: ['jquery'] },
        'bootstrap-transition': { deps: ['jquery'] },
        'bootstrap-typehead': { deps: ['jquery'] },
        'colorbox': { deps: ['jquery'] },
        'underscore': { exports: '_' },
        'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' }
    }

});

/**
 * 
 * @param {type} bootstrap
 * @returns {undefined}
 */
require(['bootstrap'], function(bootstrap) {
    
    // enforce ecma script strict mode
    'use strict';

    /**
     * initialize the application
     */
    $(function() {
        
        bootstrap.run();
        
    });
    
});
