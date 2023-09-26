import express, { Application } from 'express';

import AppDataSource from "@data-source";
import middleware from '@middleware/index.middleware';

export function createApp(): Application {
  const app: Application = express();
  
  middleware(app);
  console.log('Server is running on port 8000');
  
  // See if running tests flag was passed
  const flags = process.argv;
  const runningTests = Array.isArray(flags) && flags.includes('--runningtests');
  
  if (!runningTests) {
    AppDataSource.initialize();
    app.listen(8000);
  }

  return app;
};