module.exports.fooFunction = function () {

    return 'foo';

};

console.log('foo');
console.log(module.exports === exports);
console.log(this === module.exports);
console.log(this === exports);