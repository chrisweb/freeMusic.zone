# mobile fast click prototype

## click vs touch start and touch end

### the problem:
* mobile devices add a 300ms delay on click events, the reason for this is that the browser is waiting to see if you are actually performing a double tap

### the solutions:
* by using the touch start and touch end events you avoid having the 300ms delay
* by using fastclick js
* by using hammertime

## readinglist

can i use touch action css property
http://caniuse.com/#feat=css-touch-action

fastclick js (fastclick js developed by the devs of the financial times)  
https://github.com/ftlabs/fastclick

hammertime by the makers of hammer.js  
https://github.com/hammerjs/hammer-time

google removed the delay in chrome
* chrome 32+ on android with width=device-width in the viewport meta tag doesn't have a 300ms delay  
* https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away?hl=en  
```<meta name="viewport" content="width=device-width, initial-scale=1">```
* update: as of now 16.05.2016 (iOS 9) also has no more delay if you use the above viewport meta tag 

W3C pointer events recommendation  
https://www.w3.org/TR/pointerevents/

jquery pointer events polyfill  
https://github.com/jquery/PEP

MDN pointer events  
https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

can i use pointer events  
http://caniuse.com/#feat=pointer-events  
check out the known issues:  
* does not work in IE11 on select elements if only a parent has the property set (though it does work if the select element has it set explicitly)
* IE 9 and 10 return true on 'pointerEvents' in document.documentElement.style due to support on SVG elements, but they don't support it on HTML elements.
* does not work on links in IE11 and Edge unless display is set to block or inline-block.
* moving the scrollbar on an object with pointer-events: none; works in Firefox, but doesn't work in either Chrome or IE.

html5rocks article about multi-touch web development  
http://www.html5rocks.com/en/mobile/touch/
        
google developers article about creating fast buttons for mobile web applications  
https://developers.google.com/mobile/articles/fast_buttons