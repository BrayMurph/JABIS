const { Model, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');
const sequelize = require('../config/connection');

class User extends Model {
  // Add methods/associations/etc...
}

// Attaches the local authentication strategy from passport.js to the user model
// Automatically adds username and password to the model
passportLocalSequelize.attachToUser(User, {
  usernameField: 'username',
  hashField: 'password',
});

// Add validation rules for the username and password fields
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures that each username is unique
      validate: {
        notNull: {
          msg: 'Username is required.',
        },
        len: {
          args: [3, 20],
          msg: 'Username must be between 3 and 20 characters.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required.',
        },
        len: {
          args: [8, 100],
          msg: 'Password must be at least 8 characters.',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

// Rest of the User model and passport functions...
// ...

module.exports = User;
