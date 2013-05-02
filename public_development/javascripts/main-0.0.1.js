/**
 * 
 * @param {type} param
 */
require.config({
    
    baseUrl: '/javascripts',

    paths: {
        'jquery': 'vendor/jquery-2.0.0', // http://jquery.com/
        'configuration': 'configuration-0.0.1',
        'Modernizr': 'vendor/modernizr.custom.42019', // http://modernizr.com/
        'utilities': 'utilities-0.0.1',
        'application': 'application-0.0.1',
        'colorbox': 'vendor/jquery.colorbox-1.4.10',
        'bootstrap': 'vendor/bootstrap-2.3.1'
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
