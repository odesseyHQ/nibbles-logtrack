import { SelectQueryBuilder } from 'kysely';
import { db, dbQryGenLogger } from '../_lib/db/database';
import { Database, IDbFilterPrams } from '../_lib/db/db-types';
import { paginatedQueryBuilder } from '../_lib/db/pagination-fns';
import { z } from 'zod';

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
    { projectId: number; projectCode: string }
  > = db.selectFrom('project').selectAll();

  const paginatedQuery = paginatedQueryBuilder({
    dbQuery: initialQry,
    filterReqData: filter,
    sortReqData: sort,
    allowedFilters: ['projectId', 'projectCode'],
    limit,
    offset,
  });

  const dbDocs = await paginatedQuery.$call(dbQryGenLogger).execute();
  return { data: dbDocs };
};

const projectSchema = z.object({
  projectCode: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .refine((value) => value !== '', {
      message: 'Project code is required',
    }),
  // Add more properties and validation rules as needed
});

export const createProjectService = async (projectData: any) => {
  let message = '';
  try {
    projectSchema.parse(projectData);

    const existingProject = await db
      .selectFrom('project')
      .select(['projectCode'])
      .where('projectCode', '=', projectData.projectCode.replace(/\s+/g, ''))
      .executeTakeFirst();

    if (!existingProject) {
      const results = await db
        .insertInto('project')
        .values(projectData)
        .returningAll()
        .executeTakeFirstOrThrow();
      message = 'success';
      return { message, results };
    } else {
      message = 'Data already exists';
      return { message };
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

export const editProjectService = async (projectData: any) => {
  let message = '';
  try {
    const existingProject = await db
      .selectFrom('project')
      .select(['projectCode'])
      .where('projectCode', '=', projectData.projectCode)
      .executeTakeFirst();

    if (!existingProject) {
      const results = await db
        .updateTable('project')
        .set(projectData.body)
        .where('projectId', '=', projectData.id)
        .returningAll()
        .executeTakeFirst();
      message = 'success';
      return { message, results };
    } else {
      message = 'Data already exists';
      return { message };
    }
  } catch (error) {
    console.error('Error editing data:', error);
  }
};

// Currently there is no plan to delete a projects, If required uncomment these....
// export const deleteProjectService = async (projectData: any) => {
//   let message = '';
//   try {
//     const results = await db
//       .deleteFrom('project')
//       .where('project.id', '=', projectData)
//       .executeTakeFirst();
//     message = 'success';
//     console.log(results);

//     return { message };
//   } catch (error) {
//     console.error('Error deleting data:', error);
//   }
// };
