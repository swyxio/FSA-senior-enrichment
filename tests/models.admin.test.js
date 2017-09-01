'use strict';

var Promise = require('bluebird');
var expect = require('chai').expect;
var {Admin, Student, Campus} = require('../db/models/');
var db = require('../db/');

describe('The `Admin` model', function () {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Next, we create an (un-saved!) article instance before every spec
   */
  var fullText = 'Donec id elit non mi porta gravida at eget metus.';
  var fullName = 'Fake Admin1';

  var admin;
  beforeEach(function(){
    admin = Admin.build({
      name: fullName,
      bio: fullText
    });
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Campus.truncate({ cascade: true }),
      Student.truncate({ cascade: true }),
      Admin.truncate({ cascade: true })
    ]);
  });

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `name` and `content`.
     *
     * http://sequelize.readthedocs.io/en/v3/docs/models-definition/
     */
    it('includes `name` and `bio` fields', function () {

      return admin.save()
      .then(function (savedAdmin) {
        expect(savedAdmin.name).to.equal(fullName);
        expect(savedAdmin.bio).to.equal(fullText);
      });

    });

    it('requires `bio`', function () {

      admin.bio = null;
      return admin.validate()
      .then(function () {
        throw new Error('validation should fail when bio is null');
      })
      .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
      })
    });

    it('requires `name` (in a more strict way than for `content`)', function () {

      admin.name = '';

      return admin.validate()
      .then(function () {
        throw new Error('validation should fail when name is empty');
      })
      .catch(err => {
        expect(err).to.be.an.instanceOf(Error);
        // expect(err.message).to.contain('Validation error');
      })
    });

    it('can handle long `bio`', function() {
      var adminbio = 'WALL-E (stylized with an interpunct as WALL·E) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.';

      return Admin.create({
        name: 'WALL-E',
        bio: adminbio
      })
      .then(function(result) {
        expect(result).to.be.an('object');
        expect(result.name).to.equal('WALL-E');
        expect(result.bio).to.equal(adminbio);
      });

    });

  });

  describe('associations', function () {

    /**
     * Add a `belongsTo` relationship between students and campus,
     * but make sure the user is aliased as `campus` for each students.
     *
     * http://sequelize.readthedocs.io/en/v3/docs/associations/#belongsto
     */
    it("belongs to a campus, who is stored as the student's `campus`", function() {

      var creatingCampus = Campus.create({ name: 'Campus1', imageUrl: 'campusimage'});
      var creatingStudent = Student.create({
        name: 'Student Namehere',
        bio: 'Aenean lacinia bibendum nulla sed consectetur.'
      });

      return Promise.all([creatingCampus, creatingStudent])
      .spread(function(createdCampus, createdStudent) {
        // this method `setCampus` method automatically exists if you set up the association correctly
        return createdStudent.setCampus(createdCampus);
      })
      .then(function() {
        return Student.findOne({
          where: { name: 'Student Namehere' },
          include: { model: Campus, as: 'campus' }
        });
      })
      .then(function(foundStudent){
        expect(foundStudent.campus).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundStudent.campus.name).to.equal('Campus1');
      });

    });

  })

});