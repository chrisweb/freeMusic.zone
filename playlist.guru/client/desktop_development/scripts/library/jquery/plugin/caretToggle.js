(function (factory) {
if (typeof define === 'function' && define.amd) {
    // amd mode, create a module with jquery as dependency
    define(['jquery'], factory);
} else {
    // non amd mode
    factory(jQuery);
}
}(function ($) {

    $.fn.caretToggle = function () {
        
        // get caret element
        var $caretElement = $(this[0]);
        
        // if is wrapped inside of a span with the dropup, then unwrap else wrap
        // inside of a span with class dropup
        if (!$caretElement.parent().hasClass('dropup')) {
                
            var $caretWrapper = $('<span>').addClass('dropup');

            $caretElement.wrap($caretWrapper);

        } else {

            $caretElement.unwrap();

        }
        
        // for chainability
        return $caretElement;
        
    };  

}));

