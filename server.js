'use strict';

const express = require('express');

// Load array of notes
const data = require('./db/notes');

// Create an Express application
const app = express();

// Create a static webserver
app.use(express.static('public'));

//Create PORT, which requires config.js
const { PORT } = require('./config');

//Create logger, which logs out the requested function
const logger = require('./middleware/logger');


app.use(logger);

// Get All (and search by query)
app.get('/api/notes', (req, res) => {

  // Basic JSON response (data is an array of objects)
  // res.json(data);

  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }


});

// Get a single item
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;

  
  let note = data.find(function(item) {
    return item.id === Number(id);
  });
  res.json(note);


});


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
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});