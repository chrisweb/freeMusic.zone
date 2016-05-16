# mobile fast click prototype

## getting started
install the depencies using your command line tool  
```npm install```

## prototypes

* put any of the .html files in your browser and click the buttons to see the results

### click vs touch start and touch end prototype
* measuring the time difference of click and the touchstart / touchend combo

### fastclick js prototype
* measurements using fastclick

### hammertime prototype
* measurements using hammer-time js
* hammer time did not do what I expected it to do, so make the click fast when there is no viewport
* it's not really a library for fast clicks it is more a polyfill for the W3C touch-action css property https://www.w3.org/TR/pointerevents/#the-touch-action-css-property

### pointer events prototype (using the jquery pep polyfill)
* measurements using pep js (the jquery pep polyfill)
* the pointer events polyfill is also not fast, the pointerup event is being called, but it's slow like a click
* with the viewport activated the pointer event is fast as a click

## documentation

also check out documentation.md for details about the technology used