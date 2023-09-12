import { SelectQueryBuilder } from 'kysely';
import { db, dbQryGenLogger } from '../_lib/db/database';
import { Database, IDbFilterPrams } from '../_lib/db/db-types';
import { paginatedQueryBuilder } from '../_lib/db/pagination-fns';

/*
To run this function alone in the terminal use the below code (make sure to install ts-node globally):
```bash
ts-node --transpile-only  --eval "require('./src/project/project.queries.ts').getAllProjectsQry({filter:{},sort:{},limit:5,offset:0})"
```
*/
export const getAllProjectsQry = async ({
  filter = {},
  sort = { sortKey: 'projectCode', sortOrder: 'ASC' },
  limit,
  offset,
}: IDbFilterPrams) => {
  const initialQry: SelectQueryBuilder<
    Database,
    'project',
    { id: number; projectCode: string }
  > = db.selectFrom('project').selectAll();

  const paginatedQuery = paginatedQueryBuilder({
    dbQuery: initialQry,
    filterReqData: filter,
    sortReqData: sort,
    allowedFilters: ['id', 'projectCode'],
    limit,
    offset,
  });

  const dbDocs = await paginatedQuery.$call(dbQryGenLogger).execute();
  return dbDocs;
};
