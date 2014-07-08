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


remote fuctionality
* control one instance of the player on for example your tv using the same instance on your tablet or phone
* can be enabled or disabled

jam with friends
* team playlist where every user can add songs
* up or downvote songs
* song with most votes gets played next
* show how often a song got played
* show who selected the song
* playlist picture upload
* choose playlist name
* choose existing playlist to start

jam quiz
* tracks quiz created by the community
* choose a track and add chalanges
** find at least three instruments used in the song
** language of the lyrics
** name of the artist, song or album
** choose genre, mood of a song
** find if there is one singer or more, female or male or both
* invite friends by mail or social network

tweet2jam
* twitter music charts
* tweet about a track to increase its position in playlist

* store songs in google drive
* player always on top
* navigation on left
* chat on the right side
* listen to your playlists

just4fun
web speech api: http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API
https://github.com/TalAter/annyang/blob/master/annyang.js
change the favicon to animated gif if sound is played and turn of (set back to default icon) when no sound (song) is played, like: https://github.com/tommoor/tinycon
play "system" sounds on some actions, like user gets new notification, on click on button, on error ... like realoperating system
use media attribute and page visibility APIs: http://daniemon.com/blog/two-favourite-underused-html5-media-features/
pointer events for mobile (and desktop) http://www.polymer-project.org/platform/pointer-events.html
shadow dom improved views with shadow dom: http://www.polymer-project.org/platform/shadow-dom.html
custom animations using bounce js: http://bouncejs.com/
grid loading for playlists or jamendo news: http://tympanus.net/Tutorials/SamsungGrid/index2.html
preview play button, loading then play: http://tympanus.net/Tutorials/CircularProgressButton/
login button that morphs into login box: http://tympanus.net/Development/ButtonComponentMorph/
charts, hot to colder with colors: http://jerrygarcia.com/
video with design over it, example: http://www.tyoulipsisters.com/
open / close navigation styles: http://hilapeleg.io/2014/06/01/hackernews-redesign/


Next todos:
* make api really restfull, no cookie, stateless
* setup aws
* run twitter harvester to fill db
* search queries cache on server with redis
* track infos cache on server with redis
* a controller module that can be extended and is architectured like the backbone view or backbone model modules
* views el should be extracted from template and then build upon this, then remove the main element from template
* if the view event listener selector includes the class of the root element the event won't get, which cant be found, works fine with the original backbone
* a soundmanager player
* create own grunt contrib jst with undefined checks, because underscore precompiled templates throw not defined error if you execute template with no data, this is a problem if in initialize you want the template html code but have no data yet
* needs fix??? when creating a view using addModel the view ids always get increment by 2???
* mobile support (pointer events?)
* a cordova version for android and iOS

reading list
============

http://blog.nikc.org/2013/12/03/managing-scrolltop-in-your-backbone-single-page-app/
https://developer.chrome.com/devtools/docs/javascript-memory-profiling
https://github.com/jeresig/idyll
https://github.com/hoatle/webapp-template/blob/master/webapp/js/router.js

pointer events:
https://github.com/Polymer/PointerEvents
http://blogs.msdn.com/b/eternalcoding/archive/2013/01/16/hand-js-a-polyfill-for-supporting-pointer-events-on-every-browser.aspx
http://www.polymer-project.org/platform/pointer-events.html
http://caniuse.com/pointer

development tools
=================

netbeans plugin

if you use netbeans like me you may want to install the nodejs netbeans plugin: http://plugins.netbeans.org/plugin/36653/nodejs

instructions to install plugin: http://wiki.netbeans.org/InstallingAPlugin

chrome postman addon

debug rest requests: https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm

chrome backbone addon

backbone debugger: https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd

-------------------





client (bower)

open your console

in your console type (path to project root):

cd /PROJECT_ROOT_PATH

npm install -g bower

to update bower

npm update -g bower

bower

create a bower.json file:

bower init

to clear bowers cache

bower cache clean

install client libraries:

bower install requirejs --save

bower install underscore --save

bower install backbone --save

bower install jquery --save

bower install bootstrap-sass-official --save

bower install https://github.com/scottschiller/SoundManager2.git#V2.97a.20131201+DEV --save

bower install fontawesome --save

bower install modernizr --save

bower install qunit --save-dev



bower install momentjs --save

bower install animate.css --save

bower install velocity --save




server (npm)

open your console

in your console type (path to project root):

cd /PROJECT_ROOT_PATH

create a package json (to start a new project):

npm init

to install vendor node modules:

install server / backend libraries:

npm install express --save

npm install body-parser --save

npm install jamendo --save

npm install underscore --save

npm install errorhandler --save

npm install winston --save

npm install cookie-parser --save

npm install express-session --save

npm install redis --save

npm install connect-redis --save

npm install mongoose --save

if intsalling mongoose on windows fails, install visual studio (express) 2012 (or 2013) and use this command:
npm install mongoose --save--msvs_version=2012



the development dependencies:

npm install -g grunt-cli (grunt cli installed globally)

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

npm install fluent-ffmpeg --save-dev

npm install aws-sdk --save-dev



npm install socket.io --save

npm install connect --save

npm install connect-redis --save

npm install underscore --save

npm install mongoose --save




Before you starting development:

* Fetch the dependencies

npm install

bower install

* Generate the templates and css files using grunt

grunt builddev

* Start the server

To run the project run this command on linux:
NODE_ENV=development node server

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node server

NODE_ENV can be development, staging, production

* Launch grunt watch so that the templates and css files get automatically recreated after you edit them

open another command line window

grunt watch




To find outdated npm packages do

npm outdated --depth 0

To find outdated bower packages do

bower list



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



convert the videos

on linux use this command:
FFMPEG_PATH="C:\ffmpeg\bin\ffmpeg" FFPROBE_PATH="C:\ffmpeg\bin\ffprobe" node video_convertor

on windows using the command line:
set FFMPEG_PATH=production
set FFPROBE_PATH=production
node video_convertor

on windows using the power shell:
$env:FFMPEG_PATH="C:\ffmpeg\bin\ffmpeg.exe"
$env:FFPROBE_PATH="C:\ffmpeg\bin\ffprobe.exe"
node video_convertor



amazon aws
node.js aws sdk documentation
http://aws.amazon.com/de/sdkfornodejs/



elastic load balancer API
http://docs.aws.amazon.com/ElasticLoadBalancing/latest/APIReference/Welcome.html
