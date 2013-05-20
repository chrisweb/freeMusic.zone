
// utilities module
var utilities = require(__dirname + '/../shared/utilities-0.0.1');

var https = require('https');

var querystring = require('querystring');

var oauthConnect = function() {



};

oauthConnect.prototype.connect = function(request, response, next, models, configuration) {

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

        var options = {
            hostname: configuration.jamendoApi.apiHost,
            port: configuration.jamendoApi.apiPort,
            path: configuration.jamendoApi.resources.grant,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };

        var oauthRequest = https.request(options, function(oauthResponse) {

            utilities.log('status: ' + oauthResponse.statusCode);
            utilities.log('header: ' + JSON.stringify(oauthResponse.headers));

            oauthResponse.setEncoding('utf8');

            oauthResponse.on('data', function(chunk) {

                utilities.log('body: ' + chunk);
                
                if (oauthResponse.statusCode === '200') {
                    
                    response.render('oauth', { message: 'oauth connect success' });
                    
                } else {
                
                    var message = '';
                    
                    var matchesArray = chunk.match('<h1[^>]*>(.*?)<\/h1>', 'g');
                    
                    if (matchesArray !== null) {
                    
                        message += matchesArray[1];
                                
                    }
                
                    utilities.log('oauth request failed, status: ' + oauthResponse.statusCode + ', message: ' + message);

                    error = { status: oauthResponse.statusCode, stack: '', message: message };

                    next(error, request, response, next);
                    
                }

            });

        });

        oauthRequest.on('error', function(e) {

            utilities.log('oauth request failed: ' + e.message);
            
            error = { status: 500, stack: '', message: e.message };
                    
            next(error, request, response, next);

        });

        // write data to request body
        oauthRequest.write(data);
        oauthRequest.end();

    } else {
        
        error = { status: 500, stack: '', message: 'Missing required code' };
                    
        next(error, request, response, next);
        
    }

/*

    // generate a unique user hash
    var hash = '';

    // save to database
    var userModel = models.userModel();

    userModel.update({code: code, hash: hash});

    // create session
    request.session.hash = hash;*/

};

module.exports = oauthConnect;