
/**
 * sample application client code for drag and drop player
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {

    var soundManager = window.soundManager;

    // loaded playlist
    var activePlaylist = {};

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

                // TODO: remove the inactive class from all the buttons

                // initialize listeners
                initializeListeners();

                // initialize draggable tracks
                initializeDraggableTracks();

                // initialize active playlist dropzone
                initializeActivePlaylistDropzone();

                // load the favorites playlist by default
                loadPlaylist('favorites');

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

        });

    };

    var loadPlaylist = function(playlistId) {

        console.log('load playlist, playlistId: ' + playlistId);
        
        // prepare the active playlist object
        activePlaylist.sounds = [];
        activePlaylist.currentSong = {};

        if (playlistId === 'favorites') {
            
            // TODO: ajax call to server if user is logged in

            // TODO: get the playlist from cookie / session? if user is not logged in
            
            var tracks = [];
            
        } else {
            
            // TODO: ajax call to server to fetch playlist by id
            
            var tracks = [];
            
        }

        if (tracks.length > 0) {
                  
            // sort tracks by track position
            activePlaylist.tracks.sort(function(a, b){
                return a.position-b.position
            });

            var playlistElement = $('#playlist_tracks').find('ul');
            
            var counter = 1;

            $.each(activePlaylist.tracks, function(index, track) {

                track.position = parseInt(index + 1);

                // add the track to the playlist tracks element dom
                addRowToPlaylist(track, playlistElement);

                // add sound to the active playlist object
                addSoundToActivePlaylist(track);
                
                // when the playlist gets loaded, the first song of the
                // playlist is the current song
                if (counter === 1) {
                
                    activePlaylist.currentSong.id = track.id;
                    
                }
                
                counter++;

                console.log('sound pushed to queue, trackTitle: ' + track.title);

            });

        }

    };
    
    var addSoundToActivePlaylist = function(track) {
        
        if ($.type(track.id) === 'number') {

            // create a new soundManager2 sound
            var sound = soundManager.createSound({id: 'track_' + track.id, url: track.url});

            console.log('sound created, id: ' + track.id);

            var jamendoOptions = {
                id: track.id,
                title: track.title,
                cover_image: '',
                duration: '',
                album_id: '',
                artist_id: '',
                artist_name: '',
                album_name: '',
                license_ccurl: '',
                releasedate: '',
                musicinfo: '',
                licenses: '',
                stats: '',
                position: track.position,
                preload_status: false,
                preload_timestamp: 0
            };

            sound.jamendoOptions = jamendoOptions;

            activePlaylist.sounds.push(sound);
            
        } else {
            
            console.log('error cannot add track with invalid id');
            
        }
        
    };

    /**
     * 
     * @returns {undefined}
     */
    var playClick = function() {

        console.log('player play click');
        
        console.log('$.type(activePlaylist.sounds): ' + $.type(activePlaylist.sounds));

        if ($.type(activePlaylist) !== 'undefined' && $.type(activePlaylist.sounds) === 'array' && activePlaylist.sounds.length > 0) {

            console.log('activePlaylist play start');

            // TODO: check if a sound has the jamendo option status set to paused
            
            var soundToPlayId = 0;

            // if the current song object is available
            if ($.type(activePlaylist.currentSong.id) === 'number') {
                
                console.log('$.type(activePlaylist.currentSong.id): ' + $.type(activePlaylist.currentSong.id));

                // use the current song object to get the id
                soundToPlayId = activePlaylist.currentSong.id;
                
            } else {
                
                console.log('activePlaylist.sounds[0].id: ' + activePlaylist.sounds[0].id);
                
                // the current song must be the first one in the list
                soundToPlayId = activePlaylist.sounds[0].id;
                
                // update the current song variable
                activePlaylist.currentSong.id = soundToPlayId;
                
            }
            
            console.log('soundToPlayId: ' + soundToPlayId);
            
            // this might be a performance killer with big playlists
            var resultsArray = $.grep(activePlaylist.sounds, function(e) {
                
                return e.id === soundToPlayId;
                
            });
            
            var soundToPlay = resultsArray[0];

            console.log('soundToPlay.jamendoOptions.preload_status: ' + soundToPlay.jamendoOptions.preload_status);
            
            // did sound already get preloaded previously and is therefor still
            // stored in memory
            if (soundToPlay.jamendoOptions.preload_status === false) {

                // load the song
                soundToPlay.load({
                    // start playing it when it finished preloading
                    onload: function() {

                        console.log('onload got triggered');

                        console.log(this);
                        
                        // TODO: cleanup older preloaded songs by oldest
                        // timestamp if more then 10 preloaded songs exist to
                        // free some memory space

                        playSound(soundToPlay);

                    }

                });
                
            } else {
                
                var preloadTimestamp = utilities.getTimestamp();
                
                playSound(soundToPlay);
                
            }

        } else {

            // TODO: show user error message, tell user to add tracks to current playlist or load another playlist

            console.log('activePlaylist is undefined or activePlaylist.sounds is empty');

        }

    };

    var playSound = function(soundToPlay) {

        soundToPlay.play({
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

                //console.log(this);
                //console.log(this.readyState);

            },
            whileloading: function() {

                console.log('whileloading');
                
                // about preloading:
                // i have implemented a light preloading mechanism because
                // i fear the a more agressive one could harm the performance
                // too much, will have to do more test especially on older
                // browsers
                
                // when the first track got completle loaded we preload the
                // next track, but when the next track finished preloading
                // we wont preload yet another track
                
                // we dont keep more then tracks in memory, if there are more
                // then that we will destroy the oldest ones based on their
                // timestamp

                console.log(this);
                console.log(this.bytesLoaded);
                console.log(this.bytesTotal);
                console.log(this.jamendoOptions.preload_status);
                
                // if preloading of current song has finished and preload_status
                // has not been changed yet
                if (this.bytesLoaded === this.bytesTotal && this.jamendoOptions.preload_status === false) {
                    
                    this.jamendoOptions.preload_status = true;
                    this.jamendoOptions.preload_timetsamp =  new Date().getTime();
                    
                    console.log('this.id: ' + this.id);
                    console.log('activePlaylist.currentSong.id: ' + activePlaylist.currentSong.id);
                
                    // only if the sound that finished loading is also the sound
                    // that gets currently played preload another one
                    if (this.id === activePlaylist.currentSong.id) {
                        
                        var that = this;
                        
                        // find all tracks that have a higher position as current track
                        var nextSounds = $.grep(activePlaylist.sounds, function(e) {
                            
                            console.log('e.jamendoOptions.position: ' + e.jamendoOptions.position);
                            console.log('this.jamendoOptions.position: ' + that.jamendoOptions.position);

                            return e.jamendoOptions.position > that.jamendoOptions.position;

                        });

                        console.log('nextSounds.length: ' + nextSounds.length);
                        
                        var nextSound = undefined;

                        // if there is a next track preload it
                        if (nextSounds.length > 0) {

                            nextSound = nextSounds[0];

                        } else {

                            // if no next sound restart playlist with first song
                            nextSound = activePlaylist.sounds[0];

                        }
                        
                        // check if that track didnt already get preloaded
                        if ($.type(nextSound) !== 'undefined' && nextSound.jamendoOptions.preload_status === false) {

                            // preload next track
                            nextSound.load();

                        }
                        
                    }
                
                }

            },
            // song finished playing
            onfinish: function() {

                console.log('track finished playing, trackId: ' + this.id);

                console.log(this);

                // destroy previous songs expect last 2-5
                //this.destruct(); // will also try to unload before destroying.

                playSound(soundToPlayNext);

            }

        });

    };

    /**
     * 
     * @returns {undefined}
     */
    var pauseClick = function() {

        console.log('player pause click');
        
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

    /**
     * 
     * intializing active playlist dropzone
     * 
     * @returns {undefined}
     */
    var initializeActivePlaylistDropzone = function() {

        // make the active playlist droppable for tracks
        $('#active_playlist').droppable({
            accept: '.track',
            hoverClass: 'drop_hover',
            greedy: true,
            drop: function(event, ui) {

                console.log('#active_playlist drop');

                var droppedElement = ui.draggable;
                
                var track = {};

                track.url = droppedElement.attr('href');
                track.id = parseInt(droppedElement.attr('data-prototype-track-id'));
                track.title = droppedElement.text();

                console.log('dropped track pushed to active playlist, track.title: ' + track.title);

                var playlistElement = $('#playlist_tracks').find('ul');

                track.position = playlistElement.children().length + 1;
                
                addSoundToActivePlaylist(track);

                addRowToPlaylist(track, playlistElement);

                console.log('added a row to playlist tracks element at track.position: ' + track.position);

            }

        });

    };

    /**
     * 
     * intializing draggable tracks
     * 
     * @returns {undefined}
     */
    var initializeDraggableTracks = function() {

        // make tracks draggable
        $('#tracks').find('.track').draggable({
            refreshPositions: true, // refresh position on mouse move, disable if performance is bad
            revert: function(event) {

                console.log('track got dropped on dropzone?');
                
                // if element is dropped on a dropzone then event will contain
                // object, else it will be false
                if (event) {

                    console.log('YEP');

                    // the element that is being dropped
                    var draggedElement = $(this);

                    // add explosion effect to dragged element
                    draggedElement.effect(
                            'explode',
                            1000,
                            function() {

                                console.log('drop scale effect finished');

                                console.log(draggedElement);

                                // put the element back to its original position
                                draggedElement.css('left', '0');
                                draggedElement.css('top', '0');

                                // make the element visible again by fading it in
                                draggedElement.show('fade', {}, 1000);

                            }
                    );

                    return false;

                } else {

                    console.log('NOPE');

                    return true;

                }

            }, // if track did not get dropped revert position
            start: function(event, ui) {

                console.log('#tracks .track drag start');
                
                // TODO: increase size of dragged element and also of dropzone

            },
            stop: function(event, ui) {

                console.log('#tracks .track drag stop');

                // reset the id of dragged track
                dragggedId = undefined;
                
                // TODO: decrease size of dragged element and also of dropzone

            }
        });

    };

    /**
     * 
     * add a row to the playlist helper
     * 
     * @param {type} track
     * @param {type} playlistElement
     * @returns {undefined}
     */
    var addRowToPlaylist = function(track, playlistElement) {

        var rowHtml = '';
        rowHtml += '<li id="' + track.position + '_' + track.id + '">';
        rowHtml += '<span class="position">' + track.position + '</span>';
        rowHtml += '<span class="title">' + track.title + '</span>';
        rowHtml += '</li>';

        var playlistTrackRow = $(rowHtml);

        playlistElement.append(playlistTrackRow);

    };

    initializeSoundManager();

})(jQuery, window);