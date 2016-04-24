/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery-2.2.1/jquery.min'
    }
    
});

require([
	'jquery'
	
], function (
	$
) {

    'use strict';
	
    var startup = function startupFunction() {

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {

            $('.error').text('web speech not supported');

        }

        var $commandsOutput = $('.commands_output');

        var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var GrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

        var recognition = new Recognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.lang = 'en_US';

        // speech recognition grammar
        // https://www.w3.org/TR/jsgf/
        // chrome does not seem to support this, yet
        var grammarList = new GrammarList();

        var grammar = '#JSGF V1.0; grammar actions; public <action> = play | stop | pause | next | previous;';

        grammarList.addFromString(grammar, 1);

        recognition.grammars = grammarList;

        // start
        recognition.start();

        recognition.onstart = function () {

            console.log('recognition started');

        };

        recognition.onerror = function (event) {

            console.log('recognition error');

            console.log(event.error);

        };

        recognition.onend = function () {

            console.log('recognition stopped');

        };

        recognition.onresult = function (event) {

            console.log('recognition result', event.results);

            var interim_transcript = '';

            for (var i = event.resultIndex; i < event.results.length; ++i) {

                if (event.results[i].isFinal) {

                    console.log('final result: ', event.results[i][0].transcript, event.results[i]);

                    $commandsOutput.append('<li>' + event.results[i][0].transcript + ' (' + event.results[i][0].confidence + ')</li>');

                } else {

                    console.log('interim result: ', event.results[i][0].transcript, event.results[i]);

                }

            }



        };

    };
	
	startup();

});