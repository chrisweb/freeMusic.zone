# Todos

Put all the todos in the github issues section?

Add travis ci build check? https://travis-ci.org/

Write tests using mocha and should

Use hiredis? https://github.com/redis/hiredis-node

Calculate tests coverage using coveralls https://coveralls.io/r/chrisweb/freeMusic.zone and nodejs istanbul

## Next todos

* fully test player when bug "access control" of the streaming server is resolved
* player automatically play next track
* in the api module "/tweet/charts/day" save the tracks we got from jamendo api call into mongodb
* in the api module "/tweet/charts/day" dont do an api call if all tracks have been found in database already
* add bot to chat that can answer questions
* create javascript library to log all kind of client javascript errors
* fetch the charts from server and display them in the client
* my playlists: fetch the user playlists and their songs
* (finish player / tracksCache library) add a play button (player bar) to play the the songs listed in the charts
* list of playlists (for collaborative module) sort by (popularity / date)
* the cloud init script for the nodejs web server must create the configuration.js file, using the "wite_files" option in cloud init or using wget from a secure server
* the redis server cloud init setup script must edit the redis conf file and set the production values
* put the pm2 setup into the cloud init files for harvester and nodejs webserver (need to install pm2 and then use pm2 to run the server forever)
* add this little effect (js) for homepage headline http://gabinaureche.com/TheaterJS/
* add support for emoji using the twitter package https://www.npmjs.com/package/twemoji
* replace twitter bootstrap 3 with twitter boostrap 4 (+ update documentation) https://github.com/twbs/bootstrap/tree/v4-dev / documentation: http://v4-alpha.getbootstrap.com/
* replace all use of glyphicons with font awsome as twitter boostrap 4 does not have glyphicons anymore (+ update grunt file)
* refactoring the managers
** add adapters
** create an abstract manager
* server API should return a count of results, set a default limit for results, if above the limit return a pagination
* refactor server bootstrap, especailly move the socket.io related stuff into a library file
* use clipboard js to let users copy collaborative playlist urls https://clipboardjs.com/#example-target
* create voice commands prototype using the web speech API
* create a camera (webcam photo) prototype (find solution for iOS thaz does not support getUserMedia)
* write a google vision cloud prototype
* add a sass style guide https://github.com/bigcommerce/sass-style-guide
* explain managers documentation/how_managers_work.txt (create md file)
* finish the client error loggin library and then document it documentation/javascript_error_tracking_logging.txt (create md file)
* improve security https://securityheaders.io/, dnssec, csp (check out documentation/security.md)
* create mobile icons, windows tile setup (browser.xml) and android manifest.json https://realfavicongenerator.net/
* update ffmpeg to version 3 https://github.com/FFmpeg/FFmpeg
* create the player ui prototype
* improve nodejs deployment script, check out this article https://certsimple.com/blog/deploy-node-on-linux
* improve the chat message input field to render emoji in the field itself, see this little test fiddle https://jsfiddle.net/zvb154do/2/
* update the project page with useful information and links to documentation as well as some screenshot and a link to website http://chrisweb.github.io/freeMusic.zone/
* maybe this can help improve the gif quality for mobile background video http://blog.pkh.me/p/21-high-quality-gif-with-ffmpeg.html

## Other todos (damn that's a lot of todos ;) )

