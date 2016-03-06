
/**
 * 
 * @param {type} Modernizr
 * @returns {_L4.Anonym$0}
 */
define([
	'Modernizr',
	'utilities'
], function(
	Modernizr,
	utilities
) {

    var Modernizr = window.Modernizr;

    /**
     * 
     * @param {type} messagesDiv
     * @returns {Boolean}
     */
    var featuresCheck = function(messagesDiv) {

        var passedAllTests = true;
        var errors = '';
        
        // test for html5 @fontface
        // this test is optional
        if (!Modernizr.fontface) {

            errors += 'Your browser does not support @fontface<br />';

            //passedAllTests = false; // this test is optional

        } else {

            utilities.log('@fontface test passed');

        }
        
        // test for html5 canvas api
        if (!Modernizr.canvas) {

            errors += 'Your browser does not support canvas<br />';

            passedAllTests = false;

        } else {

            utilities.log('canvas test passed');

        }
        
        // test for html5 history api
        // this test is optional
        if (!Modernizr.history) {

            errors += 'Your browser does not support the history api<br />';

            //passedAllTests = false; // this test is optional

        } else {

            utilities.log('HTML5 history api test passed');

        }
        
        // test for html5 audio
        if (!Modernizr.audio) {

            errors += 'Your browser does not support audio<br />';

            passedAllTests = false;

        } else {

            utilities.log('HTML5 audio test passed');

        }

        // test for html5 localstorage api
        // this test should pass in ie8/9 but fails
        // ie does not support localstorage for files
        // located on a computer, if the client is 
        // on a server everything is ok
        // http://www.wintellect.com/CS/blogs/jprosise/archive/2011/03/10/using-html5-web-storage-for-interprocess-communication.aspx
        if (!Modernizr.localstorage) {

            errors += 'Your browser does not support localstorage<br />';

            passedAllTests = false;

        } else {

            utilities.log('localstorage test passed');

        }

        // test for html5 websockets api
        if (!Modernizr.websockets) {

            errors += 'Your browser does not support websockets<br />';

            passedAllTests = false;

        } else {

            utilities.log('websockets test passed');

        }
        
        // test for html5 touch events
        // this test is optional
        if (!Modernizr.websockets) {

            errors += 'Your browser does not support touch events<br />';

            //passedAllTests = false; // this test is optional

        } else {

            utilities.log('touch events test passed');

        }

        // print test results
        if (!passedAllTests) {

            var messageHTML = '<div class="alert-error">';
            messageHTML += errors + '</div>';

            messagesDiv.html(messageHTML);

        } else {

            var messageHTML = '<div class="alert-info">HTML5 Tests passed!</div>';

            messagesDiv.html(messageHTML);

        }

        //  return true if all test passed else false
        return passedAllTests;

    };

    /**
     * 
     */
    return {
        
        'html5FeaturesCheck': featuresCheck

    };

});

