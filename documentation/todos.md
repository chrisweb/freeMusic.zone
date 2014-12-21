# Todos

Put all the todos in the github issues section?

Add travis ci build check? https://travis-ci.org/

Write tests using mocha and should

Use hiredis? https://github.com/redis/hiredis-node

Calculate tests coverage using coveralls https://coveralls.io/r/chrisweb/freeMusic.zone and nodejs istanbul

## Next todos

* add callbacks to all the plugin initialization methods, to be used in the bootstrap
* run the plugin intialization methods in parallel, when all callbacks have been returned call the event application:start
* add a check if the user is logged in, if not redirect him to the homepage
* add a login box (to the homepage) using jamendo oauth to the homepage (put the oauth token into mongodb)
* add a fullscreen background video to the client homepage
* create a user model (client side) to store all the user data (for the lifetime of a session)
* create a user library module to manage a user
* create a mechanism that checks if the user has refresh token and if so use it to automatically log the user in
* create javascript to server global error logging library
* create a navigation bar for the app
* add the jamendo twitter charts page to the app
* fetch the charts from server and display them in the client
* add a play button (player bar) to play the the songs listed int he charts

## Other todos (damn that's a lot of todos ;) )

* make api really restfull, (no cookie?), stateless
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
* client side error logging tool
* socket io chat (one room per playlist)
* list of playlists (homepage) sort by (popularity / date)
* playlist detail page
* run twitter harvester (aws) to fill db
* twitter stream listener to mongodb (tweet a track id and playlist id followed by #music to increase tracks score)
* jamendo api calls library
* responsive images http://dev.opera.com/articles/native-responsive-images/
* write client and server code tests using mocha
* improve existing documentation
* aws mongodb
* aws redis
* aws twitter harvester (with forever) setup and tests
* aws music analyzer test
* the twitter harvester code should have it's own branch so that you don't have to checkout the entire project on production machines that only need to harvest

## Todos that are on hold right now (as not required for this project or not enough time right now)
* create responsive jquery ui dialog
* put the modernizr modifications into a seperate repository by forking the original project, finish the rewrite of the core for all parts that are not used by this project (check out the modernizr documentation.md for more about this task)
* create a nodejs script that setups all the cloud services using the aws api

## done todos

* DONE: start a new project on github, add license, gitignore, gitattributes and readme file ... that the easiest part ;)
* DONE: install nodejs and setup package json for project
* DONE: add mongoose, express and redis client to server bootstrap (using npm)
* DONE: add grunt to project via package json and create initial gruntfile
* DONE: add bower to project for client dependencies and create initial bower json
* DONE: add AMD versions of backbone, underscore and jQuery to project using bower
* DONE: create client main.js using requirejs and include backbone, underscore and jQuery
* DONE: use grunt to create the a client js build with requirejs
* DONE: add twitter bootstrap
* DONE: add sass to css convertor to grunt
* DONE: add css minification to grunt
* DONE: add css and js gzipping to grunt
* DONE: create collection of scripts that extend backbone functionality (ribs modules)
* DONE: ribs views script should be capable to use templates where all the html is in the templates and no html in the code (because backbone initializes root element of views in code)
* DONE: create an utilities.js file to log messges to server and client console with colors support
* DONE: add copy script to grunt to copy assests like images and fonts from development into production directory
* DONE: to bust the browser cache of fonts use package json version number, rename fonts using grunt and automatically replace new fontname in scss files
* DONE: html5 canvas 3D cubes (my music world) prototype, every playlist is cube on the map and the height depends on the active users
* DONE: client side browser music visualization prototype using audiocontext (html5 audio api)
* DONE: aws video converter server with ffmpeg (with png / web / mp4 libs) setup
* DONE: drag and drop song onto player prototype
* DONE: put ribs.js and chrisweb utilities on github as seperate projects
* DONE: put ribs.js (with bower) and chrisweb-utilities (with npm) back into project
* DONE: twitter harvester to get jamendo tracks related tweets
* DONE: save tweets into mongodb
* DONE: add nodejs express router
* DONE: create redis connection library for nodejs server script
* DONE: create nodejs mongodb connection library
* DONE: use redis to save express sessions
* DONE: tweets map reduce script that based creates charts of jamendo tracks based on the amount of times somebody tweeted about them during a defined period of time
* DONE: replace production client build loading by almond instead of using requirejs
* DONE: create backbone view / model / collection prototypes to quickly learn the basics
* DONE: write a nodejs video convertor script to transform the mov video into a webm and mp4 video (using fluent ffmpeg)
* DONE: add video thumbnail and video to gif to video convertor
* DONE: create fullscreen background video prototype
* DONE: videos dont autoplay on mobile, create video  to animated gif prototype
* DONE: setup backbone, create basic models, views, collections and a router
* DONE: create server side audio data analyzer to get the pcm data from songs needed for waveforms (https://github.com/chrisweb/waveform-data-generator)
* DONE: create a right navigation menu prototype (menu with 3D effect opening on click)
* DONE: write some initial documentation
* DONE: use grunt to transform ejs templates and put all of them into single jst file
* DONE: create waveform js to display waveform data (https://github.com/chrisweb/waveform-visualizer)
* DONE: rewrite some parts of modernizr core to be able to load the required detections with AMD instead of having to generate builds for the development version of the project
* DONE: rename all the plugin start methods into initialize