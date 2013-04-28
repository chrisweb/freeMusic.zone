
exports.version = '0.0.1';

var routes = {};

createRoute = function(app, configuration, module, controller, action) {

    if (typeof(module) === 'undefined') {
        
        this.module = 'default';
        
    } else {
        
        this.module = module;
        
    }
    
    if (typeof(controller) === 'undefined') {
        
        this.controller = 'index';
        
    } else {
        
        this.controller = controller;
        
    }
    
    if (typeof(action) === 'undefined') {
        
        this.action = 'index';
        
    } else {
        
        this.action = action;
        
    }

    if (configuration.application.useModules) {

        app.get('/' + this['module'] + '/' + this['controller'] + '/' + this['action'], this['module'].this['controller'].this['action']);
    
    } else {
        
        app.get('/' + this['controller'] + '/' + this['action'], this['controller'].this['action']);
        
    }

};

exports.get = route;