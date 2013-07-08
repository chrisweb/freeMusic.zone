
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



                //var source = 'http://storage-new.newjamendo.com/download/track/1036072/ogg';

                //var sound = soundManager.createSound({id: source, url: source});

                //sound.play();

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
        $('#player').on('click', 'button', function(event) {

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

    };
    
    /**
     * 
     * @returns {undefined}
     */
    var playClick = function() {
        
        
        
    }
    
    /**
     * 
     * @returns {undefined}
     */
    var pauseClick = function() {
        
        
        
    }
    
    /**
     * 
     * @returns {undefined}
     */
    var nextClick = function() {
        
        
        
    }
    
    /**
     * 
     * @returns {undefined}
     */
    var previousClick = function() {
        
        
        
    }
    
    /**
     * 
     * @returns {undefined}
     */
    var shuffleClick = function() {
        
        
        
    }
    
    /**
     * 
     * @returns {undefined}
     */
    var repeatClick = function() {
        
        
        
    }
    
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

    initializeSoundManager();

})(jQuery, window);