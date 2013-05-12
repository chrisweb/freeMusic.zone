/**
 * 
 * require js setup
 * 
 * @param object param
 */
require.config({
    
    baseUrl: '/javascripts',

    paths: {
        'utilities': 'library/utilities-0.0.1',
        'configuration': 'application/configurations/configuration-0.0.1',
        'bootstrap': 'application/bootstrap-0.0.1',
        'application': 'application/application-0.0.1',
        'controllers': 'application/controllers/controllers-0.0.1',
        'filters': 'application/filters/filters-0.0.1',
        'services': 'application/services/services-0.0.1',
        'directives': 'application/directives/directives-0.0.1',
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
        'angular': 'vendor/angular-1.1.4/angular',
        'angular-bootstrap': 'vendor/angular-1.1.4/angular-bootstrap',
        'angular-bootstrap-prettify': 'vendor/angular-1.1.4/angular-bootstrap-prettify',
        'angular-cookies': 'vendor/angular-1.1.4/angular-cookies',
        'angular-loader': 'vendor/angular-1.1.4/angular-loader',
        'angular-mobile': 'vendor/angular-1.1.4/angular-mobile',
        'angular-resource': 'vendor/angular-1.1.4/angular-resource',
        'angular-sanitize': 'vendor/angular-1.1.4/angular-sanitize',
        'angular-mocks': 'vendor/angular-1.1.4/angular-mocks',
        'angular-scenario': 'vendor/angular-1.1.4/angular-scenario',
        'angular-locale_en': 'vendor/angular-1.1.4/i18n/angular-locale_en.js',
        'angular-locale_de': 'vendor/angular-1.1.4/i18n/angular-locale_de.js',
        'angular-locale_fr': 'vendor/angular-1.1.4/i18n/angular-locale_fr.js'
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
        'angular': { deps: ['jquery'], exports: 'angular' },
        'angular-bootstrap': { deps: ['angular'] },
        'angular-bootstrap-prettify': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-loader': { deps: ['angular'] },
        'angular-mobile': { deps: ['angular'] },
        'angular-resource': { deps: ['angular'] },
        'angular-sanitize': { deps: ['angular'] },
        'angular-mocks': { deps: ['angular'] },
        'angular-scenario': { deps: ['angular'] },
        'angular-locale_en': { deps: ['angular'] },
        'angular-locale_de': { deps: ['angular'] },
        'angular-locale_fr': { deps: ['angular'] }
    }

});

/**
 * 
 * @param object $
 * @param object application
 */
require(['bootstrap', 'angular', 'angular-bootstrap'], function(bootstrap) {
    
    // enforce ecma script strict mode
    'use strict';

    /**
     * initialize the application
     */
    $(function() {
        
        bootstrap.run();
        
    });
    
});
