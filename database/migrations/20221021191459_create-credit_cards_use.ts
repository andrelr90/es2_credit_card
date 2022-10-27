import { Knex } from 'knex';
import { CREDIT_CARDS_USES_TABLE_NAME } from '../consts/tables.consts';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(CREDIT_CARDS_USES_TABLE_NAME, (table) => {
        table.increments('id').unsigned().primary();
        table.integer('credit_card_id').unsigned().references('id').inTable('credit_cards').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        table.decimal('value').notNullable();
        table.string('description').notNullable;
        table.string('authorization_code').notNullable;
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(CREDIT_CARDS_USES_TABLE_NAME);
}
