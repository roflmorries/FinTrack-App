import Joi from "joi";

export const goalSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().max(50).required(),
  amount: Joi.number().positive().required(),
  deadline: Joi.string().isoDate().required(),
});

export const goalUpdateSchema = Joi.object({
  name: Joi.string().max(50),
  amount: Joi.number().positive(),
  deadline: Joi.string().isoDate(),
}).min(1);