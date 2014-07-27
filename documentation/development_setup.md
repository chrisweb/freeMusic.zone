# Development setup

### Project checkout

If you are reading this you maybe already have a local copy of the project, if it's not the case you should go to the github and fork the project, then you can use git to clone the latest master branch. Use the following command:

git clone git@github.com:chrisweb/freeMusic.zone.git

### Install Nodejs

If you haven't done this already, install nodejs.

http://nodejs.org/

### Nodejs modules

The next step is to fetch the needed nodejs modules using npm.

Go into the root directory and type:

npm install

This will fetch all the dependencies from https://www.npmjs.org/ that are listed in the project package.json.

### Client dependencies (bower)

Using your console go into the root directory of the project:

cd /PROJECT_ROOT_PATH

Install bower, using the following command:

npm install -g bower

If you already bower, update it to the lastest version:

npm update -g bower

Install the client dependencies using bower:

bower install

This will fetch all the dependencies from http://bower.io/ that are listed in the project bower.json.

### Building

Test that Grunt's CLI is installed by running:

grunt --version

If the command isn't found, install grunt-cli globally with:

npm install -g grunt-cli

For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started).

To build the development files:

grunt builddev

To build the beta files:

grunt buildprod

To build the production files:

grunt buildprod

### Debug the build process

To debug the build process if it fails, type:

grunt --verbose

### Grunt watch

Grunt watch gets used to rebuild css / templates / ... on the fly every time you edit a source file, without having to rebuild the entire project:

Open another command line window and type:

grunt watch

### Start mongodb and redis

Open your command line tool and start mongodb:
on windows:
cd /mongodb/bin
mongod

on centos:
service mongod start

Open another command line session to start redis:
on centos:
service redis start

### Edit configuration

Edit the configuration_example files and add your own values. 

The server configuration is in: /server/configuration/configuration_example.js

The client configurations are in: /client/DEVICETYPE_development/scripts/configuration/configuration_example.js

When done save the configuration file and rename it to configuration.js.

### Start the server

To run the project run this command on linux:
NODE_ENV=development node server

OR thess commands for windows powershell:
$env:NODE_ENV="development"
node server

NODE_ENV can be development, staging, production

### Browser

Open your browser and use the following address:

127.0.0.1:THE_PORT_YOU_HAVE_SET_IN_THE_CONFIGURATION

### Logged messages

Check out the messages that get printed in realtime inside of your command line tool which you used to start the app, or if the app crashed to get the latest error message before the app crashed

or check out the logs in this directory:
/logs

### Databases

##### mongodb
on the mongo shell type:
switch to the "database_name" database (or whatever name you have set in the configuration file):
use database_name

get the collection names:
db.getCollectionNames()

find items in the "users" collection:
db.users.find().pretty()

access help to get all methods information:
db.users.help()

##### redis

open your command line tool and then type the following command to open the redis command line utility:
redis-cli

or open the redis command line utility with a password (if you have set one in your redis configuration):
redis-cli -a 'password'

switch to the "sessions" database:
SELECT 1

to list the session keys:
KEYS *sess*

get a value corresponding to a key:
GET <key>

### Useful development tools

netbeans plugin

if you use netbeans like me you may want to install the nodejs netbeans plugin: http://plugins.netbeans.org/plugin/36653/nodejs

instructions to install plugin: http://wiki.netbeans.org/InstallingAPlugin

chrome postman addon

debug rest requests: https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm

chrome backbone addon

backbone debugger: https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd