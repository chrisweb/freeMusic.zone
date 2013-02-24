/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'html5Tests', 'serverCommunication', 'utilities'], function($, configuration, html5Tests, serverCommunication, utilities) {

    var startXModifier;
    var startYModifier;

    /**
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {

        utilities.log('initializing application ...');
        
        var configurationObject = configuration.get();
        
        showStartScreen();
        
        $('#' + configurationObject.application.cloudLoginBox.id).submit(function(event) {
            
            event.preventDefault();
            
            hideStartScreen();
            
            showCanvasElement();
            resizeCanvas();
            serverCommunication.initialize();
            serverCommunication.retrieveWorldByCoordinates(0, 0);
            initializeApplicationLoop();
            initializeEventListeners();
            
        });

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
    
    var showCanvasElement = function() {
        
        utilities.log('showCanvasElement ...');
        
        var configurationObject = configuration.get();
        
        $('#' + configurationObject.application.canvasElement.id).show();
        
    };
    
    var paintCanvasBackground = function(canvasContext, configurationObject) {
        
        //utilities.log('paintCanvasBackground ...');

        var r = configurationObject.application.canvasElement.backgroundRGBColors.R;
        var g = configurationObject.application.canvasElement.backgroundRGBColors.G;
        var b = configurationObject.application.canvasElement.backgroundRGBColors.B;
        
        var canvasWidth = getCanvasWidth();
        var canvasHeight = getCanvasHeigth();

        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
        
    };
    
    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var initializeApplicationLoop = function() {
        
        utilities.log('initializing application loop ...');
        
        var canvasContext = get2DContext();
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
        
        drawCanvas(canvasContext, configurationObject);
        
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
           
            var canvasWidth = getCanvasWidth();
            var canvasHeight = getCanvasHeigth();
            
            //utilities.log('event.offsetX ' + event.offsetX);
            //utilities.log('event.offsetY ' + event.offsetY);
            
            //utilities.log('canvasWidth ' + canvasWidth);
            //utilities.log('canvasHeight ' + canvasHeight);
           
            var rawStartXModifier = Math.round((event.offsetX / $(window).width()) * 100);
            var rawStartYModifier = Math.round((event.offsetY / $(window).height()) * 100);
            
            if (rawStartXModifier < 50) {
                startXModifier = rawStartXModifier;
            } else {
                startXModifier = rawStartXModifier-(rawStartXModifier-50);
            }
            
            if (rawStartYModifier < 50) {
                startYModifier = rawStartYModifier;
            } else {
                startYModifier = rawStartYModifier-(rawStartYModifier-50);
            }
            
            utilities.log('startXModifier ' + startXModifier);
            utilities.log('startYModifier ' + startYModifier);
            
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
    
    var resizeCanvas = function() {
        
        utilities.log('resizeCanvas ...');
        
        var canvasWidth = getDocumentWidth();
        var canvasHeight = getDocumentHeigth();
        
        if (canvasWidth < canvasHeight) {
            
            canvasWidth = getDocumentHeigth();
            canvasHeight = getDocumentWidth();
            
        }
        
        var configurationObject = configuration.get();

        var canvasElement = $('#' + configurationObject.application.canvasElement.id);

        canvasElement.css('width', canvasWidth + 'px');
        canvasElement.css('height', canvasHeight + 'px');
        
    };
    
    var getCanvasWidth = function() {
        
        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];
        
        //utilities.log('getClient width canvasElement ... ' + canvasElement.width);

        return canvasElement.width;
        
    };
    
    var getCanvasHeigth = function() {

        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];

        //utilities.log('getClient height canvasElement ... ' + canvasElement.height);

        return canvasElement.height;
        
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
     * @returns {unresolved}
     */
    var get2DContext = function() {

        utilities.log('getting 2D context ...');
        
        var configurationObject = configuration.get();

        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];
        var canvas2DContext = canvasElement.getContext('2d');
        
        return canvas2DContext;

    };
    
    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var drawCanvas = function(canvasContext, configurationObject) {
        
        //utilities.log('drawCanvas');
        
        canvasContext.beginPath();
        
        // clear the screen
        paintCanvasBackground(canvasContext, configurationObject);
        
        // loop tgrough the objects "that need to get drawn" list
        
        var startX = 200;
        var startY = 200;
        var buildingHeight = 200;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);
        
        /*var startX = 500;
        var startY = 500;
        var buildingHeight = 500;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);*/
        
        // call this when all the drawing is done
        canvasContext.closePath();
        
    };
    
    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var drawBuilding = function(canvasContext, configurationObject, startX, startY, buildingHeight) {
        
        //utilities.log('drawBuilding');
        
        var cubeUnit = configurationObject.application.unitInPixel;
        var canvasWidth = getCanvasWidth();
        var canvasHeigth = getCanvasHeigth();
        
        // stroke color
        canvasContext.strokeStyle = 'rgb(200,0,0)';
        
        //utilities.log('startXModifier' + startXModifier);
        //utilities.log('startYModifier ' + startYModifier);
        
        // draw top square
        canvasContext.moveTo(startXModifier+startX, startYModifier+startY);
        canvasContext.lineTo(startXModifier+startX+cubeUnit, startYModifier+startY+0);
        canvasContext.lineTo(startXModifier+startX+cubeUnit, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startXModifier+startX+0, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startXModifier+startX, startYModifier+startY);
        
        canvasContext.stroke();
        
        // draw cube bottom
        canvasContext.moveTo(startX, startY);
        canvasContext.lineTo(startX+cubeUnit, startY+0);
        canvasContext.lineTo(startX+cubeUnit, startY+cubeUnit);
        canvasContext.lineTo(startX+0, startY+cubeUnit);
        canvasContext.lineTo(startX, startY);
        
        canvasContext.stroke();
        /*
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(cubeUnit, cubeUnit);
        
        canvasContext.stroke();
        
        canvasContext.moveTo(canvasWidth, 0);
        canvasContext.lineTo(canvasWidth-cubeUnit, cubeUnit);
        
        canvasContext.stroke();
        
        canvasContext.moveTo(canvasWidth, canvasHeigth);
        canvasContext.lineTo(canvasWidth-cubeUnit, canvasHeigth-cubeUnit);
        
        canvasContext.stroke();
        
        canvasContext.moveTo(cubeUnit, canvasHeigth-cubeUnit);
        canvasContext.lineTo(0, canvasHeigth);
        
        canvasContext.stroke();*/
        
    };

    /**
     * 
     */
    return {
        'initialize': initializeApplication
    };

});