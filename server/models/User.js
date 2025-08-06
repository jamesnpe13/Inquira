const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      immutable: true,
      match: /.+\@.+\..+/,
    },
    auth0_id: {
      type: String,
      required: false,
      unique: true,
    },
    refresh_token: {
      type: String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
