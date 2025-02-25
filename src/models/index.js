const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Admin = require("./Admin")(sequelize, DataTypes);
db.Project = require("./Project")(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName] && db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;