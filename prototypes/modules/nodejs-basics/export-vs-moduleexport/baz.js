
var baz = function bazFunction() {

    return 'baz';

};

module.exports = {
    baz: baz
}

console.log('baz');
console.log(module.exports === exports);
console.log(this === module.exports);
console.log(this === exports);