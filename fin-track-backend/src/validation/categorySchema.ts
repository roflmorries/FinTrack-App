import Joi from "joi";

export const categorySchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().max(30).required(),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required(),
});

export const categoryUpdateSchema = Joi.object({
  name: Joi.string().max(30),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/),
}).min(1);