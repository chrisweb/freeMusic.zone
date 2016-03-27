## run the tests

open your command line tool

open the root folder of this file

run npm install to fetch the dependencies

execute the mocha tests using the following command:

mocha

## es6Promise overwrites Promise

!! the es6Promise polyfill will replace the nodejs Promise, so it's better to run the tests one by one and run the es6Promise test last:

mocha test/es6promises.js
mocha test/fspromise.js
mocha test/vanilla.js

## notes

vanilla means native javascript (not altered in any way, no library or framework, just plain javascript)
