import { Application } from "express";
import cors from "cors";
import bodyParser from 'body-parser'

import routes from '@routes/index.router';
import httpError from '@middleware/httpError.middleware';

export default (app: Application) => {
  app.use(cors());
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
  app.use('/', routes);
  app.use(httpError);
};