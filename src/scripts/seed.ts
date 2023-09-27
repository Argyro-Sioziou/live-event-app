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
  },
  {
    name: 'Thuishaven',
    country: 'Netherlands',
    city: 'Amsterdam',
    address: 'Contactweg 68',
    postalCode: '1014 BW',
  }
];

// Dummy events
const events = [
  {
    title: 'Ioulia Karapataki',
    description: 'Live Concert',
    eventDateTime: new Date('2023-09-06T21:00:00.000Z'),
    locationId: 1,
  },
  {
    title: 'Stan Christ / KØZLØV / CARAVEL / ALT8',
    description: 'Electronic Music',
    eventDateTime: new Date('2023-09-30T13:00:00.000Z'),
    locationId: 2,
  },
  {
    title: 'Athens Bar Show 2023',
    description: 'An annual educational expo for bartenders and bar professionals',
    eventDateTime: new Date('2023-11-08T13:00:00.000Z'),
    locationId: 1,
  },
];

AppDataSource.initialize().then(async () => {
  // Create locations before events to use the generated ids
  await Promise.all(locations.map(async (location) => locationRepository.save(new LocationModel(location.name, location.country, location.city, location.address, location.postalCode))));

  await Promise.all(events.map(async (event) => eventRepository.save(new EventModel(event.title, event.description, event.eventDateTime, event.locationId))));

  console.log('Dummy data created!');

  process.exit(0);
});