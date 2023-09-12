import { NextFunction, Request, Response } from 'express';
import { getAllProjectsQry } from './project.queries';

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
