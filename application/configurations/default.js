/**
 * 
 * application configuration
 * 
 * @param {type} app
 * @returns {module.exports}
 */
exports.version = '0.0.1';

var environment = process.env.NODE_ENV;

/**
 * 
 * @returns {getConfiguration.configuration}
 */
getConfiguration = function() {

    var configuration = {};

    switch (environment) {

        case 'production':

            break;

        case 'staging':

            break;

        case 'development':

            /**
             * 
             */
            configuration.server = {
                port: 35000,
                staticFiles: {
                    header: {
                        //maxAge: 604800 // 7 days
                        maxAge: 0
                    }
                },
                logging: {
                    console: true,
                    errorFile: true,
                    warnFile: true,
                    infoFile: true
                }
            };
               
            /**
             * 
             */
            configuration.mongodb = {
                host: '127.0.0.1',
                database: {
                    name: 'jamtweets'
                }
            };
            
            /**
             * 
             */
            configuration.application = {
                useModules: false,
                session: {
                    secret: 'my_secret_session_hash'
                },
                cookie: {
                    secret: 'my_secret_cookie_hash'
                }
            };
            
            /**
             * jamendo api / oauth
             */
            configuration.jamendoApi = {
                clientId: '00000000',
                clientSecret: '0000000000000000000000000000000000000000000',
                apiHost: 'api.jamendo.com',
                apiVersionPath: '/v3.0',
                apiPort: 80
            };

            break;

    }

    return configuration;

};

exports.get = getConfiguration;