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
             * twitter
             */
            configuration.twitter = {
                consumer_key:         '000000000000000000000000000000000', // consumer_key
                consumer_secret:      '00000000000000000000000000000000000000', // consumer_secret
                access_token_key:     '0000000000000-000000000000000000000000000000000', // access_token
                access_token_secret:  '000000000000000000000000000000000000000000' // access_token_secret
            };
            
            /**
             * server
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
             * mongodb
             */
            configuration.mongodb = {
                host: '127.0.0.1',
                database: {
                    name: 'jamprototype'
                }
            };
            
            /**
             * redis
             */
            configuration.redis = {
                host: '127.0.0.1',
                port: 6379,
                auth: '000000000000000000000000000000000000000000000000000',
                databases: {
                    session: 1
                }
            };
            
            /**
             * application
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
                clientId: '000000000000',
                clientSecret: '0000000000000000000000000000',
                apiHost: 'api.jamendo.com',
                apiVersionPath: '/v3.0',
                apiPort: 443,
                grantType: 'authorization_code',
                redirectUri: 'http://127.0.0.1:35000/jamendo_oauth_redirect',
                resources: {
                    grant: '/oauth/grant'
                }
            };

            break;

    }

    return configuration;

};

exports.get = getConfiguration;