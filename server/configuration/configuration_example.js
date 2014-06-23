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
                port: 27017,
                user: 'sgdgds',
                password: '4gs65g64sd4',
                database: {
                    name: 'database_name'
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
                    default: 0,
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
                clientId: 'ew56wge5gwe',
                clientSecret: 'd4dh54h6r64d6f465hdf4hd4hf56fd',
                protocol: 'https',
                host: 'api.jamendo.com',
                version: 'v3.0',
                port: 443,
                scope: 'music',
                grantType: 'authorization_code',
                redirectUri: 'http://127.0.0.1:35000/oauth/redirect',
                resources: {
                    grant: '/oauth/grant',
                    authorize: '/oauth/authorize'
                }
            };
            
            configuration.aws = {
                'accessKeyId': 'FJFJFJFJFJKF',
                'secretAccessKey': 'UIEGFIUGFEIUGFEIUGFEIUGFEIU',
                'region': 'us-west-1'
            };

            break;

    }

    return configuration;

};