
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
                
                configuration.jamendoApi = {
                    clientId: '531b1309',
                    apiHost: 'api.jamendo.com',
                    apiVersionPath: '/v3.0',
                    apiPort: 80,
                    scope: 'music',
                    redirect_uri: 'http://127.0.0.1:35000/jamendo_oauth_redirect',
                    resources: {
                        authorize: '/oauth/authorize'
                    }
                };

        }

        return configuration;

    };

    return {
        get: getConfiguration
    };

});