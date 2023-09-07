import { db } from '../_lib/db/database';

export const getAllProjectsQry = async () => {
  const dbDocs = await db.selectFrom('project').selectAll().execute();
  return dbDocs;
};

// export const addNewProjectQry = async () => {};
