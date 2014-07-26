/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'html5Tests', 'serverCommunication', 'utilities', 'canvas'], function($, configuration, html5Tests, serverCommunication, utilities, canvas) {

    var loopHandler = null;

    /**
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {

        utilities.log('initializing application ...');
        /*
        var configurationObject = configuration.get();
        
        showStartScreen();
        */
        //$('#' + configurationObject.application.cloudLoginBox.id).submit(function(event) {
            
            event.preventDefault();
            
            hideStartScreen();
            
            canvas.show();
            canvas.resize();
            serverCommunication.initialize();
            serverCommunication.retrieveWorldByCoordinates(0, 0);
            initializeApplicationLoop();
            initializeEventListeners();
            
        //});

    };
    
    var showStartScreen = function() {
        
        utilities.log('showStartScreen ...');
        
        var configurationObject = configuration.get();
        
        var messagesDiv = $('#' + configurationObject.application.messagesDiv.id);

        var passedAllTests = html5Tests.html5FeaturesCheck(messagesDiv);
        
        if (passedAllTests) {
            
            $('#' + configurationObject.application.cloudLoginBox.id).show();
            
        }
        
        $('#' + configurationObject.application.startScreenDiv.id).show();
        
    };
    
    var hideStartScreen = function() {
        
        utilities.log('hideStartScreen ...');
        
        var configurationObject = configuration.get();
        
        $('#' + configurationObject.application.startScreenDiv.id).hide();
        
    };

    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var initializeApplicationLoop = function() {
        
        utilities.log('initializing application loop ...');
        
        var canvasContext = canvas.initialize();
        var configurationObject = configuration.get();
        var framesNumber = 1000/configurationObject.application.framesPerSecond;
        
        loopHandler = setInterval(function() { applicationLoop(canvasContext, configurationObject) }, framesNumber);
        
    };
    
    var stopApplicationLoop = function() {
        
        utilities.log('stoping application loop ...');
        
        if (loopHandler !== null) {
            
            clearInterval(loopHandler);
            
        }
        
    };
    
    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var applicationLoop = function(canvasContext, configurationObject) {
        
        canvas.draw(canvasContext, configurationObject);
        
    };
    
    /**
     * 
     * @returns {undefined}
     */
    var initializeEventListeners = function() {
        
        utilities.log('initializing event listeners ...');
        
        var configurationObject = configuration.get();
        
        // when the user moves the mouse we calculate the position in percent
        // where the top and left canvas represent 50, the bottom and right -50
        // and the center would be 0
        $('#' + configurationObject.application.canvasElement.id).mousemove(function(event) {
           
            var canvasElementWidth = utilities.getCanvasElementWidth();
            var canvasElementHeight = utilities.getCanvasElementHeight();
            
            //utilities.log('event.offsetX ' + event.offsetX);
            //utilities.log('event.offsetY ' + event.offsetY);
            
            //utilities.log('canvasElementWidth ' + canvasElementWidth);
            //utilities.log('canvasElementHeight ' + canvasElementHeight);
            
            var xModifier = null;
            var yModifier = null;
           
            var rawStartXModifier = Math.round((event.offsetX / canvasElementWidth) * 100);
            var rawStartYModifier = Math.round((event.offsetY / canvasElementHeight) * 100);
            
            if (rawStartXModifier < 50) {
                xModifier = 50-rawStartXModifier;
            } else {
                xModifier = (rawStartXModifier-50)*(-1);
            }
            
            if (rawStartYModifier < 50) {
                yModifier = 50-rawStartYModifier;
            } else {
                yModifier = (rawStartYModifier-50)*(-1);
            }
            
            //utilities.log('xModifier ' + xModifier);
            //utilities.log('yModifier ' + yModifier);
            
            canvas.setXModifier(xModifier);
            canvas.setYModifier(yModifier);
            
        });
        
        $(window).resize(function() {
            
            canvas.resize();
            
        });
        
        $(window).bind('orientationchange', function(event) {
            
            if (event.orientation) {
                
                resizeCanvas();
                
                if (event.orientation == 'portrait'){
                    
                    
                    
                } else if (event.orientation == 'landscape') {
                    
                    
                    
                }
                
            }
            
        });
        
        $(window).bind('keypress', function(e) {
            
            if(e.keyCode==13){
		
                
                
            }
            
        });
        
    };

    /**
     * 
     */
    return {
        'initialize': initializeApplication
    };

});