/**
 * twitter harvester wrapper
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('./library/shared/utilities-0.0.1');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

// get the environment variable
var environment = process.env.NODE_ENV;

var JamendoFromTwitter = require('./node_modules/jamendo-from-twitter/index.js');

// get configuration
var configurationModule = require('./application/configurations/configuration.js');
var configuration = configurationModule.get();

// get an harvester
var harvester = new JamendoFromTwitter(configuration.twitterModule);

// listener
harvester.on('message', function(message) {
    
    utilities.log(message.extracted);
    
});

var streamOptions = {};

streamOptions.track = 'jamendo OR jamen.do OR jamendomusic';

// start harvesting
harvester.start(streamOptions);