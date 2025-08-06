const mongoose = require('mongoose');
const SectionSchema = require('./Section');

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
  },
  sections: {
    type: [SectionSchema],
    default: [],
  },
});

module.exports = PageSchema;
