/**
 * ffmpeg video conversion
 * 
 * MIT Licensed, see License.txt
 * 
 * https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
 * 
 */

// utilities module
var utilities = require('./bower_components/chrisweb-utilities/utilities');

var Fluent = require('fluent-ffmpeg');

var fs = require('fs');

var path = require('path');

utilities.log('[VIDEO CONVERTOR]');

// windows only
if (typeof(process.env.FFMPEG_PATH) === 'undefined') {

    process.env.FFMPEG_PATH = 'C:\ffmpeg\bin\ffmpeg.exe';
    
    utilities.log('FFMPEG_PATH not found, setting it by default to "' + process.env.FFMPEG_PATH.toUpperCase() + '"', 'fontColor:red');

}

if (typeof(process.env.FFPROBE_PATH) === 'undefined') {

    process.env.FFPROBE_PATH = 'C:\ffmpeg\bin\ffprobe.exe';
    
    utilities.log('FFPROBE_PATH not found, setting it by default to "' + process.env.FFPROBE_PATH.toUpperCase() + '"', 'fontColor:red');

}

var videoDirectory = 'videos';

var files = fs.readdirSync(videoDirectory);

var fluentCommand = new Fluent();

for (var i in files) {

    if (path.extname(files[i]) === '.mov') {

        var videoSource = videoDirectory + '/' + files[i];
        
        utilities.log('videoSource: ' + videoSource);

        var videoOutputWebm = videoDirectory + '/hompage-video_' + i + '.webm';
        var videoOutputMpeg = videoDirectory + '/hompage-video_' + i + '.mp4';
        
        utilities.log('videoOutputWebm: ' + videoOutputWebm);
        utilities.log('videoOutputMpeg: ' + videoOutputMpeg);
        
        var fluentCommand = new Fluent();
        
        // video input
        fluentCommand.input(videoSource)
                    // specify input format
                    .inputFormat('mov')
                    // disable audio as we dont need it for the intro videos
                    .noAudio();
                    // specify output frame rate
                    //.fps(29.7)
                    
        // second output as webm
        fluentCommand.outputFormat('webm') // set output format
                    .output(videoOutputWebm)
                    // specify output frame rate
                    //.fps(29.7)
        
        // first ouput as mpeg
        fluentCommand.outputFormat('mp4') // set output format
                    .output(videoOutputMpeg)
                    // specify output frame rate
                    //.fps(29.7)
                    
        fluentCommand.on('start', function(commandLine) {
            
            utilities.log('Spawned Ffmpeg with command: ' + commandLine, 'fontColor:green');
            
        });
        
        fluentCommand.on('codecData', function(data) {
            
            utilities.log('codecData:');
            utilities.log('codecData:');
            
            utilities.log('format: ' + data.format);
            utilities.log('duration: ' + data.duration);
            utilities.log('audio: ' + data.audio);
            utilities.log('audio_details: ' + data.audio_details);
            utilities.log('video: ' + data.video);
            utilities.log('video_details: ' + data.video_details);
            
        });
        
        fluentCommand.on('progress', function(progress) {
            
            utilities.log('Processing: ' + progress.percent + '% done');
            
        });

        fluentCommand.on('error', function(err) {
            
            utilities.log('An error occurred: ' + err.message, 'fontColor:red');
            
        });

        fluentCommand.on('end', function() {
            
            utilities.log('Processing finished !');
            
        });

        fluentCommand.run();

    }

}