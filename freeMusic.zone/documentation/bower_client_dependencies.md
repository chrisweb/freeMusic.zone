# Bower (client frontend)

You don't need to follow these steps, I just wrote down in this document what I did when setting up bower.

### Bower project setup

Using your console go into the root directory of the project:

cd /PROJECT_ROOT_PATH

To create a bower.json file:

bower init

### To clear bowers cache

bower cache clean

### To find outdated bower packages do

bower list

### To install client libraries

bower install requirejs --save

bower install underscore --save

bower install backbone --save

bower install jquery --save

bower install bootstrap-sass-official --save

bower install https://github.com/scottschiller/SoundManager2.git#V2.97a.20131201+DEV --save

bower install fontawesome --save

bower install modernizr --save

bower install qunit --save-dev

##### Not used dependencies

Depencies that don't get used yet by this project but might be userfull some day:

bower install momentjs --save

bower install animate.css --save

bower install velocity --save