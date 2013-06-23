
/**
 * sample application client code using backbone.js
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {
    
    // on dom loaded
    $(function() {
        
        $.stellar({
            // Set scrolling to be in either one or both directions
            horizontalScrolling: false,
            verticalScrolling: true,
            // Set the global alignment offsets
            horizontalOffset: 0,
            verticalOffset: 0,
            // Refreshes parallax content on window load and resize
            responsive: false,
            // Select which property is used to calculate scroll.
            // Choose 'scroll', 'position', 'margin' or 'transform',
            // or write your own 'scrollProperty' plugin.
            scrollProperty: 'scroll',
            // Select which property is used to position elements.
            // Choose between 'position' or 'transform',
            // or write your own 'positionProperty' plugin.
            positionProperty: 'position',
            // Enable or disable the two types of parallax
            parallaxBackgrounds: true,
            parallaxElements: true,
            // Hide parallax elements that move outside the viewport
            hideDistantElements: true,
            // Customise how elements are shown and hidden
            hideElement: function($element) {
                $element.hide();
            },
            showElement: function($element) {
                $element.show();
            }
        });
        
        
        
    });

})(jQuery, window);