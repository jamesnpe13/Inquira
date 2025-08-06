const mongoose = require('mongoose');

const FieldResponseSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = FieldResponseSchema;
