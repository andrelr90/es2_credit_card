import { Knex } from 'knex';
import { CreditCardUseDAO } from '../../src/credit_cards_use/credit_card_use.dao';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(CreditCardUseDAO.getTableName(), (table) => {
        table.increments('id').unsigned().primary();
        table.integer('card_id').unsigned().references('id').inTable('credit_cards').notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        table.decimal('value').notNullable();
        table.string('description').notNullable;
        table.string('authorization_code').notNullable;
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(CreditCardUseDAO.getTableName());
}
