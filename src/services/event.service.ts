import EventModel from "@models/event.model";
import AppDataSource from "@data-source";

import HttpError from "@common/http-error";

const eventRepository = AppDataSource.getRepository(EventModel);

export default class EventService {
  /**
   * Finds all events
   * @returns {Promise<EventModel[]>} An array of all events
   */
  public async getEvents(): Promise<EventModel[]> {
    // Get all events
    const events = await eventRepository.find();

    return events;
  }

  /**
   * Find the event with the provided id
   * @param id {number} - Id of the event to find
   * @returns {Promise<EventModel | null>} The event with the provided id
   */
  public async getEventById(id: number): Promise<EventModel | null> {
    // Get event by specific id
    const event = await eventRepository.findOneBy({ id });

    if (!event) throw new HttpError(
      'BAD REQUEST',
      400,
      `Event with id ${id} not found`,
    );

    return event;
  }

  /**
   * Creates a new event with given properties
   * @param title {string} - Event title
   * @param description {string} - Event description
   * @param eventDateTime {Date} - Event date time
   * @returns {Promise<EventModel | null>} Created event
   */
  public async createEvent(title: string, description: string, eventDateTime: Date): Promise<EventModel> {
    // Validates all required properties exist
    if (!title || !description || !eventDateTime) throw new HttpError(
      'REQUIRED FIELDS MISSING',
      400,
      `Title: ${title}, Description: ${description}, Event Date Time: ${eventDateTime}}`,
    );

    // Create new event
    const createdEvent = await eventRepository.save({
      title,
      description,
      eventDateTime,
    });

    return createdEvent;
  }

  /**
   * Creates a new event with given properties
   * @param id {number} - Id of the event to update
   * @param propertiesToUpdate {object} - Properties to update
   * @param [propertiesToUpdate.title] {string} - Event title
   * @param [propertiesToUpdate.description] {string} - Event description
   * @param [propertiesToUpdate.eventDateTime] {Date} - Event date time
   * @returns {Promise<void>}
   */
  public async updateEvent(
    id: number,
    { title, description, eventDateTime } : { title?: string, description?: string, eventDateTime?: Date }
  ): Promise<void> {
    // Update event by specific id
    const event = await eventRepository.findOneBy({ id });

    if (!event) throw new HttpError(
      'BAD REQUEST',
      400,
      `Event with id ${id} not found`,
    );

    await eventRepository.update(id, {
      title,
      description,
      eventDateTime,
    });
  }
}