const mongoose = require('mongoose');

const FieldResponseSchema = new mongoose.Schema({
  page: {
    type: String,
  },
  section: {
    type: String,
  },
  order: {
    type: Number,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = FieldResponseSchema;
