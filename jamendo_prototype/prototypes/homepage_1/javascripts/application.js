
/**
 * sample application client code using backbone.js
 * 
 * @returns {undefined}
 */
(function($, window, undefined) {
    
    // on dom loaded
    $(function() {

        $(this).find('#logo').delay(1000).animate({ 'top': '100px', 'left': '200px' }, 'slow');
        
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
            hideElement: function(element) {
                element.hide();
            },
            showElement: function(element) {
                element.show();
            }
        });

        $('#slide1').waypoint(function() {
            
            console.log($('#slide1').find('.text'));
            
            $(this).find('.text').animate({ 'left': '+500px' }, 'slow');
            
        }, { offset: '60%' });
        
        $('#slide3').waypoint(function() {
            
            $(this).find('.text').animate({ 'right': '300px' }, 'slow');
            
        }, { offset: '70%' });
        
        $('#slide5').waypoint(function() {
            
            $(this).find('.text').animate({ 'left': '+300px' }, 'slow');
            
        }, { offset: '80%' });
        
        $('#community-tabs').on('click', 'a', function(event) {
            
            event.preventDefault();
            
            $(this).tab('show');
            
        });
        
    });

})(jQuery, window);