const { DataTypes } = require('sequelize')
const sequelize = require('./Connection')

const Type = sequelize.define('Type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Type
