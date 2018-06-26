'use strict';
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('lessons', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

const newObj =  {
  title: 'This Is A New Article',
  content: 'Testing out the newObj to see if it works. If you see this it works!'
};

notes.create(newObj, (err, item) => {

  if(err){
    console.error(err);
  }
  if(item){
    console.log(item);
  }
  else{
    console.log('Not found');
  }
});

//simDB.create(newObj, callback);
// GET Notes by ID
notes.find(1003, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('find not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

notes.delete(1002, (err, item) => {
  if(err){
    console.error(err);
  }
  if (item){
    console.log(item, 'should be deleted');
  }
  else {
    console.log('not found');
  }
});

notes.find(1002, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('find not found');
  }
});