const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = require("./User");

const Tought = db.define("tb_tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

// tb relationships
Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;
