import { Kysely, sql } from 'kysely';
import { Database } from './db-types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('project')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('projectCode', 'text', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('project').execute();
}
