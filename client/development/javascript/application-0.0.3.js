/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'html5Tests', 'serverCommunication', 'utilities', 'canvas'], function($, configuration, html5Tests, serverCommunication, utilities, canvas) {

    var startXModifier;
    var startYModifier;

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
        
        setInterval(function() { applicationLoop(canvasContext, configurationObject) }, framesNumber);
        
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
        
        // when the user moves the mouse we position of the top square
        $('#' + configurationObject.application.canvasElement.id).mousemove(function(event) {
           
            var canvasWidth = canvas.getWidth();
            var canvasHeight = canvas.getHeigth();
            
            //utilities.log('event.offsetX ' + event.offsetX);
            //utilities.log('event.offsetY ' + event.offsetY);
            
            //utilities.log('canvasWidth ' + canvasWidth);
            //utilities.log('canvasHeight ' + canvasHeight);
           
            var rawStartXModifier = Math.round((event.offsetX / $(window).width()) * 100);
            var rawStartYModifier = Math.round((event.offsetY / $(window).height()) * 100);
            
            if (rawStartXModifier < 50) {
                startXModifier = 50-rawStartXModifier;
            } else {
                startXModifier = (rawStartXModifier-50)*(-1);
            }
            
            if (rawStartYModifier < 50) {
                startYModifier = 50-rawStartYModifier;
            } else {
                startYModifier = (rawStartYModifier-50)*(-1);
            }
            
            //utilities.log('startXModifier ' + startXModifier);
            //utilities.log('startYModifier ' + startYModifier);
            
        });
        
        $(window).resize(function() {
            
            resizeCanvas();
            
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

    var getDocumentWidth = function() {

        //utilities.log('getClient width $(document) ... ' + $(document).width());

        return $(document).width();
        
    };
    
    var getDocumentHeigth = function() {

        //utilities.log('getClient height $(document) ... ' + $(document).height());

        return $(document).height();
        
    };

    /**
     * 
     */
    return {
        'initialize': initializeApplication
    };

});