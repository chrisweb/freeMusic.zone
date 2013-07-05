var JamendoFromTwitter = require('./node_modules/jamendo-from-twitter/index.js');

// get configuration
var configurationModule = require('./application/configurations/configuration.js');
var configuration = configurationModule.get();

// get an harvester
var harvester = new JamendoFromTwitter(configuration.twitter);

// listener
harvester.on('message', function(message) {
    
    console.log(message.extracted);
    
});

var streamOptions = {};

streamOptions.track = 'jamendo OR jamen.do OR jamendomusic OR @jamendo OR @jamen.do OR @jamendomusic OR #jamendo OR #jamen.do OR #jamendomusic';

// start harvesting
harvester.start(streamOptions);