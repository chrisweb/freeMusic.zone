# video background prototype

## getting started
* install the depencies using your command line tool
```npm install```
* build modernizr using grunt modernizr
```grunt```
* now to try out any of the protoypes just open the corresponding html file in your browser

### canvas_and_video_prototype
* display the video source in a canvas
* this can be nice if you want the canvas to alter the video, like cut it into pieces or apply a color with an opacity over it

### gif_fake_video_prototype
* a fake video which in fact is an animated gif
* video to animated gif can be done on the fly with ffmeg

### video_and_gif_fallback_prototype
in this prototype there are several situations:
* 1- the video element is supported and autoplay is supperted (desktop), but the the video has not loaded yet, in this case the video element displays the static image
* 2- the video element is supported and autoplay is supperted (desktop), and now the video is ready, the video element will autoplay the video
* 3- the video element is not supported, then the browser will display the img element inside of the non supported video element and display the animated gif video
* 4- the video element is supported but autoplay is not (iOS), then our js will replace the video element with the img element containing the animated gif video fallback
* 5- what is nice, is that even though the check to find out if autoplay is supported, might take some time (its asynchronous), in the meantime the video element is still displaying the static image (as the video is not being playing), which means that the page is not empty until we decide to show the gif, which means the video element static image placeholder works for our gif too

### video_prototype
* just the html5 video element, with two sources webm and mp4 videos
* the jpg image defined in the video tag is displayed until the video has finished loading and can be played
* in this example the webm video is missing so even chrome automatically fallsback to mp4

## documentation

also check out documentation.md for details about the technology used