import { Knex } from 'knex';

export async function createTestDatabase(db: Knex) {
    await db.migrate.latest();
    await db.seed.run();
}
