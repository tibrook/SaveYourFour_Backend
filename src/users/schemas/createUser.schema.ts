import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});