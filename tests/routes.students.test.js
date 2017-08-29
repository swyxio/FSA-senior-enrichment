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
 * Student Route Tests
 *
 */
describe('Students Route:', function () {

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

  describe('GET /api/students', function () {
    /**
     * 1.  It should return JSON (i.e., use res.json)
     * 2.  Because there isn't anything in the DB, it should be an empty array
     *
     * **Extra Credit**: Consider using app.param to automatically load
     * in the Article whenever a param :id is detected
     */
    it('responds with an array via JSON', function () {

      return agent
      .get('/api/students')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      });

    });

    /**
     * Save a student in the database using our model and then retrieve it
     * using the GET /campuses route
     *
     */
    it('returns a student if there is one in the DB', function () {

      var student = Student.build({
        name: 'Test student 1',
        bio: 'Test student bio'
      });

      return student.save().then(function () {

        return agent
        .get('/api/students')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].name).to.equal('Test student 1');
        });

      });

    });

    /**
     * Save a second campus in the database using our model, then retrieve it
     * using the GET /campuses route
     *
     */
    it('returns another student if there is one in the DB', function () {

      var student1 = Student.build({
        name: 'Test student 1',
        bio: 'Test student image 1'
      });

      var student2 = Student.build({
        name: 'Test student 2',
        bio: 'Test student image 2'
      });

      return student1.save()
      .then(function () { return student2.save() })
      .then(function () {

        return agent
        .get('/api/students')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].name).to.equal('Test student 1');
          expect(res.body[1].name).to.equal('Test student 2');
        });

      });

    });

  });

  /**
   * Search for students by ID
   */
  describe('GET /students/:id', function () {

    var coolStudent;

    beforeEach(function () {

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

      return Promise.all(creatingStudents)
      .then(createdStudents => {
        coolStudent = createdStudents[1];
      });

    });

    /**
     * This is a proper GET /articles/ID request
     * where we search by the ID of the article created above
     */
    it('returns the JSON of the student based on the id', function () {

      return agent
      .get('/api/students/' + coolStudent.id)
      .expect(200)
      .expect(function (res) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body.name).to.equal('Cool Article');
      });

    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', function () {

      return agent
      .get('/api/students/76142896')
      .expect(404);

    });

  });


  /**
   * Series of tests to test creation of new Students using a POST
   * request to /students
   */
  describe('POST /students', function () {

    /**
     * Test the creation of a student
     * Here we don't get back just the student, we get back an object of this type, which you construct:
     *  {
     *    message: 'Created successfully',
     *    student: <the created student instance>
     *  }
     *
     */
    it('creates a new student', async function () {

      var createdCampus = await Campus.create({ name: 'Alatar the Blue', imageUrl: 'heres an image'});
      return agent
      .post('/api/students')
      .send({
        name: 'Awesome POST-Created student',
        bio: 'Can you believe I did this in a test?',
        campusId: createdCampus.id
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Created successfully');
        expect(res.body.student.id).to.not.be.an('undefined');
        expect(res.body.student.name).to.equal('Awesome POST-Created student');
      });

    });

    // This one should fail with a 500 because we don't set the student.bio
    it('does not create a new student without bio', function () {

      return agent
      .post('/api/students')
      .send({
        name: 'This student Should Not Be Allowed'
      })
      .expect(500);

    });

    // Check if the students were actually saved to the database
    it('saves the student to the DB', async function () {

      var createdCampus = await Campus.create({ name: 'Alatar the Blue', imageUrl: 'heres an image' });
      return agent
      .post('/api/students')
      .send({
        name: 'Awesome POST-Created Student',
        bio: 'Can you believe I did this in a test?',
        campusId: createdCampus.id
      })
      .expect(200)
      .then(function () {
        return Student.findOne({
          where: { name: 'Awesome POST-Created Student' }
        });
      })
      .then(function (foundStudent) {
        expect(foundStudent).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundStudent.bio).to.equal('Can you believe I did this in a test?');
        expect(foundStudent.campusId).to.equal(createdCampus.id);
      });

    });

    // Do not assume async operations (like db writes) will work; always check
    it('sends back JSON of the actual created student, not just the POSTed data', async function () {

      var createdCampus = await Campus.create({ name: 'Alatar the Blue', imageUrl: 'heres an image'});
      return agent
      .post('/api/students')
      .send({
        name: 'Coconuts',
        bio: 'A full-sized coconut weighs about 1.44 kg (3.2 lb).',
        extraneous: 'Sequelize will quietly ignore this non-schema property',
        campusId: createdCampus.id
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.student.extraneous).to.be.an('undefined');
        expect(res.body.student.createdAt).to.exist; // eslint-disable-line no-unused-expressions
      });
    });

    // check if sending with nonexistent campus id casus an error
    it('does not create a new student if given an invalid campusId', async function () {
      return agent
      .post('/api/students')
      .send({
        name: 'Coconuts',
        bio: 'A full-sized coconut weighs about 1.44 kg (3.2 lb).',
        campusId: 314159
      })
      .expect(500)
    });


  });

  /**
   * Series of specs to test updating of students using a PUT
   * request to /students/:id
   */
  describe('PUT /students/:id', function () {

    var student;

    beforeEach(function () {

      return Student.create({
        name: 'Final Student',
        bio: 'You can do it!'
      })
      .then(function (createdStudent) {
        student = createdStudent;
      });

    });

    /**
     * Test the updating of an student
     * Here we don't get back just the student, we get back an object of this type, which you construct:
     *  {
     *    message: 'Updated successfully',
     *    student: <the updated student instance>
     *  }
     *
     **/
    it('updates an student', function () {

      return agent
      .put('/api/students/' + student.id)
      .send({
        name: 'Awesome PUT-Updated student'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Updated successfully');
        expect(res.body.student.id).to.not.be.an('undefined');
        expect(res.body.student.name).to.equal('Awesome PUT-Updated student');
        expect(res.body.student.bio).to.equal('You can do it!');
      });

    });

    it('saves updates to the DB', function () {

      return agent
      .put('/api/students/' + student.id)
      .send({
        name: 'Awesome PUT-Updated student'
      })
      .then(function () {
        return Student.findById(student.id);
      })
      .then(function (foundstudent) {
        expect(foundstudent).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundstudent.name).to.equal('Awesome PUT-Updated student');
      });

    });

    it('gets 500 for invalid update', function () {

      return agent
      .put('/api/students/' + student.id)
      .send({ name: '' })
      .expect(500);

    });

  });


  /**
   * Search for students by ID
   */
  describe('DELETE /students/:id', function () {

    var coolStudent;

    beforeEach(function () {

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

      return Promise.all(creatingStudents)
      .then(createdStudents => {
        coolStudent = createdStudents[1];
      });

    });

    /**
     * This is a proper DELETE /students/ID request
     * where we search by the ID of the student created above
     */
    it('returns the JSON of the student based on the id', function () {

      return agent
      .delete('/api/students/' + coolStudent.id)
      .expect(200)
      .then(() =>Student.findAll())
      .then(function (foundStudents) {
        expect(foundStudents).to.have.length(2)
        expect(foundStudents.filter(c => c.id != coolStudent.id)).to.have.length(2)
      })
    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', function () {

      return agent
      .delete('/api/students/76142896')
      .expect(404);

    });

  });



})