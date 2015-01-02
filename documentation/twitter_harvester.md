# Tweets Harvester setup (aws)

create an aws instance using the cloud init userdata for the harvester "cloud/cloud-init/userdata/cloud-config-video-audio-harvester.txt"

use an ssh client like putty and connect to your aws instance

go into /server/configuration and copy the configuration_example.js file, then rename it to configuration.js

now edit the configuration file and add your own values to the "production" section, set your values for mongodb and twitter

go back to the root of the project

install the dependencies listed in package.json using the following command:

npm install

install forever using the following command:

sudo npm install -g forever

now use the following command to launch the harvester with forever:

NODE_ENV=production forever start twitter_harvester.js -m 10 -l ./logs/twitter_harvester.log -o ./logs/twitter_harvester_stdout.log -e ./logs/twitter_harvester_stderr.log

you can check if forever successfully started your script with the following command:

sudo forever list

to stop the script, use (replace zero by the id of the script you want to kill, for [1] "use stop 1"):

sudo forever stop 0