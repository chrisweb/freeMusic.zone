[![Dependencies](https://david-dm.org/chrisweb/playlist_guru.png)](https://david-dm.org/chrisweb/playlist_guru)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

playlist.guru
=============

Features:
for sure:
* cooperative multi user playlist with chat
* twitter charts, scan twitter stream of accounts like the jamendo account, each time a song gets posted on twitter record the tweet, map reduce to create charts of most tweeted tracks

maybe:
* remote, use the app on a tablet or phone as a remote for another session of the app on a desktop or tv, login into both apps with same account, pub sub sync the state of both apps for that account
* video paylist, playlist to youtube, create a playlist of jamendo tracks, then a script checks if those videos exist on youtube and create a videos playlist based on the jamendo playlist
* drive playlist, google drive download / backup, download tracks directly into your google drive account or backup entire playlists

probably not enough time:
* recommendation, use a recommendation tool to create a discovery page per genre updated once a day, improvement create personal dicovery page based on user data (jamendo likes, facebook likes, ...)
* song visualizer, use a script to calculate a track fourier transform or wave form, html5 canvas to visualize

-------------------

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



bower install momentjs --save

bower install modernizr --save

bower install animate.css --save

server

npm

create a package json:

npm init

install server / backend libraries:

npm install express --save

npm install body-parser --save

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

npm install grunt-contrib-copy --save-dev

npm install grunt-contrib-uglify --save-dev

npm install grunt-contrib-cssmin --save-dev

npm install grunt-contrib-jst --save-dev

npm install grunt-contrib-compress --save-dev



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

to debug grunt, type:

grunt --verbose


