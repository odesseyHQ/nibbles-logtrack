import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

// Types for DB spec
export interface LogTable {
  id: Generated<number>;
  projectCode: string;
  logText: string;
  logType: string;
  meta: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Log = Selectable<LogTable>;
export type NewLog = Insertable<LogTable>;
export type LogUpdate = Updateable<LogTable>;
