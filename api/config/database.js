const { Sequelize } = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite',
  host: process.env.DATABASE_HOST,
});

module.exports = database;
