import app from '../../../src/index';

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import EventService from '../../../src/services/event.service';
import Event from '../../../src/models/event.model';

chai.use(chaiHttp);
const expect = chai.expect;

const agent = chai.request.agent(app);

const sandbox = sinon.createSandbox();

const event = new Event(
  'Test Event',
  'Test Event Description',
  new Date(),
  'Test Event Location',
);

// Define test cases and their parameters
const testCases = [
  {
    name: 'GET /api/events response structure should be correct',
    path: '/api/events',
    method: 'get',
    expectedStatus: 200,
    expectedDataType: 'array',
  },
  {
    name: 'GET /api/events/:id response structure should be correct',
    path: '/api/events/1',
    method: 'get',
    expectedStatus: 200,
    expectedDataType: 'object',
  },
  {
    name: 'POST /api/events response structure should be correct',
    path: '/api/events',
    method: 'post',
    body: event,
    expectedStatus: 200,
    expectedDataType: 'object',
  },
  {
    name: 'PUT /api/events response structure should be correct',
    path: '/api/events/1',
    method: 'put',
    body: { title: 'Updated Test Event'},
    expectedStatus: 200,
    expectedDataType: null,
  }
]

describe('Events API', () => {
  before(() => {
    // Stub service methods to avoid hitting the database
    sandbox.stub(EventService.prototype, 'getEvents').resolves([event]);
    sandbox.stub(EventService.prototype, 'getEventById').resolves(event);
    sandbox.stub(EventService.prototype, 'createEvent').resolves(event);
    sandbox.stub(EventService.prototype, 'updateEvent').resolves();
  });

  after(() => sandbox.restore());

  /* Helper function to call the API */
  const call = async (method: string, path: string, body: any) => {
    switch (method) {
      case 'get':
        return await agent.get(path);
      case 'post':
        return await agent.post(path).send(body);
      case 'put':
        return await agent.put(path).send(body);
      default:
        throw new Error('Invalid method');
    }
  };

  // Run all test cases
  testCases.forEach(testCase => {
    it(testCase.name, async () => {
      // Sends request to the API
      const res = await call(testCase.method, testCase.path, testCase.body);

      // Make sure all data were retrieved and in correct format
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('success');
      expect(res.body.success).to.be.true;

      // Update does not expect any data back, therefore we skip the rest of the checks
      if (testCase.expectedDataType) {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an(testCase.expectedDataType);
      }
    });
  });
});
