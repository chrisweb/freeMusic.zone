Web Speech API Specification
* https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html

can i use: speech recognition
* http://caniuse.com/#feat=speech-recognition
* !! supported in Firefox in about:config using the media.webspeech.recognition.enable flag
* as described in this article (https://hacks.mozilla.org/2016/01/firefox-and-the-web-speech-api/) as of now (01.05.2016 / Firefox 46.01) Firefox does not support speech recognition but it does not work in the desktop version because the UI/UX to ask the user for permission is not yet implemented
* !! grammar not supported by Chrome as of 01.05.2016 (chrome 50) https://groups.google.com/a/chromium.org/forum/#!msg/chromium-html5/Rh2a-PW90lU/EJkYomTnp8kJ
* firefox uses pocketsphinx, so their implementation has the advantage to also work offline, google uses a software as a service voice recognition that is hosted on their servers, the advantage is it can learn and improve over time but the disadvantage is it won't work offline
* as with cortona and siri, some users have expressed privacy concerns if the speech is transfered to a server to get analyzed 

MDN web speech API
* https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
* https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
* https://github.com/mdn/web-speech-api
* https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

mozilla web speech api sample code
* https://github.com/mdn/web-speech-api/tree/master/speech-color-changer

details of Firefox implementation
* https://wiki.mozilla.org/SpeechRTC_-_Speech_enabling_the_open_web

google developers web speech API
* https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API?hl=en
* https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API?hl=en

chrome web speech api sample code
* https://github.com/GoogleChrome/webplatform-samples/tree/master/webspeechdemo

github voice elements repository
* https://github.com/zenorocha/voice-elements
* https://github.com/zenorocha/voice-elements/blob/master/src/voice-recognition.html
* http://zenorocha.github.io/voice-elements/

github annyang repository (a tiny javascript SpeechRecognition library)
* https://github.com/TalAter/annyang

do another prototype with pocketsphinx so that we can use this as fallback?
* http://syl22-00.github.io/pocketsphinx.js/

