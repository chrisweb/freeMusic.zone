exports.version = '0.0.1';

var routes = {};

mapRoutes = function(app, configuration, controllers) {

    console.log('routes mapper got executed');

    if (configuration.application.useModules) {

        app.get('/:module/:controller/:action', function(request, response, next) {

        });

    } else {

        // for example: http://127.0.0.1/tweets/index
        // app.all all http verbs, app.get only get request, app.post, ...
        app.all('/:controller/:action', function(request, response, next) {

            console.log('request.params.controller: ' + request.params.controller);
            console.log('request.params.action: ' + request.params.action);
            
            try {

                // TODO: if controller or action not found send 404
                // TODO: extract get parameters like /:parameterName/:parameterValue
                
                var errorNotFound = false;

                console.log('**' + typeof(controllers[request.params.controller + 'Controller']));
                console.log(controllers.hasOwnProperty(request.params.controller + 'Controller'));

                if (controllers.hasOwnProperty(request.params.controller + 'Controller')) {
                    
                    var controllerModule = controllers[request.params.controller + 'Controller'];
                    
                    var controller = new controllerModule(app);

                    var actionName = request.params.action;
                    
                    console.log('***' + typeof(controller[actionName]));
                    console.log(actionName in controller);
                    
                    if (actionName in controller) {
                        
                        controller[actionName](request, response);
                        
                    } else {
                        
                        errorNotFound = true;
                        
                    }
                    
                } else {
                    
                    errorNotFound = true;
                    
                }
                
                if (errorNotFound) {
                    
                    var path = '/' + request.params.controller + '/' + request.params.action;
                    
                    var error = { status: 404, url: path };
                    
                    next(error, request, response, next);
                    
                }
                
            } catch (error) {
                
                next(error, request, response, next);
                
            }

        });
        
        app.get('/some.json', function(request, response, next) {

            try {
                
                var controllerModule = controllers['tweets'] + 'Controller';

                var controller = new controllerModule(app);
                
                controller.tweetsJson(request, response);
                
            } catch (error) {
                
                next();
                
            }

        });

        // 5xx error
        app.use(function(error, request, response, next) {
            
            console.error(error);
            
            if (error.status === 404) return next();
            
            // error page
            response.status(parseInt(error.status));

            if (request.accepts('html')) {
            
                response.render('5xx', { stack: error.stack.replace(/\n/g, '<br>'), message: error.message });
                
            } else if (request.accepts('json')) {
                
                response.send({ code: error.status, stack: error.stack, message: error.message });
                
            }

        });

        // 404 error
        app.use(function(request, response) {

            response.status(404);
            
            if (request.accepts('html')) {
            
                response.render('404', { url: request.originalUrl });
                
            } else if (request.accepts('json')) {
                
                response.send({ code: '404', url: request.originalUrl });
                
            }

        });

    }

};

exports.mapRoutes = mapRoutes;
