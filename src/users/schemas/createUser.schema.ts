import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
}); 