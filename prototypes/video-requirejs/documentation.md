# video background prototype

## goal
* have a video as fullscreen page background instead of an image or just a css color

## problems that need to be solved

### safari iOS video
* on iOS the video won't start if called programmatically (without any prior user action), to make a video start apple requires the user to do an action (click somewhere) before it can be started
* the reason is in Safari on iOS (for all devices, including iPad), where the user may be on a cellular network and be charged per data unit, preload and autoplay are disabled
* https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
* for the iOS problem of the video that does not start we could use an animated gif of the video as fallback
* obviously the quality of the animated gif would be much lower than that of the video, but as background with a filter over it the user won't notice it that much

### Firefox sound icon
* since firefox 42 an icon gets displayed if there is a video or audio element on the page that is being played
* https://wiki.mozilla.org/QA/Tab_visual_sound_indicator
* as our background video(s) have no sound we don't wan't that icon to appear
* the solution is to use the muted attribute of the video element muted="muted"

## further reading (sources)

html5rocks html5 video article
* http://www.html5rocks.com/en/tutorials/video/basics/

can i use video
* http://caniuse.com/#feat=video

html5 video on Mozilla Developer Network (MDN)
* https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video

MDN page about the video element
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video

MDN article about manipulating a video using the canvas element
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas