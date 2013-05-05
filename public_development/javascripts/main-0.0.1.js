/**
 * 
 * @param {type} param
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
        'Modernizr': 'vendor/modernizr.custom.42019', // http://modernizr.com/
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
        'colorbox': ['jquery']
    }

});

/**
 * 
 * @param {type} $
 * @param {type} application
 * @returns {undefined}
 */
require(['jquery', 'application'], function($, application) {

    /**
     * 
     * @returns {undefined}
     */
    $(function() {
        
        application.initialize();
        
    });
    
});
