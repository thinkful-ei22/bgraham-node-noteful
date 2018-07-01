'use strict';

const express = require('express');

const morgan = require('morgan');

//Create PORT, which requires config.js
const { PORT } = require('./config');
const noteRouter = require('./router/notes.router');

// Create an Express application
const app = express();


app.use(morgan('dev'));

// Create a static webserver
app.use(express.static('public'));


app.use(express.json());

app.use('/api', noteRouter);


///404 handler middleware
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
if (require.main === module) {
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app; // Export for testing