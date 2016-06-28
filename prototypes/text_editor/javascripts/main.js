/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'twemoji': 'vendor/twemoji/2/twemoji.npm'
    }
    
});

require([
	'jquery'
	
], function (
	$
) {

    'use strict';

    var $textEditor = $('.textEditor');
    var $emoticon = $('.emoticon');

    var startup = function startupFunction() {
        
        $emoticon.on('click', emojiClick);

    };

    var emojiClick = function emojiClickFunction(event) {

        event.preventDefault();

        var imageUrl = $(event.currentTarget).prop('src');

        var tagString = '<img src="' + imageUrl + '">';

        insertHtmlAtCursor(tagString);

    }

    var insertHtmlAtCursor = function insertHtmlAtCursorFunction(tagString) {
        
        if (window.getSelection && window.getSelection().getRangeAt) {

            var selection = window.getSelection();
            var range = selection.getRangeAt(0);

            // if some text is selected replace it, otherwise the new
            // node would get prepended before the selection
            range.deleteContents();

            // create a new document fragment for the element we want to insert
            // createContextualFragment is not supported by IE lower than 11
            var documentFragment = range.createContextualFragment(tagString);

            // or use createDocumentFragment, but this means a lot more code
            // the advantage is that createDocumentFragment is supported by all browser even IE6
            /*var documentFragment = document.createDocumentFragment();
            var img = document.createElement('img');
            img.src = 'https://example.com/foo.jpg';
            documentFragment.appendChild(img);*/

            // insert the new fragment at the cursors location
            range.insertNode(documentFragment);

            // to update the cursor (carret) position we can use a combination of setEndAfter and setStartAfter
            // but if the setEndAfter is called using the fragment itself (who has no parent nodes) this error gets triggered "Uncaught InvalidNodeTypeError: Failed to execute 'setEndAfter' on 'Range': the given Node has no parent."
            // a way around this would be to extract it's child node(s) and insert them before doing the setEndAfter and setStartAfter
            //var documentFragmentChild = documentFragment.childNodes[0];
            //range.setStartAfter(documentFragmentChild);
            //range.setEndAfter(documentFragmentChild);
            
            // but it's easier to use collapse in this case
            range.collapse(false);

            selection.removeAllRanges();
            selection.addRange(range);

        }

    }

    startup();

});