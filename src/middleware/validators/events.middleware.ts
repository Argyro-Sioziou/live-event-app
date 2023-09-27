import {check, param} from 'express-validator';

export const createValidator = [
  check('title').exists().withMessage('Title is required').escape().trim().notEmpty().withMessage('Title cannot be empty'),
  check('description').exists().withMessage('Description is required').escape().trim().notEmpty().withMessage('Description cannot be empty'),
  check('eventDateTime').exists().withMessage('Event Date Time is required').isISO8601().toDate()
  .withMessage("Event Date Time must be a valid date time"),
  check('locationId').exists().withMessage('Location is required').isInt().withMessage('Location Id must be an integer'),
];

export const updateValidator = [
  param('id').isInt().withMessage('Id must be an integer'),
  check('title').optional().escape().trim().notEmpty().withMessage('Title cannot be empty'),
  check('description').optional().escape().trim().notEmpty().withMessage('Description cannot be empty'),
  check('eventDateTime').optional().isISO8601().toDate().withMessage("Event Date Time must be a valid date time"),
  check('locationId').optional().isInt().withMessage('Location Id must be an integer'),
];