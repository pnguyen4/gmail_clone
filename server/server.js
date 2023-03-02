const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Parse requests with JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow CORS (for local testing purposes)
app.use(cors());

app.use(routes.UserRouter);
app.use(routes.EmailRouter);

app.all('*', (req, res) => {
  res.status(404).json({error: 'resource not found'});
});

module.exports = app;
