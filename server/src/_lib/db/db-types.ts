import { ProjectTable } from '../../project/project.types';

export interface Database {
  project: ProjectTable;
}

export interface IDbFilterPrams {
  filter?: Record<string, any>;
  sort?: {
    sortKey: string;
    sortOrder: 'ASC' | 'DESC';
  };
  limit?: number;
  offset?: number;
}
