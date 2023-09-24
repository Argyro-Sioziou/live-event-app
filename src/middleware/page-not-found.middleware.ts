import { NextFunction, Request, Response } from 'express'

import HttpError from '@common/http-error';


export default (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(
    'Page not found',
    404,
    'The requested page could not be found',
  );

  return res.status(404).json({ success: false, error });
}