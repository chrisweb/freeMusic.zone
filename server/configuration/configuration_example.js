exports.version = '0.0.1';

getConfiguration = function(environment) {

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
                consumer_key:         'hdf46hd4hdf64hfd46hfd', // consumer_key
                consumer_secret:      'hdfhfd654hfd5hfd645dhf4hdf65dhf65hfd65hdf65', // consumer_secret
                access_token_key:     '484864646-465hfd4hfd4hfd654hfd654hfd65hfd465hfdhfd6546hfd', // access_token
                access_token_secret:  '4hfd456hfd4hfd654hfd564hfd654hfd65hfd4' // access_token_secret
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
                auth: '4fa5s564afs654fsa654fsa65fas465fsa46f5sa465fsa465fsa4',
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
                clientId: '45gds546gds4',
                clientSecret: 'gds65g4ds54gds564gds65gds465gds',
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


