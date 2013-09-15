'use strict';

(function() {

    var utilities = {};

    utilities.version = '0.0.3';
    
    // nodejs or browser mode, if windows is undefined it is nodejs mode
    if (typeof(window) === 'undefined') {
        
        // get the "winston" nodejs file logger vendor module
        /*var winston = require('winston');
        
        var errorLogfilePath = __dirname + '/../../application/logs/application.log';

        var winstonErrorFile = new winston.transports.File({
            filename: __dirname + errorLogfilePath,
            json: false,
            maxFiles: 20,
            maxsize: 20971520 // 20MB
        });
        
        var errorLogger = new winston.Logger({
            transports: [
                winstonErrorFile
            ],
            exceptionHandlers: [
                winstonErrorFile
            ],
            exitOnError: true
        });*/
        
    }
    
    utilities.htmlLog = function(data) {

        if (typeof(document.getElementById('log')[0]) === 'undefined') {
            
            var logDiv = document.createElement('div');
            logDiv.id = 'log';
            logDiv.style.cssText('position: absolute; left: 0; top: 0; padding: 0; margin: 0; border: 0; z-index: 999999;');
            
            document.getElementsByTagName('body')[0].prependChild(logDiv);
            
        }

        document.getElementById('log').appendTo(data);
            
    };
    
    utilities.fileLog = function(data) {
        
        errorLogger.log(type.toLowerCase(), JSON.stringify(data, null, 4));
        
    };

    // utilities logger
    utilities.log = function(data, fontColor, logToSpecial) {

        // is console defined, some older IEs don't have a console
        if (typeof(console) !== 'undefined') {

            // nodejs or browser mode
            if (typeof(window) === 'undefined') {
                
                // background default black
                var backgroundColor = '\u001b[40m';
                
                if (typeof(data) === 'object') {
                    
                    data = JSON.stringify(data)
                    
                }

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
                
                // log to file
                /*if (typeof(logToSpecial) !== 'undefined') {
                    
                    this.fileLog(data);
                    
                }*/

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
                    
                    // log to html
                    if (typeof(logToSpecial) !== 'undefined') {

                        this.htmlLog('<span style="color: #' + fontColors[fontColor] + '; background-color: #' + backgroundColor + ';">' + data + '</span>');

                    }

                } else {

                    console.log(data);
                    
                    // log to html
                    if (typeof(logToSpecial) !== 'undefined') {

                        this.htmlLog(data);

                    }

                }

            }

        }

    };
    
    utilities.getTimestamp = function() {
    
        return new Date().getTime();
        
    }

    utilities.millisecondsToString = function(timeInMilliseconds, translations) {

        if (typeof(translations) === 'undefined') {
            
            translations = {
                hours: 'hours',
                minutes: 'minutes',
                seconds: 'seconds',
                milliseconds: 'milliseconds'
            };
            
        }

        var oneHourInMilliseconds = 60*60*1000;
        var oneMinuteInMilliseconds = 60*1000;
        var oneSecondInMilliseconds = 1000;

        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var milliseconds = 0;

        var timeString = '';

        if (timeInMilliseconds >= oneHourInMilliseconds) {

            hours = Math.floor(timeInMilliseconds / oneHourInMilliseconds);

            timeString += hours + ' ' + translations.hours + ' ';

        }

        if (hours > 0) {

            timeInMilliseconds = timeInMilliseconds - hours * oneHourInMilliseconds;

        }

        if (timeInMilliseconds >= oneMinuteInMilliseconds) {

            minutes = Math.floor(timeInMilliseconds / oneMinuteInMilliseconds);

            timeString += minutes + ' ' + translations.minutes + ' ';

        }

        if (minutes > 0) {

            timeInMilliseconds = timeInMilliseconds - minutes * oneMinuteInMilliseconds;

        }

        if (timeInMilliseconds >= oneSecondInMilliseconds) {

            seconds = Math.floor(timeInMilliseconds / oneSecondInMilliseconds);

            timeString += seconds + ' ' + translations.seconds + ' ';

        }

        if (seconds > 0) {

            timeInMilliseconds = timeInMilliseconds - seconds * oneSecondInMilliseconds;

        }

        if (timeInMilliseconds !== 0) {

            milliseconds = timeInMilliseconds;

            timeString += milliseconds + ' ' + translations.milliseconds + ' ';

        }

        return timeString;

    };

    if (typeof(module) === 'object' && typeof(module.exports) === 'object') {
        module.exports = utilities;
    } else if (typeof(define) === 'function' && define.amd) {
        define('utilities', [], function() {
            return utilities;
        });
    }

})();