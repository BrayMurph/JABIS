// Define the user model add in needed passport functions
// add findByUsername function and verifyPassword function for passportjs

const { Model, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

var User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

User.prototype.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// before saving, hash the password
User.addHook("beforeCreate", function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  return user;
});

module.exports = User