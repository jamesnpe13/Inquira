const mongoose = require('mongoose');
const mongoDB_url = process.env.MONGO_DB_CONNECTION_STRING;

async function connectDB() {
  try {
    await mongoose.connect(mongoDB_url);
    console.log('MongoDB connected on railway');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
