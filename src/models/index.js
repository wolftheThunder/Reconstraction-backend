const { Sequelize, DataTypes } = require('sequelize');
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
const Admin = require('./admin')(sequelize, DataTypes);
const Project = require('./Project')(sequelize, DataTypes);
const Review = require('./Review')(sequelize, DataTypes);
const Service = require("./Service")(sequelize, DataTypes);

db.Admin = Admin;
db.Project = Project;
db.Review = Review;
db.Service = Service;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;