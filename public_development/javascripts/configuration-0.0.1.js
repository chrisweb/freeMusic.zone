
define([], function() {

    var getConfiguration = function() {

        var environment = 'development';
        
        var configuration = {};

        switch (environment) {

            case 'production':

                break;

            case 'staging':

                break;

            case 'development':

                configuration.application = {

                    

                };

        }

        return configuration;
        
    };

    return {
        get: getConfiguration
    };

});