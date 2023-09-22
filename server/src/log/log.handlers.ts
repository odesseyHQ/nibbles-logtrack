import { NextFunction, Request, Response } from 'express';
import {
  createLogService,
  deleteLogService,
  detailLogService,
  getAllLogsQry,
  updateLogStatusService,
} from './log.queries';
import { ResponseCode } from '../_lib/error-handler/http-error-codes';

export const listLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { filter, sort, limit, offset } = req.body;
    const result: any = await getAllLogsQry({ filter, sort, limit, offset });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const createLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;

  try {
    const response = await createLogService(body);
    if (response?.message === 'success') {
      res.status(ResponseCode.SUCCESS).send(response?.response);
    } else if (response?.message === 'Not found') {
      res
        .status(ResponseCode.NOT_FOUND)
        .send({ error: 'Project code is not found' });
    } else {
      res.status(ResponseCode.BAD_REQUEST).send(response);
    }
  } catch (err) {
    next(err);
  }
};

export const detailLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;

  try {
    const response = await detailLogService(id);
    if (response?.message === 'success') {
      res.status(ResponseCode.SUCCESS).send(response.response);
    } else {
      res.status(ResponseCode.NOT_FOUND).send(response);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;

  try {
    const response = await deleteLogService(id);
    if (response?.message === 'success') {
      res
        .status(ResponseCode.SUCCESS)
        .send({ message: 'Successfully removed the data' });
    } else {
      res.status(ResponseCode.NOT_FOUND).send(response);
    }
  } catch (err) {
    next(err);
  }
};

export const updateLogStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const id = req.params.logId as string;

  try {
    const response = await updateLogStatusService({ id, body });
    if (response?.message === 'success') {
      res.status(ResponseCode.SUCCESS).send(response.response);
    } else {
      res.status(ResponseCode.NOT_FOUND).send(response);
    }
  } catch (err) {
    next(err);
  }
};
