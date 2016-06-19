# Development setup

### Project checkout

If you are reading this you maybe already have a local copy of the project, if it's not the case you should go to the github and fork the project, then you can use git to clone the latest master branch  

If you haven't already installed git, do this first:  

http://git-scm.com/download

Now open your command line tool and use the following command to clone this project into one of your directories:  

```git clone git@github.com:chrisweb/freeMusic.zone.git```

http://git-scm.com/docs/git-clone  

### Install Nodejs

If you haven't done this already, install nodejs (which includes npm, the nodejs package manager).  

http://nodejs.org/  

### update npm to the latest version

Open your command line tool and use the following command to update npm to the latest version:

```npm install npm -g```

### Preperations for node-gyp

node-gyp is a build tool that is being used by several nodejs modules https://github.com/nodejs/node-gyp  
To install node gyp on windows follow these steps:  
* Option 1: Install Visual C++ Build Tools using the Default Install option.
* Option 2: Install Visual Studio 2015 (or modify an existing installation) and select Common Tools for Visual C++ during setup (This also works with the free Community and Express for Desktop editions)
* Install Python 2.7 (v3.x.x is not supported), and run 
```npm config set python python2.7```
* If you have multiple Python versions installed, you can identify which Python version node-gyp uses by setting the '--python' variable:
```npm config set python /path/to/python2.7/python.exe --global```
* For example:
```npm config set python /Python27/python.exe --global```
* Launch cmd, and then type
```npm config set msvs_version 2015```
* If you are using another version of visual studio change the "2015" by the one you are using 
* If you need to install node gyp on another operating system or if the steps listed here did not work, than check out the install instructions in the node gyp github readme https://github.com/nodejs/node-gyp  

### Nodejs modules - Server and Client dependencies  

The next step is to fetch the needed nodejs modules using npm  

Using your console go into the root directory of the project:  

```cd /PROJECT_ROOT_PATH```

to install the npm dependencies use the following command:  

```npm install```

This will fetch all the dependencies from https://www.npmjs.org/ that are listed in the project package.json and put them into a directory called node_modules  

!!! If you want to install the dependencies from within a Virtual Machine with a Linux operating system, but your shared folder is in windows then user "npm install --no-bin-link" (as windows does not support symlinks)  

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

Edit the configuration_example files and add your own values  

The server configuration is in: /server/configuration/configuration_example.js  

The client configurations are in: /client/DEVICETYPE_development/scripts/configuration/configuration_example.js  

For example copy: /client/desktop_development/scripts/configuration/configuration_example.js to /client/desktop_development/scripts/configuration/configuration.js  

When done editing, save each of the configuration files into the same directort as the example file and rename them to "configuration.js"  

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

```127.0.0.1:THE_PORT_YOU_HAVE_SET_IN_THE_CONFIGURATION```

by default it should be  

```127.0.0.1:35000```

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

check out mongodb.md  

##### redis

check out redis.md  

### Useful development tools

nodejs developer tools for visual studio (if you use VS this is a must have)  

https://github.com/Microsoft/nodejstools  

netbeans plugin  

if you use netbeans you may want to install the nodejs netbeans plugin: http://plugins.netbeans.org/plugin/36653/nodejs  

instructions to install the plugin: http://wiki.netbeans.org/InstallingAPlugin  

chrome postman addon  

helpful debug rest requests: https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm  

chrome backbone addon  

backbone debugger: https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd  