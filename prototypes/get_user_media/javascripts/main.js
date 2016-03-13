/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': 'vendor/jquery-2.2.1/jquery.min'
    }
    
});

require([
	'jquery'
	
], function (
	$
) {

    'use strict';
	
	/**
	 * Note to self:
	 *
	 * getUserMedia does not work if the html is not sent by a server, so if it's file:// getUserMedia is blocked
	 *
	 * in production for chrome to use userMedia we need a secure connection:
	 * https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins
	 * localhost is fine too and will be treated as a secure connection
	 *
	 * list of html5 video element events
     * https://www.w3.org/TR/html5/embedded-content-0.html#event-media-ended
	 *
	 * canvas draw image
	 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 *
	 * damn ... after having finished testing this I found this adapter:
	 * https://github.com/webrtc/adapter
	 * use this for next version
	 *
	 */
	
	// get the canvas element
	var $canvas = $('#canvas');
	// get the canvas 2D context
	var context = $canvas[0].getContext('2d');
	
	var $takePhotoButton = $('#takePhoto');
	var $savePhotoButton = $('#savePhoto');
	var $video = $('#video');
	
	var videoWidth = 0;
	var videoHeight = 0;

	var hasGetUserMedia = function hasGetUserMediaFunction() {
		
		if (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined) {
			return true;
		} else {
			return !!(navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia);
		}
		
	}
	
	var onVideoResize = function onVideoResizeFunction(jqueryEvent) {
		
		console.log('on video resize');
		console.log(jqueryEvent);
		
		videoWidth = $(this).width();
		videoHeight = $(this).height();
		
		console.log(videoWidth);
		console.log(videoHeight);
		
	};
	
	// listen for a resize event off the video
	$video.on('resize', onVideoResize);
	
	var errorCallback = function errorCallbackFunction(error) {
		console.log('error: ', error);
	};
	
	var onTakePhotoButtonClick = function onTakePhotoButtonClickFunction(jqueryEvent) {
		
		jqueryEvent.preventDefault();
		
		console.log('on take photo button click');
		
		// set the canvas width and height
		$canvas.prop('width', videoWidth);
		$canvas.prop('height', videoHeight);
		
		// draw the photo onto the canvas using the video as image source
		context.drawImage($video[0], 0, 0, videoWidth, videoHeight);
		
	};
		
	// listen for take photo button click event
	$takePhotoButton.on('click', onTakePhotoButtonClick);
	
	/**
	 * Note to self
	 * to get the canvas as image we can choose between toDataURL and getImageData
	 * toDataURL creates an image based on the mime type you provide, a jpg image for example is pretty small in size .toDataURL("image/jpeg", 1.0);
	 * toDataURL documentation: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
	 * getImageData returns the raw image data, so the result is probably much bigger in size compared to a jpg created using toDataURL
	 * getImageData documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	 */
	
	var onSavePhotoButtonClick = function onSavePhotoButtonClickFunction(jqueryEvent) {
		
		jqueryEvent.preventDefault();
		
		console.log('on save photo button click');
		
		var imageDataUrl = $canvas[0].toDataURL('image/jpeg', 1.0);
		
		console.log(imageDataUrl);
		
		$.ajax({
			type: 'POST',
			url: '/saveimage',
			data: { 
				imgBase64: imageDataUrl
			}
		}).done(function() {
			console.log('saved');
		});
		
	};

	// listen for save photo button click event
	$savePhotoButton.on('click', onSavePhotoButtonClick);
	
	var getMediaStream = function getMediaStreamFunction(mediaStream) {

		var vendorURL = window.URL || window.webkitURL;
							
		console.log(vendorURL.createObjectURL(mediaStream));
		
		var sourceUrl = vendorURL.createObjectURL(mediaStream);
		
		$video.prop('src', sourceUrl);
			
		// we have set the video element on autoplay so we can omit calling play "manually"
		//video.play();
		
	};
	
	var startup = function startupFunction() {

		if (hasGetUserMedia()) {

			console.log(navigator.mediaDevices);
			console.log(navigator.mediaDevices.getUserMedia);
			
			var constraints = {
				audio: false,
				video: {
					facingMode: 'user'
					
				}
			};
		
			if (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined) {

				// new getUserMedia based on the current specification
				// https://www.w3.org/TR/mediacapture-streams/
				// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
				// firefox >= 36 / chrome >= 47
				
				console.log('get media stream - new API');
				
				var mediaDevicesGetUserMediaPromise = navigator.mediaDevices.getUserMedia(constraints);
				
				mediaDevicesGetUserMediaPromise.then(getMediaStream);
				
				mediaDevicesGetUserMediaPromise.catch(errorCallback);
				
			} else {

				// fallback older specification
				// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
				// firefox >= 12 / chrome >= 21
				
				console.log('get media stream - old API');
				
				navigator.getUserMedia = navigator.getUserMedia ||
					navigator.mozGetUserMedia || // old firefox API
					navigator.webkitGetUserMedia ||
					navigator.msGetUserMedia;
			
				navigator.getUserMedia(constraints, getMediaStream, errorCallback);
				
			}
		
		} else {
			console.log('getUserMedia() is not supported in your browser');
		}
		
	}
	
	startup();

});