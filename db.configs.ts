import type { Knex } from 'knex';
import path from 'path';

type POSSIBLE_ENVIRONMENTS = 'test' | 'development' | 'staging' | 'production';
type ENVIRONMENTS_DB_CONFIG = { [key in POSSIBLE_ENVIRONMENTS]: Knex.Config };

const config: ENVIRONMENTS_DB_CONFIG = {
    test: {
        client: 'sqlite3',
        connection: ':memory:',
        useNullAsDefault: true,
        migrations: {
            directory: path.resolve('./database/migrations'),
        },
        seeds: {
            directory: path.resolve('./database/seeds'),
        },
    },
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve('./database/dev.sqlite3'),
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.resolve('./database/migrations'),
        },
        seeds: {
            directory: path.resolve('./database/seeds'),
        },
    },
    staging: {},
    production: {},
};

export default config;
