/**
 * 
 * require js setup
 * 
 * @param object param
 */
require.config({
    
    baseUrl: '/javascripts',

    paths: {
        'jquery': 'vendor/jquery-2.0.0', // http://jquery.com/
        'configuration': 'configuration-0.0.1',
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
        'angular-locale_fr': 'vendor/angular-1.1.4/i18n/angular-locale_fr.js',
        'modernizr': 'vendor/modernizr.custom.42019', // http://modernizr.com/
        'utilities': 'utilities-0.0.1',
        'application': 'application-0.0.1',
        'colorbox': 'vendor/jquery.colorbox-1.4.10',
        'bootstrap-affix': 'vendor/bootstrap-3.0.0-wip/bootstrap-affix',
        'bootstrap-alert': 'vendor/bootstrap-3.0.0-wip/bootstrap-alert',
        'bootstrap-button': 'vendor/bootstrap-3.0.0-wip/bootstrap-button',
        'bootstrap-carousel': 'vendor/bootstrap-3.0.0-wip/bootstrap-carousel',
        'bootstrap-collapse': 'vendor/bootstrap-3.0.0-wip/bootstrap-collapse',
        'bootstrap-dropdown': 'vendor/bootstrap-3.0.0-wip/bootstrap-dropdown',
        'bootstrap-modal': 'vendor/bootstrap-3.0.0-wip/bootstrap-modal',
        'bootstrap-popover': 'vendor/bootstrap-3.0.0-wip/bootstrap-popover',
        'bootstrap-scrollspy': 'vendor/bootstrap-3.0.0-wip/bootstrap-scrollspy',
        'bootstrap-tab': 'vendor/bootstrap-3.0.0-wip/bootstrap-tab',
        'bootstrap-tolltip': 'vendor/bootstrap-3.0.0-wip/bootstrap-tolltip',
        'bootstrap-transition': 'vendor/bootstrap-3.0.0-wip/bootstrap-transition',
        'bootstrap-typehead': 'vendor/bootstrap-3.0.0-wip/bootstrap-typehead'
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
require(['application', 'angular', 'angular-bootstrap'], function(application) {
    
    // enforce ecma script strict mode
    'use strict';

    /**
     * initialize the application
     */
    $(function() {
        
        application.initialize();
        
    });
    
});
