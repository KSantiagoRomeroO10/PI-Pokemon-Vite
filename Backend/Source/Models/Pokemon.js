const { DataTypes } = require('sequelize')
const sequelize = require('./Connection')

const Pokemon = sequelize.define('Pokemon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ataque: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  defensa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  velocidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  altura: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  }
})

module.exports = Pokemon
