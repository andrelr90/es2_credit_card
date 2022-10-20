import { Knex } from 'knex';
import { UserDAO } from '../../src/users/user.dao';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(UserDAO.getTableName(), (table) => {
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('role').unsigned().notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(UserDAO.getTableName());
}
