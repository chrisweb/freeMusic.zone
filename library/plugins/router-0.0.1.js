// include filesystem module
var fs = require('fs');

exports.version = '0.0.1';

var routes = {};

mapRoutes = function(app, configuration, controllers, models) {
    
    var utilities = app.get('utilities');

    utilities.log('routes mapper got executed', 'green');
    
    /**
     * share the utilities plugin with the client
     */
    app.all('/javascripts/utilities-0.0.1.js', function(request, response, next) {

        utilities.log(' $$$ ROUTE MATCH: /javascripts/utilities-0.0.1.js by: ' + request.url, 'yellow');

        try {

            response.setHeader('Content-Type', 'application/javascript');

            response.send(fs.readFileSync(__dirname + '/../shared/utilities-0.0.1.js', 'utf8'));

        } catch(error) {

            utilities.log(error, 'red');

            next(error, request, response, next);

        }

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

        });

    } else {

        /**
         * route: /api/v1/:controller/:action
         */
        // for example: http://127.0.0.1/api/v1/:tweets/:list
        // app.all: all http verbs, app.get: only get request, app.post, ...
        app.all('/api/v1/:controller/:action', function(request, response, next) {
            
            utilities.log(' $$$ ROUTE MATCH: /api/v1/:controller/:action by: ' + request.url, 'yellow');

            utilities.log('request.params.controller: ' + request.params.controller, 'yellow');
            utilities.log('request.params.action: ' + request.params.action, 'yellow');
            
            try {

                // TODO: if controller or action not found send 404
                // TODO: extract get parameters like /:parameterName/:parameterValue
                
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
                        
                        controller[actionName](request, response, models);
                        
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
