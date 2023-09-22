import { LogTable } from '../../log/logs.types';
import { ProjectTable } from '../../project/project.types';

export interface Database {
  logs: LogTable;
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
