'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
                headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers' 
                exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
                additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
                maxAge: 60,
                credentials: true // boolean - 'Access-Control-Allow-Credentials'
            }
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {}
            },
            {
                plugin: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'sqlite3',
                            useNullAsDefault: true,     // Suggested for sqlite3
                            connection: {
                                filename: '../messageKeys.txt'
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            },
            {
                plugin: './plugins/swagger'
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            }
        ]
    }
});
