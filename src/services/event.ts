import EventModel from "@models/event";
import AppDataSource from "@data-source";

import HttpError from "@common/http-error";

const eventRepository = AppDataSource.getRepository(EventModel);

export default class EventService {
  public async getEvents(): Promise<EventModel[]> {
    // Get all events
    const events = await eventRepository.find();

    return events;
  }

  public async getEventById(id: number): Promise<EventModel | null> {
    // Get event by specific id
    const event = await eventRepository.findOneBy({ id });

    if (!event) throw new HttpError(
      'NOT FOUND',
      404,
      `Event with id ${id} not found`,
    );

    return event;
  }

  public async createEvent(title: string, description: string, eventDateTime: Date): Promise<EventModel> {
    // Create new event
    const createdEvent = await eventRepository.save({
      title,
      description,
      eventDateTime,
    });

    return createdEvent;
  }

  public async updateEvent(id: number, propertiesToUpdate: any): Promise<void> {
    // Update event by specific id
    const event = await eventRepository.findOneBy({ id });

    if (!event) throw new HttpError(
      'NOT FOUND',
      404,
      `Event with id ${id} not found`,
    );

    await eventRepository.update(id, propertiesToUpdate);

    return;
  }
}