import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// types for DB spec
export interface ProjectTable {
  id: Generated<number>;
  projectCode: string;
}

export type Project = Selectable<ProjectTable>;
export type NewProject = Insertable<ProjectTable>;
export type ProjectUpdate = Updateable<ProjectTable>;
