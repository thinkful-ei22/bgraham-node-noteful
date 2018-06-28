'use strict';

const express = require ('express');

const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');

const notes = simDB.initialize(data);



// Get All (and search by query)
router.get('/notes', (req, res) => {
  
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
router.get('/notes/:id', (req, res) => {
  const id = req.params.id;
   
  let note = data.find(function(item) {
    return item.id === Number(id);
  });
  res.json(note);
  
});
// Put update an item
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  
  /// validate for matching keys 
  const updateObj = {};
  const updateableFields = ['title', 'content'];
  
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  // validate the updated title and content
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});
  
// Post (insert) an item
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;
  
  const newItem = { title, content };
  
  //Validating the new item title
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});
  
// Delete an item
router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  
  notes.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(204);
  });
});
  

module.exports = router;
