# swipe prototype

## hammerjs
* http://hammerjs.github.io/
* https://github.com/hammerjs/hammer.js
* note: after a tap (on touch end) also a click (event) is being triggered by hammer js

### swipe on mobile but not desktop
* to disable the swipe on desktop but only on touch devices we need to change the input
* inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput

### let the user still select text on desktop
* this (re-)enables text selection in browser using the mouse
* delete Hammer.defaults.cssProps.userSelect;

### IE highlioght
* IE10 and IE11 on Windows Phone have a small tap highlight when you tap an element
* adding this meta tag removes it:
* <meta name="msapplication-tap-highlight" content="no" /> 

## pointer events
* https://www.w3.org/TR/pointerevents/