
// utilities module
var utilities = require('./shared/utilities');

var https = require('https');

var querystring = require('querystring');

// load the jamendo api wrapper module
var jamendoModule = require('jamendo');

module.exports.start = function initialize(configuration, app, oauthRouter) {

    oauthRouter.use(function(request, response, next) {

        utilities.log('/oauth, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);

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
        
        console.log('outh redirect');
        console.log(request);

    });
    
    app.use('/oauth', oauthRouter);

};

var getOAuthRequestUrl = function getOAuthRequestUrlFunction(configuration, request) {
    
    // a state to verify the response
    var state = utilities.generateUUID();
    
    // put the state in the user session to be able to verify it later
    request.session.state = state;
    
    // build the request url
    var requestUrl = '';

    // protocol
    requestUrl += 'https://';

    // host
    requestUrl += configuration.jamendoApi.apiHost;

    // port
    if (
        typeof(configuration.jamendoApi.apiPort) !== 'undefined' &&
        configuration.jamendoApi.apiPort !== '' &&
        configuration.jamendoApi.apiPort !== 80
    ) {

        requestUrl += ':' + configuration.jamendoApi.apiPort;

    }

    // api version and authorize resource path
    requestUrl += configuration.jamendoApi.apiVersionPath;
    requestUrl += configuration.jamendoApi.resources.authorize;

    // parameters
    requestUrl += '?client_id=' + configuration.jamendoApi.clientId;
    requestUrl += '&redirect_uri=' + configuration.jamendoApi.redirectUri;
    requestUrl += '&scope=' + configuration.jamendoApi.scope;

    // state
    requestUrl += '&state=' + state;

    return requestUrl;

};


/*module.exports.oauthCconnect = function oauthCconnectFunction(request, response, next, models, configuration) {

    // get the request parameters
    var rawCode = request.param('code');
    var rawState = request.param('state');

    // filter parameters only keep alpha numeric characters
    // TODO: put this filter into utilities file
    if (typeof(rawCode) === 'string' && rawCode.length > 0) {
    
        var code = rawCode.replace(/\W/g, '');

        var data = querystring.stringify({
            code: code,
            client_id: configuration.jamendoApi.clientId,
            client_secret: configuration.jamendoApi.clientSecret,
            grant_type: configuration.jamendoApi.grantType,
            redirect_uri: configuration.jamendoApi.redirectUri
        });

        utilities.log(data);

        var options = {
            hostname: configuration.jamendoApi.apiHost,
            port: configuration.jamendoApi.apiPort,
            path: configuration.jamendoApi.apiVersionPath + configuration.jamendoApi.resources.grant,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };
        
        utilities.log(options);
        
    } else {
        
        var error = { status: 500, stack: '', message: 'Missing required code' };
        
        utilities.log('missing code: ' + error);
                    
        appNext(error, appRequest, appResponse, appNext);
        
    }
    
};

module.exports.oauthRequest = function oauthRequestFunction() {

    var oauthRequest = https.request(options, function(oauthResponse) {

        utilities.log('status: ' + oauthResponse.statusCode);
        utilities.log('header: ' + JSON.stringify(oauthResponse.headers));

        oauthResponse.setEncoding('utf8');

        // write data to request body
        oauthRequest.write(data);
        oauthRequest.end();
        
    });

    oauthResponse.on('data', function(chunk) {

        utilities.log('body: ' + chunk);

        var result = '';

        if (oauthResponse.statusCode === 200) {

            try {

                // try to parse response if it fails the response is not json
                result = JSON.parse(chunk);

            } catch(e) {

                // facebook responds with querystring in the body
                result = querystring.parse(chunk);

            }

            utilities.log(result);

            // get user infos through jamendo api (username / id)
            that.jamendo.users({
                access_token: result.access_token
            },
            function(error, data) {

                utilities.log('oauth result data object: ');
                utilities.log(data);

                if (!error) {

                    var user = { 
                        nickname: data.results[0].name,
                        id: data.results[0].id,
                        createdAt: data.results[0].creationdate,
                        language: data.results[0].lang,
                        avatar: data.results[0].image
                    };

                    user.oauth = result;

                    if (typeof appRequest.session !== 'undefined') {

                        // put user object in session
                        appRequest.session.user = user;

                        // check if the user exists, if so update it
                        // else save the user in the mongodb database
                        appModels.user.saveOne(user);

                        appResponse.render('oauth', { message: 'oauth connect success' });

                    } else {

                        error = { status: 500, stack: '', message: 'undefined session' };

                        utilities.log('undefined session, redis may be down: ' + error);

                        appNext(error, appRequest, appResponse, appNext);

                    }

                } else {

                    error = { status: oauthResponse.statusCode, stack: '', message: result.error };

                    utilities.log('oauth request failed, status: ' + error);

                    appNext(error, appRequest, appResponse, appNext);

                }

            });

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

            utilities.log('oauth request failed, status: ' + oauthResponse.statusCode + ', message: ' + result.error);

            appNext(error, appRequest, appResponse, appNext);

        }

    });
    
    oauthRequest.on('error', function(e) {

        var error = { status: 500, stack: '', message: e.message };

        utilities.log('oauth request failed: ' + e.message);

        appNext(error, appRequest, appResponse, appNext);

    });

};*/
