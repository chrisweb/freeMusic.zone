
/**
 * 
 * TODO: 
 * - use arguments in function to let user pass multiple variables as for
 * original console log
 * - let user set color with argument color:color_name
 * - let user change environment with environment:environment_mode
 * - let user choose default color on initialization
 * - let user set environment on initialization
 * - silence console logs on production mode
 * 
 * @returns {undefined}
 */

(function() {
    
    'use strict';

    var utilities = {};

    utilities.version = '0.0.3';
    
    var errorLogger;
    
    utilities.logFontColor = 'default';
    
    utilities.logBackgroundColor = 'default';
    
    utilities.logSpecial = false;
    
    utilities.logVerbose = true;
    
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
        
        errorLogger = new winston.Logger({
            transports: [
                winstonErrorFile
            ],
            exceptionHandlers: [
                winstonErrorFile
            ],
            exitOnError: true
        });*/
        
    }
    
    utilities.htmlLog = function htmlLogFunction(logObjects, logObjectsLength, logFontColor, logBackgroundColor) {

        // TODO: fix: if logging start before domload some messages get lost

        if (document.getElementById('log') === null) {
            
            var logDiv = document.createElement('div');

            logDiv.id = 'log';
            
            logDiv.style.cssText = 'position: absolute; overflow: scroll; left: 0; bottom: 0; padding: 0; margin: 0; border: 0; z-index: 999999; width: 100%; height: 20%; background-color: #fff;';
            
            document.body.appendChild(logDiv);
            
        }
        
        for (var i = 0; i < logObjectsLength; i++) {
            
            var logSpan = document.createElement('span');
            
            logSpan.style.cssText = 'color: #' + logFontColor + '; background-color: #' + logBackgroundColor + ';';
            
            var spanContent = document.createTextNode(logObjects[i]);
            
            logSpan.appendChild(spanContent);

            document.getElementById('log').appendChild(logSpan);
            
            var brElement = document.createElement('br');
            
            document.getElementById('log').appendChild(brElement);
            
        }
            
    };
    
    utilities.fileLog = function fileLogFunction(data, type) {
        
        errorLogger.log(type.toLowerCase(), JSON.stringify(data, null, 4));
        
    };

    // utilities logger
    utilities.log = function logFunction() {

        // is console defined, some older IEs don't have a console
        if (typeof(console) === 'undefined') {

            return false;
            
        }
        
        // extract options and get objects to log
        var logArguments = handleLogArguments(arguments);
        
        var logObjects = logArguments.objects;
        var logFontColor = logArguments.fontColor;
        var logBackgroundColor = logArguments.backgroundColor;
        
        var logObjectsLength = logObjects.length;

        // nodejs or browser mode
        if (typeof(window) === 'undefined') {

            if (typeof(utilities.logVerbose) !== 'undefined'
            && utilities.logVerbose === true) {

                // get background and fontColor codes
                var color = getServerColors(logFontColor, logBackgroundColor);

                // log each object
                for (var i = 0; i < logObjectsLength; i++) {
                    
                    if (typeof(logObjects[i]) === 'string') {
                        
                        console.log(color.background + color.font + logObjects[i] + color.reset);
                        
                    } else {
                        
                        console.log(logObjects[i]);
                        
                    }

                };
                
            }
            
            // log to file
            if (typeof(utilities.logSpecial) !== 'undefined'
            && utilities.logSpecial === true) {

                this.fileLog(logObjects, logObjectsLength);

            }

        } else {

            // get background and fontColor codes
            var color = getClientColors(logFontColor, logBackgroundColor);

            if (typeof(utilities.logVerbose) !== 'undefined'
            && utilities.logVerbose === true) {

                // log each object
                for (var i = 0; i < logObjectsLength; i++) {

                    if (typeof(logObjects[i]) === 'string') {

                        console.log('%c' + logObjects[i], 'background: #' + color.background + '; color: #' + color.font);
                        
                    } else {
                        
                        console.log(logObjects[i]);
                        
                    }

                };
                
            }

            // log to html
            if (typeof(utilities.logSpecial) !== 'undefined'
            && utilities.logSpecial === true) {

                this.htmlLog(logObjects, logObjectsLength, color.font, color.background);

            }

        }

    };
    
    var getClientColors = function getClientColorsFunction(logFontColor, logBackgroundColor) {
        
        var colors = {};

        colors.red = 'FF0000';
        colors.green = '00FF00';
        colors.yellow = 'FFFF00';
        colors.blue = '0000FF';
        colors.magenta = 'FF00FF';
        colors.cyan = '00FFFF';
        colors.white = 'FFFFFF';
        colors.black = '000000';
        
        var fontColor;
        var backgroundColor;

        // font color
        if (typeof(logFontColor) === 'undefined'
        || logFontColor === 'default') {
            
            fontColor = colors['black'];
            
        } else {
            
            if (typeof(colors[logFontColor]) !== 'undefined') {
            
                fontColor = colors[logFontColor];
                
            } else {
                
                throw 'unknown fontColor in utilities console log';
                
            }
            
        }
        
        // background color
        if (typeof(logBackgroundColor) === 'undefined'
        || logBackgroundColor === 'default') {
            
            backgroundColor = colors['white'];
            
        } else {
            
            if (typeof(colors[logBackgroundColor]) !== 'undefined') {
            
                backgroundColor = colors[logBackgroundColor];
                
            } else {
                
                throw 'unknown fontColor in utilities console log';
                
            }
            
        }
        
        return { font: fontColor, background: backgroundColor };
        
    };
    
    var getServerColors = function getServerColorsFunction(logFontColor, logBackgroundColor) {
        
        var colors = {};

        colors.red = '\u001b[31m';
        colors.green = '\u001b[32m';
        colors.yellow = '\u001b[33m';
        colors.blue = '\u001b[34m';
        colors.magenta = '\u001b[35m';
        colors.cyan = '\u001b[36m';
        colors.white = '\u001b[37m';
        colors.black = '\u001b[40m';
        
        var fontColor;
        var backgroundColor;

        // font color
        if (typeof(logFontColor) === 'undefined'
        || logFontColor === 'default') {
            
            fontColor = colors['white'];
            
        } else {
            
            if (typeof(colors[logFontColor]) !== 'undefined') {
            
                fontColor = colors[logFontColor];
                
            } else {
                
                throw 'unknown font color in utilities console log';
                
            }
            
        }
        
        // background color
        if (typeof(logBackgroundColor) === 'undefined'
        || logBackgroundColor === 'default') {
            
            backgroundColor = colors['black'];
            
        } else {
            
            if (typeof(colors[logBackgroundColor]) !== 'undefined') {
            
                backgroundColor = colors[logBackgroundColor];
                
            } else {
                
                throw 'unknown background color in utilities console log';
                
            }
            
        }
        
        return { font: fontColor, background: backgroundColor, reset: '\u001b[0m' };
        
    };
    
    var handleLogArguments = function handleLogArgumentsFunction(logArguments) {
        
        var logObjects = [];
        
        var logFontColor = utilities.logFontColor;
        var logBackgroundColor = utilities.logBackgroundColor;
        
        var argumentsLength = logArguments.length;
        
        for (var i = 0; i < argumentsLength; i++) {
            
            var argument = logArguments[i];
            
            if (typeof(argument) === 'string') {
                
                if (argument.substr(0, 10) === 'fontColor:') {
                    
                    logFontColor = argument.substr(10, argument.length);
                    
                } else if (argument.substr(0, 16) === 'backgroundColor:') {
                    
                    logBackgroundColor = argument.substr(16, argument.length);
                    
                } else {
                    
                    logObjects.push(argument);
                    
                }
                
            } else {
                    
                logObjects.push(argument);
                    
            }
            
        }
        
        return { objects: logObjects, fontColor: logFontColor, backgroundColor: logBackgroundColor };
        
    };
    
    utilities.getTimestamp = function getTimestampFunction() {
    
        return new Date().getTime();
        
    };

    utilities.millisecondsToString = function millisecondsToStringFunction(timeInMilliseconds, translations) {

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
    
    utilities.generateUUID = function generateUUIDFunction() {
    
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        
        return uuid;
        
    };

    // this module can be used in the browser as well as in nodejs
    if (typeof(module) === 'object' && typeof(module.exports) === 'object') {
        module.exports = utilities;
    } else if (typeof(define) === 'function' && define.amd) {
        define('utilities', [], function() {
            return utilities;
        });
    }

})();