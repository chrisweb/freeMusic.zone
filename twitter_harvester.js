/**
 * twitter harvester wrapper
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('./library/shared/utilities-0.0.3');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

// get the environment variable
var environment = process.env.NODE_ENV;

try {

    var JamendoFromTwitter = require('./node_modules/jamendo-from-twitter/index.js');
    
} catch(exception) {
    
    utilities.log(exception);
    
}



// get configuration
var configurationModule = require('./application/configurations/configuration.js');
var configuration = configurationModule.get();

// get an harvester
var harvester = new JamendoFromTwitter(configuration.twitterModule);

// on twitter message listener ("jamendo from twitter" event)
harvester.on('message', function(message) {

    console.log('harvester got message');

    console.log(message);
    //utilities.log(message);
    //utilities.log(message.extracted, 'red', true);
    
    /**
        Mongodb twitter tracks log:
        Jamendo_track_Id
        Twitter_user_id
        Twitter_user_name
        Twitter_tweet_datedate
        Found_firsttime_date
        Twitter_Tweet_original_text
        Twitter_tweet_id (to help avoid duplicates)
     */

});

var streamOptions = {};

//streamOptions.track = 'jamendo OR jamen.do OR jamendomusic';
streamOptions.track = 'music';

// start harvesting
try {
    
    harvester.start(streamOptions);
    
} catch(exception) {

    console.log(exception);

}