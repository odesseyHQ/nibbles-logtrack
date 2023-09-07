import { Request, Response } from 'express';
import { getAllProjectsQry } from './project.queries';

export const listProjects = async (req: Request, res: Response) => {
  const result = await getAllProjectsQry();
  res.send(result);
};
