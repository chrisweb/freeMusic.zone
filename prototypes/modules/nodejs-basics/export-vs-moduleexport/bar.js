exports.barFunction = function () {

    return 'bar';

};

console.log('bar');
console.log(module.exports === exports);
console.log(this === module.exports);
console.log(this === exports);