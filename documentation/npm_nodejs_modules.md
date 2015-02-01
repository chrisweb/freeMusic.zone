# npm (server backend)

You don't need to follow these steps, I just wrote down in this document what I did when setting up the project backend using nodejs / npm.

### npm project setup

Using your console go into the root directory of the project:

cd /PROJECT_ROOT_PATH

Create a package json (to start a new project):

npm init

### To find outdated npm packages do

npm outdated --depth 0

### Adding / Removing packages

To add a package to the depencies list in package.json and install it at the same time type:
npm install packageName --save

For packages only needed during development use:
npm install packageName --save-dev

To remove a package as dependency type:
npm uninstall packageName --save

If you develop on windows use a shared folder, for your linux installed in a virtual machine, then add the no link argument argument (package gets installed without symlinks):
npm install packageName --save --no-bin-links

##### Project dependencies

To install (vendor) nodejs modules:

npm install express --save

npm install body-parser --save

npm install jamendo --save (git://github.com/chrisweb/node-jamendo.git#master)

npm install jamendo-from-twitter --save (git://github.com/chrisweb/jamendo-from-twitter.git#master)

npm install underscore --save

npm install errorhandler --save

npm install winston --save

npm install ejs --save

npm install cookie-parser --save

npm install express-session --save

npm install redis --save

npm install connect-redis --save

npm install socket.io --save

npm install mongoose --save

if intsalling mongoose on windows fails, install visual studio (express) 2012 (or 2013) and use this command:
npm install mongoose --save--msvs_version=2012



##### The development dependencies

npm install -g grunt-cli (grunt cli installed globally)

npm install jshint-stylish --save-dev

npm install rjs-build-analysis --save-dev

npm install grunt --save-dev

npm install grunt-contrib-sass --save-dev

npm install grunt-contrib-watch --save-dev

npm install grunt-contrib-jshint --save-dev

npm install grunt-contrib-requirejs --save-dev

npm install grunt-contrib-copy --save-dev

npm install grunt-contrib-cssmin --save-dev

npm install grunt-contrib-jst --save-dev

npm install grunt-contrib-compress --save-dev

npm install fluent-ffmpeg --save-dev

npm install grunt-replace --save-dev

npm install grunt-gitinfo --save-dev

npm install mocha --save-dev



##### Other (not yet used) packages that might be usefull:

npm install aws-sdk --save-dev

https://github.com/pghalliday/grunt-mocha-test

https://github.com/gruntjs/grunt-contrib-clean

https://github.com/kmiyashiro/grunt-mocha