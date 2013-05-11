'use strict';

(function() {
    
    var utilities = {};

    utilities.version = '0.0.1';

    // utilities logger
    utilities.log = function(data, color) {

        if (typeof(console) !== 'undefined') {
            
            // nodejs or browser mode
            if (typeof(window) === 'undefined') {
                
                if (typeof(color) !== 'undefined') {
                
                    // http://roguejs.com/2011-11-30/console-colors-in-node-js/
                    var colors = {};
                    colors.red   = '\u001b[31m';
                    colors.green  = '\u001b[32m';
                    colors.yellow  = '\u001b[33m';
                    colors.blue  = '\u001b[34m';
                    colors.magenta = '\u001b[35m';
                    colors.cyan = '\u001b[36m';

                    var colorReset = '\u001b[0m';

                    if (typeof(colors[color]) === undefined) {
                        throw "undefined color in utilities console log";
                    }

                    console.log(colors[color] + data + colorReset);
                    
                } else {
                    
                    console.log(data);
                    
                }
                
            } else {
                
                if (typeof(color) !== 'undefined') {
                
                    var colors = {};
                    colors.red   = 'FF0000';
                    colors.green  = '00FF00';
                    colors.yellow  = 'FFFF00';
                    colors.blue  = '0000FF';
                    colors.magenta = 'FF00FF';
                    colors.cyan = '00FFFF';
                    
                    colors.blue  = '0000FF';

                    if (typeof(colors[color]) === undefined) {
                        throw "undefined color in utilities console log";
                    }

                    console.log('%c' + data, 'color: #' + colors[color]);
                    
                } else {
                    
                    console.log(data);
                    
                }
                
            }
            
        }

    };
    
    if (typeof(module) === 'object' && typeof(module.exports) === 'object') {
        module.exports = utilities;
    } else if (typeof(define) === 'function' && define.amd) {
        define('utilities', [], function () { return utilities; } );
    }

})();