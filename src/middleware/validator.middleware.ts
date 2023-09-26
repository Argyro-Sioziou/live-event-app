import { NextFunction, Request, Response } from 'express'

import { validationResult } from 'express-validator'

import HttpError from '@common/http-error';


function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next();

  const error = new HttpError(
    'Validation Error',
    422,
    'Body validation failed',
    errors.array().map(error => error.msg).join(', ')
  );

  return res.status(422).json({ success: false, error });
}

export default { validate };