import { SelectQueryBuilder } from 'kysely';
import { Database, IDbFilterPrams } from '../_lib/db/db-types';
import { paginatedQueryBuilder } from '../_lib/db/pagination-fns';
import { db, dbQryGenLogger } from '../_lib/db/database';
import { CreateLogData, LogUpdate } from './logs.types';
import { transformRequestToResponseData } from './log.transforms';

const validLogs = async (id: string) =>
  await db
    .selectFrom('logs')
    .select('logId')
    .where('logId', '=', parseInt(id))
    .executeTakeFirst();

export const getAllLogsQry = async ({
  filter = {},
  sort = { sortKey: 'logId', sortOrder: 'ASC' },
  limit,
  offset,
}: IDbFilterPrams) => {
  const initialQry: SelectQueryBuilder<
    Database,
    'logs',
    { logId: number; logType: string }
  > = db.selectFrom('logs').selectAll();

  const paginatedQuery = paginatedQueryBuilder({
    dbQuery: initialQry,
    filterReqData: filter,
    sortReqData: sort,
    allowedFilters: ['logId', 'logType'],
    limit,
    offset,
  });

  const dbDocs = await paginatedQuery.$call(dbQryGenLogger).execute();

  return { data: dbDocs };
};

export const createLogService = async (logData: CreateLogData) => {
  let message = '';

  const { project, ...modifiedObj } = logData;
  const { projectId } = project;
  const newObj = { ...modifiedObj, projectId };

  try {
    const validateProjectCode = await db
      .selectFrom('project')
      .select(['projectId', 'projectCode'])
      .where('projectId', '=', parseInt(logData.project.projectId))
      .executeTakeFirst();

    if (validateProjectCode) {
      const results = await db
        .insertInto('logs')
        .values(newObj)
        .returningAll()
        .executeTakeFirst();
      message = 'success';

      const response = transformRequestToResponseData({
        results,
        projectData: validateProjectCode,
      });
      return { message, response };
    } else {
      message = 'Not found';
      return { message };
    }
  } catch (error) {
    return { error };
  }
};

export const detailLogService = async (id: string) => {
  let projectData: { projectId: number; projectCode: string } | undefined = {
    projectId: 0,
    projectCode: '',
  };
  try {
    if (await validLogs(id)) {
      const results = await db
        .selectFrom('logs')
        .where('logId', '=', parseInt(id))
        .selectAll()
        .executeTakeFirst();

      projectData = await db
        .selectFrom('project')
        .where('projectId', '=', parseInt(results ? results.projectId : ''))
        .selectAll()
        .executeTakeFirst();

      const response = transformRequestToResponseData({ results, projectData });
      return { response, message: 'success' };
    } else {
      return { message: 'No Record found for this id' };
    }
  } catch (error) {
    console.error('Error getting details:', error);
  }
};

export const deleteLogService = async (id: string) => {
  try {
    if (await validLogs(id)) {
      await db
        .deleteFrom('logs')
        .where('logId', '=', parseInt(id))
        .executeTakeFirst();
      return { message: 'success' };
    } else {
      return { message: 'No Record found for this id' };
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export const updateLogStatusService = async (logData: {
  id: string;
  body: LogUpdate;
}) => {
  let projectData: { projectId: number; projectCode: string } | undefined = {
    projectId: 0,
    projectCode: '',
  };

  try {
    if (await validLogs(logData.id)) {
      const results = await db
        .updateTable('logs')
        .set(logData.body)
        .where('logId', '=', parseInt(logData.id))
        .returningAll()
        .executeTakeFirst();

      projectData = await db
        .selectFrom('project')
        .where('projectId', '=', parseInt(results ? results.projectId : ''))
        .selectAll()
        .executeTakeFirst();
      const response = transformRequestToResponseData({ results, projectData });
      return { response, message: 'success' };
    } else {
      return { message: 'No Record found for this id' };
    }
  } catch (error) {
    console.error('Error updating log status:', error);
  }
};
