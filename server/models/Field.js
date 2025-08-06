const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  label: {
    type: String,
  },
  order: {
    type: Number,
  },
  is_required: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
  },
});

module.exports = FieldSchema;
