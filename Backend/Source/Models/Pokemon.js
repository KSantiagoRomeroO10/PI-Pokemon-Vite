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



// INSERT INTO public."Pokemons"(id, nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, "createdAt", "updatedAt")
// VALUES (1, 'Bulbasaur', 'bulbasaur.jpg', 45, 49, 49, 45, 0.7, 6.9, NOW(), NOW());