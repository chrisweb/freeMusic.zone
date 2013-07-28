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

// get configuration
var configurationModule = require('./application/configurations/configuration.js');
var configuration = configurationModule.get();

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

// load jamendo from twitter
// try/catch because it is a github module and might be missing
try {

    var JamendoFromTwitter = require('./node_modules/jamendo-from-twitter/index.js');
    
} catch(exception) {
    
    utilities.log(exception);
    
}

// get an harvester
var harvester = new JamendoFromTwitter(configuration.twitterModule);

// on twitter message listener ("jamendo from twitter" event)
harvester.on('message', function(message) {

    if (message.extracted.nothing === false) {
        
        if (typeof(message.extracted.track_ids) !== 'undefined') {

            for (var index in message.extracted.track_ids) {

                var twitterData = {
                    jamendo_track_id: message.extracted.track_ids[index],
                    twitter_user_id: message.user.id_str,
                    twitter_user_name: message.user.screen_name,
                    twitter_user_image: message.profile_image_url,
                    twitter_tweet_date: '',
                    twitter_tweet_id: message.id_str,
                    twitter_tweet_original_text: ''
                }
                
                tweetModel.saveOne(twitterData, function(error) {
                    
                    if (!error) {
                        
                        console.log('tweet got saved in mongodb');
                        
                    } else {
                        
                        console.log(error);
                        
                    }
                    
                });
                
            }
            
        }
 
    }

});

harvester.on('error', function(error) {

    console.log('harvester on error');

    console.log(error.message);
    
});

var streamOptions = {};
var searchOptions = {};

//streamOptions.track = 'jamendo OR jamen.do OR jamendomusic';
streamOptions.track = 'jamendo';
searchOptions.track = 'jamendo';

try {
    
    harvester.executeSearch(searchOptions);
    
} catch(exception) {

    console.log('twitter harvester error: ' + exception);

}

// start harvesting
try {
    
    //harvester.startStream(streamOptions);
    
} catch(exception) {

    console.log('twitter harvester error: ' + exception);

}