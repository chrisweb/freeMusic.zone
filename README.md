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

bower install requirejs -S

bower install underscore -S

bower install backbone -S

bower install jquery -S

bower install bootstrap-sass-official -S



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

To build the application type "grunt"