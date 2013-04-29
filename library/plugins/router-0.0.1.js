exports.version = '0.0.1';

var routes = {};

mapRoutes = function(app, configuration) {

    console.log('routes mapper got executed');

    if (configuration.application.useModules) {

        app.get('/:module/:controller/:action', function(request, response, next) {
            
            
            
        });
    
    } else {
        
        app.get('/:controller/:action', function(request, response, next) {

            console.log(request.params.controller, 'request.params.controller');
            console.log(request.params.action, 'request.params.action');
            console.log('path: ../../application/controllers/' + request.params.controller + 'Controller');

            var controllerModule = require('../../application/controllers/' + request.params.controller + 'Controller');

            console.log('request[\'params\'][\'action\']', request['params']['action']);
            
            global.actionName = request.params.action;

            controllerModule.global['actionName']();
            
        });
        
    }

};

exports.mapRoutes = mapRoutes;
