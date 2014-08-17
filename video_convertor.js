/**
 * ffmpeg video conversion
 * 
 * MIT Licensed, see License.txt
 * 
 * https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
 * https://www.virag.si/2012/01/webm-web-video-encoding-tutorial-with-ffmpeg-0-9/
 * https://www.virag.si/2012/01/web-video-encoding-tutorial-with-ffmpeg-0-9/
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

// remove previous versions of the videos
var files = fs.readdirSync(videoDirectory);

for (var i in files) {
    
    if (path.extname(files[i]) === '.mp4' || path.extname(files[i]) === '.webm' || path.extname(files[i]) === '.gif') {
        
        var videoPath = videoDirectory + '/' + files[i];
    
        fs.unlinkSync(videoPath, function (error) {

            if (error) {

                utilities.log('error while deleting: ' + files[i] + ', error: ' + error, 'fontColor:red');

            } else {

                utilities.log('deleted: ' + files[i], 'fontColor:green');

            }

        });
        
    }
    
}

//process.exit(code=0);

// encode the videos
var files = fs.readdirSync(videoDirectory);

var i;

for (i in files) {

    if (path.extname(files[i]) === '.mov') {

        var videoSource = videoDirectory + '/' + files[i];
        
        utilities.log('videoSource: ' + videoSource);

        // webm an mp4 conversion
        var videoOutputWebm = videoDirectory + '/hompage-video_' + i + '.webm';
        var videoOutputMp4 = videoDirectory + '/hompage-video_' + i + '.mp4';
        
        utilities.log('videoOutputWebm: ' + videoOutputWebm);
        utilities.log('videoOutputMp4: ' + videoOutputMp4);

        var fluent = Fluent(videoSource)

        // output as webm
        .output(videoOutputWebm)
        .outputFormat('webm')

        // output option(s) webm
        .noAudio()
        .withOutputOption('-quality', 'best') // best, good, rt
        
        // ouput as mp4
        .output(videoOutputMp4)
        .outputFormat('mp4')

        // output option(s) mp4
        .noAudio()
        .withOutputOption('-vprofile', 'main') // high, main, baseline
        .withOutputOption('-preset', 'slow') // ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow, placebo
        .withOutputOption('-pix_fmt', 'yuv420p')

        .takeScreenshots({
            count: 1,
            timemarks: ['2'],
            filename: 'hompage-thumbnail_' + i + '_' + '%i'
        }, videoDirectory)
        
        //.run() // takeScreenshot also calls run, so no need to do it here again
        
        .on('start', function(commandLine) {
            
            utilities.log('spawned ffmpeg with command: ' + commandLine, 'fontColor:green');
            
        })
        
        .on('codecData', function(data) {
            
            utilities.log('codecData:');
            
            utilities.log('format: ' + data.format);
            utilities.log('duration: ' + data.duration);
            utilities.log('audio: ' + data.audio);
            utilities.log('audio_details: ' + data.audio_details);
            utilities.log('video: ' + data.video);
            utilities.log('video_details: ' + data.video_details);
            
        })
        
        .on('progress', function(progress) {
            
            utilities.log('processing: ' + progress.percent + '% done');
            
        })

        .on('error', function(error, stdout, stderr) {
            
            utilities.log(stdout);
            utilities.log(stderr);
            utilities.log('an error occurred: ' + error.message, 'fontColor:red');
            
        })

        .on('end', function() {
            
            utilities.log('webm and mp4 encoding finished!');
    
            videoToGif(videoDirectory, videoSource, i);
            
        });

    }

}

var videoToGif = function videoToGifFunction(videoDirectory, videoSource, i) {

    // convert the videos to animated gifs
    var videoOutputGif = videoDirectory + '/hompage-video_' + i + '.gif';

    utilities.log('videoOutputGif: ' + videoOutputGif);

    var fluent = Fluent(videoSource)

    // output options
    .noAudio()
    .fps(10)
    .size('320x?')

    // output as gif
    .outputFormat('gif')
    .output(videoOutputGif)

    .on('start', function(commandLine) {

        utilities.log('spawned ffmpeg with command: ' + commandLine, 'fontColor:green');

    })

    .on('codecData', function(data) {

        utilities.log('codecData:');

        utilities.log('format: ' + data.format);
        utilities.log('duration: ' + data.duration);
        utilities.log('audio: ' + data.audio);
        utilities.log('audio_details: ' + data.audio_details);
        utilities.log('video: ' + data.video);
        utilities.log('video_details: ' + data.video_details);

    })

    .on('progress', function(progress) {

        utilities.log('processing: ' + progress.percent + '% done');

    })

    .on('error', function(error, stdout, stderr) {

        utilities.log(stdout);
        utilities.log(stderr);
        utilities.log('an error occurred: ' + error.message, 'fontColor:red');

    })

    .on('end', function() {

        utilities.log('gif encoding finished !');

    })

    .run();
    
};