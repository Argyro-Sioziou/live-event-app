import { Request, Response } from 'express'

import HttpError from '@common/http-error';

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
) => {
  const status = err.statusCode || 500

  res.status(status).json({ success: false, err });
}

export default errorHandler;