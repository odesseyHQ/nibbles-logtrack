import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// Types for DB spec
export interface LogTable {
  logId: Generated<number>;
  logText: string;
  logType: string;
  status?: string;
  projectId: string;
  meta?: string;
  created_at: Generated<string>;
}

export type Log = Selectable<LogTable>;
export type NewLog = Insertable<LogTable>;
export type LogUpdate = Updateable<LogTable>;

export interface CreateLogData {
  logText: string;
  logType: string;
  status?: string;
  project: { projectId: string };
  meta?: string;
}
