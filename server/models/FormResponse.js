const mongoose = require('mongoose');
const FieldResponseSchema = require('./FieldResponse');

const FormResponseSchema = new mongoose.Schema(
  {
    form_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
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
    collection: 'form_responses',
    timestamps: true,
  }
);

module.exports = mongoose.model('FormResponse', FormResponseSchema);
