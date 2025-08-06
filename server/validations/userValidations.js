const Joi = require('joi');

const createUser_validationSchema = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
});

module.exports = { createUser_validationSchema };
