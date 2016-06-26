/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery/dist/jquery'
    }
    
});

require([
	'jquery'
	
], function (
	$
) {

    'use strict';

    var startup = function startupFunction() {

        

    };

    startup();

});