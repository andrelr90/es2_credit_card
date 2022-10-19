import { knex, Knex } from 'knex';

export const dbProvider = (dbConfig: Knex.Config): Knex => {
    return knex(dbConfig);
};
