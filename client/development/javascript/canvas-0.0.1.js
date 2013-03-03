/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'utilities'], function($, configuration, utilities) {

    var startXModifier;
    var startYModifier;

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
        
        var canvasWidth = getCanvasWidth();
        var canvasHeight = getCanvasHeigth();

        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
        
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
        
        var startX = 200;
        var startY = 200;
        var buildingHeight = 200;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);
        
        var startX = 500;
        var startY = 500;
        var buildingHeight = 500;
        drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);
        

        
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
        /*canvasContext.moveTo(startXModifier+startX, startYModifier+startY);
        canvasContext.lineTo(startXModifier+startX+cubeUnit, startYModifier+startY+0);
        canvasContext.lineTo(startXModifier+startX+cubeUnit, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startXModifier+startX+0, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startXModifier+startX, startYModifier+startY);*/
        
        canvasContext.beginPath();
        canvasContext.rect(startXModifier+startX, startYModifier+startY, cubeUnit, cubeUnit);
        canvasContext.fillStyle="green";
        canvasContext.fill();
                // call this when all the drawing is done
        canvasContext.closePath();
        
        //canvasContext.stroke();
        
        // draw bottom square
        /*canvasContext.moveTo(startX, startY);
        canvasContext.lineTo(startX+cubeUnit, startY+0);
        canvasContext.lineTo(startX+cubeUnit, startY+cubeUnit);
        canvasContext.lineTo(startX+0, startY+cubeUnit);
        canvasContext.lineTo(startX, startY);*/
        
        canvasContext.beginPath();
        canvasContext.rect(startX, startY, cubeUnit, cubeUnit);
        canvasContext.fillStyle="blue";
        canvasContext.fill();
                // call this when all the drawing is done
        canvasContext.closePath();
        
        //canvasContext.stroke();
        
        canvasContext.beginPath();
        
        canvasContext.moveTo(startX, startY);
        canvasContext.lineTo(startXModifier+startX, startYModifier+startY);
        canvasContext.lineTo(startXModifier+startX+0, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startX+0, startY+cubeUnit);
        canvasContext.moveTo(startX, startY);
        
        /*
        canvasContext.moveTo(startXModifier+startX+cubeUnit, startYModifier+startY+0);
        canvasContext.lineTo(startX+cubeUnit, startY+0);
        

        canvasContext.moveTo(startXModifier+startX+cubeUnit, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startX+cubeUnit, startY+cubeUnit);

        
        canvasContext.moveTo(startXModifier+startX+0, startYModifier+startY+cubeUnit);
        canvasContext.lineTo(startX+0, startY+cubeUnit);
        */
        
        canvasContext.stroke();

        canvasContext.fillStyle="red";
        canvasContext.fill();
        
                // call this when all the drawing is done
        canvasContext.closePath();
        
    };
    
    var drawCube = function(canvasContext, configurationObject, startX, startY, buildingHeight) {
        
        
        
    };

    /**
     * 
     */
    return {
        'initialize': initializeCanvas,
        'show': showCanvasElement,
        'hide': hideCanvasElement,
        'resize': resizeCanvas,
        'getWidth': getCanvasWidth,
        'getHeight': getCanvasHeigth,
        'draw': drawCanvas
    };

});