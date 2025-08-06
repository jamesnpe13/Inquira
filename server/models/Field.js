const mongoose = require('mongoose');

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

const FieldSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: FieldTypes,
    required: true,
  },
  label: {
    type: String,
    trim: true,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  is_required: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

module.exports = FieldSchema;
