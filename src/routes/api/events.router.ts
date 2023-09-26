import { Router } from "express";

const router: Router = Router();

import EventController from "@controllers/event.controller";
import ValidatorMiddleware from "@middleware/validator.middleware";
import {createValidator, updateValidator} from "@middleware/validators/events.middleware";

const eventController = new EventController();

/* Event routers: /api/events */

/* GET events */
router.get('/', eventController.getEvents);

/* GET event by id */
router.get('/:id', eventController.getEventById);

/* POST event */
router.post('/', createValidator, ValidatorMiddleware.validate, eventController.createEvent);

/* PUT event by id */
router.put('/:id', updateValidator, ValidatorMiddleware.validate, eventController.updateEvent);

export default router;