* finish the tracksCache "soundsGarbageCollector" method
* add an infinite scroll to the twitter charts page if there are more then 10 results
* (?) create a cron job module that refreshes the data of a track using the api, for tracks where the last refresh date is older then a month
* mechanism to replace all the /desktop pathes with /mobile when not in desktop mode
* images versioning, add the package.json version number to the javascript configuration file so that it can retrieve the images from the correct path
* use the ribs views loader instead of the require calls
* search queries cache on server with redis
* track infos cache on server with redis
* views el should be extracted from template and then build upon this, then remove the main element from template
* if the view event listener selector includes the class of the root element the event won't get, which cant be found, works fine with the original backbone
* create own grunt contrib jst with undefined checks, because underscore precompiled templates throw not defined error if you execute template with no data, this is a problem if in initialize you want the template html code but have no data yet
* needs fix??? when creating a view using addModel the view ids always get increment by 2???
* mobile support (pointer events?)
* a cordova version for android and iOS
* a desktop version using node webkit https://github.com/rogerwang/node-webkit
* client side error logging tool
* jamendo api calls library
* responsive images http://dev.opera.com/articles/native-responsive-images/
* write client and server code tests using mocha
* improve existing documentation
* aws redis setup script (cloud init config)
* aws music analyzer test
* the twitter harvester code should have it's own branch so that you don't have to checkout the entire project on production machines that only need to harvest
* Use geolocation to find concerts: https://developers.google.com/web/fundamentals/device-access/user-location/
* add log rotation for the forever log files http://stackoverflow.com/questions/15231968/nodejs-forever-archive-logs
* add hi-redis (https://www.npmjs.com/package/hiredis) for production into package.json
* make api really restfull, (no cookie?), socket.io jwt https://github.com/auth0/socketio-jwt, use jwt for socket.io (token based authentification) and other places of the app, instead if cookies (stateless REST)

## Todos that are on hold right now (as not required for this project or not enough time right now)
* create responsive jquery ui dialog
* put the modernizr modifications into a seperate repository by forking the original project, finish the rewrite of the core for all parts that are not used by this project (check out the modernizr documentation.md for more about this task)
* create a nodejs script that setups all the cloud services using the aws api
* shuffle the songs when the user shakes his device https://developers.google.com/web/fundamentals/device-access/device-orientation/dev-motion

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
* DONE: create new prototype with html5 canvas 3D cubes (my music world) prototype, every playlist is cube on the map and the height depends on the active users
* DONE: create new client side browser music visualization prototype using audiocontext (html5 audio api)
* DONE: aws video converter server with ffmpeg (with png / web / mp4 libs) setup
* DONE: create a drag and drop song onto player prototype
* DONE: put ribs.js and chrisweb utilities on github as seperate projects
* DONE: put ribs.js (with bower) and chrisweb-utilities (with npm) back into project
* DONE: write a twitter harvester to get jamendo tracks related tweets
* DONE: save harvested tweets into mongodb
* DONE: add nodejs express router
* DONE: create redis connection library for nodejs server script
* DONE: create nodejs mongodb connection library
* DONE: use redis to save express sessions
* DONE: harvested tweets map reduce script that based creates charts of jamendo tracks based on the amount of times somebody tweeted about them during a defined period of time
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
* DONE: add a check if the user is logged in, if not redirect him to the homepage
* DONE: add a login box (to the homepage) using jamendo oauth to the homepage (put the oauth token into mongodb)
* DONE: add a fullscreen background video to the client homepage
* DONE: create a user model (client side) to store all the user data (for the lifetime of a session)
* DONE: create a user library module to manage a user
* DONE: add a left navigation bar with a 3d opening effect
* DONE: (in ribs.js) a controller module that can be extended and is architectured like the backbone view or backbone model modules
* DONE: update the twitter harvester so that it uses the project mongodb library instead of doing mongodb connections on its own
* DONE: fix regex in harvester module to extract multiple track urls from a tweet instead only last one
* DONE: setup script for aws mongodb installation (userdata for cloud init)
* DONE: checkout https://developers.google.com/web/fundamentals and include all usefull best pratices into app
* DONE: navigation bar search box light gray, when focus white, search button white, on focus highlight color
* DONE: action buttons right white color on hover highlight color
* DONE: menu button most left then next to it the logo, between the two add seperator
* DONE: under menu icon add word menu
* DONE: menu icon white on open and hover color highlight
* DONE: menu items big icon as background color dark-lighter
* DONE: menu text special color per section on hover or active brigther color
* DONE: setup the twitter harvester on aws to fill db
* DONE: setup the twitter mapreduce cron job (with pm2) on aws and do tests
* DONE: finish the design of the top navigation bar for the app
* DONE: finish the design of the left navigation bar for the app
* DONE: change tweet2jam page title
* DONE: add the app logo to homepage
* DONE: on homepage scroll a note icon into view with opacity for scene2
* DONE: make the navigation logo clickable, should point to homepage /desktop
* DONE: in the header next to the user icon add the username
* DONE: make the settings and user icon in the header clickable, on click redirect to their page
* DONE: add the jamendo twitter charts page to the app, create a list of tracks from mongodb map reduce results
* DONE: add icon retweet this song (share) to the track row of the twitter charts page
* DONE: create a mechanism that checks if the user has refresh token and if so and if its is about to expire use it to refresh the oauth token
* DONE: playlist detail page (for collaborative module)
* DONE: collaborative playlist track search (by name)
* DONE: add player to tweets page
* DONE: get the user playlists for collaborative playlists page
* DONE: create chat for collaborative playlists, socket io chat (one room per playlist)
* DONE: let the user create a new collaborative playlist (with an url that can be shared)
* DONE: drop bower, load all depencies with npmjs, it's easier to manage all dependencies with one tool an avoids having duplicates for the server and client, also allows to track new versions using https://david-dm.org/chrisweb/freeMusic.zone
* DONE: clean Gruntfile code and remove duplicate copy calls
* DONE: add listener to background html5 video player for progress and "can play through" event
* DONE: replace the fake loading of the splashscreen with a real html5 progress element, as progress value use the video buffering values from background html5 video player
* DONE: remove express x-powered-by header and replace with own (link to github project repository)

