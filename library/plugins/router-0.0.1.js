exports.version = '0.0.1';

var routes = {};

mapRoutes = function(app, configuration) {

console.log('routes mapper got executed');

    if (configuration.application.useModules) {

        app.get('/:module/:controller/:action', function(request, response, next) {

        });

    } else {

        console.log(request);

        var filePath = request.path;

        fs.exists(filePath, function(exists) {

            if (!exists) {




            }

        });

        // http://127.0.0.1/tweets/index
        app.get('/:controller/:action', function(request, response, next) {

            console.log('request.params.controller' + request.params.controller);
            console.log('request.params.action' + request.params.action);
            console.log('path: ../../application/controllers/' + request.params.controller + 'Controller');

            var controllerModule = require('../../application/controllers/' + request.params.controller + 'Controller');

            /*
             global.actionName = request.params.action;

             var controller = new controllerModule(app);

             console.log('controller type: ' + typeof(controller));
             console.log('global type: ' + typeof(global));

             var action = controller.global['actionName'];

             action();
             */

            //controllerModule.global['actionName']();

            var controller = new controllerModule(app);
            
            try {
                controller.index(request, response);
            } catch (error) {
                
            }

            next();

        });
        
app.get('/people.json', function(request, response) {
  // We want to set the content-type header so that the browser understands
  //  the content of the response.
  response.contentType('application/json');

  // Normally, the would probably come from a database, but we can cheat:
  var people = [
    { name: 'Dave', location: 'Atlanta' },
    { name: 'Santa Claus', location: 'North Pole' },
    { name: 'Man in the Moon', location: 'The Moon' }
  ];

  // Since the request is for a JSON representation of the people, we
  //  should JSON serialize them. The built-in JSON.stringify() function
  //  does that.
  var peopleJSON = JSON.stringify(people);

  // Now, we can use the response object's send method to push that string
  //  of people JSON back to the browser in response to this request:
  response.send(peopleJSON);
});

        // https://github.com/visionmedia/express/tree/master/examples/mvc
        // assume "not found" in the error msgs
        // is a 404. this is somewhat silly, but
        // valid, you can do whatever you like, set
        // properties, use instanceof etc.
        app.use(function(error, req, res, next) {

            // treat as 404
            if (~err.message.indexOf('not found')) return next();
            // log it
            console.error(err.stack);
            // error page
            res.status(500).render('5xx');

        });

        // assume 404 since no middleware responded
        app.use(function(req, res, next) {

            res.status(404).render('404', { url: req.originalUrl });

        });

    }

};

exports.mapRoutes = mapRoutes;
