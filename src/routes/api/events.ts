import { Router } from "express";

const router: Router = Router();

import EventController from "@controllers/event";

router.get('/', EventController.getEvents);

router.get('/:id', EventController.getEventById);

router.post('/', EventController.createEvent);

router.put('/:id', EventController.updateEvent);

export default router;