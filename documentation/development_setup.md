# Development setup

### Project checkout

If you are reading this you maybe already have a local copy of the project, if it's not the case you should go to the github and fork the project, then you can use git to clone the latest master branch. 

If you haven't already installed git, do this first:

http://git-scm.com/download

Now open your command line tool and use the following command to clone this project into one of your directories:

```git clone git@github.com:chrisweb/freeMusic.zone.git```

http://git-scm.com/docs/git-clone

### Install Nodejs

If you haven't done this already, install nodejs (which includes npm, the nodejs package manager).

http://nodejs.org/

### Nodejs modules

The next step is to fetch the needed nodejs modules using npm.

Using your console go into the root directory of the project:

```cd /PROJECT_ROOT_PATH```

to install the npm dependencies use the following command:

```npm install```

This will fetch all the dependencies from https://www.npmjs.org/ that are listed in the project package.json and put them into a directory called node_modules.

!!! If you want to install the dependencies from within a Virtual Machine with a Linux operating system, but your shared folder is in windows then user "npm install --no-bin-link" (as windows does not support symlinks)

### Client dependencies (bower)

(still from within the root directory of the project)

Install bower (the client dependencies packet maanger), using the following command (we use the minus "-g" option to install bower gloablly so that other projects can use it too):

```npm install bower -g```

If you already bower, ensure you are using the latest version by updating it to the latest version:

```npm update bower -g```

!! Git is a bower depency, so if you haven't installed git previously, for example because you use github for windows, then do it now: http://git-scm.com/download

Install the client dependencies using bower:

```bower install```

This will fetch all the dependencies from http://bower.io/ (the github repositories) that are listed in the project bower.json and in our case put them into a directory called "bower_components" as defined in the .bowerrc file.

### Building

Test if Grunt's CLI is already installed by running:

```grunt --version```

If you don't have grunt-cli, install grunt-cli globally with:

```npm install grunt-cli -g```

If grunt-cli is already installed, update it to the latest version using:

```npm update grunt-cli -g```

For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started)

Next we need to install Ruby and Sass, to be able to convert the sass files to css files:

Install ruby:

https://www.ruby-lang.org/en/downloads/

for windows use the ruby installer (during install check the box "add ruby to your path")

http://rubyinstaller.org/

Reopen your command line tool so that windows recognizes the new path which now contains ruby

Install sass using ruby:

```gem install sass```

!!! if you have problems with the certificate (https) us this command:
```gem install sass --source http://rubygems.org```

Or if it is already installed, update it to the latest version using this command:

```gem update sass```

On linux: add sass to the PATH (on linux) using this command:
```export PATH=${PATH}:/var/lib/gems/1.8/bin```

(you can check it the command was successful by using this command: echo $PATH)

On windows: add sass to the PATH (on windows):
Add this "/var/lib/gems/1.8/bin" to your windows path by following the instructions here: http://www.computerhope.com/issues/ch000549.htm

To build the development files:

```grunt builddev```

To build the beta files later on use this command:

```grunt buildbeta```

To build the production files:

```grunt buildprod```

### Debug the build process

To debug the build process if it fails, type:

```grunt --verbose```

### Grunt watch

Grunt watch gets used to rebuild css / templates / ... on the fly every time you edit a source file, without having to rebuild the entire project:

Open another command line window and type:

```grunt watch```

### Start mongodb and redis

Open your command line tool and start mongodb:
on windows:
```cd /mongodb/bin
mongod```

on centos:
```service mongod start```

Open another command line session to start redis:
on centos:
```service redis start```

### Edit the configuration files

Edit the configuration_example files and add your own values. 

The server configuration is in: /server/configuration/configuration_example.js

The client configurations are in: /client/DEVICETYPE_development/scripts/configuration/configuration_example.js

For example copy: /client/desktop_development/scripts/configuration/configuration_example.js to /client/desktop_development/scripts/configuration/configuration.js

When done editing, save each of the configuration files into the same directort as the example file and rename them to "configuration.js".

If your redis or mongo db have no user and password, just keep those fields empty in the configuration file

### Start the server

To start the web server, use this command on linux:
```NODE_ENV=development node server```

OR these commands for windows powershell:
```$env:NODE_ENV="development"
node server```

(!) NODE_ENV can be development, staging, production (not dev, prod)

### Open the project in your browser

Open your browser and use the following address:

```127.0.0.1:THE_PORT_YOU_HAVE_SET_IN_THE_CONFIGURATION/desktop```

by default it should be

```127.0.0.1:35000/desktop```

!!! currently you need to use 127.0.0.1:/desktop as this is the default entry point (route), just 127.0.0.1:35000 won't work

### twitter harvester

To fill mongodb with some twitter data for the charts run the twitter harvester in development mode

Running the harvester in development mode will force it to make a search and not just wait for streamed data

To start the twitter harvester, use this command on linux:

```NODE_ENV=development node twitter_harvester```

OR these commands for windows powershell:
```$env:NODE_ENV="development"
node twitter_harvester```

### mapreduce cron

Now you need to run the twitter harvester mapreduce job to ensure the results from twitter get converted into real charts

Starting the harvester in development mode will make it execute the cron job every minute, in production it will run every 20 minutes

To start the cron job, use this command on linux:

```NODE_ENV=development node mapreduce_cron```

OR these commands for windows powershell:
```$env:NODE_ENV="development"
node mapreduce_cron```

### Browser console messages

To check out the browser messages use the F12 key and then select the console tab

### Logged server messages

Check out the messages that get printed in realtime inside of your command line tool which you used to start the app, or if the app crashed to get the latest error message before the app crashed

or check out the logs in this directory:
```/logs```

### Databases

##### mongodb
on the mongo shell type:
switch to the "database_name" database (or whatever name you have set in the configuration file):
```use database_name```

get the collection names:
```db.getCollectionNames()```

find items in the "users" collection:
```db.users.find().pretty()```

access help to get all methods information:
```db.users.help()```

##### redis

open your command line tool and then type the following command to open the redis command line utility:
```redis-cli```

or open the redis command line utility with a password (if you have set one in your redis configuration):
```redis-cli -a 'password'```

switch to the "sessions" database:
```SELECT 1```

to list the session keys:
```KEYS *sess*```

get a value corresponding to a key:
```GET <key>```

### Useful development tools

netbeans plugin

if you use netbeans you may want to install the nodejs netbeans plugin: http://plugins.netbeans.org/plugin/36653/nodejs

if you use visual studio (2015) ensure you have the nodejs tools installed: https://visualstudiogallery.msdn.microsoft.com/dd1dc8a5-d627-48a2-a19d-df4fe0c47f19?SRC=Home

instructions to install plugin: http://wiki.netbeans.org/InstallingAPlugin

chrome postman addon

helpful debug rest requests: https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm

chrome backbone addon

backbone debugger: https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd