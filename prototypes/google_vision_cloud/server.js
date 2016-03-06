'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 35000;

var configurationModule = require('./configuration');
var configuration = configurationModule.get();

// static files
app.use('/javascripts', express.static('javascripts'));
app.use('/photos', express.static('photos'));

// deliver get_user_media_prototype.html file
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/vision.html');
});

server.listen(port, function() {
    console.log('server listening on: 127.0.0.1:%s', port);
});

// right now vision is not yet part of gcloud but there is a pull request
// https://github.com/GoogleCloudPlatform/gcloud-node/pull/1136
// dependency in package json is now (until code is accepted in gcloud):
// "gcloud": "git://github.com/stephenplusplus/gcloud-node.git#spp--vision"
// then change package json:
// "gcloud": "^0.28.0"

var gcloud = require('gcloud')({
    keyFilename: './prototypes/google_vision_cloud/keyfile.json',
	projectId: configuration.visionAPI.projectId
});

var vision = gcloud.vision();

var images = [
  //'./photos/angry.jpg',
  './prototypes/google_vision_cloud/photos/happy.jpg',
  //'./photos/sad.jpg'
];

// face, landmark, label, logo, properties, safeSearch, text
var types = [
  'face'
];

/*vision.detect(images, types, function(error, detections, apiResponse) {

	console.log(error);
	
	detections.forEach(function(face) {
		
		console.log(face);
		
		//face.forEach(function(faceDetection) {
			
		//	console.log(faceDetection);
			
		//});
		
	});
	
	console.log(apiResponse);

});*/

vision.detectFaces(images, function(error, detections, apiResponse) {

	//console.log(error);
    
    if (!error) {
    
        detections.forEach(function (face) {
            
            console.log(face);
            
            //face.forEach(function (faceDetection) {
                
            //    console.log(faceDetection);
			
            //});
		
        });
        
        console.log(apiResponse);
    
    } else {

        console.log(error);

    }

});

