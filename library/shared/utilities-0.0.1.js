
(function(exports) {

    exports.version = '0.0.1';

    // utilities logger
    exports.log = function(data) {

        console.log(data);

    };

})(typeof exports === 'undefined' ? this['utilities']={} : exports);
