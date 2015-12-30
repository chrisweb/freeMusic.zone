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
                consumer_key:         '4r6g_REPLACE-ME_rg4r', // consumer_key
                consumer_secret:      '4gr6_REPLACE-ME_4e6grre644gr64r64gr64r', // consumer_secret
                access_token_key:     'xbc4_REPLACE-ME_44r64r64gre646r4re6464r', // access_token
                access_token_secret:  '4e8r_REPLACE-ME_4rz644zr6r4z6r4z4zr' // access_token_secret
            };
            
            /**
             * server
             */
            configuration.server = {
                host: '127.0.0.1',
                protocol: 'http',
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
                password: '4gs_REPLACE-ME_sd4',
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
                auth: 'h4b4dt4rt4bt64b_REPLACE-ME_t6b4rt64b64',
                databases: {
                    default: 0,
                    session: 1,
                    socketio: 2
                }
            };
            
            /**
             * socket.io
             */
            configuration.socketio = {
                port: 35001
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
                clientSecret: 'd4dh54h6_REPLACE-ME_f4hd4hf56fd',
                protocol: 'https',
                host: 'api.jamendo.com',
                version: 'v3.0',
                port: 443,
                scope: 'music',
                grantType: {
                    authorization: 'authorization_code',
                    refresh: 'refresh_token'
                },
                redirectUri: '/oauth/redirect',
                resources: {
                    grant: '/oauth/grant',
                    authorize: '/oauth/authorize'
                }
            };
            
            configuration.aws = {
                'accessKeyId': 'FJF_REPLACE-ME_JKF',
                'secretAccessKey': 'UIEGF_REPLACE-ME_FEIUGFEIU',
                'region': 'us-west-1'
            };

            break;

    }

    return configuration;

};