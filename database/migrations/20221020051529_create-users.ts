import { Knex } from 'knex';
import { USERS_TABLE_NAME } from '../consts/tables.consts';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(USERS_TABLE_NAME, (table) => {
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('role').unsigned().notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(USERS_TABLE_NAME);
}
