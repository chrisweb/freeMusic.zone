/**
 * 
 * @param {type} param
 */
require.config({
    
    baseUrl: 'javascript/',

    paths: {
        'jquery': 'vendor/jquery-2.2.1/jquery', // http://jquery.com/
        'configuration': 'configuration-0.0.1',
        'Modernizr': 'vendor/modernizr_build/modernizr', // http://modernizr.com/
        'html5Tests': 'html5_tests-0.0.1',
        'socket.io': 'http://127.0.0.1:35000/socket.io/socket.io',
        'serverCommunication': 'server_communication-0.0.1',
        'utilities': 'utilities-0.0.1',
        'canvas': 'canvas-0.0.2',
        'application': 'application-0.0.4'
    }

});

/**
 * 
 * @param {type} $
 * @param {type} application
 * @returns {undefined}
 */
require([
	'jquery',
	'application'
], function(
	$,
	application
) {

    /**
     * 
     * @returns {undefined}
     */
    $(function() {
        
        application.initialize();
        
    });
});
