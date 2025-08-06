const mongoose = require('mongoose');
const FieldResponseSchema = require('./FieldResponse');

const ResponseSchema = new mongoose.Schema(
  {
    form_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      immutable: true,
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
    field_responses: {
      type: [FieldResponseSchema],
      default: [],
    },
  },
  {
    collection: 'responses',
    timestamps: true,
  }
);

module.exports = mongoose.model('Response', ResponseSchema);
