import EventModel from "@models/event.model";
import AppDataSource from "@data-source";
import LocationModel from "@models/location.model";

const eventRepository = AppDataSource.getRepository(EventModel);
const locationRepository = AppDataSource.getRepository(LocationModel);

/* Creates dummy data for testing purposes */

// Dummy locations
const locations = [
  {
    name: 'Technopolis',
    country: 'Greece',
    city: 'Athens',
    address: 'Pireos 100',
    postalCode: '11854',
  }
];

// Dummy events
const events = [
  {
    title: 'Athens Tech Meetup',
    description: 'A meetup for all tech enthusiasts',
    eventDateTime: new Date('2020-04-02T18:00:00.000Z'),
    locationId: 1,
  },
];

AppDataSource.initialize().then(async () => {
  // Create locations before events to use the generated ids
  for (const location of locations) {
    await locationRepository.save(new LocationModel(location.name, location.country, location.city, location.address, location.postalCode));
  }

  for (const event of events) {
    await eventRepository.save(new EventModel(event.title, event.description, event.eventDateTime, event.locationId));
  }

  process.exit(0);
});