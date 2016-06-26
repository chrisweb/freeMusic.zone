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

        if (!('webkitSpeechSynthesis' in window) && !('speechSynthesis' in window)) {

            $('.error').text('web speech API not supported in your browser, try this prototype in chrome');

            return false;

        }

        var synthesis = window.speechSynthesis || window.webkitSpeechSynthesis;
        
        // empty at this point in chrome, as in chrome the list is determined asynchronously, see specs for more details
        if (speechSynthesis.getVoices().length === 0) {
            
            speechSynthesis.addEventListener('voiceschanged', populateVoices);

        } else {

            populateVoices();

        }

        console.log(synthesis);

    };

    // events gets called several times in chrome, no idea why
    var alreadyInitialized = false;

    var populateVoices = function populateVoicesFunction(voiceschangedEvent) {

        if (!alreadyInitialized) {

            alreadyInitialized = true;

            var synthesis = window.speechSynthesis || window.webkitSpeechSynthesis;

            var voicesList = synthesis.getVoices();

            var $voiceList = $('.voicesList');

            voicesList.forEach(function (voice) {

                var $voice = $('<li>');

                var voiceText = 'name: ' + voice.name + ', language: ' + voice.lang;

                if (voice.default) {
                    voiceText += ' (default)';
                }

                console.log(voice);

                $voice.text(voiceText);

                $voiceList.append($voice);

            });

            speakSentence(synthesis);

        }

    };

    var speakSentence = function speakSentenceFunction(synthesis) {

        var voicesList = synthesis.getVoices();

        var utterance = new SpeechSynthesisUtterance('Hello World, this is your computer speaking');

        // set a voice index
        var voiceIndex = 1;

        //find the google uk female voice if available
        var voiceUriGoogleFemale = 'Google UK English Female';

        for (var i = 0; i < voicesList.length; i++) {

            if (voicesList[i].voiceURI === voiceUriGoogleFemale) {

                voiceIndex = i;

            }

        }

        utterance.voice = voicesList[voiceIndex];
        utterance.pitch = 2; // something between 0 and 2
        utterance.rate = 0.5; // something between 0,5 and 2

        synthesis.speak(utterance);

    };

    startup();

});