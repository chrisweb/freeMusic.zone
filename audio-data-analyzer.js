/**
 * asynchronous audio data analyzer ffmpeg wrapper using node-pcm
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('./library/shared/utilities-0.0.3');

// nodejs http
var http = require('http');

// nodejs filesystem
var fs = require('fs');

// nodejs child_process
var childProcess = require('child_process');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {

    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

// get the environment variable
var environment = process.env.NODE_ENV;

var temporaryTracksDirecotry = '/tmp/tracks';
var finalTracksDirecotry = __dirname + '/tracks';

var trackFileName = undefined;

var checkIfFileAlreadyExists = false;

/**
 * 
 * get track data
 * 
 * @param {type} audio_path
 * @param {type} output_width
 * @param {type} duration
 * @param {type} sample_rate
 * @param {type} channels
 * @param {type} cb
 * @returns {getPeaks.coefficient_to_db}
 */
var getTrackData = function(trackId, trackExtension) {

    trackFileName = trackId + '.' + trackExtension;

    if (arguments.length === 2) {

        var tmpDirecotry = '/tmp';

        // does the directory exist
        fs.exists(tmpDirecotry, function(exists) {

            console.log('getTrackData, tmpDirecotry exists?: ' + exists);

            if (exists) {

                checkIfTemporaryTracksDirectoryExists();

            } else {

                fs.mkdir(tmpDirecotry, 0666, function(error) {

                    if (error) {

                        console.log('getTrackData mkdir error: ' + error);

                    } else {

                        checkIfTemporaryTracksDirectoryExists();

                    }

                });

            }

        });

    } else {

        console.log('getTrackData arguments, error: ' + arguments);

    }

};

/**
 * 
 * check if the temporary tracks directory exists
 * 
 * @param {type} fileDirecotry
 * @returns {undefined}
 */
var checkIfTemporaryTracksDirectoryExists = function(fileDirecotry) {

    // does the directory exist
    fs.exists(temporaryTracksDirecotry, function(exists) {

        console.log('checkIfTemporaryTracksDirectoryExists exists?: ' + exists);

        if (exists) {

            checkIfFinalTracksDirectoryExists();

        } else {

            // it does not exist yet so we create it
            fs.mkdir(temporaryTracksDirecotry, 0666, function(error) {

                if (error) {

                    console.log('checkIfTemporaryTracksDirectoryExists mkdir error: ' + error);

                } else {

                    checkIfFinalTracksDirectoryExists();

                }

            });

        }

    });

};

/**
 * 
 * check if the final tracks directory exists
 * 
 * @returns {undefined}
 */
var checkIfFinalTracksDirectoryExists = function() {

    // does the directory exist
    fs.exists(finalTracksDirecotry, function(exists) {

        console.log('checkIfFinalTracksDirectoryExists exists?: ' + exists);

        if (exists) {

            checkIfTrackExists();

        } else {

            // it does not exist yet so we create it
            fs.mkdir(finalTracksDirecotry, 0666, function(error) {

                if (error) {

                    console.log('checkIfFinalTracksDirectoryExists mkdir error: ' + error);

                } else {

                    checkIfTrackExists();

                }

            });

        }

    });

};

/**
 * 
 * check if the track already exists
 * 
 * @returns {undefined}
 */
var checkIfTrackExists = function() {

    if (checkIfFileAlreadyExists) {

        var toPath = finalTracksDirecotry + '/' + trackFileName;

        // does the file exist
        fs.exists(toPath, function(exists) {

            console.log(toPath + ' exists?: ' + exists);

            if (exists) {

                console.log('this track already exists');

            } else {

                writeTrackToDisc();

            }

        });

    } else {

        writeTrackToDisc();

    }

};

/**
 * 
 * write the track to temporary folder on disc
 * 
 * @returns {undefined}
 */
var writeTrackToDisc = function() {

    var trackPath = temporaryTracksDirecotry + '/' + trackFileName;

    // 
    var options = {
        hostname: 'storage-new.newjamendo.com',
        port: 80,
        path: '/download/track/415208/ogg1',
        method: 'GET'
    };

    var writeStream = fs.createWriteStream(trackPath);

    writeStream.on('open', function() {

        var httpRequest = http.request(options, function(httpResponse) {

            console.log('writeTrackToDisc httpRequest STATUS: ' + httpResponse.statusCode);
            console.log('writeTrackToDisc httpRequest HEADERS: ' + JSON.stringify(httpResponse.headers));

            httpResponse.on('data', function(chunk) {

                writeStream.write(chunk);

            });

            httpResponse.on('end', function() {

                console.log('file ' + trackFileName + ' got downloaded into ' + trackPath);

                writeStream.end();

                moveTrack();

            });

        });

        httpRequest.on('error', function(error) {

            console.log('writeTrackToDisc, http request error: ' + error.message);

            writeStream.end();

        });

        httpRequest.end();

    });

    writeStream.on('error', function(error) {

        console.log('writeTrackToDisc writeStream, error: ' + error);

        writeStream.end();

    });

};

/**
 * 
 * move the track from temporary folder to its final destination
 * 
 * @returns {undefined}
 */
