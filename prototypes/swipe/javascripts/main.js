/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'node_modules/',
    paths: {
        'jquery': 'jquery/dist/jquery',
		'hammerjs': 'hammerjs/hammer'
    }
    
});

require([
	'jquery',
	'hammerjs'
	
], function (
	$,
	Hammer
) {

    'use strict';
	
	/**
	 * Note to self: if used with jquery, might be worth to take a look at this hammer / jquery plugin: https://github.com/hammerjs/jquery.hammer.js
	 */
	
	var initialize = function initializeFunction() {
		
		/**
		 * Note to self: After a tap (on touch end) also a click (event) is being triggered
		 */
		
		// (re-)enables text selection in browser using the mouse
		delete Hammer.defaults.cssProps.userSelect;

		// default options for horizontal swipe
		// but only triggered by touch or pointer events, so not by the mouse on desktop
		/*var hammerOptions = {
			inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
			recognizers: [
				// RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
				[Hammer.Pan, { threshold: 50, direction: Hammer.DIRECTION_HORIZONTAL }]
			]
		};*/
		
		// default options for horizontal swipe
		var hammerOptions = {
			recognizers: [
				// RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
				[Hammer.Pan, { threshold: 50, direction: Hammer.DIRECTION_HORIZONTAL }]
			]
		};

		var $page = $('#page');
		var $detected = $page.find('#detected');
		
		//var hammerManager = new Hammer.Manager($page[0], hammerOptions);

		hammerManager.on('panleft panright tap press click', function(event) {
			
			$detected.text(event.type + ' gesture detected');
			
		});
		
		/*
		// create a pinch and rotate recognizer
		// these require 2 pointers
		var pinch = new Hammer.Pinch();
		var rotate = new Hammer.Rotate();

		// we want to detect both the same time
		pinch.recognizeWith(rotate);

		// add to the Manager
		hammerManager.add([pinch, rotate]);


		hammerManager.on('pinch rotate', function(event) {
			
			$detected.text(event.type + ' gesture detected');
			
		});*/
		
		/*
		// Tap recognizer with minimal 2 taps
		hammerManager.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
		// Single tap recognizer
		hammerManager.add( new Hammer.Tap({ event: 'singletap' }) );


		// we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
		hammerManager.get('doubletap').recognizeWith('singletap');
		// we only want to trigger a tap, when we don't have detected a doubletap
		hammerManager.get('singletap').requireFailure('doubletap');


		hammerManager.on('singletap doubletap', function(event) {
			
			$detected.text(event.type + ' gesture detected');
			
		});*/
		
	};
	
	initialize();

});