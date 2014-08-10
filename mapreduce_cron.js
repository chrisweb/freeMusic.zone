/**
 * tweets map-reduce cron
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('./bower_components/chrisweb-utilities/utilities');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

// get the environment variable
var environment = process.env.NODE_ENV;

// get configuration
var configurationModule = require('./application/configurations/configuration');
var configuration = configurationModule.get();

// cron vendor module
var cron = require('cron');

// initialize mongodb connection (mongoose)
var app = {};

app.mongoose = require('mongoose');

app.mongoose.connect('mongodb://' + configuration.mongodb.host + '/' + configuration.mongodb.database.name, function(error) {
    
    if (typeof(error) !== 'undefined') {
        
        utilities.log('mongodb connection failed, host: ' + configuration.mongodb.host + ', database: ' + configuration.mongodb.database.name + ', error: ' + error, 'red');
        
    } else {
        
        // enable mongoose debugging in development
        if (environment === 'development') {

            console.log('enabling mongoose debuggin');

            app.mongoose.set('debug', true);

        }
        
    }
    
});


// get the tweets mongoose model
var TweetModel = require('./application/models/tweet');

var tweetModel = new TweetModel(app);

utilities.log('* * * * * initializing cron');

/**
 * 
 * launches all the functions every one minute
 * 
 * @returns {undefined}
 */
var oneMinuteLauncher = function() {
    
    utilities.log('* * * * * cron job(s) get(s) executed', 'info');
    
    var options = {};

    tweetModel.mapReduceList(options, function(error, results, statistics) {

        if (error) {

            utilities.log('error: ' + error);
            
        } else {
            
            utilities.log(statistics);
            utilities.log(results);
            
        }

    });
    
};

// start the "populate top playlists" cron job
var cronJob = cron.CronJob;

try {

    var job = new cronJob({

        //cronTime: '*/1 * * * * *', // execute it every 1 second
        cronTime: '0 */1 * * * *', // execute it every 1 minutes
        //onTick: function() { utilities.log('test'); }
        onTick: oneMinuteLauncher

    });

} catch(error) {

    utilities.log('cron pattern not valid, error: ' + error, 'error');
    
}

job.start();
