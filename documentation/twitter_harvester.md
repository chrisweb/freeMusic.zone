# Tweets Harvester setup (aws)

## the harvester

create an aws instance using the cloud init userdata for the harvester "cloud/cloud-init/userdata/cloud-config-video-audio-harvester.yml"

use an ssh client like putty and connect to your aws instance

if you want to update the project to the lastest version got into the root of the project and then pull the newest code:

cd /var/www/freeMusic.zone

sudo git pull

go into /server/configuration and copy the configuration_example.js file, then rename it to configuration.js

now edit the configuration file and add your own values to the "production" section, set your values for mongodb and twitter

go back to the root of the project

install the dependencies listed in package.json using the following command:

npm install

install pm2 using the following command:

npm install pm2 -g

now use the following command to launch the harvester with pm2:

NODE_ENV=production pm2 start twitter_harvester.js -l ./logs/twitter_harvester.log -o ./logs/twitter_harvester_stdout.log -e ./logs/twitter_harvester_stderr.log

you can check if pm2 successfully started your script with the following command:

pm2 list

to get detailled informations about the pm2 harvester instance type:

pm2 info twitter_harvester

to stop the script, use (replace zero by the id of the script you want to kill, for [1] "use stop 1"):

pm2 stop twitter_harvester

to check out if tweets get added to your mongodb database use the following commands:

use freemusiczone

db.auth('MY_USERNAME', 'MY_PASSWORD')

db.tweets.find()

## the map reduce cronjob

go back to the root of the project:

cd /var/www/freeMusic.zone

now use the following command to launch the map/reduce cron with pm2:

NODE_ENV=production pm2 start mapreduce_cron.js -l ./logs/mapreduce_cron.log -o ./logs/mapreduce_cron_stdout.log -e ./logs/mapreduce_cron_stderr.log

the map/reduced list of tweets will be in a collection called "tweets_charts_day" and the cron should run every 20 minutes