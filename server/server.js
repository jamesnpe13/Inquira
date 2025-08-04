require('dotenv').config();
const express = require('express');

const port = process.env.SERVER_PORT || 5000;

const app = express();

function startServer() {
  serverListen();
}

function serverListen() {
  app.listen(port, '0.0.0.0', (err) => {
    if (err) console.log(err);
    console.log(`Main_server running on port ${port}`);
  });
}

startServer();
