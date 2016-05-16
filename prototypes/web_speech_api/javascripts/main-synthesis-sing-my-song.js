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

        if (!('webkitSpeechSynthesis' in window) && !('speechSynthesis' in window)) {

            $('.error').text('web speech API not supported in your browser, try this prototype in chrome');

            return false;

        }

        var synthesis = window.speechSynthesis || window.webkitSpeechSynthesis;
        
        // empty at this point in chrome, as in chrome the list is determined asynchronously, see specs for more details
        if (speechSynthesis.getVoices().length === 0) {
            
            speechSynthesis.addEventListener('voiceschanged', readyToSing);

        } else {

            readyToSing();

        }

        console.log(synthesis);

    };

    // events gets called several times in chrome, no idea why
    var alreadyInitialized = false;

    var readyToSing = function populateVoicesFunction(voiceschangedEvent) {

        if (!alreadyInitialized) {

            alreadyInitialized = true;

            var synthesis = window.speechSynthesis || window.webkitSpeechSynthesis;
            
            var $singItButton = $('.singIt');

            $singItButton.on('click', { synthesis: synthesis }, startSong);

        }

    };

    var startSong = function startSongFunction(event) {

        singIt(event);
        
        playMusic('//storage-new.newjamendo.com/?trackid=1311527&format=mp31', event);

    }

    var lines;
    var i = -1;
    var synthesisData;
    
    var singIt = function singItFunction(event) {

        synthesisData = event.data.synthesis;

        var $myLyrics = $('.myLyrics');

        var myLyrics = $myLyrics.val();
        
        lines = myLyrics.split('\n');

        speakIt();

    };

    var speakIt = function speakItFunction() {

        if (synthesisData.speaking) {

            window.setTimeout(speakIt, 100);

            return;

        } else {

            i++;

        }

        if (lines[i].substring(0,5) === 'pause') {

            var pauseTime = lines[i].match(/\(([^)]+)\)/)[1];

            var pauseMilliseconds = parseInt(pauseTime) * 1000;

            window.setTimeout(speakIt, pauseMilliseconds);

            return;

        } else {

            var utterance = new SpeechSynthesisUtterance(lines[i]);

            var voicesList = synthesisData.getVoices();

            utterance.voice = voicesList[0];
            utterance.pitch = 0.1; // something between 0 and 2
            utterance.rate = 0.8; // something between 0,5 and 2
            utterance.volume = 1;

            synthesisData.speak(utterance);

            speakIt();

        }

    };

    var playMusic = function playMusicFunction(url, event) {

        console.log('loadSound, url: ' + url);

        var request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // when loaded decode the data
        request.onload = function () {
            
            console.log('request onload');

            var AudioContext = window.AudioContext || window.webkitAudioContext;

            var audioContext = new AudioContext();

            audioContext.decodeAudioData(
                request.response,
                function onDecodeSuccess(audioBuffer) {

                    // success

                    console.log('sound got loaded, buffer: ');
                    console.log(audioBuffer);

                    console.log('playSound');

                    // http://www.html5rocks.com/en/tutorials/webaudio/intro/
                    // https://hacks.mozilla.org/2013/07/web-audio-api-comes-to-firefox/
                    // creates a sound source
                    var sourceNode = audioContext.createBufferSource();

                    var gainNode = audioContext.createGain();

                    gainNode.gain.value = 0.5;

                    sourceNode.connect(gainNode);

                    // tell the source which sound to play
                    sourceNode.buffer = audioBuffer;

                    gainNode.connect(audioContext.destination);

                    // play the sound
                    sourceNode.start(0);

                },
                function onDecodeFailure(error) {

                    // error

                    console.log(error);

                }
            );

        };

        request.send();

    };

	startup();

});