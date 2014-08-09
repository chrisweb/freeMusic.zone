/**
 * ffmpeg video conversion
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('./bower_components/chrisweb-utilities/utilities');

var FluentFFMPEG = require('fluent-ffmpeg');

utilities.log('[VIDEO CONVERTOR] starting');

// windows only
if (typeof(process.env.FFMPEG_PATH) === 'undefined') {

    process.env.FFMPEG_PATH = 'C:\ffmpeg\bin\ffmpeg.exe';
    
    utilities.log('FFMPEG_PATH not found, setting it by default to "' + process.env.FFMPEG_PATH.toUpperCase() + '"', 'fontColor:red');

}

if (typeof(process.env.FFPROBE_PATH) === 'undefined') {

    process.env.FFPROBE_PATH = 'C:\ffmpeg\bin\ffprobe.exe';
    
    utilities.log('FFPROBE_PATH not found, setting it by default to "' + process.env.FFPROBE_PATH.toUpperCase() + '"', 'fontColor:red');

}

var videoSource = './videos/concert_dancing.mov';
var videoOutput = './videos/concert_dancing.mp4';

// webm conversion
var fluentFFMPEG = new FluentFFMPEG({ source: videoSource });

// Specify input format
fluentFFMPEG.fromFormat('mov');

// Set output format
fluentFFMPEG.toFormat('webm');

fluentFFMPEG.on('error', function(err) {
    console.log('An error occurred: ' + err.message);
});

fluentFFMPEG.on('end', function() {
    console.log('Processing finished !');
});

fluentFFMPEG.saveToFile(videoOutput);

// mp4 conversion
var fluentFFMPEG = new FluentFFMPEG({ source: videoSource });

// Specify input format
fluentFFMPEG.fromFormat('mov');

// Set output format
fluentFFMPEG.toFormat('mp4');

fluentFFMPEG.on('error', function(err) {
    console.log('An error occurred: ' + err.message);
});

fluentFFMPEG.on('end', function() {
    console.log('Processing finished !');
});

fluentFFMPEG.saveToFile(videoOutput);