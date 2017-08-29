'use strict';

var Promise = require('bluebird');
var expect = require('chai').expect;
var {Campus, Student} = require('../db/models/');
var db = require('../db/');

describe('The `Campus` model', function () {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Next, we create an (un-saved!) article instance before every spec
   */
  var campusName = 'Campus1';
  var campusImage = 'http://campusimage.com/app.png';

  var campus;
  beforeEach(function(){
    campus = Campus.build({
      name: campusName,
      imageUrl: campusImage
    });
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
    //   Article.truncate({ cascade: true }),
      Campus.truncate({ cascade: true })
    ]);
  });  

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `name` and `content`.
     *
     * http://sequelize.readthedocs.io/en/v3/docs/models-definition/
     */
    it('includes `name` and `imageUrl` fields', function () {

      return campus.save()
      .then(function (savedCampus) {
        expect(savedCampus.name).to.equal(campusName);
        expect(savedCampus.imageUrl).to.equal(campusImage);
      });

    });

    it('requires `name`', function () {

      campus.name = null;
      return campus.validate()
      .then(function () {
        throw new Error('validation should fail when name is null');
      })
      .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
      })
    });
    it('requires `imageUrl`', function () {

      campus.imageUrl = null;
      return campus.validate()
      .then(function () {
        throw new Error('validation should fail when imageUrl is null');
      })
      .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
      })
    });
  })
})