var moveTrack = function() {

    var fromPath = temporaryTracksDirecotry + '/' + trackFileName;
    var toPath = finalTracksDirecotry + '/' + trackFileName;

    var trackSourceReadStream = fs.createReadStream(fromPath);

    trackSourceReadStream.on('open', function() {

        var trackDestinationWriteStream = fs.createWriteStream(toPath);

        trackDestinationWriteStream.on('open', function() {

            trackSourceReadStream.pipe(trackDestinationWriteStream);

        });

        trackDestinationWriteStream.on('close', function() {

            console.log('track got moved from ' + fromPath + ' to final destination ' + toPath);

            analyzeTrack();

        });

        trackDestinationWriteStream.on('error', function(error) {

            console.log('moveTrack trackDestinationWriteStream, error: ' + error);

        });

    });

    trackSourceReadStream.on('close', function(error) {

        console.log('read and write stream are now closed');

    });

    trackSourceReadStream.on('error', function(error) {

        console.log('moveTrack trackSourceReadStream, error: ' + error);

    });

};

/**
 * 
 * analyzing track data
 * 
 * @returns {undefined}
 */
var analyzeTrack = function() {

    var trackPath = finalTracksDirecotry + '/' + trackFileName;

    console.log('analyzing track data, trackPath: ' + trackPath);
    
    // https://github.com/HowlingEverett/waveform-util/blob/master/lib/waveform.js

    // ffprobe file data
    var ffprobeSpawn = childProcess.spawn(
       'ffprobe',
       [
           trackPath,
           '-show_streams',
           '-show_format',
           '-print_format',
           'json'
       ]
    );

    var ouput = '';
     
    //ffprobeSpawn.stdout.setEncoding('utf8');

    ffprobeSpawn.stdout.on('data', function(data) {

        //console.log('data: ' + data);
        
        ouput += data;
        
    });

    ffprobeSpawn.stdout.on('end', function(data) {

        console.log('ffprobeSpawn stdout end');

        if (output.length > 0) {

            console.log(output);

            //callback(output, null);

        } else {

            console.log('no output recieved');

        }

    });

    ffprobeSpawn.stderr.setEncoding('utf8');

    ffprobeSpawn.stderr.on('data', function(data) {

        //console.log(data.toString());

    });

    ffprobeSpawn.stderr.on('end', function() {

        console.log('ffprobeSpawn stderr end');

    });

    ffprobeSpawn.on('exit', function(code) {

        console.log('ffprobeSpawn exit, code: ' + code);

    });

    ffprobeSpawn.on('close', function() {

        console.log('ffprobeSpawn close');

    });
    
    // pcm audio data
    var channels = 1;
    var sampleRate = 44100;

    var ffmpegSpawn = childProcess.spawn(
        'ffmpeg',
        [
            '-i',
            trackPath,
            '-f',
            's16le',
            '-ac',
            channels,
            '-acodec',
            'pcm_s16le',
            '-ar',
            sampleRate,
            '-y',
            'pipe:1'
        ]
    );

    var output = '';

    // TODO: uncomment for ffprobe
    //ffmpegSpawn.stdout.setEncoding('utf8');

    var oddByte = null;
    var channel = 0;
    
    var outputCounter = 0;
    
    var maxValue = 0;

    ffmpegSpawn.stdout.on('data', function(data) {

        // http://nodejs.org/api/buffer.html#buffer_buf_readint16le_offset_noassert
        // https://github.com/jhurliman/node-pcm/blob/master/lib/pcm.js

        var value;
        var i = 0;
        var dataLen = data.length;
        var percentageOfMax = 0;

        for (; i < dataLen; i += 2) {
            
            value = data.readInt16LE(i, true);
            
            //channel = ++channel % 2;
            
            //console.log('B: ' + value + ' / ' + channel);
            
            outputCounter++;

            //if (value > maxValue) maxValue = value;
            
            // maxValue is 32767
            
            // (value / maxValue)*100 = percentage of max
            percentageOfMax = (value / 32767)*100;
            
            //return false;
            
        }
        
        //console.log('outputCounter: ' + outputCounter);
        
        //console.log(maxValue); // 32767
        
        // get absolute value
        var absolutePercentageOfMaxMath = Math.abs(percentageOfMax);
        
        console.log(absolutePercentageOfMaxMath);
        
        var bar = '';
        
        for (var i=0; i < absolutePercentageOfMaxMath/10; i++) {
            
            bar += '*';
            
        }
        
        console.log(bar);

    });

    ffmpegSpawn.stdout.on('end', function(data) {

        console.log('ffmpegSpawn stdout end');

        if (output.length > 0) {

            console.log(output);

            //callback(output, null);

        } else {

            console.log('no output recieved');

        }

    });

    ffmpegSpawn.stderr.setEncoding('utf8');

    ffmpegSpawn.stderr.on('data', function(data) {

        //console.log(data.toString());

    });

    ffmpegSpawn.stderr.on('end', function() {

        console.log('ffmpegSpawn stderr end');

    });

    ffmpegSpawn.on('exit', function(code) {

        console.log('ffmpegSpawn exit, code: ' + code);

    });

    ffmpegSpawn.on('close', function() {

        console.log('ffmpegSpawn close');

    });

};

var trackId = '415208';
var trackExtension = 'ogg';

getTrackData(trackId, trackExtension);