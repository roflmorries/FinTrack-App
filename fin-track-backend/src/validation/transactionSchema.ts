import Joi from 'joi';

export const transactionSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
  comment: Joi.string().max(200).allow('', null),
  goalId: Joi.string().optional().allow('', null),
});

export const transactionUpdateSchema = transactionSchema.fork(
  ['type', 'amount', 'category', 'date', 'comment', 'goalId'],
  (field) => field.optional()
);