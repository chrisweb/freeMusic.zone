
/**
 * sample application client code for drag and drop player
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {

    var soundManager = window.soundManager;

    // global sounds queue, undefined at start
    var soundsQueue;

    var originalElementPosition;

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

                // TODO: remove the inactive class from buttons

                // initialize sounds queue
                soundsQueue = [];

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

        if (playlistId === 'favorites') {

            var playlistTracks = [];

            // TODO: ajax call to server if user is logged in

            // TODO: get the playlist from cookie / session? if user is not logged in

            if (playlistTracks.length > 0) {

                var playlistElement = $('#playlist_tracks').find('ul');

                $.each(playlistTracks, function(index, track) {

                    // add the track to the playlist tracks element dom
                    addRowToPlaylist(index + 1, sound, playlistElement);

                    // create a new soundManager2 sound
                    var sound = soundManager.createSound({id: track.id, url: track.url});

                    console.log('sound created, id: ' + track.id);

                    sound.title = track.title;

                    // add the track to the player soundsQueue
                    soundsQueue.push(sound);

                    console.log('sound pushed to queue, trackTitle: ' + track.title);

                });

            }

        }

    };

    /**
     * 
     * @returns {undefined}
     */
    var playClick = function() {

        console.log('player play click');

        if ($.type(soundsQueue) !== 'undefined' && soundsQueue.length > 0) {

            console.log('soundsQueue play start');

            console.log('soundsQueue: ');
            console.log(soundsQueue);
            
            var soundToPLay = soundsQueue[0];

            // load the song
            soundsQueue[0].load({
                // start playing it when it finished preloading
                onload: function() {

                    console.log('onload got triggered');

                    console.log(this);

                    playSound(soundToPLay);

                }

            });

        } else {

            // TODO: show user error message

            console.log('soundsQueue is undefined or empty');

        }

    };
    
    var playSound = function(soundToPLay) {

        soundToPLay.play({
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

            },
            whileplaying: function() {

                //console.log('whileplaying');

                //console.log(this.readyState);

            },
            whileloading: function() {

                console.log('whileloading');

                console.log(this);
                console.log(this.bytesLoaded);
                console.log(this.bytesTotal);

                if (this.bytesLoaded === this.bytesTotal && nextSound.preLoaded === false) {

                    nextSound.load();

                }

            },
            // song finished playing
            onfinish: function() {

                console.log('track finished playing, trackId: ' + this.id);

                console.log(this);

                // destroy previous songs expect last 2-5
                //this.destruct(); // will also try to unload before destroying.
                
                // TODO: find next song
                var soundToPLayNext = '';

                //playSound(soundToPLay);

            }

        });
        
    }

    /**
     * 
     * @returns {undefined}
     */
    var pauseClick = function() {

        console.log('player pause click');

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

                var trackUrl = droppedElement.attr('href');
                var trackId = droppedElement.attr('data-prototype-track-id');
                var trackTitle = droppedElement.text();

                var sound = soundManager.createSound({id: 'track_' + trackId, url: trackUrl});

                console.log('sound created, id: ' + trackId);

                sound.title = trackTitle;

                soundsQueue.push(sound);

                console.log('sound pushed to queue, trackTitle: ' + trackTitle);

                var playlistElement = $('#playlist_tracks').find('ul');

                var trackPosition = playlistElement.children().length + 1;

                addRowToPlaylist(trackPosition, sound, playlistElement);

                console.log('added a row to playlist tracks element at trackPosition: ' + trackPosition);

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

                console.log(originalElementPosition);

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

                originalElementPosition = $(this).position();

            },
            stop: function(event, ui) {

                console.log('#tracks .track drag stop');

                // reset the id of dragged track
                dragggedId = undefined;

            }
        });

    };

    /**
     * 
     * @param {type} index
     * @param {type} sound
     * @param {type} playlistElement
     * @returns {undefined}
     */
    var addRowToPlaylist = function(index, sound, playlistElement) {

        var rowHtml = '';
        rowHtml += '<li id="' + index + '_' + sound.id + '">';
        rowHtml += '<span class="position">' + index + '</span>';
        rowHtml += '<span class="title">' + sound.title + '</span>';
        rowHtml += '</li>';

        var playlistTrackRow = $(rowHtml);

        playlistElement.append(playlistTrackRow);

    };

    initializeSoundManager();

})(jQuery, window);