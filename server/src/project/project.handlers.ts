import { NextFunction, Request, Response } from 'express';
import { getAllProjectsQry } from './project.queries';

/*
Example of req body:
{
  "filter": {
    "id":{"IN": [1,2]}
  },
  "sort": {
    "sortKey": "id",
    "sortOrder": "DESC"
  },
  "limit": 10,
  "offset": 1
}
*/
export const listProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { filter, sort, limit, offset } = req.body;
    const result = await getAllProjectsQry({ filter, sort, limit, offset });
    res.send(result);
  } catch (err) {
    next(err);
  }
};
