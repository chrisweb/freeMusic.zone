/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'html5Tests', 'serverCommunication'], function($, configuration, html5Tests, serverCommunication) {

    /**
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {

        console.log('initializing application ...');
        
        var canvasContext = get2DContext();
        
        canvasContext.fillStyle = 'rgb(0,0,0)';
        canvasContext.fillRect(0, 0, 1024, 768);
        
        var configurationObject = configuration.get();
        
        var messagesDiv = $('#' + configurationObject.application.messagesDiv.id);

        var passedAllTests = html5Tests.html5FeaturesCheck(messagesDiv);

        if (passedAllTests) {

            serverCommunication.initialize();
            serverCommunication.retrieveWorldByCoordinates(0, 0);
            initializeApplicationLoop(canvasContext, configurationObject);
            initializeEventListeners();
            
        }

    };
    
    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var initializeApplicationLoop = function(canvasContext, configurationObject) {
        
        console.log('initializing application loop ...');
        
        var configurationObject = configuration.get();
        
        setInterval(applicationLoop(canvasContext, configurationObject), 1000/configurationObject.application.framesPerSecond);
        
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
        
        console.log('initializing event listeners ...');
        
        var configurationObject = configuration.get();
        
        $('#' + configurationObject.application.canvasElement.id).mousemove(function(event) {
           
            
            
        });
        
    };
    
    /**
     * 
     * @returns {unresolved}
     */
    var get2DContext = function() {

        console.log('getting 2D context ...');
        
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
        
        // loop tgrough the objects "that need to get drawn" list
        
        drawCube(canvasContext, configurationObject);
        
    };
    
    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var drawCube = function(canvasContext, configurationObject) {
        
        var cubeUnit = configurationObject.application.unitInPixel;
        var canvasWidth = configurationObject.application.canvasElement.width;
        var canvasHeigth = configurationObject.application.canvasElement.heigth;
        
        // stroke color
        canvasContext.strokeStyle = 'rgb(200,0,0)';
        
        // draw cube top
        canvasContext.moveTo(0, 0);
        canvasContext.lineTo(canvasWidth, 0);
        canvasContext.lineTo(canvasWidth, canvasHeigth);
        canvasContext.lineTo(0, canvasHeigth);
        canvasContext.lineTo(0, 0);
        
        canvasContext.stroke();
        
        // draw cube bottom
        canvasContext.moveTo(cubeUnit, cubeUnit);
        canvasContext.lineTo(canvasWidth-cubeUnit, cubeUnit);
        canvasContext.lineTo(canvasWidth-cubeUnit, canvasHeigth-cubeUnit);
        canvasContext.lineTo(cubeUnit, canvasHeigth-cubeUnit);
        canvasContext.lineTo(cubeUnit, cubeUnit);
        
        canvasContext.stroke();
        
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
        
        canvasContext.stroke();
        
    };

    /**
     * 
     */
    return {
        'initialize': initializeApplication
    };

});