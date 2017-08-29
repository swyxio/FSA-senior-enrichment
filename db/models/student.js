'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
var Campus = require('./campus')


const Student = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bio: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    photo: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING
})

Student.belongsTo(Campus, {as: 'campus'})

module.exports = Student