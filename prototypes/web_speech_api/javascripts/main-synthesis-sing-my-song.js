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

    var synthesis;

    var startup = function startupFunction() {

        if (!('webkitSpeechSynthesis' in window) && !('speechSynthesis' in window)) {

            $('.error').text('web speech API not supported in your browser, try this prototype in chrome');

            return false;

        }

        synthesis = window.speechSynthesis || window.webkitSpeechSynthesis;

        // empty at this point in chrome, as in chrome the list is determined asynchronously, see specs for more details
        if (speechSynthesis.getVoices().length === 0) {

            synthesis.addEventListener('voiceschanged', readyToSing);

        } else {

            readyToSing();

        }

    };

    // events gets called several times in chrome, no idea why
    var alreadyInitialized = false;

    // cached elements
    var $singItButton = $('.singIt');
    var $stopItButton = $('.stopIt');

    var readyToSing = function readyToSingFunction() {

        if (!alreadyInitialized) {

            alreadyInitialized = true;
                
            $singItButton.on('click', startSong);
            $stopItButton.on('click', stopSong);

            $singItButton.prop('disabled', false);

        }

    };

    var toggleButtons = function toggleButtonsFunction() {

        // check the disabled attribute is set on the $singItButton
        if ($singItButton.prop('disabled')) {

            $singItButton.prop('disabled', false);
            $stopItButton.prop('disabled', true);

        } else {

            $singItButton.prop('disabled', true);
            $stopItButton.prop('disabled', false);

        }

    }

    var startSong = function startSongFunction(event) {

        startSinging();

        playMusic('//storage-new.newjamendo.com/?trackid=1311527&format=mp31');

        toggleButtons();

    }

    var stopSong = function stopSongFunction(event) {

        stopSinging();

        stopMusic();

        toggleButtons();

    }

    var lines = null;
    var lineIndex = 0;

    var startSinging = function startSingingFunction() {

        formatTextInContenteditable();
        
        speakIt();

    };

    var stopSinging = function stopSingingFunction() {

        // reset lines and lines pointer
        lines = null;
        lineIndex = 0;

        synthesis.cancel();

    }

    var speakIt = function speakItFunction() {

        // if we reached the end stop repeating the speak process
        if (lines !== null && typeof lines[lineIndex] !== 'undefined') {

            // if already speaking a line and not yet finished
            // try again for next line in 200ms
            var isSpeaking = synthesis.speaking;

            //console.log(isSpeaking);

            if (isSpeaking) {

                window.setTimeout(speakIt, 200);

                return;

            }

            var currentLine = lines[lineIndex];

            // ignore empty lines
            if (currentLine === '') {

                lineIndex++;

                speakIt();

                return;

            }

            highlightCurrentLine(lineIndex);

            lineIndex++;

            if (currentLine.substring(0, 5) === 'pause') {

                var pauseTime = currentLine.match(/\(([^)]+)\)/)[1];

                var pauseMilliseconds = parseInt(pauseTime) * 1000;

                window.setTimeout(speakIt, pauseMilliseconds);

            } else {
                
                var utterance;
                var femaleVoice;

                var voicesList = synthesis.getVoices();

                // if female voice was specified
                if (currentLine.slice(-3) === '(f)') {

                    currentLine = currentLine.substring(0, currentLine.length - 3);

                    // search for a female voice in the available voices list
                    // chrome on windows has a voice with female in the name
                    // firefox on windows uses a microsoft voice with zira in its name
                    voicesList.forEach(function (voice) {

                        if (voice.name.search(/Female/i) !== -1 || voice.name.search(/Zira/i) !== -1) {

                            femaleVoice = voice;

                        }

                    });

                }

                if (femaleVoice !== undefined) {

                    utterance = new SpeechSynthesisUtterance(currentLine);

                    utterance.voice = femaleVoice;
                    utterance.pitch = 1; // something between 0 and 2, default is 1
                    utterance.rate = 0.9; // something between 0,5 and 2, default is 1
                    utterance.volume = 1;

                } else {

                    utterance = new SpeechSynthesisUtterance(currentLine);

                    utterance.voice = voicesList[0];
                    utterance.pitch = 0.6; // something between 0 and 2, default is 1
                    utterance.rate = 0.7; // something between 0,5 and 2, default is 1
                    utterance.volume = 1;

                }

                synthesis.speak(utterance);

                // firefox has some problems when calling next speakIt asap
                // seems like the speaking property is not refreshed immediatly after speaking stops
                // so add a little delay
                window.setTimeout(speakIt, 100);

            }

        }

    };

    var highlightCurrentLine = function highlightCurrentLineFunction(currentSpanIndex) {

        //console.log(currentSpanIndex);

        var $myLyrics = $('.myLyrics');

        var $spansArray = $myLyrics.children('span');

        if (currentSpanIndex !== 0) {
            var previousSpanIndex = currentSpanIndex - 1;
            $spansArray.eq(previousSpanIndex).css('background-color', '');
        }

        $spansArray.eq(currentSpanIndex).css('background-color', 'yellow');

    }

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext;

    var initializeAudioContext = function initializeAudioContextFunction() {

        if (audioContext === undefined) {

            audioContext = new AudioContext();

        }

    }
    
    var sourceNode;

    var playMusic = function playMusicFunction(url) {

        //console.log('loadSound, url: ' + url);

        var request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // when loaded decode the data
        request.onload = function () {

            //console.log('request onload');
            
            initializeAudioContext();

            audioContext.decodeAudioData(
                request.response,
                function onDecodeSuccess(audioBuffer) {

                    // success

                    //console.log('sound got loaded, buffer: ');
                    //console.log(audioBuffer);

                    //console.log('playSound');

                    // http://www.html5rocks.com/en/tutorials/webaudio/intro/
                    // https://hacks.mozilla.org/2013/07/web-audio-api-comes-to-firefox/
                    // creates a sound source
                    sourceNode = audioContext.createBufferSource();

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

    var stopMusic = function stopMusicFunction() {

        if (sourceNode !== undefined) {

            sourceNode.stop();

        } else {

            console.log('error source node is undefined');

        }

    }

    var formatTextInContenteditable = function formatTextInContenteditableFunction() {

        var $myLyrics = $('.myLyrics');
        var myLyricsHtml = $myLyrics.html();
        var output = '';

        // remove line breaks added by chrome
        myLyricsHtml = myLyricsHtml.replace('/<div><br></div>/g', '\n');

        // remove linebreaks added by firefox
        myLyricsHtml = myLyricsHtml.replace('/<br><br>/g', '\n');

        // replace wrapper divs of chrome by line break
        myLyricsHtml = myLyricsHtml.replace('/<div>/g', '').replace('</div>', '\n');

        $myLyrics.html(myLyricsHtml);

        var myLyricsText = $myLyrics.text();

        lines = myLyricsText.split('\n');

        lines.forEach(function (value, index, array) {

            output += '<span>' + value + '</span>\n';

        });
        
        $myLyrics.html(output);

        return lines;

    }

    startup();

});