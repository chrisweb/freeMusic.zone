'use strict';

module.exports.version = '0.0.1';

module.exports.get = function getConfiguration(environment) {

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
                consumer_key:         '4r6g4ger46g4rg4r', // consumer_key
                consumer_secret:      '4gr6g4er4re64r6r4e6grre644gr64r64gr64r', // consumer_secret
                access_token_key:     'xbc44b6x46xb-gre44r64r64gre646r4re6464r', // access_token
                access_token_secret:  '4e8r4zr6rez46rze4rz644zr6r4z6r4z4zr' // access_token_secret
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
                    name: 'playlist_guru'
                }
            };
            
            /**
             * redis
             */
            configuration.redis = {
                host: '127.0.0.1',
                port: 6379,
                auth: 'h4b4dt4rt4bt64bt46b6r4b64bt64bt6b4rt64b64',
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
                clientId: 'egr5gre+5g6r5',
                clientSecret: 'bfd95bf5bf59bfd5bfd95bfd5f5bf5bfd65bf6',
                apiHost: 'api.jamendo.com',
                apiVersionPath: '/v3.0',
                apiPort: 443,
                scope: 'music',
                grantType: 'authorization_code',
                redirectUri: 'http://127.0.0.1:35000/oauth/redirect',
                resources: {
                    grant: '/oauth/grant',
                    authorize: '/oauth/authorize'
                }
            };

            break;

    }

    return configuration;

};