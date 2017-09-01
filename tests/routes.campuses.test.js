'use strict';


var expect = require('chai').expect;
var request = require('supertest-as-promised');

var app = require('../server/start');
var agent = request.agent(app);

var db = require('../db');
var Campus = require('../db/models/campus');
var Student = require('../db/models/student');


/**
 *
 * Campus Route Tests
 *
 */
describe('Campuses Route:', function () {

  /**
   * First we clear the database before beginning each run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Campus.truncate({ cascade: true }),
      Student.truncate({ cascade: true })
    ]);
  });

  describe('GET /api/campuses', function () {
    /**
     * 1.  It should return JSON (i.e., use res.json)
     * 2.  Because there isn't anything in the DB, it should be an empty array
     *
     * **Extra Credit**: Consider using app.param to automatically load
     * in the Article whenever a param :id is detected
     */
    it('responds with an array via JSON', function () {

      return agent
      .get('/api/campuses')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      });

    });

    /**
     * Save a campus in the database using our model and then retrieve it
     * using the GET /campuses route
     *
     */
    it('returns an article if there is one in the DB', function () {

      var campus = Campus.build({
        name: 'Test Campus',
        imageUrl: 'Test campus image'
      });

      return campus.save().then(function () {

        return agent
        .get('/api/campuses')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].name).to.equal('Test Campus');
        });

      });

    });

    /**
     * Save a second campus in the database using our model, then retrieve it
     * using the GET /campuses route
     *
     */
    it('returns another campus if there is one in the DB', function () {

      var campus1 = Campus.build({
        name: 'Test Campus 1',
        imageUrl: 'Test campus image 1'
      });

      var campus2 = Campus.build({
        name: 'Test Campus 2',
        imageUrl: 'Test campus image 2'
      });

      return campus1.save()
      .then(function () { return campus2.save() })
      .then(function () {

        return agent
        .get('/api/campuses')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].name).to.equal('Test Campus 1');
          expect(res.body[1].name).to.equal('Test Campus 2');
        });

      });

    });

  });

  /**
   * Get all students from a particular campus
   */
  describe('GET /campuses/:id', function () {

    var coolCampus, coolStudents;

    beforeEach(async function () {

      var creatingStudents = [{
        name: 'Boring article',
        bio: 'This article is boring'
      }, {
        name: 'Cool Article',
        bio: 'This article is cool'
      }, {
        name: 'Riveting Article',
        bio: 'This article is riveting'
      }]
      .map(data => Student.create(data));

      coolStudents = await Promise.all(creatingStudents)
      coolCampus = await Campus.create({name: 'Alatar the Blue', imageUrl: 'heres an image'})
      return await Promise.all(coolStudents.map(student => student.setCampus(coolCampus)))
    });

    /**
     * This is a proper GET /articles/ID request
     * where we search by the ID of the article created above
     */
    it('returns the JSON of the campus based on the id', function () {

      return agent
      .get('/api/campuses/' + coolCampus.id)
      .expect(200)
      .expect(function (res) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body.students).to.have.length(3)
        expect(res.body.students[0].name).to.equal(coolStudents[0].name);
      });

    });

    /**
     * (Unused) Here we pass in a bad ID to the URL, we should get a 404 error
     */
    xit('returns a 404 error if the ID is not correct', function () {

      return agent
      .get('/api/campuses/76142896')
      .expect(404);

    });

  });

  /**
   * Series of tests to test creation of new Campuses using a POST
   * request to /campuses
   */
  describe('POST /campuses', function () {

    /**
     * Test the creation of a campus
     * Here we don't get back just the campus, we get back an object of this type, which you construct:
     *  {
     *    message: 'Created successfully',
     *    campus: <the created campus instance>
     *  }
     *
     */
    it('creates a new campus', function () {

      return agent
      .post('/api/campuses')
      .send({
        name: 'Awesome POST-Created Campus',
        imageUrl: 'Can you believe I did this in a test?'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Created successfully');
        expect(res.body.campus.id).to.not.be.an('undefined');
        expect(res.body.campus.name).to.equal('Awesome POST-Created Campus');
      });

    });

    // This one should fail with a 500 because we don't set the Campus.imageUrl
    it('does not create a new Campus without imageUrl', function () {

      return agent
      .post('/api/campuses')
      .send({
        name: 'This Campus Should Not Be Allowed'
      })
      .expect(500);

    });

    // Check if the campuses were actually saved to the database
    it('saves the campus to the DB', function () {

      return agent
      .post('/api/campuses')
      .send({
        name: 'Awesome POST-Created Campus',
        imageUrl: 'Can you believe I did this in a test?'
      })
      .expect(200)
      .then(function () {
        return Campus.findOne({
          where: { name: 'Awesome POST-Created Campus' }
        });
      })
      .then(function (foundCampus) {
        expect(foundCampus).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundCampus.imageUrl).to.equal('Can you believe I did this in a test?');
      });

    });

    // Do not assume async operations (like db writes) will work; always check
    it('sends back JSON of the actual created campus, not just the POSTed data', function () {

      return agent
      .post('/api/campuses')
      .send({
        name: 'Coconuts',
        imageUrl: 'A full-sized coconut weighs about 1.44 kg (3.2 lb).',
        extraneous: 'Sequelize will quietly ignore this non-schema property'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.campus.extraneous).to.be.an('undefined');
        expect(res.body.campus.createdAt).to.exist; // eslint-disable-line no-unused-expressions
      });

    });

  });

  /**
   * Series of specs to test updating of campuses using a PUT
   * request to /campuses/:id
   */
  describe('PUT /campuses/:id', function () {

    var campus;

    beforeEach(function () {

      return Campus.create({
        name: 'Final Campus',
        imageUrl: 'You can do it!'
      })
      .then(function (createdCampus) {
        campus = createdCampus;
      });

    });

    /**
     * Test the updating of an campus
     * Here we don't get back just the campus, we get back an object of this type, which you construct:
     *  {
     *    message: 'Updated successfully',
     *    campus: <the updated campus instance>
     *  }
     *
     **/
    it('updates an campus', function () {

      return agent
      .put('/api/campuses/' + campus.id)
      .send({
        name: 'Awesome PUT-Updated campus'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Updated successfully');
        expect(res.body.campus.id).to.not.be.an('undefined');
        expect(res.body.campus.name).to.equal('Awesome PUT-Updated campus');
        expect(res.body.campus.imageUrl).to.equal('You can do it!');
      });

    });

    it('saves updates to the DB', function () {

      return agent
      .put('/api/campuses/' + campus.id)
      .send({
        name: 'Awesome PUT-Updated Campus'
      })
      .then(function () {
        return Campus.findById(campus.id);
      })
      .then(function (foundCampus) {
        expect(foundCampus).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundCampus.name).to.equal('Awesome PUT-Updated Campus');
      });

    });

    it('gets 500 for invalid update', function () {

      return agent
      .put('/api/campuses/' + campus.id)
      .send({ name: '' })
      .expect(500);

    });

  });

  /**
   * Search for campuses by ID
   */
  describe('DELETE /campuses/:id', function () {

    var coolCampus;

    beforeEach(function () {

      var creatingCampuses = [{
        name: 'Boring article',
        imageUrl: 'This article is boring'
      }, {
        name: 'Cool Article',
        imageUrl: 'This article is cool'
      }, {
        name: 'Riveting Article',
        imageUrl: 'This article is riveting'
      }]
      .map(data => Campus.create(data));

      return Promise.all(creatingCampuses)
      .then(createdCampuses => {
        coolCampus = createdCampuses[1];
      });

    });

    /**
     * This is a proper DELETE /campuses/ID request
     * where we search by the ID of the campus created above
     */
    it('returns the JSON of the campus based on the id', function () {

      return agent
      .delete('/api/campuses/' + coolCampus.id)
      .expect(200)
      .then(() => Campus.findAll())
      .then(function (foundCampuses) {
        expect(foundCampuses).to.have.length(2)
        expect(foundCampuses.filter(c => c.id != coolCampus.id)).to.have.length(2)
      })

    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', function () {

      return agent
      .delete('/api/campuses/76142896')
      .expect(404);

    });

  });
});
