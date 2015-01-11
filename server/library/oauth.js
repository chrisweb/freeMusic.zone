
// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

var https = require('https');

var querystring = require('querystring');

// library event (eventsManager)
var eventsManager = require('./event');

/**
 * 
 * oauth library
 * 
 * @param {type} configuration
 * @param {type} app
 * @param {type} oauthRouter
 * @returns {undefined}
 */
module.exports.start = function initialize(configuration, app, oauthRouter) {

    //utilities.log(configuration);

    oauthRouter.use(function(request, response, next) {

        utilities.log('/oauth, method: ' + request.method + ', url:' + request.url + ', path:' + request.path, 'fontColor:magenta');
        
        next();

    });

    oauthRouter.get('/url', function(request, response, next) {

        var url = getOAuthRequestUrl(configuration, request);
        
        var data = {
            url: url
        };

        response.status(200);
        response.json(data);

    });
    
    oauthRouter.get('/redirect', function(request, response, next) {
        
        // get the request parameters
        var rawCode = request.param('code');
        var rawState = request.param('state');
        
        // check if the code and state are valid
        var code = utilities.filterAlphaNumericPlus(rawCode);
        var state = utilities.filterAlphaNumericPlus(rawState, '-');
        
        if (!code || !state) {
            
            // trigger error route
            var error = {
                stack: '',
                message: 'invalid code or state'
            };

            next(error, request, response, next);
            
            return false;
            
        }

        // validate the state
        if (request.session.state !== state) {
            
            // trigger error route
            var error = {
                stack: '',
                message: 'invalid state'
            };

            // clear state value in session
            request.session.state = '';

            next(error, request, response, next);
            
            return false;
            
        }
        
        // clear state value in session
        request.session.state = '';
        
        // exchange the code for a token
        getOauthToken(code, configuration, function(error, userOauthData) {
            
            if (!error) {
            
                // emit an "userOauth" event that will get catched by the
                // user library module
                eventsManager.emit('userOauth', { 'userOauthData': userOauthData, 'request': request, 'response': response, 'next': next });

            } else {
                
                next(error, request, response, next);
                
            }
            
        });

    });
    
    app.use('/oauth', oauthRouter);

};

/**
 * 
 * build the oauth request url
 * 
 * @param {type} configuration
 * @param {type} request
 * @returns {String}
 */
var getOAuthRequestUrl = function getOAuthRequestUrlFunction(configuration, request) {
    
    // a state to verify the response
    var state = utilities.generateUUID();
    
    // put the state in the user session to be able to verify it later
    request.session.state = state;
    
    // generate the redirect url
    var redirectUrl = getRedirectUrl(configuration);
    
    // build the request url
    var requestUrl = '';

    // protocol
    requestUrl += configuration.jamendoApi.protocol + '://';

    // host
    requestUrl += configuration.jamendoApi.host;

    // port
    if (
        typeof(configuration.jamendoApi.port) !== 'undefined' &&
        configuration.jamendoApi.port !== '' &&
        configuration.jamendoApi.port !== 80
    ) {

        requestUrl += ':' + configuration.jamendoApi.port;

    }

    // api version and authorize resource path
    requestUrl += '/' + configuration.jamendoApi.version;
    requestUrl += configuration.jamendoApi.resources.authorize;

    // parameters
    requestUrl += '?client_id=' + configuration.jamendoApi.clientId;
    requestUrl += '&redirect_uri=' + redirectUrl;
    requestUrl += '&scope=' + configuration.jamendoApi.scope;

    // state
    requestUrl += '&state=' + state;

    return requestUrl;

};

/**
 * 
 * get the jamendo oauth token
 * 
 * @param {type} code
 * @param {type} configuration
 * @param {type} callback
 * @returns {undefined}
 */
var getOauthToken = function getOauthTokenFunction(code, configuration, callback) {
    
    // generate the redirect url
    var redirectUrl = getRedirectUrl(configuration);
    
    // create a query string
    var data = querystring.stringify({
        code: code,
        client_id: configuration.jamendoApi.clientId,
        client_secret: configuration.jamendoApi.clientSecret,
        grant_type: configuration.jamendoApi.grantType,
        redirect_uri: redirectUrl
    });

    //utilities.log(data);

    // define the options
    var options = {
        hostname: configuration.jamendoApi.host,
        port: configuration.jamendoApi.port,
        path: '/' + configuration.jamendoApi.version + configuration.jamendoApi.resources.grant,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };

    //utilities.log(options);

    // oauth request object
    var oauthRequest = https.request(options, function(oauthResponse) {

        //utilities.log('status: ' + oauthResponse.statusCode);
        //utilities.log('header: ', oauthResponse.headers);
        
        oauthResponse.setEncoding('utf8');
        
        oauthResponse.on('data', function(chunk) {

            //utilities.log('body: ' + chunk);

            var result = '';

            if (oauthResponse.statusCode === 200) {

                try {

                    // try to parse response if it fails the response is not json
                    result = JSON.parse(chunk);

                } catch(e) {

                    // facebook responds with querystring in the body
                    result = querystring.parse(chunk);

                }

                //utilities.log(result);

                var userOauthData = {
                    token: result.access_token,
                    expiry: result.expires_in,
                    refreshToken: result.refresh_token,
                    scope: configuration.jamendoApi.scope
                };
                
                callback(false, userOauthData);

            } else {

                try {

                    // try to parse response if it fails the response is not json
                    result = JSON.parse(chunk);

                } catch(e) {

                    var matchesArray = chunk.match('<h1[^>]*>(.*?)<\/h1>', 'g');

                    // if there are matches the response might be an error page
                    if (matchesArray !== null) {

                        result = {};

                        result.error = matchesArray[1];

                    } else {

                        // facebook responds with querystring in the body
                        result = querystring.parse(chunk);

                    }

                }

                var error = { status: oauthResponse.statusCode, stack: '', message: result.error };

                utilities.log('oauth request failed, status: ' + oauthResponse.statusCode + ', message: ' + result.error, 'fontColor:red');

                callback(error);

            }

        });

        oauthRequest.on('error', function(e) {

            var error = { status: 500, stack: '', message: e.message };

            utilities.log('oauth request failed: ' + e.message, 'fontColor:red');

            callback(error);

        });
        
    });
    
    // write data to request body
    oauthRequest.write(data);
    oauthRequest.end();
    
};

/**
 * 
 * generate the oauth redirect url
 * 
 * @param {type} configuration
 * @returns {String}
 */
var getRedirectUrl = function getRedirectUrlFunction(configuration) {
    
    // generate the redirect url
    var redirectUrl;

    if (
        typeof(configuration.jamendoApi.port) !== 'undefined' &&
        configuration.jamendoApi.port !== '' &&
        configuration.jamendoApi.port !== 80
    ) {
        
        redirectUrl = configuration.server.protocol + '://' + configuration.server.host + ':' + configuration.server.port + configuration.jamendoApi.redirectUri;
        
    } else {
        
        redirectUrl = configuration.server.protocol + '://' + configuration.server.host + configuration.jamendoApi.redirectUri;
        
    }
    
    return redirectUrl;
    
};