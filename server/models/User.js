const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },

    ip: {
      type: String,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

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
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
    },
    refresh_tokens: [refreshTokenSchema],
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
