
define([], function() {

    var getConfiguration = function() {
        
        var configuration = {
            
            application: {
                
                jamendoApiKey: '9bce5f56f9d47bbdc529913b1d3f1459',
                canvasElement: {
            
                    id: 'worldCanvas',
                    backgroundRGBColors: {
                        R: 75,
                        G: 35,
                        B: 75
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
                unitInPixel: 100,
                framesPerSecond: 30,
                debugging: true
                
            }
            
        };
        
        return configuration;
        
    };

    return {
        get: getConfiguration
    };

});