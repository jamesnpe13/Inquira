// import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./database/db');

// config variables
const port = process.env.SERVER_PORT || 5000;
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

// express instance
const app = express();

// connect MongoDB
connectDB();

//====================

// middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use('/api', routes); // api routes
app.use(errorHandler); // error handler middleware

// server listen
app.listen(port, '0.0.0.0', (err) => {
  if (err) console.log(err);
  console.log(`Main_server running on port ${port}`);
});
