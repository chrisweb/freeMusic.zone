// include filesystem module
var fs = require('fs');

// oauth connect plugin
var oauthPlugin = require(__dirname + '/oauthConnect');

exports.version = '0.0.1';

var routes = {};

mapRoutes = function(app, configuration, controllers, models) {
    
    var utilities = app.get('utilities');

    utilities.log('routes mapper initialization...', 'blue');
    
    /**
     * share the utilities plugin with the client
     */
    app.all('/javascripts/library/utilities-0.0.1.js', function(request, response, next) {

        utilities.log(' $$$ ROUTE MATCH: /javascripts/library/utilities-0.0.1.js by: ' + request.url, 'yellow');

        try {

            response.setHeader('Content-Type', 'application/javascript');

            response.send(fs.readFileSync(__dirname + '/../shared/utilities-0.0.1.js', 'utf8'));

        } catch(error) {

            utilities.log(error, 'red');

            next(error, request, response, next);

        }

    });
    
    /**
     * jamendo oauth connect callback url
     */
    app.all('/jamendo_oauth_redirect', function (request, response, next) {
        
        var oauthConnect = new oauthPlugin();
        
        oauthConnect.connect(request, response, next, models, configuration);

    });

    /**
     * serve the api calls
     */
    if (configuration.application.useModules) {

        /**
         * route: /api/v1/:module/:controller/:action
         */
        app.all('/api/v1/:module/:controller/:action', function(request, response, next) {
            
            utilities.log(' $$$ ROUTE MATCH: /api/v1/:module/:controller/:action by: ' + request.url, 'yellow');
            
            // TODO finish modules support

        });

    } else {

        /**
         * route: /api/v1/:controller/:action
         */
        // for example: http://127.0.0.1:35000/api/v1/:playlists/:playlistId
        // app.all: all http verbs, app.get: only get request, app.post, ...
        app.all('/api/v1/:controller/:action', function(request, response, next) {
            
            utilities.log(' $$$ ROUTE MATCH: /api/v1/:controller/:action by: ' + request.url, 'yellow');

            utilities.log('request.params.controller: ' + request.params.controller, 'yellow');
            utilities.log('request.params.action: ' + request.params.action, 'yellow');
            
            try {

                var errorNotFound = false;

                utilities.log('**' + typeof(controllers[request.params.controller + 'Controller']), 'yellow');
                utilities.log(controllers.hasOwnProperty(request.params.controller + 'Controller'), 'yellow');

                if (controllers.hasOwnProperty(request.params.controller + 'Controller')) {
                    
                    var controllerModule = controllers[request.params.controller + 'Controller'];
                    
                    var controller = new controllerModule(app);

                    var actionName = request.params.action;
                    
                    utilities.log('***' + typeof(controller[actionName]), 'yellow');
                    utilities.log(actionName in controller, 'yellow');
                    
                    if (actionName in controller) {
                        
                        // set global headers
                        // allow cross-origin resource sharing (CORS)
                        response.header('Access-Control-Allow-Origin', '*');
                        response.header('Access-Control-Allow-Headers', 'X-Requested-With');
                        
                        controller[actionName](request, response, models, configuration);
                        
                    } else {
                        
                        errorNotFound = true;
                        
                    }
                    
                } else {
                    
                    errorNotFound = true;
                    
                }
                
                if (errorNotFound) {
                    
                    var path = '/' + request.params.controller + '/' + request.params.action;
                    
                    error = { status: 404, url: path };
                    
                    next(error, request, response, next);
                    
                }
                
            } catch (error) {
                
                next(error, request, response, next);
                
            }

        });
    
    }
    
    app.get('/404', function(request, response, next) {
        
        error = { status: 404, url: '/404' };
                    
        next(error, request, response, next);
        
    });

    /**
     * route: /
     * deliver the html code of our one page app
     */
    app.get('/', function(request, response, next) {

        utilities.log(' $$$ ROUTE MATCH: / by: ' + request.url, 'yellow');
        //utilities.log(' error: ' + error);

        //if (error !== false) return next();

        try {

            var headerHtml = app.get('headerHtml');
            var footerHtml = app.get('footerHtml');
            
            // developer greeting header
            response.header('x-powered-by', 'Like to see what\'s under the hood? Check out https://github.com/chrisweb/jam_prototype!');
            response.header('x-frame-options', 'deny');
            response.header('x-xss-protection', '1; mode=block');
            response.header('x-content-type-options', 'nosniff');
            response.header('x-ua-compatible', 'IE=edge, chrome=1');

            response.render('index', { environment: app.get('environment'), header: headerHtml, footer: footerHtml });

        } catch (error) {

            utilities.log('* error: ' + JSON.stringify(error), 'red');

            next(error, request, response, next);

        }

    });

    /**
     * 5xx error middleware
     */
    app.use(function(error, request, response, next) {

        utilities.log('server error: ' + JSON.stringify(error), 'red');

        if (error.status === 404) return next();

        utilities.log('5xx middleware catch by: ' + request.url, 'yellow');

        // error page
        response.status(parseInt(error.status));

        if (request.accepts('html')) {

            var headerHtml = app.get('headerHtml');
            var footerHtml = app.get('footerHtml');

            response.render('5xx', { environment: app.get('environment'), stack: error.stack.replace(/\n/g, '<br>'), message: error.message, header: headerHtml, footer: footerHtml });

        } else if (request.accepts('json')) {

            response.send({ code: error.status, stack: error.stack, message: error.message });

        }

    });

    /**
     * 404 error middleware
     */
    app.use(function(request, response) {

        response.status(404);

        utilities.log('404 middleware catch by: ' + request.url, 'yellow');

        if (request.accepts('html')) {

            var headerHtml = app.get('headerHtml');
            var footerHtml = app.get('footerHtml');

            response.render('404', { environment: app.get('environment'), url: request.originalUrl, header: headerHtml, footer: footerHtml });

        } else if (request.accepts('json')) {

            response.send({ code: '404', url: request.originalUrl });

        }

    });

};

exports.mapRoutes = mapRoutes;
