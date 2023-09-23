import { Router } from 'express';

const routes: Router = Router();

import events from '@routes/api/events';

routes.use('/api/events', events);

export default routes;