import express, { Application } from 'express';

import AppDataSource from "@data-source";
import middleware from '@middleware/index.middleware';

const app: Application = express();

middleware(app);
app.listen(8000);
console.log('Server is running on port 8000');

// See if running tests flag was passed
const flags = process.argv;
const runningTests = Array.isArray(flags) && flags.includes('--runningtests');

if (!runningTests) AppDataSource.initialize();

export default app;