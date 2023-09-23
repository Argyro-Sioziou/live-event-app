import { Request, Response, NextFunction} from 'express';

// Common
import HttpError from '@common/http-error';

// Services
import EventService from '@services/event';

const eventService = new EventService();

const EventController = {
  getEvents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await eventService.getEvents();
    
      res.status(200).json({ events })
    } catch (error) {
      next(error);
    }
  },

  getEventById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await eventService.getEventById(parseInt(req.params.id));
    
      res.status(200).json({ event })
    } catch (error) {
      next(error);
    }
  },
  
  createEvent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, eventDateTime } = req.body as any;
    
      if (!title || !description || !eventDateTime) throw new HttpError(
        'REQUIRED FIELDS MISSING',
        400,
        `Title: ${title}, Description: ${description}, Event Date Time: ${eventDateTime}}`,
      );
    
      const event = await eventService.createEvent(title, description, eventDateTime);
    
      res.status(200).json({ event })
    } catch (error) {
      next(error);
    }
  },

  updateEvent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId = parseInt(req.params.id);
      const propertiesToUpdate = req.body as any;
  
      const event = await eventService.updateEvent(eventId, propertiesToUpdate);
    
      res.status(200).json({ event })
    } catch (error) {
      next(error);
    }
  },
}

export default EventController;
