const Joi = require('joi');

const StatusTypes = ['draft', 'published', 'unpublished', 'archived'];
const FieldTypes = [
  'text',
  'textarea',
  'number',
  'email',
  'date',
  'time',
  'checkbox',
  'radio',
  'select',
  'file',
  'url',
  'range',
];

// create form
const createForm_validationSchema = Joi.object({
  created_by: Joi.string().hex().length(24).required(),
  title: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  status: Joi.string()
    .valid(...StatusTypes)
    .required(),
  slug: Joi.string().trim().required(),
  pages: Joi.array().items(pageSchema).optional(),
});

// create page
const createPage_validationSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  order: Joi.number().required(),
  sections: Joi.array().items(createSection_validationSchema).default([]),
});

// create section
const createSection_validationSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  order: Joi.number().required(),
  fields: Joi.array().items(fieldValidationSchema).default([]),
});

// create field
const createField_validationSchema = Joi.object({
  type: Joi.string()
    .valid(...FieldTypes)
    .required(),
  label: Joi.string().trim().required(),
  order: Joi.number().required(),
  is_required: Joi.boolean().optional(),
});

module.exports = {
  createForm_validationSchema,
  createPage_validationSchema,
  createSection_validationSchema,
  createField_validationSchema,
};
