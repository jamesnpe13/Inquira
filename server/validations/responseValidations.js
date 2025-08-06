const Joi = require('joi');

// response
const createResponse_validationSchema = Joi.object({
  form_id: Joi.string().hex().length(24).required(), // ObjectId validation
  submitted_at: Joi.date().optional(),
  field_responses: Joi.array()
    .items(createFieldResponse_validationSchema)
    .default([]),
});

const createFieldResponse_validationSchema = Joi.object({
  page: Joi.string().required(),
  section: Joi.string().required(),
  order: Joi.number().required(),
  value: Joi.any(), // Accepts any data type (number, string, object, etc.)
});

module.exports = {
  createResponse_validationSchema,
  createFieldResponse_validationSchema,
};
