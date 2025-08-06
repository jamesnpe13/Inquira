const mongoose = require('mongoose');
const FieldSchema = require('./Field');

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
  },
  fields: {
    type: [FieldSchema],
    default: [],
  },
});

module.exports = SectionSchema;
