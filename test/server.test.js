'use strict';

const app = require ('../server');
const chai = require ('chai');
const chatHttp = require ('chai-http');

const expect = chai.expect;

chai.use(chatHttp);



describe('Reality check', function (){

  it ('true should be true', function(){
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function(){
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function () {
  it ('GET request "/" should return the index page', function() {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function() {
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

describe('GET /api/notes', function() {
  it('should return the default of 10 Notes as an array', function (){
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.be.lengthOf(10);

        const expectedKeys = ['id', 'title', 'content'];
        res.body.forEach(item => {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });

  it('should return correct search results for a valid query', function () {
    return chai.request(app)
      .get('/api/notes?searchTerm=ways')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(3);
        expect(res.body[0]).to.be.an('object');
      });
  });

  it('should return an empty array for an incorrect query', function () {
    return chai.request(app)
      .get('/api/notes?searchTerm=Not%20Valid%20Search')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(0);
      });
  });

});

describe('GET /api/notes/:id', function() {

  it ('should return correct note object with id, title and content for a given id', function(){
    return chai.request(app)
      .get('/api/notes/1000')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');

        const expectedKeys = ['content', 'id', 'title'];
        expect(res.body).to.include.keys(expectedKeys);

        expect(res.body.id).to.equal(1000);
        expect(res.body.title).to.equal('5 life lessons learned from cats');
      });
  });

  it('should respond with a 404 for an invalid id', function () {
    return chai.request(app)
      .get('/api/notes/DOESNOTEXIST')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

  

});

describe('POST /api/notes', function() {

  it('should create and return a new item with location header when provided valid data', function () {
    const newItem = {
      'title': 'New Note Title',
      'content': 'New Note Content'
    };

    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function (res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1010);
        expect(res.body.title).to.equal( newItem.title);
        expect(res.body.content).to.equal(newItem.content);
        expect(res).to.have.header('location');
      });

  });

  it('should return an object with a message property "Missing title in request body" when missing "title" field', function () {
    const newItem = {
      'content': 'New Note Content'
    };

    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .catch(err => err.response)
      .then(function (res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');


      });
  });
});

describe('PUT /api/notes/:id', function () {

  it('should update and return a note object when given valid data', function() {
    const updatedItem = {
      'title': 'Updated Title',
      'content': 'Updated content'
    };

    return chai.request(app)
      .put('/api/notes/1003')
      .send(updatedItem)
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.include.keys('id', 'title', 'content');

        expect(res.body.id).to.equal(1003);
        expect(res.body.title).to.equal(updatedItem.title);
        expect(res.body.content).to.equal(updatedItem.content);

      });
    
  });
  it('should respond with a 404 for an invalid id', function () {
    return chai.request(app)
      .get('/api/notes/DOESNOTEXIST')
      .catch(err => err.response)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

  const updatedErrorItem = { 
    'foo': 'Content without a title'
  };

  it('should return an object with a message property "Missing title in request body" when missing "title" field', function () {
    return chai.request(app)
      .put('/api/notes/1004')
      .send(updatedErrorItem)
      .catch(err => err.response)
      .then(function (res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Missing `title` in request body');


      });
  });

});


describe('DELETE /api/notes/:id', function(){

  it('should delete an item by id', function () {
    return chai.request(app)
      .delete('/api/notes/1008')
      .then(function (res) {
        expect(res).to.have.status(204);
    
      });
  });
});
