jamtweets
=========

description
-----------

create jamendo.com charts using an analyses of tweets

possible evolutions: 
* charts per genre
* charts per country / language
* allow users to create playlists which then get filled by tweeting the playlist id in combination of the jamendo track url
* users that tweets a song to the playlist for the first time get their song placed on a suggestions section of the playlist, as soon as three other users also tweet that track it gets included in the playlist
* more retweets of one song increases it's score and therefore it's chance to get played

backend
-------

https://github.com/joyent/node
- https://github.com/visionmedia/express
- https://github.com/LearnBoost/mongoose
- https://github.com/mranney/node_redis
-- https://github.com/pietern/hiredis-node

frontend
--------

https://github.com/jrburke/requirejs
https://github.com/jquery/jquery
https://github.com/scottschiller/SoundManager2
https://github.com/Modernizr/Modernizr

install instructions
--------------------

Use your command line, go to directory of the application
cd /path_to_jam_tweets/

To install the project run this command:
npm install
This will automatically install all the dependencies listed in the package.json

Copy the default configuration file at "/path_to_jam_tweets/application/configurations/default.js" and rename it "configuration.js", then edit the configuration file and add your own values

To run the project run this command on linux:
NODE_ENV=development node server

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node server

NODE_ENV can be development, staging, production

Now open your browser and go to:
127.0.0.1:THE_PORT_YOU_HAVE_SET_IN_THE_CONFIGURATION

contributors
------------

https://github.com/chrisweb