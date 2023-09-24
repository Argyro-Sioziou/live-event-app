import { Router } from "express";

const router: Router = Router();

import EventController from "@controllers/event";

const eventController = new EventController();

/* Event routers: /api/events */

/* GET events */
router.get('/', eventController.getEvents);

/* GET event by id */
router.get('/:id', eventController.getEventById);

/* POST event */
router.post('/', eventController.createEvent);

/* PUT event by id */
router.put('/:id', eventController.updateEvent);

export default router;