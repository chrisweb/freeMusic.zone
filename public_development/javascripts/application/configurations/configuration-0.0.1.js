
define('configuration', [], function() {

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
                    name: 'jam_prototype',
                    version: '0.0.1'
                };

        }

        return configuration;

    };

    return {
        get: getConfiguration
    };

});