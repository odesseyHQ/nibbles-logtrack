import { Kysely, sql } from 'kysely';
import { Database } from './db-types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('project')
    .addColumn('projectId', 'integer', (col) => col.primaryKey())
    .addColumn('projectCode', 'text', (col) => col.notNull().unique())
    .addColumn('created_at', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
  await db.schema
    .createTable('logs')
    .addColumn('logId', 'integer', (col) => col.primaryKey())
    .addColumn('logText', 'text', (col) => col.notNull())
    .addColumn('logType', 'text', (col) => col.notNull())
    .addColumn('projectId', 'text', (col) => col.notNull())
    .addColumn('meta', 'text')
    .addColumn('status', 'text', (col) =>
      col.defaultTo('UN_RESOLVED').notNull(),
    )
    .addColumn('created_at', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('logs').execute();
  await db.schema.dropTable('project').execute();
}
