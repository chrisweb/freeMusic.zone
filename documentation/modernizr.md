# modernizr build

I was unhappy about the way you have to include modernizr into your project, I don't want to have to generate builds for the development version of a project

That's why I rewrote some parts of its core to be able to include it as AMD modules into the project without having to make a build first

Maybe I should fork modernizr and put my modified core into the fork and then replace the original project in the bower.json with the fork url

## feature detection used by this project

audio to detect the support of codecs (https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats)
* audio

the player uses the "web audio api" (http://caniuse.com/#feat=audio-api)
* audio_webaudio_api

the videos on the homepage use the video tag (http://caniuse.com/#feat=video)
* video

the waveform uses the canvas element (http://caniuse.com/#feat=canvas)
* canvas

the backbone router uses history (http://caniuse.com/#feat=history)
* history

socket.io uses web sockets (http://caniuse.com/#feat=websockets)
* websockets