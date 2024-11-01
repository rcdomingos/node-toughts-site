const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts_db", "root", "root", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Database connected successfully");
} catch (error) {
  console.error(`Error connecting: ${error}`);
}

module.exports = sequelize;
