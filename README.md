[![Dependencies](https://david-dm.org/chrisweb/jam_prototype.png)](https://david-dm.org/chrisweb/jam_prototype)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

tweet2jam.com
=============

description
-----------

http://chrisweb.github.io/jam_prototype

TODOs
-----

* socket io chat (one room per playlist)
* list of playlists (homepage) sort by (popularity / date)
* playlist detail
* twitter stream listener to mongodb (tweet a track id and playlist id followed by #music to increase tracks score)
* jamendo api calls and oauth connect
* nodejs api server with api requests redis cache
* backbone js (underscore) and require js frontend
* widget to display a playlist on any website
* music visualizer (server side with nodejs or in browser? using html5 audi api)
* music player and playlist manager (using soundmanger2)

backend
-------

http://nodejs.org/ (https://github.com/joyent/node)
* https://www.npmjs.org/package/express (https://github.com/visionmedia/express)
* https://www.npmjs.org/package/connect-redis (https://github.com/visionmedia/connect-redis)
* https://www.npmjs.org/package/redis (https://github.com/mranney/node_redis)
* https://www.npmjs.org/package/hiredis (https://github.com/pietern/hiredis-node)
* https://www.npmjs.org/package/ejs (https://github.com/visionmedia/ejs)
* https://www.npmjs.org/package/mongoose (https://github.com/LearnBoost/mongoose)
* https://www.npmjs.org/package/socket.io (https://github.com/learnboost/socket.io)
* https://www.npmjs.org/package/jamendo (https://github.com/vincent/node-jamendo)
* https://www.npmjs.org/package/jamendo-from-twitter (https://github.com/vincent/jamendo-from-twitter)
* https://www.npmjs.org/package/underscore (https://github.com/documentcloud/underscore)
* https://www.npmjs.org/package/es6-promise (https://github.com/jakearchibald/es6-promise)
* https://www.npmjs.org/package/cron (https://github.com/ncb000gt/node-cron)
* https://www.npmjs.org/package/winston (https://github.com/flatiron/winston)
* https://www.npmjs.org/package/async (https://github.com/caolan/async)

frontend
--------

* https://github.com/jrburke/requirejs
* https://github.com/jquery/jquery
* https://github.com/documentcloud/backbone
* https://github.com/documentcloud/underscore
* https://github.com/twbs/bootstrap
* https://github.com/scottschiller/SoundManager2
* https://github.com/Modernizr/Modernizr

Adding packages
---------------

To add a package to the depencies list in package.json and install it at the same time type:
npm install packageName --save

To remove a package as dependency type:
npm uninstall packageName --save

Watching changes to files and automatically execute grunt tasks
---------------------------------------------------------------

On the command line type:
grunt watch

Building the application using grunt
------------------------------------

Go into the root folder of the application using your command line tool

Install grunt-cli globally with "npm install -g grunt-cli"

Run npm install, to install all the nodejs modules (dependencies)

To check if grunt has been installed type "grunt --version"

To build the application type "grunt"

If you want to modify grunt and add a package to the dev depencies type:
npm install grunt-contrib-packageName --save-dev

To remove a dev dependency package type:
npm uninstall grunt--contrib-packageName --save-dev

Install instructions for the application
----------------------------------------

Open your command line tool and start mongodb:
on windows:
cd /mongodb/bin
mongod

on centos:
service mongod start

Open another command line session to start redis:
on centos:
service redis start

Open yet another command line session and go into the directory of the application:
cd /path_to_jam_prototype/

install python (python version needs to be > 2.5 and < 3.0) before trying to install hiredis (node-gyp dependency needs python)
in windows ensure that the correct python path is set by typing this command in your power shell:
$env:PYTHON="C:\Python27\python.exe"
you also need Microsoft Visual Studio C++ 2012 (VS Express is ok)

To install the project run this command:
npm install
This will automatically install all the dependencies listed in the package.json

you can also update the packages by using this command:
npm update

Copy the default backend configuration file at "/path_to_jam_prototype/application/configurations/default.js" and rename it "configuration.js", then edit the configuration file and add your own values
Copy the default frontend configuration file at "/path_to_jam_prototype/public_development/javascripts/application/configurations/default-VERSION.js" and rename it "configuration-VERSION.js", then edit the configuration file and add your own values

To run the project run this command on linux:
NODE_ENV=development node server

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node server

NODE_ENV can be development, staging, production

Now open your browser and go to:
127.0.0.1:THE_PORT_YOU_HAVE_SET_IN_THE_CONFIGURATION

install instructions for the audio data analyzer
------------------------------------------------

Open a command line session and go into the directory of the application:
cd /path_to_jam_prototype/

To install the project run this command:
npm install
This will automatically install all the dependencies listed in the package.json

You can also update the packages by using this command:
npm update

Install ffmpeg (which also contains ffprobe) from http://www.ffmpeg.org/

On windows you also need to add the ffmpeg directory to the windows path
you can find the windows path tool by pressing the windows key on your keyboard and then searching for a tool called "path", then click on the path variable and then on the button edit
add the end of the path add a semicolon ";" and then the path to "your ffmpeg/bin" directory
now you need to restart your pc so that the ney path can be taken into account by windows

To run the project run this command on linux:
NODE_ENV=development node audio-data-analyzer

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node audio-data-analyzer

NODE_ENV can be development, staging, production

twitter boostrap less css
-------------------------

install lesscss nodejs module:
npm install -g less@beta

debugging
---------

application:
watch the verbose console logs messages, on the command line which you used to start the app, in realtime or if the app crashed to get the latest error message before the app crashed

or check out the logs at:
/path_to_jam_prototype/application/logs

mongodb:
open your command line tools and type:
cd /mongodb/bin
mongo

on the mongo shell type:
switch to the "jamprototype" database:
use jamprototype

get the collection names:
db.getCollectionNames()

find items in the "users" collection:
db.users.find().pretty()

access help to get all methods information:
db.users.help()

redis:
open your command line tool and open the redis command line utility:
redis-cli

or open the redis command line utility with a password:
redis-cli -a 'password'

switch to the "sessions" database:
SELECT 1

to list the session keys:
KEYS *sess*

get a value corresponding to a key:
GET <key>

contributors
------------

https://github.com/chrisweb
https://github.com/claudod
https://github.com/vincent