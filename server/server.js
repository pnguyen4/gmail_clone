const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Parse requests with JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes.UserRouter);

app.all('*', (req, res) => {
  res.status(404).json({error: 'resource not found'});
});

module.exports = app;
