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
            var fragment = range.createContextualFragment(tagString);
            //var fragment = document.createDocumentFragment(tagString);

            // insert the new fragment at the cursors location
            range.insertNode(fragment);

            //$textEditor.focus();

            range.setEndAfter(fragment); // error node has no parent

            //range.setStartAfter(fragment);
            //range.collapse(true);

            //range.setStartBefore(fragment);
            //range.setEndAfter(fragment)

            selection.removeAllRanges();
            selection.addRange(range);

            console.log('foo');

        }

    }

    startup();

});