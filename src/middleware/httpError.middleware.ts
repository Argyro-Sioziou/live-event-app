import { Request, Response } from 'express'

import HttpError from '../common/http-error';

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
) => {
  const status = err.statusCode || err.status || 500

  res.status(status).send(err)
}

export default errorHandler;