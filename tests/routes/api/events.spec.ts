import { Request, Response, NextFunction} from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { validationResult } from 'express-validator'

import ValidatorMiddleware from '../../../src/middleware/validator.middleware';
import EventController from '../../../src/controllers/event.controller';

chai.use(chaiHttp);
const expect = chai.expect;

const event = { title: 'Test Event', description: 'Test Event Description', eventDateTime: new Date(), locationId: 1};

const invalidEvent = { title: '', description: '', eventDateTime: '', locationId: 'some text'};

describe('Events API', () => {
  const sandbox = sinon.createSandbox();
  const fakeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    next();
  };
  let agent: ChaiHttp.Agent;
  let getEventsStub: sinon.SinonStub;
  let getEventByIdStub: sinon.SinonStub;
  let createEventStub: sinon.SinonStub;
  let updateEventStub: sinon.SinonStub;
  let validatorSpy: sinon.SinonSpy;

  before(async () => {
    // Create middleware stubs before importing app, otherwise stubbing will not work
    getEventsStub = sandbox.stub(EventController.prototype, 'getEvents').callsFake(fakeMiddleware);
    getEventByIdStub = sandbox.stub(EventController.prototype, 'getEventById').callsFake(fakeMiddleware);
    createEventStub = sandbox.stub(EventController.prototype, 'createEvent').callsFake(fakeMiddleware);
    updateEventStub = sandbox.stub(EventController.prototype, 'updateEvent').callsFake(fakeMiddleware);
    validatorSpy = sandbox.spy(ValidatorMiddleware, 'validate');

    const app = (await import('../../../src/app')).createApp();

    agent = chai.request.agent(app);
  });

  afterEach(() => sandbox.resetHistory());

  after(() => sandbox.restore());

  it('GET /api/events, should call correct controller', async () => {
    await agent.get('/api/events');

    // Make sure controller method was called
    expect(getEventsStub.calledOnce).to.equal(true);
  });

  it('GET /api/events/:id, should call correct controller', async () => {
    await agent.get('/api/events/1');

    // Make sure controller method was called
    expect(getEventByIdStub.calledOnce).to.equal(true);
  });

  it('POST /api/events/, should call correct controller', async () => {
    await agent.post('/api/events/').send(event);

    // Validator middleware should have been called
    expect(validatorSpy.calledOnce).to.equal(true);

    // Make sure controller method was called
    expect(createEventStub.calledOnce).to.equal(true);
  });

  it('POST /api/events/, should throw validation errors', async () => {
    await agent.post('/api/events/').send(invalidEvent);

    // Validator middleware should have been called
    expect(validatorSpy.calledOnce).to.equal(true);

    const validationErrors = validationResult(validatorSpy.lastCall.args[0]).array();

    // Title, description,event date nad location id are invalid, therefore 4 errors should be returned
    expect(validationErrors.length).to.equal(4);
    expect(validationErrors[0].msg).to.equal('Title cannot be empty');
    expect(validationErrors[1].msg).to.equal('Description cannot be empty');
    expect(validationErrors[2].msg).to.equal('Event Date Time must be a valid date time');
    expect(validationErrors[3].msg).to.equal('Location Id must be an integer');

    // Validator should have thrown error and controller should not have been called
    expect(createEventStub.callCount).to.equal(0);
  });

  it('PUT /api/events/:id, should call correct controller', async () => {
    await agent.put('/api/events/1').send(event);

    // Validator middleware should have been called
    expect(validatorSpy.calledOnce).to.equal(true);

    // Make sure controller method was called
    expect(updateEventStub.calledOnce).to.equal(true);
  });

  it('PUT /api/events/:id, should throw validation errors', async () => {
    await agent.put('/api/events/1').send(invalidEvent);

    // Validator middleware should have been called
    expect(validatorSpy.calledOnce).to.equal(true);

    const validationErrors = validationResult(validatorSpy.lastCall.args[0]).array();

    // Title, description,event date nad location id are invalid, therefore 4 errors should be returned
    expect(validationErrors.length).to.equal(4);
    expect(validationErrors[0].msg).to.equal('Title cannot be empty');
    expect(validationErrors[1].msg).to.equal('Description cannot be empty');
    expect(validationErrors[2].msg).to.equal('Event Date Time must be a valid date time');
    expect(validationErrors[3].msg).to.equal('Location Id must be an integer');

    // Validator should have thrown error and controller should not have been called
    expect(updateEventStub.callCount).to.equal(0);
  });
});
