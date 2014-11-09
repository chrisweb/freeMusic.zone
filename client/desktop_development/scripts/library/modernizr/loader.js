define([
    
], function(
    
) {

    'use strict';
    
    var load = function loadFunction(tests, callback) {

        require(tests, function() {
            
            callback.apply(this, arguments);
            
        });
        
    };

    return load;

});