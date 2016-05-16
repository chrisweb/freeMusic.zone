# visualizer prototype

W3C Media Capture and Streams  
https://w3c.github.io/mediacapture-main/getusermedia.html  
https://www.w3.org/TR/mediacapture-streams/  

can i use: get user media  
http://caniuse.com/#feat=stream  

chrome status  
https://www.chromestatus.com/features/6067380039974912  

microsoft edge status  
https://dev.windows.com/en-us/microsoft-edge/platform/status/?filter=f3f0000bf&search=getUserMedia  

microsoft edge example  
https://blogs.windows.com/msedgedev/2015/05/13/announcing-media-capture-functionality-in-microsoft-edge/  

capture audio and video in html5 (html5rocks)  
http://www.html5rocks.com/en/tutorials/getusermedia/intro/  

MDN taking still photos  
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos  

MDN Navigator.getUserMedia -> deprecated  
https://developer.mozilla.org/en/docs/Web/API/Navigator/getUserMedia  

MDN MediaDevices.getUserMedia  
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia  

google developers: navigator mediaDevices getUserMedia  
https://developers.google.com/web/updates/2015/10/media-devices?hl=en  

stackoverflow: iOS camera  
http://stackoverflow.com/questions/8581081/how-to-access-a-mobiles-camera-from-a-web-app  

NOTES:

getUserMedia does not work if the html is not sent by a server, so if it's file:// getUserMedia is blocked  

in production for chrome to use userMedia we need a secure connection:  
https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins  
localhost is fine too and will be treated as a secure connection  

list of html5 video element events  
https://www.w3.org/TR/html5/embedded-content-0.html#event-media-ended  

canvas draw image  
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage  

damn ... after having finished testing this I found this adapter:  
https://github.com/webrtc/adapter  
live demo: https://webrtc.github.io/samples/src/content/getusermedia/resolution/  
use this for next version  

converting the photo (canvas) into an image:

to get the canvas as image we can choose between toDataURL and getImageData  
toDataURL creates an image based on the mime type you provide, a jpg image for example is pretty small in size .toDataURL("image/jpeg", 1.0);  
toDataURL documentation: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL  
getImageData returns the raw image data, so the result is probably much bigger in size compared to a jpg created using toDataURL  
getImageData documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData  
