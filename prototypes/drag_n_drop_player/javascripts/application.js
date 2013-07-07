
/**
 * sample application client code for drag and drop player
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {
    
    var soundManager = window.soundManager;

    /**
     * 
     * iniutialize soundmanager2
     * 
     */
    var iniutializeSoundManager = function() {

        console.log('[APPLICATION] initializing soundmanager ...');

        soundManager.setup({
            url: '/vendor/SoundManager2/swf/',
            flashVersion: 9,
            preferFlash: false, // prefer 100% HTML5 mode, where both supported
            debugMode: true,
            onready: function() {
                
                console.log('soundmanager2 ready!');

                var source = 'http://storage-new.newjamendo.com/download/track/1036072/ogg';

                var sound = soundManager.createSound({id: source, url: source});

                sound.play();
                
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
    
    iniutializeSoundManager();

    // on dom loaded
    $(function() {



    });



})(jQuery, window);