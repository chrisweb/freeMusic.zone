/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'utilities'], function($, configuration, utilities) {

    var startXModifier = 0;
    var startYModifier = 0;

    /**
     * 
     * @returns {undefined}
     */
    var initializeCanvas = function() {

        utilities.log('getting 2D context ...');

        var configurationObject = configuration.get();

        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];
        var canvas2DContext = canvasElement.getContext('2d');

        return canvas2DContext;

    };

    var showCanvasElement = function() {

        utilities.log('showCanvasElement ...');

        var configurationObject = configuration.get();

        $('#' + configurationObject.application.canvasElement.id).show();

    };

    var hideCanvasElement = function() {

        utilities.log('hideCanvasElement ...');

        var configurationObject = configuration.get();

        $('#' + configurationObject.application.canvasElement.id).hide();

    };

    var paintCanvasBackground = function(canvasContext, configurationObject) {

        //utilities.log('paintCanvasBackground ...');

        var r = configurationObject.application.canvasElement.backgroundRGBColors.R;
        var g = configurationObject.application.canvasElement.backgroundRGBColors.G;
        var b = configurationObject.application.canvasElement.backgroundRGBColors.B;

        var canvasWidth = getCanvasContextWidth();
        var canvasHeight = getCanvasContextHeight();

        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    };

    var resizeCanvas = function() {

        utilities.log('resizeCanvas ...');

        var canvasWidth = utilities.getDocumentWidth();
        var canvasHeight = utilities.getDocumentHeight();

        if (canvasWidth < canvasHeight) {

            canvasHeight = canvasWidth;

        } else {
            
            canvasWidth = canvasHeight;
            
        }

        var configurationObject = configuration.get();

        var canvasElement = $('#' + configurationObject.application.canvasElement.id);

        canvasElement.css('width', canvasWidth + 'px');
        canvasElement.css('height', canvasHeight + 'px');

    };

    var getCanvasContextWidth = function() {

        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];

        //utilities.log('getClient width canvasElement ... ' + canvasElement.width);

        return canvasElement.width;

    };

    var getCanvasContextHeight = function() {

        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];

        //utilities.log('getClient height canvasElement ... ' + canvasElement.height);

        return canvasElement.height;

    };
    
    var setXStartModifier = function(xModifier) {

        startXModifier = xModifier;

    };
    
    var setYStartModifier = function(yModifier) {

        startYModifier = yModifier;

    };

    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @returns {undefined}
     */
    var drawCanvas = function(canvasContext, configurationObject) {

        //utilities.log('drawCanvas');

        // clear the screen
        paintCanvasBackground(canvasContext, configurationObject);

        // loop tgrough the objects "that need to get drawn" list
        
        var cubeUnit = configurationObject.application.unitInPixel;

        var startX = 200;
        var startY = 200;
        var buildingHeight = 1*cubeUnit;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);

        var startX = 500;
        var startY = 500;
        var buildingHeight = 3*cubeUnit;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);
        
        var startX = 1200;
        var startY = 1200;
        var buildingHeight = 1*cubeUnit;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);

        var startX = 1500;
        var startY = 1500;
        var buildingHeight = 3*cubeUnit;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);

    };

    /**
     * 
     * @param {type} canvasContext
     * @param {type} configurationObject
     * @param {type} startX
     * @param {type} startY
     * @param {type} buildingHeight
     * @returns {undefined}
     */
    var drawBuilding = function(canvasContext, configurationObject, startX, startY, buildingHeight) {

        //utilities.log('drawBuilding');
        
        // get cube unit from configuration
        var cubeUnit = configurationObject.application.unitInPixel;
        
        // calculate building modifier base on its height
        var buildingXModifier = startXModifier * (buildingHeight/cubeUnit);
        var buildingYModifier = startYModifier * (buildingHeight/cubeUnit);
        
        // get canvas (context) height and width
        var canvasWidth = getCanvasContextWidth();
        var canvasHeight = getCanvasContextHeight();
        
        // LEFT
        // if startXModifier < 0 then left wall is hidden by building so no
        // need to paint it
        if (startXModifier > 0) { 
        
            canvasContext.beginPath();

            canvasContext.moveTo(startX, startY);
            canvasContext.lineTo(startX, startY+cubeUnit);
            canvasContext.lineTo(startX+buildingXModifier, startY+cubeUnit+buildingYModifier);
            canvasContext.lineTo(startX+buildingXModifier, startY+buildingYModifier);
            canvasContext.lineTo(startX, startY);

            canvasContext.fillStyle="red";
            canvasContext.fill();

            canvasContext.closePath();
            
        }
        
        // RIGHT
        // if startXModifier > 0 then right wall is hidden by building so no
        // need to paint it
        if (startXModifier < 0) { 
        
            canvasContext.beginPath();

            canvasContext.moveTo(startX+cubeUnit, startY);
            canvasContext.lineTo(startX+cubeUnit, startY+cubeUnit);
            canvasContext.lineTo(startX+cubeUnit+buildingXModifier, startY+cubeUnit+buildingYModifier);
            canvasContext.lineTo(startX+cubeUnit+buildingXModifier, startY+buildingYModifier);
            canvasContext.lineTo(startX+cubeUnit, startY);

            canvasContext.fillStyle="green";
            canvasContext.fill();

            canvasContext.closePath();
            
        }
        
        // FRONT
        // if startYModifier > 0 then front wall is hidden by building so no
        // need to paint it
        if (startYModifier < 0) { 
        
            canvasContext.beginPath();

            canvasContext.moveTo(startX, startY+cubeUnit);
            canvasContext.lineTo(startX+cubeUnit, startY+cubeUnit);
            canvasContext.lineTo(startX+cubeUnit+buildingXModifier, startY+cubeUnit+buildingYModifier);
            canvasContext.lineTo(startX+buildingXModifier, startY+cubeUnit+buildingYModifier);
            canvasContext.moveTo(startX, startY+cubeUnit);
            canvasContext.fillStyle="yellow";
            canvasContext.fill();

            canvasContext.closePath();
            
        }
        
        // BACK
        // if startYModifier < 0 then back wall is hidden by building so no
        // need to paint it
        if (startYModifier > 0) { 
        
            canvasContext.beginPath();

            canvasContext.moveTo(startX, startY);
            canvasContext.lineTo(startX+cubeUnit, startY);
            canvasContext.lineTo(startX+cubeUnit+buildingXModifier, startY+buildingYModifier);
            canvasContext.lineTo(startX+buildingXModifier, startY+buildingYModifier);
            canvasContext.moveTo(startX, startY);
            canvasContext.fillStyle="orange";
            canvasContext.fill();

            canvasContext.closePath();
            
        }
        
        // TOP
        // always paint it as last
        canvasContext.beginPath();
        
        canvasContext.rect(startX+buildingXModifier, startY+buildingYModifier, cubeUnit, cubeUnit);
        canvasContext.fillStyle="blue";
        canvasContext.fill();

        canvasContext.closePath();

    };

    /**
     * 
     */
    return {
        'initialize': initializeCanvas,
        'show': showCanvasElement,
        'hide': hideCanvasElement,
        'resize': resizeCanvas,
        'getWidth': getCanvasContextWidth,
        'getHeight': getCanvasContextHeight,
        'draw': drawCanvas,
        'setXModifier': setXStartModifier,
        'setYModifier': setYStartModifier
    };

});