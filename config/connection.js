const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Establishing Sequelize connection with MySQL database and exporting sequelize functionality to the rest of the application.

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
      }
    );
  }
  
  module.exports = sequelize;