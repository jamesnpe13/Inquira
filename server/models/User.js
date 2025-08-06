const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
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
