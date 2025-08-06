const mongoose = require('mongoose');
const PageSchema = require('./Page');

const FormSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      immutable: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    slug: {
      type: String,
      immutable: true,
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
