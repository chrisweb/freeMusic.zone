/**
 * 
 * amazon aws API
 * 
 * node amazon_aws
 * 
 * http://aws.amazon.com/de/sdkfornodejs/
 * 
 * To use this you first need to install the amazon-aws package
 * http://aws.amazon.com/de/sdkfornodejs/
 * 
 */

// utilities module
var utilities = require('./bower_components/chrisweb-utilities/utilities');

// NODE_ENV can be "development", "staging" or "production"
if (typeof (process.env.NODE_ENV) === 'undefined') {

    //process.env.NODE_ENV = 'production';
    process.env.NODE_ENV = 'development';

    utilities.log('PROCESS ENV NOT FOUND, setting it by default to "' + process.env.NODE_ENV.toUpperCase() + '"', 'fontColor:red');

}

// get configuration
var configurationModule = require('../server/configuration/configuration');

var configuration = configurationModule.get(process.env.NODE_ENV);

// amazon aws SDK
var AWS = require('aws-sdk');

utilities.log('amazon aws API', 'fontColor:green');

AWS.config.update(configuration.aws);

// route 53
var route53 = new AWS.Route53();

route53.listHostedZones({}, function(error, data) {
    
    if (error) {

        utilities.log(error);

    } else {

        console.log(data);

    }
    
});


// EC2
/*var ec2 = new AWS.EC2();

ec2.describeInstances({}, function(error, data) {

    if (error) {

        utilities.log(error);

    } else {

        console.log(data);

    }

});*/

