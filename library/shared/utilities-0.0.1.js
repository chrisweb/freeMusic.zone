'use strict';

(function() {

    var utilities = {};

    utilities.version = '0.0.1';

    // utilities logger
    utilities.log = function(data, fontColor) {

        // apply colors
        if (typeof(console) !== 'undefined') {

            // nodejs or browser mode
            if (typeof(window) === 'undefined') {
                
                // background default black
                var backgroundColor = '\u001b[40m';

                if (typeof(fontColor) !== 'undefined') {

                    // http://roguejs.com/2011-11-30/console-fontColors-in-node-js/
                    var fontColors = {};
                    fontColors.red = '\u001b[31m';
                    fontColors.green = '\u001b[32m';
                    fontColors.yellow = '\u001b[33m';
                    fontColors.blue = '\u001b[34m';
                    fontColors.magenta = '\u001b[35m';
                    fontColors.cyan = '\u001b[36m';

                    var fontColorReset = '\u001b[0m';

                    if (typeof(fontColors[fontColor]) === undefined) {
                        throw "undefined fontColor in utilities console log";
                    }

                    console.log(backgroundColor + fontColors[fontColor] + data + fontColorReset);

                } else {

                    console.log(data);

                }

            } else {
                
                // background default white
                var backgroundColor = 'ffffff';
                
                if (typeof(fontColor) !== 'undefined') {

                    var fontColors = {};
                    fontColors.red = 'FF0000';
                    fontColors.green = '00FF00';
                    fontColors.yellow = 'FFFF00';
                    fontColors.blue = '0000FF';
                    fontColors.magenta = 'FF00FF';
                    fontColors.cyan = '00FFFF';

                    fontColors.blue = '0000FF';

                    if (typeof(fontColors[fontColor]) === undefined) {
                        throw "undefined fontColor in utilities console log";
                    }

                    console.log('%c' + data, 'background: #' + backgroundColor + '; color: #' + fontColors[fontColor]);

                } else {

                    console.log(data);

                }

            }

        }

    };

    if (typeof(module) === 'object' && typeof(module.exports) === 'object') {
        module.exports = utilities;
    } else if (typeof(define) === 'function' && define.amd) {
        define('utilities', [], function() {
            return utilities;
        });
    }

})();