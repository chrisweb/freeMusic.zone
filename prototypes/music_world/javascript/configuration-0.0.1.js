
define([

], function(

) {

    var getConfiguration = function() {
        
        var configuration = {
            
            application: {
                
                jamendoApiKey: 'hssjdjfjdsffdjsjfdsdjfsjfdsfdjs',
                canvasElement: {
            
                    id: 'worldCanvas',
                    backgroundRGBColors: {
                        R: 75,
                        G: 165,
                        B: 56
                    }
            
                },
                messagesDiv: {
                    id: 'messagesDiv',
                },
                startScreenDiv: {
                    id: 'startScreenDiv',
                },
                cloudLoginBox: {
                    id: 'cloudLoginBox',
                },
                unitInPixel: 200,
                framesPerSecond: 10,
                debugging: true
                
            }
            
        };
        
        return configuration;
        
    };

    return {
        get: getConfiguration
    };

});