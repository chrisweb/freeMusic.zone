[![Dependencies](https://david-dm.org/chrisweb/playlist_guru.png)](https://david-dm.org/chrisweb/playlist_guru)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

playlist.guru
=============

To create the project I did:

in your console type

cd C:\Users\chris\Documents\GitHub\playlist_guru

npm install -g bower

to update bower

npm update -g bower

bower

create a bower.json file:

bower init

install client libraries:

bower install requirejs --save

bower install underscore --save

bower install backbone --save

bower install jquery --save

bower install bootstrap-sass-official --save

bower install qunit --save-dev



bower install momentjs -S

bower install modernizr -S

bower install less.js -S

bower install animate.css -S

server

npm

create a package json:

npm init

install server / backend libraries:

npm install express --save

npm install ejs --save

npm install jamendo --save

the development dependencies:

npm install jshint-stylish --save-dev

npm install rjs-build-analysis --save-dev

npm install grunt --save-dev

npm install grunt-contrib-sass --save-dev

npm install grunt-contrib-watch --save-dev

npm install grunt-contrib-jshint --save-dev

npm install grunt-contrib-requirejs --save-dev

npm install grunt-contrib-qunit --save-dev



npm install socket.io --save

npm install connect --save

npm install connect-redis --save

npm install underscore --save

npm install mongoose --save


Fetch the dependencies for development

npm update

bower update




To run the project:

To run the project run this command on linux:
NODE_ENV=development node server

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node server

NODE_ENV can be development, staging, production







production build

grunt

npm install -g grunt-cli

To check if grunt has been installed type "grunt --version"

To build the application type:

grunt

To watch sass files (recompile the css build every time you save a sass file):

grunt watch