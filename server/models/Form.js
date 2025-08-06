const mongoose = require('mongoose');
const PageSchema = require('./Page');

const StatusTypes = ['draft', 'published', 'unpublished', 'archived'];

const FormSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: StatusTypes,
      required: true,
    },
    slug: {
      type: String,
      immutable: true,
      required: true,
      trim: true,
    },
    pages: {
      type: [PageSchema],
      default: [],
    },
  },
  {
    collection: 'forms',
    timestamps: true,
  }
);

module.exports = mongoose.model('Form', FormSchema);
