"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv')
dotenv.config()
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
console.log(process.env.NODE_ENV )
let sequelize;
//check ให้ดุง sqlite
if (config.storage) {
  sequelize = new Sequelize(config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

//check การเชื่อต่อ database ว่าพร้อมใช้งานมั้ย
const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected has been established successfully");
  } catch (error) {
    console.log("Unable to connect the databases: ",error);
  }
};
init();

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
