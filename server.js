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

// Listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});