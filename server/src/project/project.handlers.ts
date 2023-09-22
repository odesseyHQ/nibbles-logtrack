import { NextFunction, Request, Response } from 'express';
import {
  createProjectService,
  editProjectService,
  getAllProjectsQry,
} from './project.queries';
import { ResponseCode } from '../_lib/error-handler/http-error-codes';

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

export const createProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  try {
    const response = await createProjectService(body);

    if (response?.message === 'success') {
      res.status(ResponseCode.SUCCESS).send(response?.results);
    } else {
      res.status(ResponseCode.BAD_REQUEST).send(response);
    }
  } catch (err) {
    next(err);
  }
};

export const editProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const id = req.params.projectId;
  try {
    const response = await editProjectService({ id, body });
    if (response?.message === 'success') {
      res.status(ResponseCode.SUCCESS).send(response?.results);
    } else {
      res.status(ResponseCode.BAD_REQUEST).send(response);
    }
  } catch (err) {
    next(err);
  }
};

// Currently there is no plan to delete a projects, If required uncomment these....
// export const deleteProjects = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const id = req.query.id;

//   try {
//     const response = await deleteProjectService(id);
//     if (response?.message === 'success') {
//       res.status(ResponseCode.SUCCESS).send('Successfully removed the data');
//     } else {
//       res.status(ResponseCode.BAD_REQUEST).send(response);
//     }
//   } catch (err) {
//     next(err);
//   }
// };
