import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// types for DB spec
export interface ProjectTable {
  projectId: Generated<number>;
  projectCode: string;
  created_at: Generated<string>;
}

export type Project = Selectable<ProjectTable>;
export type NewProject = Insertable<ProjectTable>;
export type ProjectUpdate = Updateable<ProjectTable>;
