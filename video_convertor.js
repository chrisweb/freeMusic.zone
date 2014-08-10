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

var videoDirectory = './videos';

var fs = require('fs');

var files = fs.readdirSync(videoDirectory);

var path = require('path');

for (var i in files) {

    if (path.extname(files[i]) === '.mov') {

        var videoSource = videoDirectory + '/' + files[i];

        // webm conversion
        var videoOutputWebm = videoDirectory + '/hompage-video_' + i + '.webm';
        
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

        fluentFFMPEG.saveToFile(videoOutputWebm);

        // mp4 conversion
        var videoOutputMpeg = videoDirectory + '/hompage-video_' + i + '.mp4';
        
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

        fluentFFMPEG.saveToFile(videoOutputMpeg);

    }

}