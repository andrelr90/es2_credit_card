import { Knex } from 'knex';
import { CreditCardDAO } from '../../src/credit_cards/credit_card.dao';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(CreditCardDAO.getTableName(), (table) => {
        table.increments('id').unsigned().primary();
        table.string('code').notNullable();
        table.decimal('current_balance').notNullable();
        table.date('best_by').notNullable();
        table.string('purpose').notNullable;
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(CreditCardDAO.getTableName());
}
