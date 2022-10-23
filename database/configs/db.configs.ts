import type { Knex } from 'knex';
import path from 'path';

type POSSIBLE_ENVIRONMENTS = 'test' | 'development' | 'staging' | 'production';
type ENVIRONMENTS_DB_CONFIG = { [key in POSSIBLE_ENVIRONMENTS]: Knex.Config };

const config: ENVIRONMENTS_DB_CONFIG = {
    test: {},
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, '../dev.sqlite3'),
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, '../migrations'),
        },
        seeds: {
            directory: path.join(__dirname, '../seeds'),
        },
    },
    staging: {},
    production: {},
};

export default config;
