// Define the user model add in needed passport functions
// add findByUsername function and verifyPassword function for passportjs

const { Model, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    // add methods/associations/etc...
}

passportLocalSequelize.attachToUser(User, {
    usernameField: 'username',
    hashField: 'password',
});

User.findByUsername = async function (username, callback) {
    try {
        const user = await this.findOne({ where: {username}});
        callback(null, user || null);
    } catch (err) {
        callback(err);
    }
}

module.exports = User