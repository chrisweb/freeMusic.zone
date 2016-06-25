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

        // prefixed version for chrome, not supported in firefox yet and might be coming to IE, no information for safari, see documentation.md
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {

            $('.error').text('web speech API not supported in your browser, try this prototype in chrome');

            return false;

        }

        var $commandsOutput = $('.commands_output');

        var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var GrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

        var recognition = new Recognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.lang = 'en-GB';

        // speech recognition grammar
        // https://www.w3.org/TR/jsgf/
        // chrome does not seem to support this, yet
        var grammarList = new GrammarList();

        var grammar = '#JSGF V1.0; grammar actions; public <action> = play | stop | pause | next | previous;';

        grammarList.addFromString(grammar, 1);

        // not supported by chrome, see documentation.md, even though the methods exist they have no influence on the result
        recognition.grammars = grammarList;

        // start
        recognition.start();

        recognition.onstart = function () {

            var message = 'recognition started';

            console.log(message);

            $commandsOutput.append('<li>' + message + '</li>');

        };

        recognition.onerror = function (event) {

            console.log('recognition error');

            console.log(event.error);

        };

        recognition.onend = function () {

            var message = 'recognition stopped';

            console.log(message);

            $commandsOutput.append('<li>' + message + '</li>');

        };

        var foundResultInInterim = false;

        recognition.onresult = function (event) {

            console.log('recognition result', event.results);

            for (var i = event.resultIndex; i < event.results.length; ++i) {

                if (event.results[i].isFinal) {

                    var dictionaryResult = checkInDictionary(event.results[i][0].transcript, event.results[i][0].confidence);

                    console.log('FINAL result: ', event.results[i][0].transcript + ' (' + event.results[i][0].confidence + ')', event.results[i]);

                    if (!foundResultInInterim) {

                        if (dictionaryResult.match !== '') {

                            if (dictionaryResult.direct) {

                                $commandsOutput.append('<li>[FINAL] loud and clear "' + dictionaryResult.match + '" (' + event.results[i][0].confidence + ')</li>');

                            } else {

                                $commandsOutput.append('<li>[FINAL] you said "' + event.results[i][0].transcript + '" and I understood "' + dictionaryResult.match + '" (' + event.results[i][0].confidence + ')</li>');

                            }

                        } else {

                            $commandsOutput.append('<li>I don\'t understand</li>');

                        }

                    }

                    foundResultInInterim = false;

                } else {

                    var dictionaryResult = checkInDictionary(event.results[i][0].transcript, event.results[i][0].confidence);

                    console.log('INTERIM result: ', event.results[i][0].transcript + ' (' + event.results[i][0].confidence + ')', event.results[i]);

                    if (dictionaryResult.match !== '') {

                        if (dictionaryResult.direct) {

                            $commandsOutput.append('<li>[INTERIM] loud and clear "' + dictionaryResult.match + '" (' + event.results[i][0].confidence + ')</li>');

                        } else {

                            $commandsOutput.append('<li>[INTERIM] you said "' + event.results[i][0].transcript + '" and I understood "' + dictionaryResult.match + '" (' + event.results[i][0].confidence + ')</li>');

                        }

                        foundResultInInterim = true;

                    }

                }

            }



        };

    };

    var checkInDictionary = function checkInDictionaryFunction(detectedString, detectedConfidence) {

        var soundsLikePlay = [
            'play',
            'aye',
            'pay',
            'stay',
            'may',
            'say',
            'gay',
            'yay',
            'gray',
            'grey',
            'they',
            'tray',
            'way',
            'pray',
            'prey',
            'okay',
            'hey'
        ];

        var soundsLikeStop = [
            'stop',
            'cop',
            'pop',
            'stop',
            'hop',
            'shop',
            'flop'
        ];

        var soundsLikePause = [
            'pause',
            'cause',
            'gauze',
            'was',
            'post',
            'photos',
            'bus',
            'porsche'
        ];

        var soundsLikeNext = [
            'next',
            'text',
            'max'
        ];

        var soundsLikePrevious = [
            'previous',
            'previews',
            'bridges',
            'pictures'
        ];

        var soundsLikeDictionaries = [soundsLikePlay, soundsLikeStop, soundsLikePause, soundsLikeNext, soundsLikePrevious];

        var dictionayMatch = '';

        // TODO: change 0 to whatever to ensure minimal confidence?
        if (detectedConfidence > 0.1) {

            var actionNames = [
                'play',
                'stop',
                'pause',
                'next',
                'previous'
            ];

            var actionNamesIndex = -1;

            if (actionNames.length > 0) {

                actionNamesIndex = actionNames.indexOf(detectedString.trim().toLowerCase());

            }

            if (actionNamesIndex !== -1) {

                dictionayMatch = actionNames[actionNamesIndex];

                return { 'match': dictionayMatch, 'direct': true };

            } else {
                
                soundsLikeDictionaries.forEach(function (soundsLikeDictionary) {

                    var soundsLikeIndex = -1;

                    if (soundsLikeDictionary.length > 0) {

                        soundsLikeIndex = soundsLikeDictionary.indexOf(detectedString.trim().toLowerCase());

                    }

                    if (soundsLikeIndex !== -1) {

                        dictionayMatch = soundsLikeDictionary[0];

                        return { 'match': dictionayMatch, 'direct': false };

                    }

                });

            }

        }

        return { 'match': dictionayMatch, 'direct': false };

    };

    $(function () {

        startup();

    });

});