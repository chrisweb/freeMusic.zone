
// utilities module
var utilities = require(__dirname + '/../shared/utilities-0.0.3');

var https = require('https');

var querystring = require('querystring');

// load the jamendo api wrapper module
var jamendoModule = require('jamendo');

var oauthConnect = function(options) {
    
    var configuration = options.configuration;

    // create a new jamendo api instance
    this.jamendo = new jamendoModule({ client_id: configuration.jamendoApi.clientId });

};

oauthConnect.prototype.connect = function(request, response, next, models, configuration) {

    var that = this;
    
    var appRequest = request;
    
    var appResponse = response;
    
    var appNext = next;
    
    var appModels = models;

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
        
        var oauthRequest = https.request(options, function(oauthResponse) {
            
            utilities.log('status: ' + oauthResponse.statusCode);
            utilities.log('header: ' + JSON.stringify(oauthResponse.headers));
            
            oauthResponse.setEncoding('utf8');
            
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

        });

        oauthRequest.on('error', function(e) {
            
            var error = { status: 500, stack: '', message: e.message };
            
            utilities.log('oauth request failed: ' + e.message);
                    
            appNext(error, appRequest, appResponse, appNext);

        });

        // write data to request body
        oauthRequest.write(data);
        oauthRequest.end();

    } else {
        
        var error = { status: 500, stack: '', message: 'Missing required code' };
        
        utilities.log('missing code: ' + error);
                    
        appNext(error, appRequest, appResponse, appNext);
        
    }

};

module.exports = oauthConnect;