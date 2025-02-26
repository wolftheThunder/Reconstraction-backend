const { Sequelize } = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = {};

// Import and instantiate models
const Admin = require('./Admin')(sequelize);
const Project = require('./Project')(sequelize);
const Review = require('./Review')(sequelize);
// Add models to db object
db.Admin = Admin;
db.Project = Project;
db.Review = Review;

// Define associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;