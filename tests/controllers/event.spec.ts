import chai from 'chai';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';

import EventService from '../../src/services/event.service';
import EventController from '../../src/controllers/event.controller';
import Event from '../../src/models/event.model';
import { NextFunction } from 'express';

const expect = chai.expect;

const event = new Event(
  'Test Event',
  'Test Event Description',
  new Date(),
  'Test Event Location',
);

/* Event Controller Tests */
describe('Events Controller', () => {
  const sandbox = sinon.createSandbox();
  const eventController = new EventController();
  let request: httpMocks.MockRequest<any>;
  let response: httpMocks.MockResponse<any>;
  const nextFunction = () => {};

  afterEach(() => sandbox.restore());

  describe('getEvents', () => {
    // Reset request and response objects before each test
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/events',
      });

      response = httpMocks.createResponse();
    })

    it('getEvents, successful request, should respond to request with correct format', async () => {
      // Stub get events method
      const getEventsStub = sandbox.stub(EventService.prototype, 'getEvents').resolves([event]);
  
      await eventController.getEvents(request, response, {} as NextFunction);
      
      // Make sure response was sent with correct status code
      expect(response.statusCode).to.equal(200);
  
      // Extract data from request
      const responseData = response._getJSONData();
  
      // Make sure data were returned in correct format
      expect(responseData).to.be.an('object');
      expect(responseData).to.have.property('success');
      expect(responseData.success).to.be.true;
      expect(responseData).to.have.property('data');
      expect(responseData.data).to.be.an('array');
    });

    it('getEvents, failed request, should call next', async () => {
      // Stub get events method
      const getEventsStub = sandbox.stub(EventService.prototype, 'getEvents').throws();

      // Spy on next
      const nextFunctionSpy = sandbox.spy(nextFunction);
  
      await eventController.getEvents(request, response, nextFunctionSpy as NextFunction);
      
      // Make sure next was invoked after error was thrown
      expect(nextFunctionSpy.calledOnce).to.equal(true);
    });
  });

  describe('getEventById', () => {
    // Reset request and response objects before each test
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/events/1',
        params: {
          id: 1
        }
      });

      response = httpMocks.createResponse();
    })

    it('getEventById, successful request, should respond to request with correct format', async () => {
      // Stub get events method
      const getEventByIdStub = sandbox.stub(EventService.prototype, 'getEventById').resolves(event);
  
      await eventController.getEventById(request, response, {} as NextFunction);
      
      // Make sure response was sent with correct status code
      expect(response.statusCode).to.equal(200);
  
      // Extract data from request
      const responseData = response._getJSONData();
  
      // Make sure data were returned in correct format
      expect(responseData).to.be.an('object');
      expect(responseData).to.have.property('success');
      expect(responseData.success).to.be.true;
      expect(responseData).to.have.property('data');
      expect(responseData.data).to.be.an('object');
    });

    it('getEventById, failed request, should call next', async () => {
      // Stub get events method
      const getEventByIdStub = sandbox.stub(EventService.prototype, 'getEventById').throws();

      // Spy on next
      const nextFunctionSpy = sandbox.spy(nextFunction);
  
      await eventController.getEventById(request, response, nextFunctionSpy as NextFunction);
      
      // Make sure next was invoked after error was thrown
      expect(nextFunctionSpy.calledOnce).to.equal(true);
    });
  });

  describe('createEvent', () => {
    // Reset request and response objects before each test
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/events/',
      });

      response = httpMocks.createResponse();
    })

    it('createEvent, successful request, should respond to request with correct format', async () => {
      // Stub get events method
      const createEventStub = sandbox.stub(EventService.prototype, 'createEvent').resolves(event);
  
      await eventController.createEvent(request, response, {} as NextFunction);
      
      // Make sure response was sent with correct status code
      expect(response.statusCode).to.equal(200);
  
      // Extract data from request
      const responseData = response._getJSONData();
  
      // Make sure data were returned in correct format
      expect(responseData).to.be.an('object');
      expect(responseData).to.have.property('success');
      expect(responseData.success).to.be.true;
      expect(responseData).to.have.property('data');
      expect(responseData.data).to.be.an('object');
    });

    it('createEvent, failed request, should call next', async () => {
      // Stub get events method
      const createEventStub = sandbox.stub(EventService.prototype, 'createEvent').throws();

      // Spy on next
      const nextFunctionSpy = sandbox.spy(nextFunction);
  
      await eventController.createEvent(request, response, nextFunctionSpy as NextFunction);
      
      // Make sure next was invoked after error was thrown
      expect(nextFunctionSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateEvent', () => {
    // Reset request and response objects before each test
    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/api/events/1',
        params: {
          id: 1
        }
      });

      response = httpMocks.createResponse();
    })

    it('updateEvent, successful request, should respond to request with correct format', async () => {
      // Stub get events method
      const updateEventStub = sandbox.stub(EventService.prototype, 'updateEvent').resolves();
  
      await eventController.updateEvent(request, response, {} as NextFunction);
      
      // Make sure response was sent with correct status code
      expect(response.statusCode).to.equal(200);
  
      // Extract data from request
      const responseData = response._getJSONData();
  
      // Make sure data were returned in correct format
      expect(responseData).to.be.an('object');
      expect(responseData).to.have.property('success');
      expect(responseData.success).to.be.true;
    });

    it('updateEvent, failed request, should call next', async () => {
      // Stub get events method
      const updateEventStub = sandbox.stub(EventService.prototype, 'updateEvent').throws();

      // Spy on next
      const nextFunctionSpy = sandbox.spy(nextFunction);
  
      await eventController.updateEvent(request, response, nextFunctionSpy as NextFunction);
      
      // Make sure next was invoked after error was thrown
      expect(nextFunctionSpy.calledOnce).to.equal(true);
    });
  });
});
