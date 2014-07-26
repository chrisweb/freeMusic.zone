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
        var canvasHeight = getCanvasHeight();

        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    };

    var resizeCanvas = function() {

        utilities.log('resizeCanvas ...');

        var canvasWidth = getDocumentWidth();
        var canvasHeight = getDocumentHeight();

        if (canvasWidth < canvasHeight) {

            canvasWidth = getDocumentHeight();
            canvasHeight = getDocumentWidth();

        }

        var configurationObject = configuration.get();

        var canvasElement = $('#' + configurationObject.application.canvasElement.id);

        canvasElement.css('width', canvasWidth + 'px');
        canvasElement.css('height', canvasHeight + 'px');

    };

    var getDocumentWidth = function() {

        //utilities.log('getClient width $(document) ... ' + $(document).width());

        return $(document).width();

    };

    var getDocumentHeight = function() {

        //utilities.log('getClient height $(document) ... ' + $(document).height());

        return $(document).height();

    };

    var getCanvasWidth = function() {

        var configurationObject = configuration.get();
        var canvasElementId = configurationObject.application.canvasElement.id;
        var canvasElement = $('#' + configurationObject.application.canvasElement.id)[0];

        //utilities.log('getClient width canvasElement ... ' + canvasElement.width);

        return canvasElement.width;

    };

    var getCanvasHeight = function() {

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

        //var startX = 500;
        //var startY = 500;
        //var buildingHeight = 500;
        //drawBuilding(canvasContext, configurationObject, startX, startY, buildingHeight);



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
        var canvasHeight = getCanvasHeight();

        // stroke color
        //canvasContext.strokeStyle = 'rgb(200,0,0)';

        //canvasContext.beginPath();

        drawCube(canvasContext, startX, startY, buildingHeight);

        // call this when all the drawing is done
        //canvasContext.closePath();

    };

    function drawCube(canvasContext, w, h, d) {

        // xyz coordinates of the points
        var vertices = [
            {x: w, y: h, z: -d}, // 0
            {x: w, y: h, z: d}, // 1
            {x: w, y: -h, z: d}, // 2
            {x: w, y: -h, z: -d}, // 3
            {x: -w, y: h, z: -d}, // 4
            {x: -w, y: h, z: d}, // 5
            {x: -w, y: -h, z: d}, // 6
            {x: -w, y: -h, z: -d}   // 7
        ];

        var wallPoints = [
            [vertices[0], vertices[1], vertices[2], vertices[3]], // Right side
            [vertices[1], vertices[5], vertices[6], vertices[2]], // Front side
            [vertices[5], vertices[4], vertices[7], vertices[6]], // Left side
            [vertices[4], vertices[0], vertices[3], vertices[7]], // Back side
            [vertices[0], vertices[4], vertices[5], vertices[1]], // Top side
            [vertices[2], vertices[6], vertices[7], vertices[3]]   // Bottom side
        ];

        //ctx.beginPath();

        //var texture = obj.texture;

        /*
         * 
         * http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/#transformations
         * http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#transformations
         * http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/HTML-canvas-guide/MatrixTransforms/MatrixTransforms.html
         * http://en.wikipedia.org/wiki/Transformation_matrix#Affine_transformations
         * http://extremelysatisfactorytotalitarianism.com/blog/?p=2120
         * http://www.irrlicht3d.org/pivot/entry.php?id=1329
         * http://nomone.com/blog/?p=32
         * 
         * context.transform(a, b, c, d, e, f);
         * 
         * a	c	e
         * b	d	f
         * 0	0	1
         * 
         * a	scale horizontally
         * b	skew vertically
         * c	skew horizontally
         * d	scale vertically
         * e	move horizontally
         * f	move vertically
         * 
         * context.transform(sx, Sy, Sx, sy, tx, ty);
         * 
         * sx	Sy	tx
         * Sy	sy	ty
         * 0	0	1
         * 
         * S = sheer /=/
         * t = translation o => o
         * s = scale o => O
         * 
         * rotation (angle is in radians):
         * 
         * [ cos(angle)  sin(angle) 0 ]
         * [ -sin(angle) cos(angle) 0 ]
         * [     0           0      1 ]
         */

        var i = 0;

        for (i; i <= 5; i++) {

            /*
            console.log(wallPoints[i][0].x, 'wallPoints[i][0].x');
            console.log(wallPoints[i][0].y, 'wallPoints[i][0].y');
            console.log(wallPoints[i][1].x, 'wallPoints[i][1].x');
            console.log(wallPoints[i][1].y, 'wallPoints[i][1].y');
            console.log(wallPoints[i][2].x, 'wallPoints[i][2].x');
            console.log(wallPoints[i][2].y, 'wallPoints[i][2].y');
            console.log(wallPoints[i][3].x, 'wallPoints[i][3].x');
            console.log(wallPoints[i][3].y, 'wallPoints[i][3].y');
             */

            var sin90 = Math.sin(90);
            var cos90 = Math.cos(90);
            //canvasContext.transform(cos, sin, -sin, cos, 0, 0);

            // canvasContext.transform(0, 100, 1, 0, 0, 0);

            canvasContext.save();

            var a = cos90;
            var b = 1;
            var c = 1;
            var d = cos90;
            var e = 1;
            var f = 1;

            canvasContext.transform(a, b, c, d, e, f);

            //canvasContext.fillStyle = 'red';
            canvasContext.strokeStyle = 'red';
            canvasContext.beginPath();
            canvasContext.moveTo(wallPoints[i][0].x, wallPoints[i][0].y);
            canvasContext.lineTo(wallPoints[i][1].x, wallPoints[i][1].y);
            canvasContext.lineTo(wallPoints[i][2].x, wallPoints[i][2].y);
            canvasContext.lineTo(wallPoints[i][3].x, wallPoints[i][3].y);
            canvasContext.closePath();
            //canvasContext.fill();
            canvasContext.stroke();

            canvasContext.restore();

        }

    }

    /**
     * 
     */
    return {
        'initialize': initializeCanvas,
        'show': showCanvasElement,
        'hide': hideCanvasElement,
        'resize': resizeCanvas,
        'getWidth': getCanvasWidth,
        'getHeight': getCanvasHeight,
        'draw': drawCanvas
    };

});