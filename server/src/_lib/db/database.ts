import { Database } from './db-types';
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

const dialect = new SqliteDialect({
  database: new SQLite('db.sqlite'),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.

export const db = new Kysely<Database>({
  dialect,
});
/* Importing the db instance from different files will not create new instances
 of the Database class in Kysely. 
 The db instance will be shared across all the files that import it.
 Subsequent imports of the db object in other files will reference the same instance.
*/
