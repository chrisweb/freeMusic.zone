
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
    
    utilities.logToHtml = false;
    
    utilities.logVerbose = false;
    
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
    
    utilities.htmlLog = function(data) {

        if (typeof(document.getElementById('log')[0]) === 'undefined') {
            
            var logDiv = document.createElement('div');
            logDiv.id = 'log';
            logDiv.style.cssText('position: absolute; left: 0; top: 0; padding: 0; margin: 0; border: 0; z-index: 999999;');
            
            document.getElementsByTagName('body')[0].prependChild(logDiv);
            
        }

        document.getElementById('log').appendTo(data);
            
    };
    
    utilities.fileLog = function(data, type) {
        
        errorLogger.log(type.toLowerCase(), JSON.stringify(data, null, 4));
        
    };

    // utilities logger
    utilities.log = function() {

        // is console defined, some older IEs don't have a console
        if (typeof(console) === 'undefined') {

            return false;
            
        }
        
        var logArguments = [];
        
        var argumentsLength = arguments.length;
        
        for (var i = 0; i < argumentsLength; i++) {
            
            var argument = arguments[i];
            
            if (typeof(argument) === 'string') {
                
                if (argument.substr(0, 5) === 'color:') {
                    
                    utilities.logFontColor = argument.substr(5, argument.length);
                    
                } else if (argument.substr(0, 7) === 'verbose:') {
                    
                    var verboseBoolean;
                    
                    if (argument.substr(7, argument.length) === 'true') {
                        
                        verboseBoolean = true;
                        
                    } else {
                        
                        verboseBoolean = false;
                        
                    }
                    
                    utilities.logVerbose = verboseBoolean;
                    
                } else if (argument.substr(0, 6) === 'tohtml:') {
                    
                    utilities.logFontColor = argument.substr(6, argument.length);
                    
                } else {
                    
                    logArguments.push(argument);
                    
                }
                
            } else {
                    
                logArguments.push(argument);
                    
            }
            
        }

        // nodejs or browser mode
        if (typeof(window) === 'undefined') {

            // background default black
            backgroundColor = '\u001b[40m';

            if (typeof(fontColor) !== 'undefined') {

                fontColors = {};

                fontColors.red = '\u001b[31m';
                fontColors.green = '\u001b[32m';
                fontColors.yellow = '\u001b[33m';
                fontColors.blue = '\u001b[34m';
                fontColors.magenta = '\u001b[35m';
                fontColors.cyan = '\u001b[36m';
                fontColors.white = '\u001b[37m';

                var fontColorReset = '\u001b[0m';

                if (typeof(fontColors[fontColor]) === undefined) {
                    throw 'undefined fontColor in utilities console log';
                }

                console.log(backgroundColor + fontColors[fontColor] + data + fontColorReset);

            } else {

                console.log(data);

            }

            // log to file
            /*if (typeof(logToHtml) !== 'undefined') {

                this.fileLog(data);

            }*/

        } else {

            // background default white
            backgroundColor = 'ffffff';

            if (typeof(fontColor) !== 'undefined') {

                fontColors = {};

                fontColors.red = 'FF0000';
                fontColors.green = '00FF00';
                fontColors.yellow = 'FFFF00';
                fontColors.blue = '0000FF';
                fontColors.magenta = 'FF00FF';
                fontColors.cyan = '00FFFF';
                fontColors.blue = '0000FF';
                fontColors.white = 'FFFFFF';

                if (typeof(fontColors[fontColor]) === undefined) {
                    throw 'undefined fontColor in utilities console log';
                }

                console.log('%c' + data, 'background: #' + backgroundColor + '; color: #' + fontColors[fontColor]);

                // log to html
                if (typeof(logToHtml) !== 'undefined') {

                    this.htmlLog('<span style="color: #' + fontColors[fontColor] + '; background-color: #' + backgroundColor + ';">' + data + '</span>');

                }

            } else {

                console.log(data);

                // log to html
                if (typeof(logToHtml) !== 'undefined') {

                    this.htmlLog(data);

                }

            }

        }
        
        _.each(logArguments, function() {
            
            
            
        });

    };
    
    utilities.getTimestamp = function() {
    
        return new Date().getTime();
        
    };

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

    // this module can be used in the browser as well as in nodejs
    if (typeof(module) === 'object' && typeof(module.exports) === 'object') {
        module.exports = utilities;
    } else if (typeof(define) === 'function' && define.amd) {
        define('utilities', [], function() {
            return utilities;
        });
    }

})();