
define([], function() {

    var getConfiguration = function() {
        
        var configuration = {
            
            application: {
                
                jamendoApiKey: '9bce5f56f9d47bbdc529913b1d3f1459',
                canvasElement: {
            
                    id: 'worldCanvas',
                    width: 1024,
                    heigth: 768
            
                },
                messagesDiv: {
                    id: 'messagesDiv',
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