app name
========

TODO: define app name

description
-----------

http://chrisweb.github.io/jam_prototype

TODOs
-----

socket io chat
list of playlists
playlist detail
twitter stream listener to mongodb
oauth connect
api with redis cache

backend
-------

https://github.com/joyent/node
* https://github.com/visionmedia/express
* https://github.com/visionmedia/ejs
* https://github.com/LearnBoost/mongoose
* https://github.com/mranney/node_redis
* https://github.com/pietern/hiredis-node
* https://github.com/learnboost/socket.io/

frontend
--------

* https://github.com/jrburke/requirejs
* https://github.com/jquery/jquery
* https://github.com/angular
* https://github.com/twitter/bootstrap/tree/3.0.0-wip
* https://github.com/scottschiller/SoundManager2
* https://github.com/Modernizr/Modernizr

install instructions
--------------------

Use your command line, go to directory of the application
cd /path_to_jam_tweets/

install python (python version needs to be > 2.5 and < 3.0) before trying to install hiredis (node-gyp dependency needs python)
in windows ensure that the correct python path is set by typing this command in your power shell: $env:PYTHON="C:\Python27\python.exe"
you also need Microsoft Visual Studio C++ 2012 (VS Express is ok)

To install the project run this command:
npm install
This will automatically install all the dependencies listed in the package.json

you can also update the packages by using this command:
npm update

Copy the default configuration file at "/path_to_jam_tweets/application/configurations/default.js" and rename it "configuration.js", then edit the configuration file and add your own values

To run the project run this command on linux:
NODE_ENV=development node server

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node server

NODE_ENV can be development, staging, production

Now open your browser and go to:
127.0.0.1:THE_PORT_YOU_HAVE_SET_IN_THE_CONFIGURATION

twitter boostrap less css
-------------------------

install lesscss nodejs module:
npm install -g less@beta

deployment
----------

contributors
------------

https://github.com/chrisweb