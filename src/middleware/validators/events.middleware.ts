import {check} from 'express-validator';

export const createValidator = [
  check('title').exists().withMessage('Title is required').escape().trim().notEmpty().withMessage('Title cannot be empty'),
  check('description').exists().withMessage('Description is required').escape().trim().notEmpty().withMessage('Description cannot be empty'),
  check('eventDateTime').exists().withMessage('Event Date Time is required').isISO8601().toDate()
  .withMessage("Event Date Time must be a valid date time"),
];

export const updateValidator = [
  check('title').optional().escape().trim().notEmpty().withMessage('Title cannot be empty'),
  check('description').optional().escape().trim().notEmpty().withMessage('Description cannot be empty'),
  check('eventDateTime').optional().isISO8601().toDate().withMessage("Event Date Time must be a valid date time"),
];