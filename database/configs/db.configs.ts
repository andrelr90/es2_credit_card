import type { Knex } from 'knex';
import path from 'path';

type POSSIBLE_ENVIRONMENTS = 'test' | 'development' | 'staging' | 'production';
type ENVIRONMENTS_DB_CONFIG = { [key in POSSIBLE_ENVIRONMENTS]: Knex.Config };

const config: ENVIRONMENTS_DB_CONFIG = {
    test: {},
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve('../dev.sqlite3'),
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.resolve('../migrations'),
        },
        seeds: {
            directory: path.resolve('../seeds'),
        },
    },
    staging: {},
    production: {},
};

export default config;
