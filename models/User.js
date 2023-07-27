// Define the user model add in needed passport functions
// add findByUsername function and verifyPassword function for passportjs

const { Model, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    // add methods/associations/etc...
}
// attaches the local authentication strategy from passport.js to the user model
// automatically adds username and password to the model
passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'password',
});
// used to find a user in the database based on username. Uses findOne method to retrieve the matching username
// returns null if no user is found
User.findByUsername = async function (username, callback) {
    try {
        const user = await this.findOne({ where: {username}});
        callback(null, user || null);
    } catch (err) {
        callback(err);
    }
};

// method to verify a password against the hashed password
// verifyPasswordHash method provided by passport-local-sequelize
User.prototype.verifyPassword = function (password, callback) {
    this.verifyPasswordHash(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// exports the User model
module.exports = User