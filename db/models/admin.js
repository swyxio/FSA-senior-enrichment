'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('admin', {
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
})
