const mongoose = require('mongoose');
const FieldSchema = require('./Field');

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
  },
  fields: {
    type: [FieldSchema],
    default: [],
  },
});

module.exports = SectionSchema;
