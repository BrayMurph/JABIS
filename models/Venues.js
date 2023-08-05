const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Venues extends Model {} 

Venues.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priceRanges: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'venues',
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = Venues;