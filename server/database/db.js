const mongoose = require('mongoose');
const mongoDB_url = `${process.env.MONGO_DB_CONNECTION_STRING}${process.env.DB_NAME}?authSource=admin`;
console.log(mongoDB_url);

async function connectDB() {
  try {
    await mongoose.connect(mongoDB_url);
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
