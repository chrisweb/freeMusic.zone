(function (factory) {
if (typeof define === 'function' && define.amd) {
    // amd mode, create a module with jquery as dependency
    define(['jquery'], factory);
} else {
    // non amd mode
    factory(jQuery);
}
}(function ($) {
    
    // usage: $('.something').hasAttr('style') checks if the element
    // with the class hasAttr has and attribute named style
    $.fn.hasAttr = function (name) {
        
        return this.attr(name) !== undefined;
        
    };  

}));

