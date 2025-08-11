const Joi = require('joi');

const createUser_validationSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(new RegExp('(?=.*[a-z])'))
    .pattern(new RegExp('(?=.*[A-Z])'))
    .pattern(new RegExp('(?=.*\\d)'))
    .pattern(new RegExp('^[^\\s]+$'))
    .messages({
      'string.min': 'Password should have at least 8 characters',
      'string.max': 'Password should have at most 30 characters',
      'string.pattern.base': 'Password must contain uppercase, lowercase, and a number with no spaces',
      'any.required': 'Password is required',
    }),
  email: Joi.string().trim().lowercase().email().required(),
});

module.exports = { createUser_validationSchema };
