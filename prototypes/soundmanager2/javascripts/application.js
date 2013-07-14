
/**
 * sample application client code for drag and drop player
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {

    var soundManager = window.soundManager;
    
    var soundsQueue = [];

    /**
     * 
     * iniutialize soundmanager2
     * 
     * @returns {undefined}
     */
    var initializeSoundManager = function() {

        console.log('[APPLICATION] initializing soundmanager ...');

        soundManager.setup({
            url: '/vendor/SoundManager2/swf/',
            flashVersion: 9,
            preferFlash: false, // prefer 100% HTML5 mode, where both supported
            debugMode: true,
            onready: function() {

                console.log('soundmanager2 ready!');

                // initialize listeners
                initializeListeners();

            },
            ontimeout: function() {

                console.log('soundmanager2 initialization failed!');

            },
            defaultOptions: {
                // set global default volume for all sound objects
                volume: 33

            }

        });

        // set the default options
        soundManager.defaultOptions = {
            autoLoad: false, // enable automatic loading (otherwise .load() will call with .play())
            autoPlay: false, // enable playing of file ASAP (much faster if "stream" is true)
            from: null, // position to start playback within a sound (msec), see demo
            loops: 1, // number of times to play the sound. Related: looping (API demo)
            multiShot: false, // let sounds "restart" or "chorus" when played multiple times..
            multiShotEvents: false, // allow events (onfinish()) to fire for each shot, if supported.
            position: null, // offset (milliseconds) to seek to within downloaded sound.
            pan: 0, // "pan" settings, left-to-right, -100 to 100
            stream: true, // allows playing before entire file has loaded (recommended)
            to: null, // position to end playback within a sound (msec), see demo
            type: null, // MIME-like hint for canPlay() tests, eg. 'audio/mp3'
            usePolicyFile: false, // enable crossdomain.xml request for remote domains (for ID3/waveform access)
            volume: 33, // self-explanatory. 0-100, the latter being the max.
        }

        // flash9 options
        soundManager.flash9Options = {
            usePeakData: false, // enable left/right channel peak (level) data
            useWaveformData: false, // enable sound spectrum (raw waveform data) - WARNING: May set CPUs on fire.
            useEQData: false // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
        }

    };

    /**
     * 
     * @returns {undefined}
     */
    var initializeListeners = function() {

        // add the player click listeners to the buttons
        $('#player').on('click', '.button', function(event) {

            console.log(event);

            event.preventDefault();

            var action = $(this).attr('id');

            switch (action) {
                case 'play':
                    playClick(event);
                    break;
                case 'pause':
                    pauseClick(event);
                    break;
                case 'next':
                    nextClick(event);
                    break;
                case 'previous':
                    previousClick(event);
                    break;
                case 'shuffle':
                    shuffleClick(event);
                    break;
                case 'repeat':
                    repeatClick(event);
                    break;
            }

        });

        // diable the track link if in javascript mode
        $('#tracks').on('click', '.track', function(event) {

            event.preventDefault();
            
            var track = {};

            track.url = $('#' + event.target.id).attr('href');
            track.id = $('#' + event.target.id).attr('data-prototype-track-id');

            console.log('track: ' + track);

            var sound = soundManager.createSound({id: track.id, url: track.url});
            
            soundsQueue.push(sound);

        });

    };

    /**
     * 
     * @returns {undefined}
     */
    var playClick = function(event) {

        console.log('player play click');

        // load the song
        soundsQueue[0].load({
            
            // start playing it when it finished preloading
            onload: function() {

                console.log('onload got triggered');

                console.log(this);

                playSound();
                
            }

        });
        
        var playButton = $('#player').find('#play');
        
        playButton.attr('id', 'pause');
        playButton.text('pause');

    };

    var playSound = function() {

        soundsQueue[0].play({
            // mp3 id3 data
            onid3: function() {

                //http://www.schillmania.com/projects/soundmanager2/doc/#smsound-onid3

                console.log('onid3');

                for (prop in this.id3) {
                    data += prop + ': ' + this.id3[prop] + ','; // eg. title: Loser, artist: Beck
                }

            },
            // flash only error when playing sound in multiple tabs
            ondataerror: function() {

                //http://www.schillmania.com/projects/soundmanager2/doc/#smsound-ondataerror

                console.log('ondataerror');

                console.log(this);

            },
            onbufferchange: function() {

                console.log('ondataerror');

                //console.log(this);
                console.log(this.isBuffering);

            },
            whileplaying: function() {

                //console.log('whileplaying');

                console.log(this);
                //console.log(this.readyState);

            },
            whileloading: function() {

                //console.log('whileloading');

                //console.log(this);
                //console.log(this.bytesLoaded);
                //console.log(this.bytesTotal);

            },
            // song finished playing
            onfinish: function() {

                console.log('track finished playing, trackId: ' + this.id);

                console.log(this);

            }

        });

    }

    /**
     * 
     * @returns {undefined}
     */
    var pauseClick = function(event) {

        console.log('player pause click');
        
        soundsQueue[0].pause();
        
        var pauseButton = $('#player').find('#pause');
        
        pauseButton.attr('id', 'play');
        pauseButton.text('play');
        
        //sound.togglePause();
        
        // toggle play pause
        /*if (isPlaying) {
            
            sound.togglePause()();
            
        } else {
            
            sound.pause();
            
        }*/

    };

    /**
     * 
     * @returns {undefined}
     */
    var nextClick = function() {

        console.log('player next click');

    };

    /**
     * 
     * @returns {undefined}
     */
    var previousClick = function() {

        console.log('player previous click');

    };

    /**
     * 
     * @returns {undefined}
     */
    var shuffleClick = function() {

        console.log('player shuffle click');

    };

    /**
     * 
     * @returns {undefined}
     */
    var repeatClick = function() {

        console.log('player repeat click');

    };
    
    /**
     * 
     * @returns {undefined}
     */
    var changeVolume = function() {
        
        //soundManager.setVolume();
        //sound.setVolume();
        
    };

    initializeSoundManager();

})(jQuery, window);