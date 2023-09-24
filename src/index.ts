import express, { Application } from 'express';

import AppDataSource from "@data-source";
import middleware from '@middleware/index.middleware';

const app: Application = express();

AppDataSource.initialize()
    .then(() => {
        middleware(app);

        app.listen(8000);
        console.log('Server running on port 8000');
    })
    .catch((error) => console.log(error))