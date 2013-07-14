/**
 * asynchronous audio data analyzer ffmpeg wrapper using node-pcm
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('./library/shared/utilities-0.0.1');

// nodejs http
var http = require('http');

// nodejs filesystem
var fs = require('fs');

// node-pcm
var pcm = require('pcm');


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
    var writeStream = fs.createWriteStream(trackPath);

    writeStream.on('open', function() {

        fetchTrackFromJamendo(writeStream, trackPath);

    });

    writeStream.on('error', function(error) {

        console.log('writeTrackToDisc writeStream, error: ' + error);

        writeStream.end();

    });

};

/**
 * 
 * fetch a track from jamendo
 * 
 * @param {type} writeStream
 * @param {type} trackPath
 * @returns {undefined}
 */
var fetchTrackFromJamendo = function(writeStream, trackPath) {

    var options = {
        hostname: 'storage-new.newjamendo.com',
        port: 80,
        path: '/download/track/415208/ogg1',
        method: 'GET'
    };

    var httpRequest = http.request(options, function(httpResponse) {

        console.log('writeTrackToDisc httpRequest STATUS: ' + httpResponse.statusCode);
        console.log('writeTrackToDisc httpRequest HEADERS: ' + JSON.stringify(httpResponse.headers));

        httpResponse.setEncoding('utf8');

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

    var options = {
        stereo: true,
        sampleRate: 44100
    };
    
    var min = 1.0;
    var max = -1.0;

    // get raw PCM data using ffmpeg
    pcm.getPcmData(
        trackPath,
        options,
        function(sample, channel) {

            console.log(sample);
            console.log(channel);

            // Sample is from [-1.0...1.0], channel is 0 for left and 1 for right
            min = Math.min(min, sample);
            max = Math.max(max, sample);
            
            console.log(min);
            console.log(max);

        }, function(error, output) {

            if (error) {

                console.log(error);

            } else {
                
                console.log(output);
                
            }

            console.log('min=' + min + ', max=' + max);

        }
        
    );

};

var trackId = '415208';
var trackExtension = 'ogg';

getTrackData(trackId, trackExtension);