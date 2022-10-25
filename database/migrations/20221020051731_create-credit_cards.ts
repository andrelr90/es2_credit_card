import { Knex } from 'knex';
import { CREDIT_CARDS_TABLE_NAME } from '../consts/tables.consts';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(CREDIT_CARDS_TABLE_NAME, (table) => {
        table.increments('id').unsigned().primary();
        table.string('code').notNullable();
        table.decimal('current_balance').notNullable();
        table.date('best_by').notNullable();
        table.string('purpose').notNullable;
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(CREDIT_CARDS_TABLE_NAME);
}
