const mongoose = require('mongoose');
const SectionSchema = require('./Section');

const PageSchema = new mongoose.Schema({
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
  sections: {
    type: [SectionSchema],
    default: [],
  },
});

module.exports = PageSchema;
