import { Request, Response, NextFunction} from 'express';

// Services
import EventService from '@services/event.service';

const eventService = new EventService();

export default class EventController {
  /**
   * Handles an incoming request to get all events
   * @param req {Request} - Request object
   * @param res {Response} - Response object
   * @param next {NextFunction} - Next function
   */
  public async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      // Finds all events
      const events = await eventService.getEvents();
    
      res.status(200).json({ data: events, success: true })
    } catch (error) {
      // Continue to error middleware
      next(error);
    }
  };

  /**
   * Handles an incoming request to get an event with the provided id
   * @param req {Request} - Request object
   * @param res {Response} - Response object
   * @param next {NextFunction} - Next function
   */
  public async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      // Finds event by id passed in request params
      const event = await eventService.getEventById(parseInt(req.params.id));
    
      res.status(200).json({ data: event, success: true })
    } catch (error) {
      // Continue to error middleware
      next(error);
    }
  };
  
  /**
   * Handles an incoming request to create a new event
   * @param req {Request} - Request object
   * @param res {Response} - Response object
   * @param next {NextFunction} - Next function
   */
  public async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      // Reads event properties from request body
      const { title, description, eventDateTime } = req.body as any;

      const event = await eventService.createEvent(title, description, eventDateTime);
    
      res.status(200).json({ data: event, success: true })
    } catch (error) {
      // Continue to error middleware
      next(error);
    }
  };

  /**
   * Handles an incoming request to update some properties of an existing event
   * @param req {Request} - Request object
   * @param res {Response} - Response object
   * @param next {NextFunction} - Next function
   */
  public async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      // Gets event id from request params
      const eventId = parseInt(req.params.id);

      // Gets properties to be updated from request body
      const propertiesToUpdate = req.body as any;
  
      const event = await eventService.updateEvent(eventId, propertiesToUpdate);
    
      res.status(200).json({ data: event, success: true })
    } catch (error) {
      // Continue to error middleware
      next(error);
    }
  };
}
