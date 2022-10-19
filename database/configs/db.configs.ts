import type { Knex } from 'knex';
import path from 'path';

type POSSIBLE_ENVIRONMENTS = 'test' | 'development' | 'staging' | 'production';
type ENVIRONMENTS_DB_CONFIG = { [key in POSSIBLE_ENVIRONMENTS]: Knex.Config };

export const dbConfig: ENVIRONMENTS_DB_CONFIG = {
    test: {},
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve('../dev.sqlite'),
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
